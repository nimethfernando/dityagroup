import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const envStatus = {
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    hasAdminJwtSecret: Boolean(process.env.ADMIN_JWT_SECRET),
    hasEmailUser: Boolean(process.env.EMAIL_USER),
    hasEmailPass: Boolean(process.env.EMAIL_PASS),
    nodeEnv: process.env.NODE_ENV,
  };
  return NextResponse.json(envStatus);
}
