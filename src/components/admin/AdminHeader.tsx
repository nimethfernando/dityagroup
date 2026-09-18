'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Inbox,
  FileEdit,
  BookOpen,
  KeyRound,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import ChangePasswordModal from './ChangePasswordModal';

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const navLinks = [
    { title: 'Inquiries & Leads', href: '/admin/inquiries', icon: Inbox },
    { title: 'Edit Pages CMS', href: '/admin/pages', icon: FileEdit },
    { title: 'Articles & Blogs', href: '/admin/blogs', icon: BookOpen },
  ];

  return (
    <>
      <header className="bg-[#011633] text-white py-3.5 px-6 shadow-md border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-[1240px] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand & Badge */}
          <div className="flex items-center space-x-4">
            <div className="relative h-8 w-36">
              <Image
                src="/images/logo-white.png"
                alt="Ditya Group"
                fill
                className="object-contain object-left"
              />
            </div>
            <span className="text-[10px] bg-[#FF5722] text-white px-2 py-0.5 rounded font-extrabold uppercase tracking-wider">
              Admin Portal
            </span>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-asymmetric text-xs font-bold transition-colors ${
                    active
                      ? 'bg-[#FF5722] text-white shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPasswordModalOpen(true)}
              className="p-2 rounded-asymmetric bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-xs flex items-center space-x-1.5 font-medium"
              title="Change Password with OTP or Current Password"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#FF5722]" />
              <span className="hidden md:inline">Change Password</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-asymmetric bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-xs flex items-center space-x-1.5 font-medium"
              title="View Public Site"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">View Site</span>
            </a>

            <button
              onClick={handleLogout}
              className="p-2 rounded-asymmetric bg-[#FF5722] hover:bg-[#e64a19] text-white transition-colors cursor-pointer text-xs flex items-center space-x-1.5 font-bold"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}
