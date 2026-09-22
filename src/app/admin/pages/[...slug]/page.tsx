'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AdminHeader from '@/components/admin/AdminHeader';
import {
  ArrowLeft,
  Save,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  Plus,
} from 'lucide-react';

interface PageEditorProps {
  params: Promise<{ slug: string[] | string }>;
}

export default function PageEditor({ params }: PageEditorProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug.join('/') : resolvedParams.slug;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageMeta, setPageMeta] = useState<{
    title: string;
    path: string;
    category?: string;
    isCustomPage?: boolean;
    isCustomized: boolean;
  } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<any>(null);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/pages/${slug}`);
        const data = await res.json();
        if (res.ok && data.success) {
          setPageMeta({
            title: data.data.title,
            path: data.data.path,
            category: data.data.category,
            isCustomPage: data.data.isCustomPage,
            isCustomized: data.data.isCustomized,
          });
          setContent(data.data.content);
        } else {
          setStatusMsg({ type: 'error', text: data.message || 'Failed to load page content' });
        }
      } catch {
        setStatusMsg({ type: 'error', text: 'Network error while loading content.' });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          title: pageMeta?.title,
          category: pageMeta?.category,
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: data.message || 'Saved successfully!' });
        if (pageMeta) setPageMeta({ ...pageMeta, isCustomized: true });
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Failed to save changes.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  const handleResetOrDelete = async () => {
    const isCustom = pageMeta?.isCustomPage;
    const confirmMsg = isCustom
      ? `Are you sure you want to permanently delete this custom sub-page (${pageMeta?.title})?`
      : `Are you sure you want to reset this page back to default content?`;

    if (!confirm(confirmMsg)) return;

    setSaving(true);
    try {
      const res = await fetch(`/api/admin/pages/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        if (isCustom) {
          router.push('/admin/pages');
        } else {
          router.refresh();
          window.location.reload();
        }
      }
    } catch {
      alert('Action failed. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const addChecklistItem = () => {
    if (!content.details) return;
    const current = content.details.checklists || [];
    setContent({
      ...content,
      details: {
        ...content.details,
        checklists: [...current, 'New capability offering or service feature'],
      },
    });
  };

  const removeChecklistItem = (index: number) => {
    if (!content.details) return;
    const updated = [...(content.details.checklists || [])];
    updated.splice(index, 1);
    setContent({
      ...content,
      details: {
        ...content.details,
        checklists: updated,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA]">
        <AdminHeader />
        <div className="text-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-[#059669] mx-auto mb-3" />
          <p className="text-sm text-gray-500 font-semibold">Loading page editor...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-[#F8F9FA]">
        <AdminHeader />
        <div className="max-w-xl mx-auto py-24 px-4 text-center">
          <p className="text-base font-bold text-red-600">Unable to load page content.</p>
          <Link href="/admin/pages" className="mt-4 inline-block btn-ditya-orange text-xs">
            Back to Pages
          </Link>
        </div>
      </div>
    );
  }

  const isHouseOrCustom = slug !== 'home' && slug !== 'about' && slug !== 'contact' && slug !== 'services' && slug !== 'privacy-policy' && slug !== 'terms-and-conditions' && slug !== 'global-business-network' && slug !== 'footer';

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-800 pb-28">
      <AdminHeader />

      <main className="max-w-[1140px] mx-auto px-4 sm:px-6 py-10">
        {/* Top Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Link
              href="/admin/pages"
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
              title="Back to pages overview"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-extrabold text-[#041614]">
                  Edit {pageMeta?.title}
                </h1>
                {pageMeta?.isCustomPage && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-extrabold uppercase tracking-wider rounded">
                    Custom Sub-Page
                  </span>
                )}
              </div>
              <a
                href={pageMeta?.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-[#059669] inline-flex items-center space-x-1 mt-0.5"
              >
                <span>Live URL: {pageMeta?.path}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={handleResetOrDelete}
              disabled={saving}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-red-600 bg-white border border-gray-200 rounded-asymmetric transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              {pageMeta?.isCustomPage ? (
                <>
                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  <span>Delete Sub-Page</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Defaults</span>
                </>
              )}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-ditya-orange text-xs py-2.5 px-6 font-bold flex items-center space-x-1.5 shadow-md cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes to MariaDB</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status Message */}
        {statusMsg && (
          <div
            className={`mb-6 p-4 rounded-asymmetric flex items-center space-x-3 text-xs font-semibold ${
              statusMsg.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {statusMsg.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Dynamic Form Editor */}
        <form onSubmit={handleSave} className="space-y-8">
          {/* Custom Sub-Page Meta Editor */}
          {pageMeta?.isCustomPage && (
            <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                Sub-Page Settings & Category
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Page Display Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={pageMeta.title}
                    onChange={(e) => setPageMeta({ ...pageMeta, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={pageMeta.category || 'Services Sub-Page'}
                    onChange={(e) => setPageMeta({ ...pageMeta, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 1. HOME PAGE EDITOR */}
          {/* ============================================================ */}
          {slug === 'home' && (
            <>
              {/* Hero Section */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                  1. Hero Section Content
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Tagline / Badge
                    </label>
                    <input
                      type="text"
                      value={content.hero?.tagline || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, tagline: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Super Heading
                    </label>
                    <input
                      type="text"
                      value={content.hero?.superHeading || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, superHeading: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Main Title
                    </label>
                    <input
                      type="text"
                      value={content.hero?.title || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Subtitle Accent
                    </label>
                    <input
                      type="text"
                      value={content.hero?.subTitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          hero: { ...content.hero, subTitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Hero Description
                  </label>
                  <textarea
                    rows={3}
                    value={content.hero?.description || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                  />
                </div>
              </div>

              {/* Stats Bar */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                  2. Performance Stats Counter Bar
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Stat 1</label>
                    <input
                      type="text"
                      value={content.stats?.stat1Number || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, stat1Number: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded mb-1 font-bold"
                    />
                    <input
                      type="text"
                      value={content.stats?.stat1Label || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, stat1Label: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Stat 2</label>
                    <input
                      type="text"
                      value={content.stats?.stat2Number || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, stat2Number: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded mb-1 font-bold"
                    />
                    <input
                      type="text"
                      value={content.stats?.stat2Label || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, stat2Label: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Stat 3</label>
                    <input
                      type="text"
                      value={content.stats?.stat3Number || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, stat3Number: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded mb-1 font-bold"
                    />
                    <input
                      type="text"
                      value={content.stats?.stat3Label || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, stat3Label: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Stat 4</label>
                    <input
                      type="text"
                      value={content.stats?.stat4Number || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, stat4Number: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded mb-1 font-bold"
                    />
                    <input
                      type="text"
                      value={content.stats?.stat4Label || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, stat4Label: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ============================================================ */}
          {/* 2. ABOUT PAGE EDITOR */}
          {/* ============================================================ */}
          {slug === 'about' && (
            <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                About Us Content
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Banner Title
                  </label>
                  <input
                    type="text"
                    value={content.banner?.title || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        banner: { ...content.banner, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Banner Subtitle
                  </label>
                  <input
                    type="text"
                    value={content.banner?.subtitle || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        banner: { ...content.banner, subtitle: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Story Narrative
                </label>
                <textarea
                  rows={4}
                  value={content.story?.para1 || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      story: { ...content.story, para1: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 3. CONTACT PAGE EDITOR */}
          {/* ============================================================ */}
          {slug === 'contact' && (
            <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                Contact Information & Office Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Phone Number
                    Primary Phone Number (India HQ)
                  </label>
                  <input
                    type="text"
                    value={content.info?.phone || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        info: { ...content.info, phone: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    placeholder="+91-93510 90301"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Email Address
                    Secondary Phone Number (Georgia Desk)
                  </label>
                  <input
                    type="text"
                    value={content.info?.secondaryPhone || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        info: { ...content.info, secondaryPhone: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    placeholder="+995 555433091"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Secondary Phone Label
                  </label>
                  <input
                    type="text"
                    value={content.info?.secondaryPhoneLabel || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        info: { ...content.info, secondaryPhoneLabel: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    placeholder="Georgia Number"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Direct Email Address
                  </label>
                  <input
                    type="email"
                    value={content.info?.email || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        info: { ...content.info, email: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    placeholder="groupditya@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Phone Operating Hours
                </label>
                <input
                  type="text"
                  value={content.info?.phoneHours || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      info: { ...content.info, phoneHours: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  placeholder="Mon–Sat 9:00 AM – 7:00 PM IST"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Corporate Headquarters Address
                </label>
                <textarea
                  rows={2}
                  value={content.info?.address || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      info: { ...content.info, address: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 4. SERVICES DIRECTORY EDITOR */}
          {/* ============================================================ */}
          {slug === 'services' && (
            <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                Services Directory Header & Intro
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Banner Title
                  </label>
                  <input
                    type="text"
                    value={content.banner?.title || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        banner: { ...content.banner, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Banner Badge
                  </label>
                  <input
                    type="text"
                    value={content.banner?.badge || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        banner: { ...content.banner, badge: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Introduction Heading
                </label>
                <input
                  type="text"
                  value={content.intro?.heading || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      intro: { ...content.intro, heading: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 5. LEGAL & POLICY PAGES EDITOR */}
          {/* ============================================================ */}
          {(slug === 'privacy-policy' || slug === 'terms-and-conditions') && (
            <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                Legal Document Content
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Document Title
                  </label>
                  <input
                    type="text"
                    value={content.banner?.title || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        banner: { ...content.banner, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Subtitle / Effective Date
                  </label>
                  <input
                    type="text"
                    value={content.banner?.subtitle || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        banner: { ...content.banner, subtitle: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="p-4 bg-[#F9F9F9] rounded-lg border border-gray-200 space-y-2">
                  <label className="block text-xs font-bold text-[#041614] uppercase">
                    Section {num} Title
                  </label>
                  <input
                    type="text"
                    value={content.content?.[`section${num}Title`] || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        content: {
                          ...content.content,
                          [`section${num}Title`]: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded"
                  />
                  <label className="block text-xs font-bold text-gray-600">
                    Section {num} Text
                  </label>
                  <textarea
                    rows={3}
                    value={content.content?.[`section${num}Text`] || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        content: {
                          ...content.content,
                          [`section${num}Text`]: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded"
                  />
                </div>
              ))}
            </div>
          )}

          {/* ============================================================ */}
          {/* 6. HOUSES & CUSTOM SUB-PAGES EDITOR */}
          {/* ============================================================ */}
          {isHouseOrCustom && (
            <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                {pageMeta?.isCustomPage ? 'Sub-Page Content & Structure' : 'House Overview & Offerings'}
              </h3>

              {/* Banner Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Banner Badge
                  </label>
                  <input
                    type="text"
                    value={content.banner?.badge || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        banner: { ...content.banner, badge: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Banner Title
                  </label>
                  <input
                    type="text"
                    value={content.banner?.title || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        banner: { ...content.banner, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Banner Subtitle
                </label>
                <input
                  type="text"
                  value={content.banner?.subtitle || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      banner: { ...content.banner, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                />
              </div>

              {/* Main Division & Heading */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Division Tagline / Pre-Heading
                  </label>
                  <input
                    type="text"
                    value={content.details?.division || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        details: { ...content.details, division: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Main Section Heading
                  </label>
                  <input
                    type="text"
                    value={content.details?.heading || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        details: { ...content.details, heading: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Description Narrative
                </label>
                <textarea
                  rows={4}
                  value={content.details?.description || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      details: { ...content.details, description: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                />
              </div>

              {/* Dual Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#F9F9F9] rounded-asymmetric border border-gray-200">
                <div>
                  <h4 className="text-xs font-bold text-[#059669] uppercase mb-2">Feature Card 1</h4>
                  <input
                    type="text"
                    placeholder="Card 1 Title"
                    value={content.details?.card1Title || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        details: { ...content.details, card1Title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded mb-2 font-bold"
                  />
                  <textarea
                    rows={2}
                    placeholder="Card 1 Description"
                    value={content.details?.card1Desc || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        details: { ...content.details, card1Desc: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded"
                  />
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#059669] uppercase mb-2">Feature Card 2</h4>
                  <input
                    type="text"
                    placeholder="Card 2 Title"
                    value={content.details?.card2Title || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        details: { ...content.details, card2Title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded mb-2 font-bold"
                  />
                  <textarea
                    rows={2}
                    placeholder="Card 2 Description"
                    value={content.details?.card2Desc || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        details: { ...content.details, card2Desc: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Checklist Items */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-gray-700 uppercase">
                    Offerings & Capability Checklists
                  </label>
                  <button
                    type="button"
                    onClick={addChecklistItem}
                    className="text-xs font-bold text-[#059669] hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>
                <div className="space-y-2">
                  {content.details?.checklists?.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = [...content.details.checklists];
                          updated[idx] = e.target.value;
                          setContent({
                            ...content,
                            details: { ...content.details, checklists: updated },
                          });
                        }}
                        className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeChecklistItem(idx)}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Box */}
              <div className="p-4 bg-[#041614] text-white rounded-asymmetric space-y-3">
                <h4 className="text-xs font-bold text-[#059669] uppercase">Consultation CTA Banner</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-300 mb-1">Heading</label>
                    <input
                      type="text"
                      value={content.details?.ctaTitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          details: { ...content.details, ctaTitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs bg-white/10 border border-white/20 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-300 mb-1">Description</label>
                    <input
                      type="text"
                      value={content.details?.ctaDesc || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          details: { ...content.details, ctaDesc: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs bg-white/10 border border-white/20 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-300 mb-1">Button Text</label>
                    <input
                      type="text"
                      value={content.details?.ctaBtnText || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          details: { ...content.details, ctaBtnText: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs bg-white/10 border border-white/20 rounded text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 7. GLOBAL BUSINESS NETWORK (GBN) CMS EDITOR */}
          {/* ============================================================ */}
          {slug === 'global-business-network' && (
            <div className="space-y-6">
              {/* Banner Section */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2 flex items-center justify-between">
                  <span>1. Hero Banner Header</span>
                  <span className="text-xs font-bold text-[#C5A059] uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    Royal Navy & Gold
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Hero Badge / Pill
                    </label>
                    <input
                      type="text"
                      value={content.banner?.badge || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          banner: { ...content.banner, badge: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Hero Title
                    </label>
                    <input
                      type="text"
                      value={content.banner?.title || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          banner: { ...content.banner, title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Hero Subtitle
                  </label>
                  <textarea
                    rows={2}
                    value={content.banner?.subtitle || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        banner: { ...content.banner, subtitle: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Intro / Core Vision */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                  2. Core Description & Strategic Vision
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Intro Badge
                    </label>
                    <input
                      type="text"
                      value={content.intro?.badge || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          intro: { ...content.intro, badge: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Intro Heading
                    </label>
                    <input
                      type="text"
                      value={content.intro?.heading || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          intro: { ...content.intro, heading: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Core Description
                  </label>
                  <textarea
                    rows={3}
                    value={content.intro?.description || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        intro: { ...content.intro, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Pillar 1
                    </label>
                    <input
                      type="text"
                      value={content.intro?.bullet1 || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          intro: { ...content.intro, bullet1: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Pillar 2
                    </label>
                    <input
                      type="text"
                      value={content.intro?.bullet2 || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          intro: { ...content.intro, bullet2: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Pillar 3
                    </label>
                    <input
                      type="text"
                      value={content.intro?.bullet3 || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          intro: { ...content.intro, bullet3: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Signature Slogan / Quote
                    </label>
                    <input
                      type="text"
                      value={content.intro?.quote || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          intro: { ...content.intro, quote: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Quote Attribution / Subtitle
                    </label>
                    <input
                      type="text"
                      value={content.intro?.quoteAuthor || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          intro: { ...content.intro, quoteAuthor: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* 3 Signature Feature Cards */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                  3. Key Features (3-Card Signature Layout)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                    <span className="text-xs font-bold text-[#041614] uppercase block">
                      Card 1: Strategic Networking
                    </span>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={content.features?.feature1Title || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            features: { ...content.features, feature1Title: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Tag / Pill</label>
                      <input
                        type="text"
                        value={content.features?.feature1Tag || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            features: { ...content.features, feature1Tag: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={content.features?.feature1Desc || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            features: { ...content.features, feature1Desc: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                      />
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                    <span className="text-xs font-bold text-[#041614] uppercase block">
                      Card 2: Global Market Insights
                    </span>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={content.features?.feature2Title || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            features: { ...content.features, feature2Title: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Tag / Pill</label>
                      <input
                        type="text"
                        value={content.features?.feature2Tag || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            features: { ...content.features, feature2Tag: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={content.features?.feature2Desc || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            features: { ...content.features, feature2Desc: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                      />
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                    <span className="text-xs font-bold text-[#041614] uppercase block">
                      Card 3: Exclusive Events & Cohorts
                    </span>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={content.features?.feature3Title || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            features: { ...content.features, feature3Title: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Tag / Pill</label>
                      <input
                        type="text"
                        value={content.features?.feature3Tag || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            features: { ...content.features, feature3Tag: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={content.features?.feature3Desc || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            features: { ...content.features, feature3Desc: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Membership Tiers (GBN Circle & GBN Elite Council) */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                  4. Membership Tiers & Qualification Criteria
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tier 1 */}
                  <div className="p-5 bg-blue-50/40 rounded-2xl border border-blue-100 space-y-3">
                    <span className="text-xs font-bold text-[#070B19] uppercase block">
                      Tier 1: GBN Circle
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">Badge</label>
                        <input
                          type="text"
                          value={content.tiers?.tier1Badge || ''}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              tiers: { ...content.tiers, tier1Badge: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">Turnover Req</label>
                        <input
                          type="text"
                          value={content.tiers?.tier1Turnover || ''}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              tiers: { ...content.tiers, tier1Turnover: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={content.tiers?.tier1Title || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            tiers: { ...content.tiers, tier1Title: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={content.tiers?.tier1Desc || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            tiers: { ...content.tiers, tier1Desc: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                        Benefits / Features (one per line)
                      </label>
                      <textarea
                        rows={4}
                        value={(content.tiers?.tier1Points || []).join('\n')}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            tiers: {
                              ...content.tiers,
                              tier1Points: e.target.value.split('\n').filter((l: string) => l.trim() !== ''),
                            },
                          })
                        }
                        placeholder="One bullet point per line..."
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white font-mono"
                      />
                    </div>
                  </div>

                  {/* Tier 2 */}
                  <div className="p-5 bg-amber-50/40 rounded-2xl border border-amber-200 space-y-3">
                    <span className="text-xs font-bold text-[#B8860B] uppercase block">
                      Tier 2: GBN Elite Council
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">Badge</label>
                        <input
                          type="text"
                          value={content.tiers?.tier2Badge || ''}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              tiers: { ...content.tiers, tier2Badge: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-gray-600 mb-1">Turnover Req</label>
                        <input
                          type="text"
                          value={content.tiers?.tier2Turnover || ''}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              tiers: { ...content.tiers, tier2Turnover: e.target.value },
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Title</label>
                      <input
                        type="text"
                        value={content.tiers?.tier2Title || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            tiers: { ...content.tiers, tier2Title: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={content.tiers?.tier2Desc || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            tiers: { ...content.tiers, tier2Desc: e.target.value },
                          })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                        Benefits / Features (one per line)
                      </label>
                      <textarea
                        rows={4}
                        value={(content.tiers?.tier2Points || []).join('\n')}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            tiers: {
                              ...content.tiers,
                              tier2Points: e.target.value.split('\n').filter((l: string) => l.trim() !== ''),
                            },
                          })
                        }
                        placeholder="One bullet point per line..."
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded bg-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats & Call to Action */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                  5. Impact Metrics & Bottom CTA
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Stat 1 Value</label>
                    <input
                      type="text"
                      value={content.stats?.stat1Value || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, stat1Value: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={content.stats?.stat1Label || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, stat1Label: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded mt-1.5 text-gray-500"
                      placeholder="Label"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Stat 2 Value</label>
                    <input
                      type="text"
                      value={content.stats?.stat2Value || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, stat2Value: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={content.stats?.stat2Label || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, stat2Label: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded mt-1.5 text-gray-500"
                      placeholder="Label"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Stat 3 Value</label>
                    <input
                      type="text"
                      value={content.stats?.stat3Value || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, stat3Value: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={content.stats?.stat3Label || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, stat3Label: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded mt-1.5 text-gray-500"
                      placeholder="Label"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Stat 4 Value</label>
                    <input
                      type="text"
                      value={content.stats?.stat4Value || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, stat4Value: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={content.stats?.stat4Label || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          stats: { ...content.stats, stat4Label: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded mt-1.5 text-gray-500"
                      placeholder="Label"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Bottom CTA Heading
                    </label>
                    <input
                      type="text"
                      value={content.cta?.heading || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          cta: { ...content.cta, heading: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Bottom CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={content.cta?.buttonText || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          cta: { ...content.cta, buttonText: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Save Bar */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
            <Link
              href="/admin/pages"
              className="px-5 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-asymmetric text-xs font-semibold hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="btn-ditya-orange text-xs py-2.5 px-8 font-bold flex items-center space-x-1.5 shadow-md cursor-pointer disabled:opacity-50"
            >
              {saving ? 'Saving to MariaDB...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

