'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  FileEdit,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';

interface PageOverview {
  slug: string;
  title: string;
  path: string;
  category: string;
  isCustomized: boolean;
  updatedAt: string | null;
}

export default function AdminPagesOverview() {
  const [pages, setPages] = useState<PageOverview[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleReset = async (slug: string, title: string) => {
    if (!confirm(`Are you sure you want to reset "${title}" back to system defaults? Any custom text will be deleted.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPages((prev) =>
          prev.map((p) => (p.slug === slug ? { ...p, isCustomized: false, updatedAt: null } : p))
        );
      }
    } catch (err) {
      console.error('Failed to reset page content:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-800 pb-20">
      <AdminHeader />

      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#011633]">
              Page Content CMS
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Select any page below to customize headings, descriptions, stats, bullet points, and
              contact info. All changes save directly to MariaDB.
            </p>
          </div>
          <button
            onClick={fetchPages}
            className="p-2 rounded-asymmetric bg-white border border-gray-200 hover:bg-gray-50 text-[#011633] transition-colors cursor-pointer text-xs flex items-center space-x-1.5 shadow-sm font-semibold self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>Refresh Status</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 bg-white rounded-asymmetric border border-gray-200">
            <RefreshCw className="w-8 h-8 animate-spin text-[#FF5722] mx-auto mb-3" />
            <p className="text-sm text-gray-500 font-medium">Loading CMS configuration...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
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
                        page.isCustomized
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {page.isCustomized ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Customized in DB</span>
                        </>
                      ) : (
                        <span>Default Content</span>
                      )}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#011633] mb-1">{page.title}</h3>
                  <a
                    href={page.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 hover:text-[#FF5722] flex items-center space-x-1 mb-4"
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

                  {page.isCustomized && (
                    <button
                      onClick={() => handleReset(page.slug, page.title)}
                      className="text-xs text-gray-400 hover:text-red-600 flex items-center space-x-1 p-1.5 cursor-pointer"
                      title="Reset to defaults"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
