'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Eye,
  Calendar,
  Clock,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Search,
  Tag,
  Filter,
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

const DEFAULT_CATEGORIES = [
  'Ditya Astroverse',
  'Ancient Wisdom & Science',
  'Business & Wealth',
  'Vedic Mathematics',
  'Tech & Architecture',
  'Personal Growth & Mindset',
];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('ALL');

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form states (Create & Edit)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Ditya Astroverse');
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [readTime, setReadTime] = useState('5 min read');
  const [authorName, setAuthorName] = useState('Ditya Divine Code Team');
  const [image, setImage] = useState('/images/hero-banner.jpeg');

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blogs');
      const data = await res.json();
      if (res.ok && data.success) {
        setBlogs(data.data || []);
      } else {
        setNotification({ type: 'error', message: data.message || 'Failed to load blog articles.' });
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

  const handleTitleChange = (val: string, isEditing = false) => {
    setTitle(val);
    if (!isEditing) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setCategory('Ditya Astroverse');
    setCustomCategory('');
    setIsCustomCategory(false);
    setReadTime('5 min read');
    setAuthorName('Ditya Divine Code Team');
    setImage('/images/hero-banner.jpeg');
    setCreateModalOpen(true);
  };

  const openEditModal = (blog: BlogItem) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setSlug(blog.slug);
    setExcerpt(blog.excerpt || '');
    setContent(blog.content || '');
    if (DEFAULT_CATEGORIES.includes(blog.category)) {
      setCategory(blog.category);
      setIsCustomCategory(false);
      setCustomCategory('');
    } else {
      setCategory('CUSTOM');
      setIsCustomCategory(true);
      setCustomCategory(blog.category);
    }
    setReadTime(blog.readTime || '5 min read');
    setAuthorName(blog.authorName || 'Ditya Divine Code Team');
    setImage(blog.image || '/images/hero-banner.jpeg');
    setEditModalOpen(true);
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setNotification(null);

    const finalCategory = isCustomCategory && customCategory.trim() ? customCategory.trim() : category;

    try {
      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          category: finalCategory,
          readTime,
          authorName,
          image,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({ type: 'success', message: 'Article created and published successfully!' });
        setCreateModalOpen(false);
        fetchBlogs();
      } else {
        setNotification({ type: 'error', message: data.message || 'Failed to create article.' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Network error occurred while creating article.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setSubmitting(true);
    setNotification(null);

    const finalCategory = isCustomCategory && customCategory.trim() ? customCategory.trim() : category;

    try {
      const res = await fetch('/api/admin/blogs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingId,
          title,
          slug,
          excerpt,
          content,
          category: finalCategory,
          readTime,
          authorName,
          image,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({ type: 'success', message: 'Article updated successfully!' });
        setEditModalOpen(false);
        fetchBlogs();
      } else {
        setNotification({ type: 'error', message: data.message || 'Failed to update article.' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Network error occurred while updating article.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this blog article?')) {
      return;
    }

    setDeletingId(id);
    setNotification(null);

    try {
      const res = await fetch('/api/admin/blogs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({ type: 'success', message: 'Article deleted successfully.' });
        setBlogs(blogs.filter((b) => b.id !== id));
      } else {
        setNotification({ type: 'error', message: data.message || 'Failed to delete article.' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Network error while deleting.' });
    } finally {
      setDeletingId(null);
    }
  };

  // Collect unique categories
  const allCategories = Array.from(
    new Set([...DEFAULT_CATEGORIES, ...blogs.map((b) => b.category).filter(Boolean)])
  );

  // Filtered blogs
  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.excerpt && b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      selectedCategoryFilter === 'ALL' || b.category === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FBFBFB] pb-24">
      <AdminHeader />

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-[#059669] tracking-wider uppercase bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                Editorial Management
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500 font-medium">{blogs.length} Total Articles</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#041614] tracking-tight mt-1.5">
              Blog & Article CMS
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Publish new articles, edit existing content, manage categories, and update insights.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/blog"
              target="_blank"
              className="px-4 py-2.5 bg-white border border-gray-200 hover:border-gray-400 rounded-asymmetric text-xs font-semibold text-gray-700 flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <span>View Public Blog</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={openCreateModal}
              className="btn-ditya-orange text-xs py-2.5 px-5 font-bold flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Article</span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        {notification && (
          <div
            className={`mb-6 p-4 rounded-asymmetric flex items-center justify-between text-xs font-semibold ${
              notification.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            <div className="flex items-center space-x-2">
              {notification.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600" />
              )}
              <span>{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Search & Filter Dock */}
        <div className="bg-white p-4 sm:p-5 rounded-asymmetric border border-gray-200/80 shadow-sm mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search articles by title, keyword, or slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#059669]"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="text-xs text-gray-500 font-medium shrink-0">Filter Category:</span>
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-[#059669] bg-white font-medium"
            >
              <option value="ALL">All Categories ({blogs.length})</option>
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat} ({blogs.filter((b) => b.category === cat).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Table Card */}
        <div className="bg-white rounded-asymmetric border border-gray-200/80 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-24 text-center space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#059669] mx-auto" />
              <p className="text-xs text-gray-500">Loading blog directory...</p>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="py-20 text-center space-y-3 px-4">
              <BookOpen className="w-10 h-10 text-gray-300 mx-auto" />
              <h3 className="text-sm font-bold text-gray-700">No Articles Found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                {searchTerm || selectedCategoryFilter !== 'ALL'
                  ? 'No articles match your current search or category filter.'
                  : 'Get started by creating your first article.'}
              </p>
              <button
                onClick={openCreateModal}
                className="btn-ditya-orange text-xs py-2 px-4 inline-flex items-center space-x-1.5 cursor-pointer mt-2"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create New Article</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#041614] text-white text-[11px] uppercase tracking-wider font-bold">
                    <th className="py-3.5 px-4">Article Title & Category</th>
                    <th className="py-3.5 px-4">URL Path</th>
                    <th className="py-3.5 px-4">Author</th>
                    <th className="py-3.5 px-4">Read Time</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                  {filteredBlogs.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-4 px-4 font-semibold text-[#041614] max-w-md">
                        <div className="font-bold text-sm leading-snug">{b.title}</div>
                        <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-[#059669] bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                          {b.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono text-gray-500 text-[11px]">
                        /blog/{b.slug}
                      </td>
                      <td className="py-4 px-4 text-gray-600 font-medium">
                        {b.authorName}
                      </td>
                      <td className="py-4 px-4 text-gray-500">
                        {b.readTime}
                      </td>
                      <td className="py-4 px-4 text-gray-500 whitespace-nowrap">
                        {new Date(b.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap space-x-2">
                        <Link
                          href={`/blog/${b.slug}`}
                          target="_blank"
                          className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-gray-100 hover:bg-[#041614] text-gray-700 hover:text-white rounded text-xs font-semibold transition-colors cursor-pointer"
                          title="View live post"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </Link>
                        <button
                          onClick={() => openEditModal(b)}
                          className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-emerald-50 hover:bg-[#059669] text-[#059669] hover:text-white rounded text-xs font-semibold transition-colors cursor-pointer border border-emerald-200"
                          title="Edit this article"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(b.id)}
                          disabled={deletingId === b.id}
                          className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 border border-red-200"
                          title="Delete article"
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

      {/* CREATE ARTICLE MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-asymmetric p-6 sm:p-8 shadow-2xl border border-gray-200 text-gray-800">
            <button
              onClick={() => setCreateModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-[#059669]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#041614]">Publish New Blog Article</h2>
                <p className="text-xs text-gray-500">Live instantly across the website and blog feed</p>
              </div>
            </div>

            <form onSubmit={handleCreateBlog} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Powerful Cinnamon Money Ritual to Attract Wealth, Luck and Financial Growth"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value, false)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#059669]"
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
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs font-mono focus:outline-none focus:border-[#059669]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Category *</label>
                  <select
                    value={isCustomCategory ? 'CUSTOM' : category}
                    onChange={(e) => {
                      if (e.target.value === 'CUSTOM') {
                        setIsCustomCategory(true);
                      } else {
                        setIsCustomCategory(false);
                        setCategory(e.target.value);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#059669]"
                  >
                    {allCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="CUSTOM">+ Add Custom Category...</option>
                  </select>
                </div>
              </div>

              {isCustomCategory && (
                <div>
                  <label className="block text-gray-700 font-bold mb-1">New Category Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter custom category name (e.g. Vedic Astrology, Business Systems)"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-[#059669] rounded-asymmetric text-xs focus:outline-none bg-emerald-50/40"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#059669]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Author Name</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/images/hero-banner.jpeg or /images/blog-crystal-salt.jpg"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Short Excerpt (Summary)</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary appearing on blog cards and search results..."
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Full Article Content *</label>
                <textarea
                  rows={7}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Full article content. Separate paragraphs with an empty line..."
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#059669] font-sans"
                />
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
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

      {/* EDIT ARTICLE MODAL */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-asymmetric p-6 sm:p-8 shadow-2xl border border-gray-200 text-gray-800">
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-[#059669]">
                <Edit className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#041614]">Edit Blog Article</h2>
                <p className="text-xs text-gray-500">Update article content, category, and metadata</p>
              </div>
            </div>

            <form onSubmit={handleEditBlog} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value, true)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#059669]"
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
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs font-mono focus:outline-none focus:border-[#059669]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Category *</label>
                  <select
                    value={isCustomCategory ? 'CUSTOM' : category}
                    onChange={(e) => {
                      if (e.target.value === 'CUSTOM') {
                        setIsCustomCategory(true);
                      } else {
                        setIsCustomCategory(false);
                        setCategory(e.target.value);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#059669]"
                  >
                    {allCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="CUSTOM">+ Add Custom Category...</option>
                  </select>
                </div>
              </div>

              {isCustomCategory && (
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter custom category name"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-[#059669] rounded-asymmetric text-xs focus:outline-none bg-emerald-50/40"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Estimated Read Time</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#059669]"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Author Name</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Short Excerpt (Summary)</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3.5 py-2 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Full Article Content *</label>
                <textarea
                  rows={7}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#059669] font-sans"
                />
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
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
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
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
