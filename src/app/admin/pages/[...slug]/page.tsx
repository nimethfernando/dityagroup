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
  Trash2,
  Eye,
  EyeOff,
  Plus,
  Share2,
  Globe,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Upload,
  Image as ImageIcon,
  Sliders,
} from 'lucide-react';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaQuora,
  FaTumblr,
  FaMedium,
  FaBloggerB,
  FaWhatsapp,
  FaPinterestP,
  FaThreads,
  FaFlipboard,
  FaTelegram,
  FaXTwitter,
  FaLinkedinIn,
  FaLink,
} from 'react-icons/fa6';
import { IconType } from 'react-icons';
import { SocialLinkItem, PAGE_DEFINITIONS, DEFAULT_PAGE_CONTENTS } from '@/lib/defaultPageContent';

const ADMIN_ICON_MAP: Record<string, IconType> = {
  facebook: FaFacebookF,
  FaFacebookF: FaFacebookF,
  instagram: FaInstagram,
  FaInstagram: FaInstagram,
  youtube: FaYoutube,
  FaYoutube: FaYoutube,
  quora: FaQuora,
  FaQuora: FaQuora,
  tumblr: FaTumblr,
  FaTumblr: FaTumblr,
  medium: FaMedium,
  FaMedium: FaMedium,
  x: FaXTwitter,
  twitter: FaXTwitter,
  FaXTwitter: FaXTwitter,
  blogger: FaBloggerB,
  FaBloggerB: FaBloggerB,
  whatsapp: FaWhatsapp,
  FaWhatsapp: FaWhatsapp,
  pinterest: FaPinterestP,
  FaPinterestP: FaPinterestP,
  threads: FaThreads,
  FaThreads: FaThreads,
  flipboard: FaFlipboard,
  FaFlipboard: FaFlipboard,
  telegram: FaTelegram,
  FaTelegram: FaTelegram,
  linkedin: FaLinkedinIn,
  FaLinkedinIn: FaLinkedinIn,
};

function getAdminSocialIcon(item: { id?: string; icon?: string }): IconType {
  if (item.icon && ADMIN_ICON_MAP[item.icon]) return ADMIN_ICON_MAP[item.icon];
  if (item.id && ADMIN_ICON_MAP[item.id.toLowerCase()]) return ADMIN_ICON_MAP[item.id.toLowerCase()];
  return FaLink;
}

interface PageEditorProps {
  params: Promise<{ slug: string[] | string }>;
}

export default function PageEditor({ params }: PageEditorProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug.join('/') : (resolvedParams.slug || '');

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
      setStatusMsg(null);
      try {
        const cleanSlug = encodeURIComponent(slug).replace(/%2F/g, '/');
        const res = await fetch(`/api/admin/pages/${cleanSlug}`, {
          cache: 'no-store',
        });

        if (res.status === 401) {
          router.push(`/admin/login?redirect=/admin/pages/${cleanSlug}`);
          return;
        }

        const data = await res.json();
        if (res.ok && data.success && data.data?.content) {
          setPageMeta({
            title: data.data.title,
            path: data.data.path,
            category: data.data.category,
            isCustomPage: data.data.isCustomPage,
            isCustomized: data.data.isCustomized,
          });
          setContent(data.data.content);
        } else {
          // If API query failed (e.g. database latency), check if we have local default fallback
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const fallback = (DEFAULT_PAGE_CONTENTS as Record<string, any>)[slug];
          const pageDef = PAGE_DEFINITIONS.find((p) => p.slug === slug);
          if (fallback) {
            setPageMeta({
              title: pageDef?.title || slug,
              path: pageDef?.path || `/${slug}`,
              category: pageDef?.category || 'Core Pages',
              isCustomPage: false,
              isCustomized: false,
            });
            setContent(fallback);
            setStatusMsg({
              type: 'error',
              text: data.message
                ? `${data.message} - Displaying default baseline. You can make edits and save.`
                : 'Displaying baseline default content. You can make edits and save.',
            });
          } else {
            setStatusMsg({ type: 'error', text: data.message || 'Failed to load page content' });
          }
        }
      } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fallback = (DEFAULT_PAGE_CONTENTS as Record<string, any>)[slug];
        const pageDef = PAGE_DEFINITIONS.find((p) => p.slug === slug);
        if (fallback) {
          setPageMeta({
            title: pageDef?.title || slug,
            path: pageDef?.path || `/${slug}`,
            category: pageDef?.category || 'Core Pages',
            isCustomPage: false,
            isCustomized: false,
          });
          setContent(fallback);
          setStatusMsg({
            type: 'error',
            text: 'Network issue contacting database. Displaying default baseline content.',
          });
        } else {
          setStatusMsg({
            type: 'error',
            text: 'Network error while loading content. Please check your connection.',
          });
        }
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug, router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    try {
      const cleanSlug = encodeURIComponent(slug).replace(/%2F/g, '/');
      const res = await fetch(`/api/admin/pages/${cleanSlug}`, {
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
      : 'Are you sure you want to reset this page back to default content?';

    if (!confirm(confirmMsg)) return;

    setSaving(true);
    try {
      const cleanSlug = encodeURIComponent(slug).replace(/%2F/g, '/');
      const res = await fetch(`/api/admin/pages/${cleanSlug}`, { method: 'DELETE' });
      if (res.ok) {
        if (isCustom) {
          router.push('/admin/pages');
        } else {
          router.refresh();
          window.location.reload();
        }
      } else {
        alert('Action failed. Please try again.');
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
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <p className="text-base font-bold text-gray-800">
            {statusMsg?.text || 'Unable to load page content.'}
          </p>
          <p className="text-xs text-gray-500 mt-1 mb-6">
            The requested page slug was &quot;{slug}&quot;.
          </p>
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="btn-ditya-orange text-xs py-2 px-4 font-bold flex items-center space-x-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
            <Link
              href="/admin/pages"
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-asymmetric text-xs font-semibold hover:bg-gray-50"
            >
              Back to Pages
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isHouseOrCustom =
    slug !== 'home' &&
    slug !== 'about' &&
    slug !== 'contact' &&
    slug !== 'services' &&
    slug !== 'privacy-policy' &&
    slug !== 'terms-and-conditions' &&
    slug !== 'global-business-network' &&
    slug !== 'footer';

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
                ></textarea>
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
                    value={content.content ? content.content['section' + num + 'Title'] || '' : ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        content: {
                          ...content.content,
                          ['section' + num + 'Title']: e.target.value,
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
                    value={content.content ? content.content['section' + num + 'Text'] || '' : ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        content: {
                          ...content.content,
                          ['section' + num + 'Text']: e.target.value,
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
                  rows={4}
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

              {/* Overview Services Box */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/80 space-y-3">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Overview Services Section
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Overview Heading
                  </label>
                  <input
                    type="text"
                    value={content.details?.overviewHeading || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        details: { ...content.details, overviewHeading: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Overview Description
                  </label>
                  <textarea
                    rows={2}
                    value={content.details?.overviewDescription || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        details: { ...content.details, overviewDescription: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                  ></textarea>
                </div>
              </div>

              {/* Dual Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase block">Card 1 (Growth)</span>
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
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
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
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                  ></textarea>
                </div>

                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase block">Card 2 (Time)</span>
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
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
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
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                  ></textarea>
                </div>
              </div>

              {/* Checklist Items */}
              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-gray-700 uppercase">
                    Checklist Title
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...(content.details?.checklists || []), ''];
                      setContent({
                        ...content,
                        details: { ...content.details, checklists: updated },
                      });
                    }}
                    className="text-xs text-[#059669] font-semibold hover:underline cursor-pointer"
                  >
                    + Add Item
                  </button>
                </div>
                <input
                  type="text"
                  value={content.details?.checklistTitle || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      details: { ...content.details, checklistTitle: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg mb-2"
                />
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
                        className="w-full px-3 py-1.5 text-xs border border-gray-300 rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = content.details.checklists.filter((_: string, i: number) => i !== idx);
                          setContent({
                            ...content,
                            details: { ...content.details, checklists: updated },
                          });
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded"
                        title="Remove Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action Box */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200/80 space-y-3">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Bottom Call to Action
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      CTA Title
                    </label>
                    <input
                      type="text"
                      value={content.details?.ctaTitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          details: { ...content.details, ctaTitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Button Text
                    </label>
                    <input
                      type="text"
                      value={content.details?.ctaBtnText || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          details: { ...content.details, ctaBtnText: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    CTA Description
                  </label>
                  <textarea
                    rows={2}
                    value={content.details?.ctaDesc || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        details: { ...content.details, ctaDesc: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg bg-white"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 5. GLOBAL BUSINESS NETWORK (GBN) CMS EDITOR */}
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

          {/* ============================================================ */}
          {/* 6. FOOTER & SOCIAL MEDIA COMMAND CENTER */}
          {/* ============================================================ */}
          {slug === 'footer' && (
            <div className="space-y-8">
              {/* Section A: Banner Info */}
              <div className="bg-gradient-to-r from-[#020D0C] via-[#041614] to-[#0D2622] text-white p-6 sm:p-8 rounded-asymmetric border border-emerald-500/20 shadow-md">
                <div className="flex items-center space-x-2 text-[#10B981] text-xs font-bold uppercase tracking-wider mb-2">
                  <Share2 className="w-4 h-4" />
                  <span>Global Footer & Social Hub</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Footer & Social Media Management
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
                  Customize the brand words and paragraphs displayed in the footer, manage each social media platform button (toggle to hide or unhide on the site, update links), and configure contact info and newsletter copy.
                </p>
              </div>

              {/* Section B: Social Media Buttons (Show / Hide & Update Links) */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Share2 className="w-5 h-5 text-[#059669]" />
                      <h3 className="text-lg font-bold text-[#041614]">
                        Social Media Buttons (Hide/Unhide & Change Links)
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Toggle the visibility of any button with 1 click to show or hide it from the public website, or update its destination URL.
                    </p>
                  </div>

                  <div className="flex items-center flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (content.socialLinks || []).map((s: SocialLinkItem) => ({ ...s, enabled: true }));
                        setContent({ ...content, socialLinks: updated });
                      }}
                      className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold rounded-lg transition-colors border border-emerald-200 cursor-pointer flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Unhide All</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (content.socialLinks || []).map((s: SocialLinkItem) => ({ ...s, enabled: false }));
                        setContent({ ...content, socialLinks: updated });
                      }}
                      className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold rounded-lg transition-colors border border-red-200 cursor-pointer flex items-center space-x-1"
                    >
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide All</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const newLink: SocialLinkItem = {
                          id: 'custom-' + Date.now(),
                          label: 'New Platform',
                          href: 'https://',
                          enabled: true,
                          icon: 'FaGlobe',
                        };
                        setContent({
                          ...content,
                          socialLinks: [...(content.socialLinks || []), newLink],
                        });
                      }}
                      className="btn-ditya-orange text-xs py-1.5 px-3 font-bold flex items-center space-x-1 shadow-sm cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Custom Button</span>
                    </button>
                  </div>
                </div>

                {/* Social Buttons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(content.socialLinks || []).map((link: SocialLinkItem, idx: number) => {
                    const IconComp = getAdminSocialIcon(link);
                    const isEnabled = link.enabled !== false;

                    return (
                      <div
                        key={link.id || idx}
                        className={`p-4 rounded-xl border transition-all ${
                          isEnabled
                            ? 'bg-white border-gray-200 shadow-xs hover:border-[#10B981]'
                            : 'bg-gray-50/80 border-dashed border-gray-300 opacity-75'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm shadow-xs transition-colors ${
                                isEnabled
                                  ? 'bg-[#041614] text-white'
                                  : 'bg-gray-200 text-gray-500'
                              }`}
                            >
                              <IconComp className="w-4 h-4" />
                            </div>
                            <div>
                              <input
                                type="text"
                                value={link.label}
                                onChange={(e) => {
                                  const updated = [...(content.socialLinks || [])];
                                  updated[idx] = { ...updated[idx], label: e.target.value };
                                  setContent({ ...content, socialLinks: updated });
                                }}
                                className="font-bold text-xs text-[#041614] bg-transparent border-b border-transparent hover:border-gray-300 focus:border-[#059669] focus:outline-none px-1"
                                placeholder="Platform Name"
                              />
                              <span className="block text-[10px] text-gray-400 font-mono px-1">
                                id: {link.id}
                              </span>
                            </div>
                          </div>

                          {/* Toggle Visibility Switch */}
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...(content.socialLinks || [])];
                                updated[idx] = { ...updated[idx], enabled: !isEnabled };
                                setContent({ ...content, socialLinks: updated });
                              }}
                              className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center space-x-1.5 transition-all cursor-pointer ${
                                isEnabled
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                              }`}
                              title={isEnabled ? 'Click to hide this button from site' : 'Click to show this button on site'}
                            >
                              {isEnabled ? (
                                <>
                                  <Eye className="w-3.5 h-3.5 text-emerald-700" />
                                  <span>Visible</span>
                                </>
                              ) : (
                                <>
                                  <EyeOff className="w-3.5 h-3.5 text-gray-500" />
                                  <span>Hidden</span>
                                </>
                              )}
                            </button>

                            {link.id?.startsWith('custom-') && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = (content.socialLinks || []).filter((_: unknown, i: number) => i !== idx);
                                  setContent({ ...content, socialLinks: updated });
                                }}
                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                title="Delete custom button"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* URL input field */}
                        <div className="flex items-center space-x-2">
                          <div className="relative flex-1">
                            <input
                              type="text"
                              value={link.href}
                              onChange={(e) => {
                                const updated = [...(content.socialLinks || [])];
                                updated[idx] = { ...updated[idx], href: e.target.value };
                                setContent({ ...content, socialLinks: updated });
                              }}
                              placeholder="https://..."
                              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669] font-mono"
                            />
                          </div>
                          {link.href && link.href.startsWith('http') && (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-gray-100 hover:bg-[#059669] hover:text-white text-gray-600 rounded-lg text-xs transition-colors shrink-0"
                              title="Test link in new tab"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section C: Words & Paragraphs */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-6">
                <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-[#059669]" />
                      <h3 className="text-lg font-bold text-[#041614]">
                        Brand Words & Paragraphs
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Customize the brand tagline, primary paragraph, and add as many additional paragraphs or notes as needed.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Tagline */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Brand Tagline / Super-heading
                    </label>
                    <input
                      type="text"
                      value={content.branding?.tagline || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          branding: { ...content.branding, tagline: e.target.value },
                        })
                      }
                      placeholder="e.g. One Group. Infinite Possibilities!"
                      className="w-full px-3 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669] font-semibold text-[#D4AF37]"
                    />
                  </div>

                  {/* Primary Description Paragraph */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Primary Description Paragraph
                    </label>
                    <textarea
                      rows={3}
                      value={content.branding?.description || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          branding: { ...content.branding, description: e.target.value },
                        })
                      }
                      placeholder="Empowering wealth creation, business growth..."
                      className="w-full px-3 py-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-[#059669] leading-relaxed"
                    />
                  </div>

                  {/* Additional Paragraphs */}
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-gray-700 uppercase">
                        Additional Words & Paragraphs ({content.branding?.paragraphs?.length || 0})
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const existing = content.branding?.paragraphs || [];
                          setContent({
                            ...content,
                            branding: {
                              ...content.branding,
                              paragraphs: [...existing, ''],
                            },
                          });
                        }}
                        className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold rounded-lg transition-colors border border-emerald-200 cursor-pointer flex items-center space-x-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Another Paragraph</span>
                      </button>
                    </div>

                    {(content.branding?.paragraphs || []).map((p: string, pIdx: number) => (
                      <div key={pIdx} className="flex items-start space-x-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
                        <span className="text-[11px] font-bold text-gray-400 mt-2">#{pIdx + 1}</span>
                        <textarea
                          rows={2}
                          value={p}
                          onChange={(e) => {
                            const updated = [...(content.branding?.paragraphs || [])];
                            updated[pIdx] = e.target.value;
                            setContent({
                              ...content,
                              branding: {
                                ...content.branding,
                                paragraphs: updated,
                              },
                            });
                          }}
                          placeholder={`Enter additional paragraph or custom text #${pIdx + 1}...`}
                          className="flex-1 px-3 py-2 text-xs border border-gray-300 bg-white rounded-lg focus:outline-none focus:border-[#059669] leading-relaxed"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (content.branding?.paragraphs || []).filter((_: unknown, i: number) => i !== pIdx);
                            setContent({
                              ...content,
                              branding: {
                                ...content.branding,
                                paragraphs: updated,
                              },
                            });
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                          title="Delete paragraph"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section D: Live Preview */}
              <div className="bg-gradient-to-b from-[#031513] via-[#020e0d] to-[#010706] text-white p-6 sm:p-8 rounded-asymmetric border border-emerald-500/30 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#10B981]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Live Public Footer Preview
                    </span>
                  </div>
                  <span className="text-[10px] bg-white/10 text-gray-300 px-2 py-0.5 rounded font-mono">
                    {(content.socialLinks || []).filter((s: SocialLinkItem) => s.enabled !== false && s.href).length} Active Buttons Visible
                  </span>
                </div>

                <div className="space-y-3 max-w-lg">
                  <p className="text-[#D4AF37] font-semibold text-sm tracking-wide">
                    {content.branding?.tagline || 'One Group. Infinite Possibilities!'}
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                    {content.branding?.description || 'Empowering wealth creation...'}
                  </p>
                  {(content.branding?.paragraphs || []).map((p: string, idx: number) =>
                    p ? (
                      <p key={idx} className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                        {p}
                      </p>
                    ) : null
                  )}

                  {/* Active Buttons Preview */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(content.socialLinks || [])
                      .filter((s: SocialLinkItem) => s.enabled !== false && s.href)
                      .map((s: SocialLinkItem, idx: number) => {
                        const IconComp = getAdminSocialIcon(s);
                        return (
                          <div
                            key={idx}
                            title={`${s.label}: ${s.href}`}
                            className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 text-gray-200 flex items-center justify-center text-xs shadow-xs"
                          >
                            <IconComp className="w-3.5 h-3.5" />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Section E: Executive Contact Cards */}
              <div className="bg-white p-6 sm:p-8 rounded-asymmetric border border-gray-200 shadow-sm space-y-6">
                <div className="border-b border-gray-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-[#059669]" />
                    <h3 className="text-lg font-bold text-[#041614]">
                      Contact Cards & Office Addresses
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage the phones, emails, and address locations shown in the top contact docks of the footer.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Phone 1 (India HQ)
                    </label>
                    <input
                      type="text"
                      value={content.contactCards?.phoneIndia || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          contactCards: { ...content.contactCards, phoneIndia: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Phone 2 (Georgia)
                    </label>
                    <input
                      type="text"
                      value={content.contactCards?.phoneGeorgia || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          contactCards: { ...content.contactCards, phoneGeorgia: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Phone Working Hours
                    </label>
                    <input
                      type="text"
                      value={content.contactCards?.phoneHours || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          contactCards: { ...content.contactCards, phoneHours: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Corporate Email
                    </label>
                    <input
                      type="text"
                      value={content.contactCards?.emailCorporate || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          contactCards: { ...content.contactCards, emailCorporate: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      India Office Address
                    </label>
                    <input
                      type="text"
                      value={content.contactCards?.officeIndiaAddress || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          contactCards: { ...content.contactCards, officeIndiaAddress: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* 7. HEADER, BRAND LOGO & CONSULTATION BUTTON COMMAND CENTER */}
          {/* ============================================================ */}
          {slug === 'header' && (
            <div className="space-y-8">
              {/* Banner Card */}
              <div className="bg-gradient-to-r from-[#020D0C] via-[#041614] to-[#0D2622] text-white p-6 sm:p-8 rounded-asymmetric border border-emerald-500/20 shadow-md">
                <div className="flex items-center space-x-2 text-[#10B981] text-xs font-bold uppercase tracking-wider mb-2">
                  <Sliders className="w-4 h-4" />
                  <span>Header, Brand & Navigation Settings</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Header, Logo & Consultation Button
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
                  Upload or change your brand logo (for both Light Mode and Dark Mode) and manage the Consultation button (toggle to hide or unhide, customize button label, and configure click action).
                </p>
              </div>

              {/* SECTION A: LOGO PROVISION */}
              <div className="bg-white rounded-asymmetric p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
                <div className="flex items-center space-x-2 text-[#059669] text-xs font-bold uppercase tracking-wider pb-3 border-b border-gray-100">
                  <ImageIcon className="w-4 h-4" />
                  <span>Brand Logo Provision (Self-Service Customization)</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Light Mode Logo */}
                  <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/60 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        1. Light Mode Brand Logo
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setContent({
                            ...content,
                            logo: { ...(content.logo || {}), lightLogoUrl: '/images/logo.png' },
                          })
                        }
                        className="text-[11px] text-gray-500 hover:text-[#059669] font-semibold underline cursor-pointer"
                      >
                        Reset to Default
                      </button>
                    </div>

                    {/* Preview Box */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-center min-h-[90px] shadow-inner">
                      {content.logo?.lightLogoUrl ? (
                        <img
                          src={content.logo.lightLogoUrl}
                          alt="Light Mode Logo Preview"
                          className="max-h-12 max-w-full object-contain"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No logo set</span>
                      )}
                    </div>

                    {/* File Upload Button */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Upload Logo File (PNG, SVG, JPG, WebP)
                      </label>
                      <label className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-white border border-gray-300 hover:border-[#059669] hover:bg-emerald-50/30 rounded-xl text-xs font-semibold text-gray-700 cursor-pointer transition-colors shadow-xs">
                        <Upload className="w-4 h-4 text-[#059669]" />
                        <span>Choose Logo File to Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 2 * 1024 * 1024) {
                                alert('File size exceeds 2MB limit.');
                                return;
                              }
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                const dataUrl = ev.target?.result as string;
                                if (dataUrl) {
                                  setContent({
                                    ...content,
                                    logo: { ...(content.logo || {}), lightLogoUrl: dataUrl },
                                  });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Upload an image directly from your computer. It is stored permanently in your database.
                      </p>
                    </div>

                    {/* Or URL Input */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Or Image URL / Path
                      </label>
                      <input
                        type="text"
                        value={content.logo?.lightLogoUrl || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            logo: { ...(content.logo || {}), lightLogoUrl: e.target.value },
                          })
                        }
                        placeholder="/images/logo.png or https://..."
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#059669] outline-none"
                      />
                    </div>
                  </div>

                  {/* Dark Mode Logo */}
                  <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/60 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        2. Dark Mode Brand Logo (Header & Footer)
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setContent({
                            ...content,
                            logo: { ...(content.logo || {}), darkLogoUrl: '/images/logo-white.png' },
                          })
                        }
                        className="text-[11px] text-gray-500 hover:text-[#059669] font-semibold underline cursor-pointer"
                      >
                        Reset to Default
                      </button>
                    </div>

                    {/* Preview Box on Dark Background */}
                    <div className="bg-[#020D0C] p-4 rounded-xl border border-white/10 flex items-center justify-center min-h-[90px] shadow-inner">
                      {content.logo?.darkLogoUrl ? (
                        <img
                          src={content.logo.darkLogoUrl}
                          alt="Dark Mode Logo Preview"
                          className="max-h-12 max-w-full object-contain"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">No dark logo set</span>
                      )}
                    </div>

                    {/* File Upload Button */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Upload Dark Logo File (White / Light text)
                      </label>
                      <label className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-white border border-gray-300 hover:border-[#059669] hover:bg-emerald-50/30 rounded-xl text-xs font-semibold text-gray-700 cursor-pointer transition-colors shadow-xs">
                        <Upload className="w-4 h-4 text-[#059669]" />
                        <span>Choose Dark Logo File to Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 2 * 1024 * 1024) {
                                alert('File size exceeds 2MB limit.');
                                return;
                              }
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                const dataUrl = ev.target?.result as string;
                                if (dataUrl) {
                                  setContent({
                                    ...content,
                                    logo: { ...(content.logo || {}), darkLogoUrl: dataUrl },
                                  });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Best with a transparent background and white/light lettering.
                      </p>
                    </div>

                    {/* Or URL Input */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Or Image URL / Path
                      </label>
                      <input
                        type="text"
                        value={content.logo?.darkLogoUrl || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            logo: { ...(content.logo || {}), darkLogoUrl: e.target.value },
                          })
                        }
                        placeholder="/images/logo-white.png or https://..."
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:border-[#059669] outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Logo Alt Text */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Brand Alt Text / Accessibility Title
                  </label>
                  <input
                    type="text"
                    value={content.logo?.altText || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        logo: { ...(content.logo || {}), altText: e.target.value },
                      })
                    }
                    placeholder="Ditya Group"
                    className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:border-[#059669] outline-none max-w-md"
                  />
                </div>
              </div>

              {/* SECTION B: CONSULTATION BUTTON CONTROLS */}
              <div className="bg-white rounded-asymmetric p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
                <div className="flex items-center space-x-2 text-[#059669] text-xs font-bold uppercase tracking-wider pb-3 border-b border-gray-100">
                  <MessageSquare className="w-4 h-4" />
                  <span>Consultation Button Command & Visibility</span>
                </div>

                {/* Visibility Toggle Card */}
                <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-sm font-bold text-gray-800">
                        Consultation Button Visibility:
                      </span>
                      {content.consultationButton?.enabled !== false ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Visible on Website
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Hidden from Website
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      Toggle this switch to instantly show or hide the Consultation CTA button across both Desktop and Mobile headers.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const currentVal = content.consultationButton?.enabled !== false;
                      setContent({
                        ...content,
                        consultationButton: {
                          ...(content.consultationButton || {}),
                          enabled: !currentVal,
                        },
                      });
                    }}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer shadow-xs ${
                      content.consultationButton?.enabled !== false
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                  >
                    {content.consultationButton?.enabled !== false ? (
                      <>
                        <Eye className="w-4 h-4" />
                        <span>Visible (Click to Hide)</span>
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-4 h-4" />
                        <span>Hidden (Click to Unhide)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Text and Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Desktop Button Text
                    </label>
                    <input
                      type="text"
                      value={content.consultationButton?.text || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          consultationButton: {
                            ...(content.consultationButton || {}),
                            text: e.target.value,
                          },
                        })
                      }
                      placeholder="Free Consultation"
                      className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:border-[#059669] outline-none"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">Displayed in desktop header navigation.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Mobile Button Text
                    </label>
                    <input
                      type="text"
                      value={content.consultationButton?.mobileText || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          consultationButton: {
                            ...(content.consultationButton || {}),
                            mobileText: e.target.value,
                          },
                        })
                      }
                      placeholder="Consultation"
                      className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:border-[#059669] outline-none"
                    />
                    <p className="text-[11px] text-gray-400 mt-1">Compact label shown on mobile screens.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Button Click Action
                    </label>
                    <select
                      value={content.consultationButton?.actionType || 'modal'}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          consultationButton: {
                            ...(content.consultationButton || {}),
                            actionType: e.target.value as 'modal' | 'link',
                          },
                        })
                      }
                      className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:border-[#059669] outline-none bg-white font-medium"
                    >
                      <option value="modal">Open Consultation Popup Form (Interactive lead capture modal)</option>
                      <option value="link">Redirect to Custom URL / Page</option>
                    </select>
                  </div>

                  {content.consultationButton?.actionType === 'link' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Custom Destination Link
                      </label>
                      <input
                        type="text"
                        value={content.consultationButton?.customLink || ''}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            consultationButton: {
                              ...(content.consultationButton || {}),
                              customLink: e.target.value,
                            },
                          })
                        }
                        placeholder="/contact-us or https://wa.me/..."
                        className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:border-[#059669] outline-none font-mono"
                      />
                    </div>
                  )}
                </div>

                {/* Section C: Live Simulation Preview */}
                <div className="pt-4 border-t border-gray-100">
                  <span className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                    Live Navbar Preview
                  </span>
                  <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {content.logo?.lightLogoUrl ? (
                        <img
                          src={content.logo.lightLogoUrl}
                          alt="Preview"
                          className="h-9 object-contain"
                        />
                      ) : (
                        <span className="font-bold text-gray-800">Ditya Group</span>
                      )}
                    </div>

                    <div className="hidden sm:flex items-center space-x-3 text-xs text-gray-500">
                      <span>Home</span>
                      <span>About</span>
                      <span>Services</span>
                      <span>Blog</span>
                      <span>Contact</span>
                    </div>

                    <div>
                      {content.consultationButton?.enabled !== false ? (
                        <button
                          type="button"
                          className="btn-ditya-orange text-xs py-2 px-4 font-semibold shadow-xs"
                        >
                          {content.consultationButton?.text || 'Free Consultation'}
                        </button>
                      ) : (
                        <span className="px-3 py-1 rounded bg-gray-100 text-gray-400 text-xs font-medium border border-dashed border-gray-300">
                          Button Hidden
                        </span>
                      )}
                    </div>
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
              {saving ? 'Saving to Database...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

