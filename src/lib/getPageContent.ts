import { prisma } from '@/lib/prisma';
import {
  DEFAULT_PAGE_CONTENTS,
  PageContentMap,
} from './defaultPageContent';

// Deep merge helper to ensure partial edits retain all default fields
function deepMerge<T extends Record<string, unknown>>(target: T, source: Record<string, unknown>): T {
  const output = { ...target } as Record<string, unknown>;
  if (!source || typeof source !== 'object') return output as T;

  for (const key of Object.keys(source)) {
    const srcVal = source[key];
    const tgtVal = output[key];

    if (srcVal === undefined || srcVal === null) {
      continue;
    }

    if (Array.isArray(srcVal)) {
      output[key] = srcVal;
    } else if (
      typeof srcVal === 'object' &&
      typeof tgtVal === 'object' &&
      tgtVal !== null &&
      !Array.isArray(tgtVal)
    ) {
      output[key] = deepMerge(
        tgtVal as Record<string, unknown>,
        srcVal as Record<string, unknown>
      );
    } else {
      output[key] = srcVal;
    }
  }

  return output as T;
}

// In-memory cache to prevent redundant WAN roundtrips to remote MariaDB
interface CacheRecord {
  data: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  expiry: number;
}

const memoryCache = new Map<string, CacheRecord>();
const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes cache

export function invalidatePageContentCache(slug?: string) {
  if (slug) {
    memoryCache.delete(slug);
  } else {
    memoryCache.clear();
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getPageContent<K extends keyof PageContentMap | string>(
  slug: K
): Promise<any> {
  const slugStr = slug as string;
  const fallback = (DEFAULT_PAGE_CONTENTS as Record<string, unknown>)[slugStr] || null;

  // Check in-memory cache first for instant sub-millisecond response
  const cached = memoryCache.get(slugStr);
  if (cached && Date.now() < cached.expiry) {
    return cached.data;
  }

  try {
    // 1500ms timeout race to prevent slow WAN MariaDB connections from blocking page rendering
    const dbPromise = prisma.pageContent.findUnique({
      where: { slug: slugStr },
    });

    const timeoutPromise = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), 1500)
    );

    const record = await Promise.race([dbPromise, timeoutPromise]);

    if (!record || !record.data) {
      // Cache fallback so subsequent requests don't keep polling a missing or slow row
      memoryCache.set(slugStr, { data: fallback, expiry: Date.now() + CACHE_TTL_MS });
      return fallback;
    }

    const parsedData = JSON.parse(record.data) as Record<string, unknown>;
    const result = fallback
      ? deepMerge(fallback as Record<string, unknown>, parsedData)
      : parsedData;

    memoryCache.set(slugStr, { data: result, expiry: Date.now() + CACHE_TTL_MS });
    return result;
  } catch (error) {
    console.error(`Error fetching page content for slug "${slugStr}":`, error);
    return fallback;
  }
}
