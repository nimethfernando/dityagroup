import { NextResponse } from 'next/server';
import mariadb from 'mariadb';

export const dynamic = 'force-dynamic';

export async function GET() {
  const rawConnectionString = (process.env.DATABASE_URL || '').trim();
  const url = new URL(rawConnectionString.replace(/^mysql:\/\//, 'mariadb://'));

  const results: any = {};

  // Test 1: Connect with ssl disabled / default
  try {
    const conn = await mariadb.createConnection({
      host: url.hostname,
      port: Number(url.port) || 3306,
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: url.pathname.replace(/^\//, ''),
      connectTimeout: 5000,
    });
    results.testDefault = { success: true, serverVersion: conn.serverVersion() };
    await conn.end();
  } catch (err: any) {
    results.testDefault = { success: false, error: err.message, code: err.code, errno: err.errno, sqlState: err.sqlState };
  }

  // Test 2: Connect with ssl: { rejectUnauthorized: false }
  try {
    const conn = await mariadb.createConnection({
      host: url.hostname,
      port: Number(url.port) || 3306,
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: url.pathname.replace(/^\//, ''),
      connectTimeout: 5000,
      ssl: { rejectUnauthorized: false },
    });
    results.testSslRelaxed = { success: true, serverVersion: conn.serverVersion() };
    await conn.end();
  } catch (err: any) {
    results.testSslRelaxed = { success: false, error: err.message, code: err.code };
  }

  // Test 3: Connect with ssl: false
  try {
    const conn = await mariadb.createConnection({
      host: url.hostname,
      port: Number(url.port) || 3306,
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: url.pathname.replace(/^\//, ''),
      connectTimeout: 5000,
      ssl: false,
    });
    results.testSslFalse = { success: true, serverVersion: conn.serverVersion() };
    await conn.end();
  } catch (err: any) {
    results.testSslFalse = { success: false, error: err.message, code: err.code };
  }

  return NextResponse.json(results);
}
