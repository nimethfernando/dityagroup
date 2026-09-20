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
  Sparkles,
} from 'lucide-react';

interface PageEditorProps {
  params: Promise<{ slug: string }>;
}

export default function PageEditor({ params }: PageEditorProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageMeta, setPageMeta] = useState<{ title: string; path: string; isCustomized: boolean } | null>(null);
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
        body: JSON.stringify({ content }),
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

  const handleReset = async () => {
    if (!confirm('Are you sure you want to reset this page back to default content?')) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/pages/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
        window.location.reload();
      }
    } catch {
      alert('Failed to reset page.');
    } finally {
      setSaving(false);
    }
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
              <h1 className="text-2xl font-extrabold text-[#041614]">
                Edit {pageMeta?.title}
              </h1>
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
              onClick={handleReset}
              disabled={saving}
              className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-red-600 bg-white border border-gray-200 rounded-asymmetric transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
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
          {/* ============================================================ */}
          {/* 1. HOME PAGE EDITOR */}
          {/* ============================================================ */}
          {slug === 'home' && (
            <>
              {/* Hero Section Card */}
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
                      Primary Headline
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
                      Gold Sub-Headline
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
                    Hero Paragraph Description
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
                  ></textarea>
                </div>
              </div>

              {/* Core Values & Vision */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                  2. Welcome & Core Values Section
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={content.coreValues?.subtitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          coreValues: { ...content.coreValues, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={content.coreValues?.heading || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          coreValues: { ...content.coreValues, heading: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Paragraph 1
                  </label>
                  <textarea
                    rows={2}
                    value={content.coreValues?.para1 || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        coreValues: { ...content.coreValues, para1: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Paragraph 2
                  </label>
                  <textarea
                    rows={2}
                    value={content.coreValues?.para2 || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        coreValues: { ...content.coreValues, para2: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                  ></textarea>
                </div>

                {/* 4 Core Value Bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[1, 2, 3, 4].map((num) => {
                    const key = `bullet${num}` as keyof typeof content.coreValues;
                    return (
                      <div key={num}>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                          Core Value Bullet {num}
                        </label>
                        <input
                          type="text"
                          value={content.coreValues?.[key] || ''}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              coreValues: {
                                ...content.coreValues,
                                [key]: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Founder Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Founder Name
                    </label>
                    <input
                      type="text"
                      value={content.coreValues?.founderName || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          coreValues: { ...content.coreValues, founderName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Founder Role
                    </label>
                    <input
                      type="text"
                      value={content.coreValues?.founderRole || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          coreValues: { ...content.coreValues, founderRole: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                  3. Key Statistics Numbers
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((n) => {
                    const numKey = `stat${n}Number` as keyof typeof content.stats;
                    const labelKey = `stat${n}Label` as keyof typeof content.stats;
                    return (
                      <div key={n} className="p-3 bg-[#F9F9F9] rounded-lg border border-gray-200">
                        <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                          Stat {n} Number
                        </label>
                        <input
                          type="text"
                          value={content.stats?.[numKey] || ''}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              stats: { ...content.stats, [numKey]: e.target.value },
                            })
                          }
                          className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded mb-2 bg-white"
                        />
                        <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                          Stat {n} Label
                        </label>
                        <input
                          type="text"
                          value={content.stats?.[labelKey] || ''}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              stats: { ...content.stats, [labelKey]: e.target.value },
                            })
                          }
                          className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded bg-white"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Why Choose Us & Metrics */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                  4. Why Choose Us & Radial Progress Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={content.whyChooseUs?.heading || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          whyChooseUs: { ...content.whyChooseUs, heading: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Metric 1 Percentage (e.g. 95%)
                    </label>
                    <input
                      type="text"
                      value={content.whyChooseUs?.metric1Percent || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          whyChooseUs: { ...content.whyChooseUs, metric1Percent: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Metric 1 Title & Description
                    </label>
                    <input
                      type="text"
                      value={content.whyChooseUs?.metric1Title || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          whyChooseUs: { ...content.whyChooseUs, metric1Title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg mb-2"
                    />
                    <textarea
                      rows={2}
                      value={content.whyChooseUs?.metric1Desc || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          whyChooseUs: { ...content.whyChooseUs, metric1Desc: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Metric 2 (e.g. 100% Ditya Smart System)
                    </label>
                    <input
                      type="text"
                      value={content.whyChooseUs?.metric2Title || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          whyChooseUs: { ...content.whyChooseUs, metric2Title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg mb-2"
                    />
                    <textarea
                      rows={2}
                      value={content.whyChooseUs?.metric2Desc || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          whyChooseUs: { ...content.whyChooseUs, metric2Desc: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    ></textarea>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="pt-2 border-t border-gray-100">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Client Testimonial Quote
                  </label>
                  <textarea
                    rows={2}
                    value={content.whyChooseUs?.testimonialQuote || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        whyChooseUs: { ...content.whyChooseUs, testimonialQuote: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg mb-2"
                  ></textarea>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Testimonial Author
                  </label>
                  <input
                    type="text"
                    value={content.whyChooseUs?.testimonialAuthor || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        whyChooseUs: { ...content.whyChooseUs, testimonialAuthor: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </>
          )}

          {/* ============================================================ */}
          {/* 2. ABOUT PAGE EDITOR */}
          {/* ============================================================ */}
          {slug === 'about' && (
            <div className="space-y-8">
              {/* 1. Banner */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                  1. Page Banner
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Badge Pill
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
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
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
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
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
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Welcome & Core Values */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                  2. Welcome & Core Values
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Core Values Subtitle
                    </label>
                    <input
                      type="text"
                      value={content.coreValues?.subtitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          coreValues: { ...content.coreValues, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Welcome Badge
                    </label>
                    <input
                      type="text"
                      value={content.coreValues?.welcomeBadge || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          coreValues: { ...content.coreValues, welcomeBadge: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Main Heading
                    </label>
                    <input
                      type="text"
                      value={content.coreValues?.heading || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          coreValues: { ...content.coreValues, heading: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Paragraph 1
                    </label>
                    <textarea
                      rows={2}
                      value={content.coreValues?.para1 || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          coreValues: { ...content.coreValues, para1: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Paragraph 2
                    </label>
                    <textarea
                      rows={2}
                      value={content.coreValues?.para2 || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          coreValues: { ...content.coreValues, para2: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Paragraph 3
                    </label>
                    <textarea
                      rows={2}
                      value={content.coreValues?.para3 || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          coreValues: { ...content.coreValues, para3: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                    />
                  </div>
                </div>

                {/* 4 Core Value Bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[1, 2, 3, 4].map((num) => {
                    const key = `bullet${num}` as keyof typeof content.coreValues;
                    return (
                      <div key={num}>
                        <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                          Core Value Bullet {num}
                        </label>
                        <input
                          type="text"
                          value={content.coreValues?.[key] || ''}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              coreValues: {
                                ...content.coreValues,
                                [key]: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669]"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Feature Card 1 Title
                    </label>
                    <input
                      type="text"
                      value={content.coreValues?.prodCardTitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          coreValues: { ...content.coreValues, prodCardTitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg mb-2 bg-white"
                    />
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Feature Card 1 Description
                    </label>
                    <textarea
                      rows={2}
                      value={content.coreValues?.prodCardDesc || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          coreValues: { ...content.coreValues, prodCardDesc: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Feature Card 2 Title
                    </label>
                    <input
                      type="text"
                      value={content.coreValues?.timeCardTitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          coreValues: { ...content.coreValues, timeCardTitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg mb-2 bg-white"
                    />
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Feature Card 2 Description
                    </label>
                    <textarea
                      rows={2}
                      value={content.coreValues?.timeCardDesc || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          coreValues: { ...content.coreValues, timeCardDesc: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Founder Message */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                  3. Founder Message Section
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Badge Text (e.g. CEO & Founder BMC Genie)
                    </label>
                    <input
                      type="text"
                      value={content.founder?.badge || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          founder: { ...content.founder, badge: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Tag Text (e.g. Founder Message)
                    </label>
                    <input
                      type="text"
                      value={content.founder?.tag || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          founder: { ...content.founder, tag: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Founder Quote
                  </label>
                  <textarea
                    rows={3}
                    value={content.founder?.quote || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        founder: { ...content.founder, quote: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Founder Name
                    </label>
                    <input
                      type="text"
                      value={content.founder?.name || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          founder: { ...content.founder, name: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Founder Role
                    </label>
                    <input
                      type="text"
                      value={content.founder?.role || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          founder: { ...content.founder, role: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Stats Dock */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                  4. Key Statistics Dock
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((n) => {
                    const numKey = `stat${n}Number` as keyof typeof content.stats;
                    const labelKey = `stat${n}Label` as keyof typeof content.stats;
                    return (
                      <div key={n} className="p-3 bg-[#F9F9F9] rounded-lg border border-gray-200">
                        <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                          Stat {n} Number
                        </label>
                        <input
                          type="text"
                          value={content.stats?.[numKey] || ''}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              stats: { ...content.stats, [numKey]: e.target.value },
                            })
                          }
                          className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded mb-2 bg-white"
                        />
                        <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                          Stat {n} Label
                        </label>
                        <input
                          type="text"
                          value={content.stats?.[labelKey] || ''}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              stats: { ...content.stats, [labelKey]: e.target.value },
                            })
                          }
                          className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded bg-white"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 5. How It Works */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                  5. How It Works Section & Testimonial
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={content.howItWorks?.subtitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          howItWorks: { ...content.howItWorks, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={content.howItWorks?.heading || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          howItWorks: { ...content.howItWorks, heading: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={content.howItWorks?.description || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        howItWorks: { ...content.howItWorks, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {[1, 2, 3].map((s) => {
                    const descKey = `step${s}Desc` as keyof typeof content.howItWorks;
                    return (
                      <div key={s} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                          Step 0{s} Description
                        </label>
                        <textarea
                          rows={2}
                          value={content.howItWorks?.[descKey] || ''}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              howItWorks: { ...content.howItWorks, [descKey]: e.target.value },
                            })
                          }
                          className="w-full px-2.5 py-1.5 text-xs border border-gray-300 rounded bg-white"
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Testimonial Quote
                    </label>
                    <textarea
                      rows={2}
                      value={content.howItWorks?.testimonialQuote || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          howItWorks: { ...content.howItWorks, testimonialQuote: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Testimonial Author
                    </label>
                    <input
                      type="text"
                      value={content.howItWorks?.testimonialAuthor || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          howItWorks: { ...content.howItWorks, testimonialAuthor: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* 6. Why Choose Us */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                  6. Why Choose Us & Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Section Subtitle
                    </label>
                    <input
                      type="text"
                      value={content.whyChooseUs?.subtitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          whyChooseUs: { ...content.whyChooseUs, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={content.whyChooseUs?.heading || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          whyChooseUs: { ...content.whyChooseUs, heading: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={content.whyChooseUs?.description || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        whyChooseUs: { ...content.whyChooseUs, description: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Metric 1 Percentage (e.g. 35%)
                    </label>
                    <input
                      type="text"
                      value={content.whyChooseUs?.metric1Percent || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          whyChooseUs: { ...content.whyChooseUs, metric1Percent: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg mb-2 bg-white"
                    />
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Metric 1 Title
                    </label>
                    <input
                      type="text"
                      value={content.whyChooseUs?.metric1Title || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          whyChooseUs: { ...content.whyChooseUs, metric1Title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg mb-2 bg-white"
                    />
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Metric 1 Description
                    </label>
                    <textarea
                      rows={2}
                      value={content.whyChooseUs?.metric1Desc || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          whyChooseUs: { ...content.whyChooseUs, metric1Desc: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Metric 2 Percentage (e.g. 100%)
                    </label>
                    <input
                      type="text"
                      value={content.whyChooseUs?.metric2Percent || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          whyChooseUs: { ...content.whyChooseUs, metric2Percent: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg mb-2 bg-white"
                    />
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Metric 2 Title
                    </label>
                    <input
                      type="text"
                      value={content.whyChooseUs?.metric2Title || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          whyChooseUs: { ...content.whyChooseUs, metric2Title: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg mb-2 bg-white"
                    />
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Metric 2 Description
                    </label>
                    <textarea
                      rows={2}
                      value={content.whyChooseUs?.metric2Desc || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          whyChooseUs: { ...content.whyChooseUs, metric2Desc: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                  </div>
                </div>
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
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Email Address
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
                  />
                </div>
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
                ></textarea>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 4. HOUSE DETAIL PAGES EDITOR */}
          {/* ============================================================ */}
          {slug !== 'home' && slug !== 'about' && slug !== 'contact' && (
            <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-[#041614] border-b border-gray-100 pb-2">
                House Overview & Offerings
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Division Tagline / Badge
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
                    Main Title
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
                  Description Paragraph
                </label>
                <textarea
                  rows={3}
                  value={content.details?.description || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      details: { ...content.details, description: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                ></textarea>
              </div>

              {/* Checklist Items */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  {content.details?.checklistTitle || 'Checklist Items'}
                </label>
                <div className="space-y-2">
                  {content.details?.checklists?.map((item: string, idx: number) => (
                    <input
                      key={idx}
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
                      className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg"
                    />
                  ))}
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
              {saving ? 'Saving to Database...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

