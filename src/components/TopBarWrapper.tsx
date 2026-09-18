'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import TopBar from './TopBar';

export default function TopBarWrapper() {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return <TopBar />;
}
