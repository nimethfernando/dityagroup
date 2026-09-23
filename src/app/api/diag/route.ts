import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const allKeys = Object.keys(process.env);
  
  // Find all keys that might relate to db, admin, email, vercel
  const relevantKeys = allKeys.filter((k) => {
    const upper = k.toUpperCase();
    return (
      upper.includes('DATA') ||
      upper.includes('DB') ||
      upper.includes('MARIA') ||
      upper.includes('MYSQL') ||
      upper.includes('ADMIN') ||
      upper.includes('JWT') ||
      upper.includes('EMAIL') ||
      upper.includes('SECRET') ||
      upper.startsWith('VERCEL') ||
      upper.startsWith('NEXT_PUBLIC')
    );
  });

  const envDetails: Record<string, { length: number; charCodes: number[] }> = {};
  for (const k of relevantKeys) {
    const val = process.env[k] || '';
    envDetails[k] = {
      length: val.length,
      charCodes: Array.from(k).map((c) => c.charCodeAt(0)),
    };
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    totalEnvKeysCount: allKeys.length,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV || null,
    vercelGitRef: process.env.VERCEL_GIT_COMMIT_REF || null,
    vercelGitRepoSlug: process.env.VERCEL_GIT_REPO_SLUG || null,
    vercelGitRepoOwner: process.env.VERCEL_GIT_REPO_OWNER || null,
    vercelProjectProductionUrl: process.env.VERCEL_PROJECT_PRODUCTION_URL || null,
    vercelUrl: process.env.VERCEL_URL || null,
    relevantKeysFound: relevantKeys,
    envDetails,
  });
}
