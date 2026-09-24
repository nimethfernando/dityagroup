import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';
import { BLOG_POSTS } from '@/lib/blogData';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dityagroup.com';
  const now = new Date();

  // Core static marketing and house routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/global-business-network`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ditya-astroverse`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ditya-wealth-house`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ditya-math-house`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ditya-business-house`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ditya-trading-house`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ditya-tech-house`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic Blog Posts (from database + static presets)
  const blogRoutes: MetadataRoute.Sitemap = [];
  const registeredSlugs = new Set<string>();

  try {
    const dbPosts = await prisma.blog.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, createdAt: true },
    });

    for (const post of dbPosts) {
      if (post.slug && !registeredSlugs.has(post.slug)) {
        registeredSlugs.add(post.slug);
        blogRoutes.push({
          url: `${baseUrl}/blog/${encodeURIComponent(post.slug)}`,
          lastModified: post.updatedAt || post.createdAt || now,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    }
  } catch (err) {
    console.error('Sitemap: Error querying DB blogs:', err);
  }

  // Add preset blog posts if not already present
  for (const preset of BLOG_POSTS) {
    if (preset.slug && !registeredSlugs.has(preset.slug)) {
      registeredSlugs.add(preset.slug);
      blogRoutes.push({
        url: `${baseUrl}/blog/${encodeURIComponent(preset.slug)}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  // Dynamic Custom Pages (from PageContent table)
  const customPageRoutes: MetadataRoute.Sitemap = [];
  const systemSlugs = new Set([
    'admin_security',
    'header',
    'footer',
    'home',
    'about',
    'services',
    'global-business-network',
    'ditya-astroverse',
    'ditya-wealth-house',
    'ditya-math-house',
    'ditya-business-house',
    'ditya-trading-house',
    'ditya-tech-house',
    'contact-us',
    'privacy-policy',
    'terms-and-conditions',
  ]);

  try {
    const customPages = await prisma.pageContent.findMany({
      select: { slug: true, updatedAt: true },
    });

    for (const cp of customPages) {
      if (cp.slug && !systemSlugs.has(cp.slug) && !cp.slug.startsWith('admin')) {
        const cleanSlug = cp.slug.startsWith('/') ? cp.slug.slice(1) : cp.slug;
        customPageRoutes.push({
          url: `${baseUrl}/${cleanSlug}`,
          lastModified: cp.updatedAt || now,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    }
  } catch (err) {
    console.error('Sitemap: Error querying custom pages:', err);
  }

  return [...staticRoutes, ...blogRoutes, ...customPageRoutes];
}
