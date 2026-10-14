import { cache } from 'react';
import { prisma } from '@/lib/prisma';
import { BLOG_POSTS, BlogPost } from '@/lib/blogData';

export interface CachedBlogItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  author: string;
  authorRole?: string;
  image: string;
  date: string;
  content: string[];
}

interface CacheRecord<T> {
  data: T;
  expiry: number;
}

const memoryCache = new Map<string, CacheRecord<any>>();
const CACHE_TTL_MS = 1000 * 60 * 5; // 5 minutes cache

export function invalidateBlogCache(slug?: string) {
  if (slug) {
    memoryCache.delete(`blog_${slug}`);
  }
  memoryCache.delete('latest_blogs_3');
  memoryCache.delete('all_published_blogs');
}

const safeFormatDate = (dateVal: any): string => {
  if (!dateVal) return 'Recently';
  try {
    const d = typeof dateVal === 'string' || typeof dateVal === 'number' ? new Date(dateVal) : dateVal;
    if (!d || isNaN(d.getTime())) return 'Recently';
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return 'Recently';
  }
};

/**
 * Fetch latest 3 blogs for the homepage
 */
export async function getLatestBlogs(limit = 3): Promise<CachedBlogItem[]> {
  const cacheKey = `latest_blogs_${limit}`;
  const cached = memoryCache.get(cacheKey);
  if (cached && Date.now() < cached.expiry) {
    return cached.data;
  }

  try {
    const dbPromise = prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('MariaDB query timeout')), 8000)
    );

    const posts = (await Promise.race([dbPromise, timeoutPromise])) as any[];

    if (posts && posts.length > 0) {
      const formatted: CachedBlogItem[] = posts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt || '',
        category: p.category || 'General',
        readTime: p.readTime || '5 min read',
        author: p.authorName || 'Ditya Group',
        image: p.image || '/images/hero-banner-clean.jpg',
        date: safeFormatDate(p.createdAt),
        content: (p.content || '').split('\n\n').filter(Boolean),
      }));

      memoryCache.set(cacheKey, { data: formatted, expiry: Date.now() + CACHE_TTL_MS });
      return formatted;
    }
  } catch (err) {
    console.error('Error fetching latest blogs from DB:', err);
  }

  // Fallback to static BLOG_POSTS
  const fallback = BLOG_POSTS.slice(0, limit).map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    category: p.category,
    readTime: p.readTime,
    author: p.author,
    image: p.image || '/images/hero-banner-clean.jpg',
    date: p.date,
    content: p.content,
  }));

  memoryCache.set(cacheKey, { data: fallback, expiry: Date.now() + CACHE_TTL_MS });
  return fallback;
}

/**
 * Fetch all published blogs (combining DB and default presets)
 */
export async function getAllPublishedBlogs(): Promise<CachedBlogItem[]> {
  const cacheKey = 'all_published_blogs';
  const cached = memoryCache.get(cacheKey);
  if (cached && Date.now() < cached.expiry) {
    return cached.data;
  }

  let dbPosts: any[] = [];
  try {
    const dbPromise = prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('MariaDB query timeout')), 8000)
    );

    dbPosts = (await Promise.race([dbPromise, timeoutPromise])) as any[];
  } catch (err) {
    console.error('Error fetching all published blogs from DB:', err);
    dbPosts = [];
  }

  const dbItems: CachedBlogItem[] = (dbPosts || [])
    .map((p) => ({
      id: p.id || String(Math.random()),
      title: p.title || 'Untitled Post',
      slug: p.slug || '',
      category: p.category || 'General',
      excerpt: p.excerpt || '',
      date: safeFormatDate(p.createdAt),
      readTime: p.readTime || '5 min read',
      author: p.authorName || 'Ditya Group',
      image: p.image || '/images/hero-banner-clean.jpg',
      content: (p.content || '').split('\n\n').filter(Boolean),
    }))
    .filter((item) => Boolean(item.slug));

  const defaultItems: CachedBlogItem[] = BLOG_POSTS.filter(
    (bp) => !dbItems.some((dp) => dp.slug === bp.slug)
  ).map((bp) => ({
    id: bp.id,
    title: bp.title,
    slug: bp.slug,
    category: bp.category,
    excerpt: bp.excerpt,
    date: bp.date,
    readTime: bp.readTime,
    author: bp.author,
    image: bp.image || '/images/hero-banner-clean.jpg',
    content: bp.content,
  }));

  const combined = [...dbItems, ...defaultItems];
  memoryCache.set(cacheKey, { data: combined, expiry: Date.now() + CACHE_TTL_MS });
  return combined;
}

/**
 * Fetch a single blog by slug, cached with React cache() to deduplicate
 * generateMetadata and page component calls in the same request, plus in-memory cache across requests.
 */
export const getBlogBySlug = cache(async (slug: string): Promise<CachedBlogItem | null> => {
  const cacheKey = `blog_${slug}`;
  const cached = memoryCache.get(cacheKey);
  if (cached && Date.now() < cached.expiry) {
    return cached.data;
  }

  let post: CachedBlogItem | null = null;

  try {
    const dbPromise = prisma.blog.findUnique({
      where: { slug },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('MariaDB single post query timeout')), 8000)
    );

    const dbPost = (await Promise.race([dbPromise, timeoutPromise])) as any;

    if (dbPost) {
      post = {
        id: dbPost.id,
        title: dbPost.title || 'Article',
        slug: dbPost.slug || slug,
        category: dbPost.category || 'Articles',
        author: dbPost.authorName || 'Ditya Group',
        date: safeFormatDate(dbPost.createdAt),
        readTime: dbPost.readTime || '5 min read',
        excerpt: dbPost.excerpt || '',
        image: dbPost.image || '/images/hero-banner-clean.jpg',
        content: (dbPost.content || '').split('\n\n').filter(Boolean),
      };
    }
  } catch (err) {
    console.error(`Error querying DB for blog slug "${slug}":`, err);
  }

  // Fallback to preset BLOG_POSTS with alias support
  if (!post) {
    const preset = BLOG_POSTS.find(
      (p) => p.slug === slug || p.aliases?.includes(slug)
    );
    if (preset) {
      post = {
        id: preset.id,
        title: preset.title,
        slug: preset.slug,
        category: preset.category,
        author: preset.author,
        date: preset.date,
        readTime: preset.readTime,
        excerpt: preset.excerpt,
        image: preset.image || '/images/hero-banner-clean.jpg',
        content: preset.content,
      };
    }
  }

  if (post) {
    memoryCache.set(cacheKey, { data: post, expiry: Date.now() + CACHE_TTL_MS });
  }

  return post;
});
