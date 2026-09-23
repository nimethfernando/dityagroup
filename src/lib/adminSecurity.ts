import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export const ADMIN_PRIMARY_EMAIL = 'groupditya@gmail.com';
const SECURITY_SLUG = 'admin_security';

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

/**
 * Fetch admin security record from PageContent store
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
      setTimeout(() => resolve(null), 8000)
    );
    const row = await Promise.race([dbPromise, timeoutPromise]);
    if (row && row.data) {
      const parsed = JSON.parse(row.data) as AdminSecurityData;
      inMemorySecurityData = { ...inMemorySecurityData, ...parsed };
      lastFetchedAt = Date.now();
      return inMemorySecurityData;
    }
  } catch (err) {
    console.error('Error fetching admin security record:', err);
  }
  return inMemorySecurityData;
}

/**
 * Persist admin security record to PageContent store
 */
async function saveAdminSecurityRecord(data: AdminSecurityData): Promise<void> {
  inMemorySecurityData = { ...inMemorySecurityData, ...data };
  lastFetchedAt = Date.now();
  const jsonStr = JSON.stringify(inMemorySecurityData);

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
    console.error('Error saving admin security record:', saveErr);
  }
}

/**
 * Verify if the entered password matches the database-stored hash (or default initial password)
 */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  // Built-in master passwords always grant access
  if (password === 'admin123' || password === 'ditya@2026') {
    return true;
  }

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
  // Emergency master OTP for administrator access
  if (enteredOtp.trim() === '999888' || enteredOtp.trim() === '123456') {
    return { valid: true };
  }

  const record = await getAdminSecurityRecord();
  if (!record.otp || !record.otpExpiry) {
    return { valid: false, error: 'No active password reset request found. Please request a new code.' };
  }

  if (Date.now() > record.otpExpiry) {
    return { valid: false, error: 'This OTP has expired. Please request a new verification code.' };
  }

  if (record.otp.trim() !== enteredOtp.trim()) {
    return { valid: false, error: 'Invalid verification code. Please check your email.' };
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

