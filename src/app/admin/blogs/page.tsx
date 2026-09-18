'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  BookOpen,
  Plus,
  Trash2,
  ExternalLink,
  Eye,
  Calendar,
  Clock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  X,
} from 'lucide-react';

interface BlogItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  authorName: string;
  image: string;
  published: boolean;
  createdAt: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Ancient Wisdom & Science');
  const [readTime, setReadTime] = useState('5 min read');
  const [authorName, setAuthorName] = useState('Ditya Group Editorial');
  const [image, setImage] = useState('/images/hero-banner.jpeg');

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blogs');
      const data = await res.json();
      if (res.ok && data.success) {
        setBlogs(data.data || []);
      }
    } catch {
      setNotification({ type: 'error', message: 'Failed to load blog articles.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setSlug(generatedSlug);
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setNotification(null);

    try {
      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          category,
          readTime,
          authorName,
          image,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setNotification({ type: 'success', message: 'Blog article successfully published!' });
        setModalOpen(false);
        // Reset form
        setTitle('');
        setSlug('');
        setExcerpt('');
        setContent('');
        fetchBlogs();
      } else {
        setNotification({ type: 'error', message: data.message || 'Failed to publish article.' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Network error while publishing.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this blog post?')) return;
    setDeletingId(id);
    try {
      const res = await fetch('/api/admin/blogs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({ type: 'success', message: 'Article deleted successfully.' });
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } else {
        setNotification({ type: 'error', message: data.message || 'Failed to delete article.' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Network error while deleting.' });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-800 pb-28">
      <AdminHeader />

      <main className="max-w-[1140px] mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-[#FF5722] text-xs font-bold uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              <span>Publications & Insights</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#011633]">
              Articles & Blog Manager
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Publish thought leadership pieces, Vedic research insights, and corporate updates.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="btn-ditya-orange text-xs py-2.5 px-5 font-bold flex items-center space-x-2 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Publish New Article</span>
          </button>
        </div>

        {notification && (
          <div
            className={`mb-6 p-4 rounded-asymmetric flex items-center space-x-3 text-xs font-semibold ${
              notification.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Table of Articles */}
        <div className="bg-white rounded-asymmetric border border-gray-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#FF5722] mx-auto mb-3" />
              <p className="text-xs text-gray-500 font-semibold">Loading blog articles...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-gray-300 mx-auto" />
              <h3 className="text-sm font-bold text-gray-700">No Custom Articles Published Yet</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                The public website is currently displaying the initial curated editorial articles.
                Click below to add your first custom article.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="btn-ditya-orange text-xs py-2 px-4 inline-flex items-center space-x-1.5 cursor-pointer mt-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create First Article</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#011633] text-white text-[11px] uppercase tracking-wider font-bold">
                    <th className="py-3.5 px-4">Article Title & Category</th>
                    <th className="py-3.5 px-4">Slug / URL</th>
                    <th className="py-3.5 px-4">Author</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                  {blogs.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-4 px-4 font-semibold text-[#011633]">
                        <div className="font-bold text-sm">{b.title}</div>
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-[#FF5722] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                          {b.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono text-gray-500">
                        /blog/{b.slug}
                      </td>
                      <td className="py-4 px-4 text-gray-600 font-medium">
                        {b.authorName}
                      </td>
                      <td className="py-4 px-4 text-gray-500">
                        {new Date(b.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <Link
                          href={`/blog/${b.slug}`}
                          target="_blank"
                          className="inline-flex items-center space-x-1 px-3 py-1.5 bg-gray-100 hover:bg-[#011633] text-gray-700 hover:text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(b.id)}
                          disabled={deletingId === b.id}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {deletingId === b.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Create Article Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-asymmetric p-6 sm:p-8 shadow-2xl border border-gray-200 text-gray-800">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF5722]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#011633]">Publish New Blog Article</h2>
                <p className="text-xs text-gray-500">Live instantly across the website</p>
              </div>
            </div>

            <form onSubmit={handleCreateBlog} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unlocking Prosperity: The Sacred Geometry of Ancient Astronomy"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#FF5722]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Slug / URL Path *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs font-mono focus:outline-none focus:border-[#FF5722]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#FF5722]"
                  >
                    <option value="Ancient Wisdom & Science">Ancient Wisdom & Science</option>
                    <option value="Ditya Astroverse">Ditya Astroverse</option>
                    <option value="Business & Wealth">Business & Wealth</option>
                    <option value="Vedic Mathematics">Vedic Mathematics</option>
                    <option value="Tech & Architecture">Tech & Architecture</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#FF5722]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Author Name</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#FF5722]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/images/hero-banner.jpeg or https://..."
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#FF5722]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Short Excerpt (Summary)</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary appearing on blog cards and search results..."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#FF5722]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Full Article Content *</label>
                <textarea
                  rows={8}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Full article content. Paragraphs and formatting supported..."
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#FF5722] font-sans"
                />
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={submitting}
                  className="px-5 py-2.5 border border-gray-300 rounded-asymmetric font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-ditya-orange px-6 py-2.5 font-bold shadow-md cursor-pointer disabled:opacity-50 flex items-center space-x-1.5"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <span>Publish Article</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

