import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const rawConnectionString = (process.env.DATABASE_URL || '').trim();
const connectionString = rawConnectionString
let connectionString = rawConnectionString
  ? rawConnectionString.replace(/^mysql:\/\//, 'mariadb://')
  : 'mariadb://localhost:3306/fallback';

const adapter = new PrismaMariaDb(connectionString);
// Append connection parameters for WAN network speed and reliability
if (connectionString && !connectionString.includes('connectTimeout')) {
  const separator = connectionString.includes('?') ? '&' : '?';
  connectionString += `${separator}connectTimeout=15000&acquireTimeout=15000&compress=true&connectionLimit=5`;
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
function createPrismaClient(): PrismaClient {
  const adapter = new PrismaMariaDb(connectionString);
  return new PrismaClient({ adapter });
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Cache prisma client globally across serverless lambda executions to reuse connections
globalForPrisma.prisma = prisma;
