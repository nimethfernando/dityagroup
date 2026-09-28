'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, BookOpen } from 'lucide-react';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Blog segment error caught:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#FBFBFB] dark:bg-[#030F0E] px-4 py-20 text-[#041614] dark:text-gray-100">
      <div className="max-w-lg w-full bg-white dark:bg-[#061A17] p-8 sm:p-10 rounded-3xl border border-gray-200/80 dark:border-white/10 shadow-xl text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-[#059669] dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20 shadow-inner">
          <BookOpen className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-[#041614] dark:text-white">
            Articles Temporarily Refreshing
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Our knowledge archives are updating. You can retry loading or return to the main homepage.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="btn-ditya-orange text-xs py-2.5 px-4 font-bold inline-flex items-center space-x-1.5 cursor-pointer shadow-md"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Articles</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 px-4 py-2.5 rounded-full transition-colors border border-gray-200 dark:border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
