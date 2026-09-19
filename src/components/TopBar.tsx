'use client';

import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { FaYoutube, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function TopBar() {
  return (
    <div className="bg-[#020D0C] border-b border-white/5 text-xs text-gray-300 hidden md:block select-none">
      <div className="max-w-[1140px] mx-auto px-4 py-2 flex flex-wrap justify-between items-center gap-4">
        {/* Contact Info Left */}
        <div className="flex items-center space-x-6">
          <a
            href="mailto:groupditya@gmail.com"
            className="flex items-center space-x-2 text-gray-300 hover:text-[#10B981] transition-colors font-medium group"
          >
            <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#10B981]/20 transition-colors">
              <Mail className="w-3 h-3 text-[#10B981]" />
            </span>
            <span>groupditya@gmail.com</span>
          </a>
          <span className="flex items-center space-x-2 text-gray-400">
            <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
              <MapPin className="w-3 h-3 text-[#10B981]" />
            </span>
            <span>3rd floor, 261, Adarsh Nagar, Jaipur, Rajasthan</span>
          </span>
        </div>

        {/* Social Icons Right */}
        <div className="flex items-center space-x-2.5">
          <a
            href="https://www.youtube.com/@DityaGroup"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-[#059669] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200"
            aria-label="YouTube"
          >
            <FaYoutube className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61579723378713"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-[#059669] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200"
            aria-label="Facebook"
          >
            <FaFacebookF className="w-3 h-3" />
          </a>
          <a
            href="https://www.instagram.com/dityagroup/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-[#059669] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200"
            aria-label="Instagram"
          >
            <FaInstagram className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://x.com/dityadivinecode"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-[#059669] text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200"
            aria-label="X (Twitter)"
          >
            <FaXTwitter className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
