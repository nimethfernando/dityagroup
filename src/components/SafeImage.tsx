'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

export interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  fallbackSrc?: string;
}

/**
 * SafeImage - Resilient image wrapper that automatically recovers from 404s,
 * missing images, or network failures by seamlessly falling back to a guaranteed
 * default asset. Prevents broken image icons across all blog and content pages.
 */
export default function SafeImage({
  src,
  fallbackSrc = '/images/hero-banner-clean.jpg',
  alt,
  ...rest
}: SafeImageProps) {
  const getValidSrc = (url?: string | null): string => {
    if (!url || typeof url !== 'string' || url.trim() === '') {
      return fallbackSrc;
    }
    return url.trim();
  };

  const [currentSrc, setCurrentSrc] = useState<string>(getValidSrc(src));

  useEffect(() => {
    setCurrentSrc(getValidSrc(src));
  }, [src, fallbackSrc]);

  return (
    <Image
      {...rest}
      src={currentSrc}
      alt={alt || 'Ditya Group Image'}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
      unoptimized={Boolean(currentSrc.startsWith('data:') || currentSrc.startsWith('http'))}
    />
  );
}
