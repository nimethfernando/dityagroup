import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || '';
  return NextResponse.json({
    hasDbUrl: Boolean(dbUrl),
    dbUrlLength: dbUrl.length,
    starts: dbUrl.slice(0, 10),
  });
}
