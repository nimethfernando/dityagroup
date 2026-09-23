'use client';

import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, RotateCcw, Check, Sparkles } from 'lucide-react';

export interface ImagePreset {
  label: string;
  url: string;
}

interface AdminImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  description?: string;
  aspectHint?: string;
  presets?: ImagePreset[];
  defaultUrl?: string;
  previewHeight?: string;
}

export default function AdminImageUpload({
  label,
  value,
  onChange,
  description,
  aspectHint,
  presets = [],
  defaultUrl,
  previewHeight = 'h-36 sm:h-44',
}: AdminImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showPresets, setShowPresets] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);

    // 2.5MB validation limit
    if (file.size > 2.5 * 1024 * 1024) {
      setErrorMsg('File is too large. Please select an image under 2.5MB.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        onChange(dataUrl);
      }
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read file. Please try another image.');
    };
    reader.readAsDataURL(file);

    // Reset input so re-selecting same file triggers change
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2.5 p-4 rounded-2xl bg-gray-50/70 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider">
            {label}
          </label>
          {description && <p className="text-[11px] text-gray-500 mt-0.5">{description}</p>}
        </div>

        {defaultUrl && value !== defaultUrl && (
          <button
            type="button"
            onClick={() => onChange(defaultUrl)}
            className="text-[11px] font-semibold text-gray-500 hover:text-[#059669] flex items-center space-x-1 cursor-pointer"
            title="Reset to default image"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Visual Preview Box */}
      <div
        className={`relative w-full ${previewHeight} rounded-xl overflow-hidden border border-gray-200 bg-white flex items-center justify-center shadow-inner group`}
      >
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/hero-banner.jpeg';
              }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 bg-white/95 hover:bg-white text-gray-800 rounded-lg text-xs font-bold shadow-md flex items-center space-x-1 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-[#059669]" />
                <span>Replace</span>
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-md flex items-center space-x-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 p-4 text-center">
            <ImageIcon className="w-8 h-8 mb-1.5 stroke-[1.5]" />
            <span className="text-xs font-semibold text-gray-500">No Image Selected</span>
            <span className="text-[10px] text-gray-400 mt-0.5">Upload a file or enter an image URL below</span>
          </div>
        )}
      </div>

      {errorMsg && (
        <p className="text-[11px] font-semibold text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
          {errorMsg}
        </p>
      )}

      {/* Action Buttons: Upload & Presets */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 min-w-[140px] px-3.5 py-2 bg-white hover:bg-emerald-50 border border-gray-300 hover:border-[#059669] text-gray-700 hover:text-[#059669] rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-xs"
        >
          <Upload className="w-3.5 h-3.5 text-[#059669]" />
          <span>Upload Image File</span>
        </button>

        {presets.length > 0 && (
          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer border ${
              showPresets
                ? 'bg-[#059669] text-white border-[#059669]'
                : 'bg-white hover:bg-gray-100 text-gray-700 border-gray-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Presets ({presets.length})</span>
          </button>
        )}
      </div>

      {/* Preset Library Drawer */}
      {showPresets && presets.length > 0 && (
        <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-xs space-y-2 animate-in fade-in duration-150">
          <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            Choose from Website Media Library:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {presets.map((preset) => {
              const isSelected = value === preset.url;
              return (
                <button
                  key={preset.url}
                  type="button"
                  onClick={() => {
                    onChange(preset.url);
                    setShowPresets(false);
                  }}
                  className={`p-2 rounded-lg border text-left text-xs flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#059669] bg-emerald-50 text-[#059669] font-bold shadow-xs'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-gray-50/50'
                  }`}
                >
                  <span className="truncate">{preset.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#059669] shrink-0 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Direct URL Input */}
      <div>
        <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
          <span>Or Direct URL / Path:</span>
          {aspectHint && <span className="text-[10px] text-gray-400">{aspectHint}</span>}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/images/hero-banner.jpeg or https://..."
          className="w-full px-3 py-1.5 text-xs bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-[#059669] font-mono text-gray-700"
        />
      </div>
    </div>
  );
}

