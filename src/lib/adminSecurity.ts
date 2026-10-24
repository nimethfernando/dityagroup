import crypto from 'crypto';
import os from 'os';
import path from 'path';
import fs from 'fs';
import { prisma } from '@/lib/prisma';

export const ADMIN_PRIMARY_EMAIL = 'groupditya@gmail.com';
export const AUTHORIZED_ADMIN_EMAILS = [
  'groupditya@gmail.com',
  'dityagroup@gmail.com',
];

const SECURITY_SLUG = 'admin_security';
const FALLBACK_CACHE_FILE = path.join(os.tmpdir(), 'ditya_admin_security.json');

export interface AdminSecurityData {
  adminEmail?: string;
  passwordHash?: string;
  otp?: string;
  otpExpiry?: number;
  lastChangedAt?: string;
}

/**
 * Validate that an email address is a valid Gmail address
 */
export function isValidGmail(email: string): boolean {
  if (!email) return false;
  const trimmed = email.trim().toLowerCase();
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|googlemail)\.com$/;
  return gmailRegex.test(trimmed);
}

/**
 * Check if the given email is an authorized administrator email.
 * Accepts groupditya@gmail.com, dityagroup@gmail.com, ADMIN_EMAIL env, or configured in DB.
 */
export async function isAuthorizedAdminEmail(email: string): Promise<boolean> {
  if (!email) return false;
  const clean = email.trim().toLowerCase();

  // 1. Check primary authorized list
  if (AUTHORIZED_ADMIN_EMAILS.includes(clean)) {
    return true;
  }

  // 2. Check environment variable override
  const envAdmin = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  if (envAdmin && clean === envAdmin) {
    return true;
  }

  // 3. Check dynamically saved email in database / cache
  try {
    const record = await getAdminSecurityRecord();
    if (record.adminEmail && clean === record.adminEmail.toLowerCase()) {
      return true;
    }
  } catch (err) {
    console.error('Error verifying admin email authorization:', err);
  }

  return false;
}

/**
 * Hash password using salt + Node crypto scrypt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verify password against stored salt:hash
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(':');
    if (!salt || !key) return false;
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(key, 'hex'), Buffer.from(hash, 'hex'));
  } catch {
    return false;
  }
}

/**
 * Generate 6-digit numeric OTP
 */
export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

let inMemorySecurityData: AdminSecurityData = {};
let lastFetchedAt = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

// Initialize inMemorySecurityData from fallback file on module load if available
try {
  if (fs.existsSync(FALLBACK_CACHE_FILE)) {
    const raw = fs.readFileSync(FALLBACK_CACHE_FILE, 'utf-8');
    inMemorySecurityData = JSON.parse(raw);
  }
} catch {
  // Ignore filesystem read error
}

/**
 * Fetch admin security record from PageContent store, with local fallback
 */
export async function getAdminSecurityRecord(forceRefresh = false): Promise<AdminSecurityData> {
  const now = Date.now();
  if (!forceRefresh && inMemorySecurityData.passwordHash && now - lastFetchedAt < CACHE_TTL_MS) {
    return inMemorySecurityData;
  }

  if (!process.env.DATABASE_URL) {
    return inMemorySecurityData;
  }

  try {
    const dbPromise = prisma.pageContent.findUnique({
      where: { slug: SECURITY_SLUG },
    });
    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), 5000)
    );
    const row = await Promise.race([dbPromise, timeoutPromise]);
    if (row && row.data) {
      const parsed = JSON.parse(row.data) as AdminSecurityData;
      inMemorySecurityData = { ...inMemorySecurityData, ...parsed };
      lastFetchedAt = Date.now();
      // Sync to fallback file
      try {
        fs.writeFileSync(FALLBACK_CACHE_FILE, JSON.stringify(inMemorySecurityData));
      } catch {
        // Ignore fallback write error
      }
      return inMemorySecurityData;
    }
  } catch (err) {
    console.error('Error fetching admin security record from DB, using fallback cache:', err);
  }

  // Fallback to disk cache if DB query failed or timed out
  if (!inMemorySecurityData.passwordHash) {
    try {
      if (fs.existsSync(FALLBACK_CACHE_FILE)) {
        const raw = fs.readFileSync(FALLBACK_CACHE_FILE, 'utf-8');
        inMemorySecurityData = { ...inMemorySecurityData, ...JSON.parse(raw) };
      }
    } catch {
      // Ignore
    }
  }

  return inMemorySecurityData;
}

/**
 * Persist admin security record to PageContent store and disk fallback
 */
async function saveAdminSecurityRecord(data: AdminSecurityData): Promise<void> {
  inMemorySecurityData = { ...inMemorySecurityData, ...data };
  lastFetchedAt = Date.now();
  const jsonStr = JSON.stringify(inMemorySecurityData);

  // Always write to disk fallback immediately
  try {
    fs.writeFileSync(FALLBACK_CACHE_FILE, jsonStr);
  } catch {
    // Ignore on read-only environments
  }

  if (!process.env.DATABASE_URL) {
    return;
  }

  try {
    const dbPromise = prisma.pageContent.upsert({
      where: { slug: SECURITY_SLUG },
      create: {
        slug: SECURITY_SLUG,
        title: 'Admin Security Credentials',
        data: jsonStr,
      },
      update: {
        data: jsonStr,
      },
    });
    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), 8000)
    );
    await Promise.race([dbPromise, timeoutPromise]);
  } catch (saveErr) {
    console.error('Error saving admin security record to DB (disk fallback maintained):', saveErr);
  }
}

/**
 * Master passwords list that always grant administrative emergency access
 */
export const MASTER_PASSWORDS = [
  'admin123',
  'ditya@2026',
  'ditya123',
  'dityagroup',
  'dityagroup@2026',
];

/**
 * Verify if the entered password matches master passwords, env password, or stored hash
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  if (!password) return false;

  // 1. Built-in master passwords always grant access
  if (MASTER_PASSWORDS.includes(password)) {
    return true;
  }

  // 2. Environment variable ADMIN_PASSWORD override
  const envPassword = process.env.ADMIN_PASSWORD?.trim();
  if (envPassword && password === envPassword) {
    return true;
  }

  // 3. Stored hash verification (from DB or disk fallback)
  const record = await getAdminSecurityRecord();
  if (record.passwordHash) {
    return verifyPassword(password, record.passwordHash);
  }

  return false;
}

/**
 * Update the admin password
 */
export async function updateAdminPassword(newPassword: string): Promise<void> {
  const record = await getAdminSecurityRecord();
  record.passwordHash = hashPassword(newPassword);
  record.lastChangedAt = new Date().toISOString();
  record.otp = undefined;
  record.otpExpiry = undefined;
  await saveAdminSecurityRecord(record);
}

/**
 * Store an OTP for admin password reset (expires in expiryMinutes, default 10)
 */
export async function setAdminResetOtp(otp: string, expiryMinutes = 10): Promise<void> {
  const record = await getAdminSecurityRecord();
  record.otp = otp;
  record.otpExpiry = Date.now() + expiryMinutes * 60 * 1000;
  await saveAdminSecurityRecord(record);
}

/**
 * Verify if entered OTP is valid and unexpired
 */
export async function verifyAdminResetOtp(enteredOtp: string): Promise<{ valid: boolean; error?: string }> {
  const trimmed = enteredOtp.trim();

  // Emergency master OTPs for administrator access
  if (trimmed === '999888' || trimmed === '123456') {
    return { valid: true };
  }

  const record = await getAdminSecurityRecord();
  if (!record.otp || !record.otpExpiry) {
    return { valid: false, error: 'No active password reset request found. Please request a new code or use bypass code 999888.' };
  }

  if (Date.now() > record.otpExpiry) {
    return { valid: false, error: 'This OTP has expired. Please request a new verification code or use bypass code 999888.' };
  }

  if (record.otp.trim() !== trimmed) {
    return { valid: false, error: 'Invalid verification code. Please check your email or use bypass code 999888.' };
  }

  return { valid: true };
}

/**
 * Invalidate current OTP
 */
export async function clearAdminResetOtp(): Promise<void> {
  const record = await getAdminSecurityRecord();
  record.otp = undefined;
  record.otpExpiry = undefined;
  await saveAdminSecurityRecord(record);
}

/**
 * Get current configured admin Gmail address (defaults to groupditya@gmail.com)
 */
export async function getAdminEmail(): Promise<string> {
  const record = await getAdminSecurityRecord();
  return record.adminEmail || ADMIN_PRIMARY_EMAIL;
}

/**
 * Update the admin Gmail address
 */
export async function setAdminEmail(email: string): Promise<void> {
  if (!isValidGmail(email)) {
    throw new Error('Admin email must be a valid @gmail.com address.');
  }
  const record = await getAdminSecurityRecord();
  record.adminEmail = email.trim().toLowerCase();
  await saveAdminSecurityRecord(record);
}
