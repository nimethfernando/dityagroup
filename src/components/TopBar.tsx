'use client';

import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { FaYoutube, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function TopBar() {
  return (
    <div className="bg-white border-b border-gray-100 text-xs text-gray-600 hidden md:block">
      <div className="max-w-[1140px] mx-auto px-4 py-2.5 flex flex-wrap justify-between items-center gap-4">
        {/* Contact Info Left */}
        <div className="flex items-center space-x-6">
          <a
            href="mailto:groupditya@gmail.com"
            className="flex items-center space-x-2 hover:text-[#FF5722] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#FF5722]" />
            <span>groupditya@gmail.com</span>
          </a>
          <span className="flex items-center space-x-2 text-gray-500">
            <MapPin className="w-4 h-4 text-[#FF5722]" />
            <span>3rd floor, 261, Adarsh Nagar, Jaipur, Rajasthan</span>
          </span>
        </div>

        {/* Social Icons Right */}
        <div className="flex items-center space-x-4">
          <a
            href="https://www.youtube.com/@DityaGroup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-[#FF5722] transition-colors"
            aria-label="YouTube"
          >
            <FaYoutube className="w-4 h-4" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61579723378713"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-[#FF5722] transition-colors"
            aria-label="Facebook"
          >
            <FaFacebookF className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.instagram.com/dityagroup/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-[#FF5722] transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram className="w-4 h-4" />
          </a>
          <a
            href="https://x.com/dityadivinecode"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-[#FF5722] transition-colors"
            aria-label="X (Twitter)"
          >
            <FaXTwitter className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
