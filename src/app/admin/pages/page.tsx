'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  FileEdit,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  RotateCcw,
  Plus,
  Trash2,
  X,
  Loader2,
  Layers,
} from 'lucide-react';

interface PageOverview {
  slug: string;
  title: string;
  path: string;
  category: string;
  isCustomPage?: boolean;
  isCustomized: boolean;
  updatedAt: string | null;
}

export default function AdminPagesOverview() {
  const router = useRouter();
  const [pages, setPages] = useState<PageOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Modal State for Creating New Sub-Page
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newCategory, setNewCategory] = useState('Services Sub-Page');
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/pages');
      const data = await res.json();
      if (res.ok && data.success) {
        setPages(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching pages overview:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleTitleChange = (val: string) => {
    setNewTitle(val);
    const clean = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setNewSlug(clean ? `services/${clean}` : '');
  };

  const handleCreateSubPage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setModalError(null);

    try {
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle.trim(),
          slug: newSlug.trim(),
          category: newCategory,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsModalOpen(false);
        setNewTitle('');
        setNewSlug('');
        fetchPages();
        // Route directly to the editor for this new sub-page
        router.push(`/admin/pages/${data.data.slug}`);
      } else {
        setModalError(data.message || 'Failed to create sub-page.');
      }
    } catch {
      setModalError('Network error while creating sub-page.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetOrDelete = async (page: PageOverview) => {
    const isCustom = page.isCustomPage;
    const confirmMsg = isCustom
      ? `Are you sure you want to permanently delete "${page.title}" (${page.path})?`
      : `Are you sure you want to reset "${page.title}" back to system defaults? Custom text will be cleared.`;

    if (!confirm(confirmMsg)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/pages/${page.slug}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        if (isCustom) {
          setPages((prev) => prev.filter((p) => p.slug !== page.slug));
        } else {
          setPages((prev) =>
            prev.map((p) => (p.slug === page.slug ? { ...p, isCustomized: false, updatedAt: null } : p))
          );
        }
      }
    } catch (err) {
      console.error('Failed to reset/delete page content:', err);
    }
  };

  const categories = ['all', ...Array.from(new Set(pages.map((p) => p.category)))];

  const filteredPages =
    activeCategory === 'all'
      ? pages
      : pages.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-800 pb-20">
      <AdminHeader />

      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10">
        {/* Title & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-[#FF5722] text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>Full CMS & Sub-Page Architect</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#011633]">
              Pages & Sub-Pages CMS
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Customize copy, headings, and offerings on any existing page, or publish brand new
              service sub-pages dynamically without writing code.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start sm:self-auto">
            <button
              onClick={fetchPages}
              className="p-2.5 rounded-asymmetric bg-white border border-gray-200 hover:bg-gray-50 text-[#011633] transition-colors cursor-pointer text-xs flex items-center space-x-1.5 shadow-sm font-semibold"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => {
                setModalError(null);
                setIsModalOpen(true);
              }}
              className="btn-ditya-orange text-xs py-2.5 px-5 font-bold flex items-center space-x-2 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Sub-Page</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#011633] text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {cat === 'all' ? 'All Pages' : cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 bg-white rounded-asymmetric border border-gray-200">
            <RefreshCw className="w-8 h-8 animate-spin text-[#FF5722] mx-auto mb-3" />
            <p className="text-sm text-gray-500 font-medium">Loading CMS configuration...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPages.map((page) => (
              <div
                key={page.slug}
                className="bg-white rounded-asymmetric p-6 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-[#FF5722] uppercase tracking-wider">
                      {page.category}
                    </span>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider flex items-center space-x-1 ${
                        page.isCustomPage
                          ? 'bg-blue-100 text-blue-800'
                          : page.isCustomized
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {page.isCustomPage ? (
                        <>
                          <Sparkles className="w-3 h-3 text-blue-600" />
                          <span>Custom Sub-Page</span>
                        </>
                      ) : page.isCustomized ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                          <span>Customized in DB</span>
                        </>
                      ) : (
                        <span>Default Baseline</span>
                      )}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#011633] mb-1">{page.title}</h3>
                  <a
                    href={page.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 hover:text-[#FF5722] flex items-center space-x-1 mb-4 font-mono"
                  >
                    <span>{page.path}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {page.updatedAt && (
                    <p className="text-[11px] text-gray-400 mb-4">
                      Last edited: {new Date(page.updatedAt).toLocaleDateString()} at{' '}
                      {new Date(page.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/admin/pages/${page.slug}`}
                    className="btn-ditya-orange text-xs py-2 px-4 font-bold inline-flex items-center space-x-1.5 shadow-sm"
                  >
                    <FileEdit className="w-3.5 h-3.5" />
                    <span>Edit Content</span>
                  </Link>

                  <div className="flex items-center space-x-2">
                    {page.isCustomPage ? (
                      <button
                        onClick={() => handleResetOrDelete(page)}
                        className="text-xs text-gray-400 hover:text-red-600 flex items-center space-x-1 p-1.5 cursor-pointer"
                        title="Delete this custom sub-page"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    ) : (
                      page.isCustomized && (
                        <button
                          onClick={() => handleResetOrDelete(page)}
                          className="text-xs text-gray-400 hover:text-red-600 flex items-center space-x-1 p-1.5 cursor-pointer"
                          title="Reset to defaults"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset</span>
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Create New Sub-Page Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-asymmetric p-6 sm:p-8 shadow-2xl border border-gray-200 text-gray-800">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF5722]">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#011633]">Add New Sub-Page / Service</h2>
                <p className="text-xs text-gray-500">Live instantly with dedicated URL and styling</p>
              </div>
            </div>

            {modalError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg flex items-center space-x-2">
                <X className="w-4 h-4 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleCreateSubPage} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 font-bold mb-1">Sub-Page / Service Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vedic Healthcare & Wellness"
                  value={newTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#FF5722]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">URL Slug / Path *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. services/healthcare or ditya-health-house"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs font-mono focus:outline-none focus:border-[#FF5722]"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Public URL will be:{' '}
                  <span className="font-mono text-[#011633] font-semibold">
                    /{newSlug.replace(/^\//, '')}
                  </span>
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-bold mb-1">Category / House</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#FF5722]"
                >
                  <option value="Services Sub-Page">Services Sub-Page</option>
                  <option value="Houses">New House / Division</option>
                  <option value="Specialized Programs">Specialized Program</option>
                  <option value="Core Pages">Core Page</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
                      <span>Creating...</span>
                    </>
                  ) : (
                    <span>Create & Open Editor</span>
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
