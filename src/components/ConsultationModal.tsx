'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  serviceTitle,
}: ConsultationModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: serviceTitle || 'General Consultation',
          source: 'Free Consultation Popup',
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        setErrorMsg(data.message || 'Failed to submit inquiry. Please check your fields.');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#041614] text-gray-900 dark:text-white rounded-asymmetric p-8 sm:p-10 shadow-2xl border border-gray-100 dark:border-white/10 transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-[#059669] hover:text-white flex items-center justify-center text-gray-500 dark:text-gray-300 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-[#041614] dark:text-white">
              {t('modal.success_title')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-sm mx-auto">
              {t('modal.success_desc')}
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="mt-4 bg-[#059669] hover:bg-[#047857] text-white px-8 py-3 rounded-asymmetric font-semibold text-sm transition-colors cursor-pointer shadow-md"
            >
              OK
            </button>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#059669] dark:text-[#10B981]">
                Ditya Group
              </span>
              <h3 className="text-2xl font-bold text-[#041614] dark:text-white mt-1">
                {t('modal.title')}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {serviceTitle
                  ? `Inquiring about: ${serviceTitle}`
                  : t('modal.subtitle')}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 flex items-center space-x-2 text-red-700 dark:text-red-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder={t('modal.full_name')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-3.5 border border-gray-300 dark:border-white/15 bg-white dark:bg-[#061F1C] rounded-asymmetric text-sm focus:outline-none focus:border-[#059669] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                />
              </div>

              <div>
                <input
                  type="tel"
                  required
                  placeholder={`${t('modal.phone')} *`}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-5 py-3.5 border border-gray-300 dark:border-white/15 bg-white dark:bg-[#061F1C] rounded-asymmetric text-sm focus:outline-none focus:border-[#059669] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  required
                  placeholder={`${t('modal.email')} *`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-3.5 border border-gray-300 dark:border-white/15 bg-white dark:bg-[#061F1C] rounded-asymmetric text-sm focus:outline-none focus:border-[#059669] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                />
              </div>

              <div>
                <textarea
                  rows={3}
                  placeholder={t('modal.notes')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-3.5 border border-gray-300 dark:border-white/15 bg-white dark:bg-[#061F1C] rounded-asymmetric text-sm focus:outline-none focus:border-[#059669] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#059669] hover:bg-[#047857] text-white py-4 rounded-asymmetric font-semibold text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t('modal.submitting')}</span>
                  </>
                ) : (
                  <span>{t('action.submit')}</span>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
