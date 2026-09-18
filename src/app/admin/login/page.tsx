'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, KeyRound, ArrowRight, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('groupditya@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Forgot password states
  const [showForgot, setShowForgot] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message);
        setTimeout(() => {
          router.push('/admin/inquiries');
        }, 800);
      } else {
        setErrorMsg(data.message || 'Invalid administrator credentials.');
      }
    } catch {
      setErrorMsg('Network error. Failed to connect to authentication server.');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpSent(true);
        setSuccessMsg(data.message);
      } else {
        setErrorMsg(data.message || 'Failed to dispatch verification code.');
      }
    } catch {
      setErrorMsg('Failed to send OTP. Please check your network.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/admin/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp, newPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(data.message);
        setShowForgot(false);
        setOtpSent(false);
        setPassword('');
      } else {
        setErrorMsg(data.message || 'Failed to reset password.');
      }
    } catch {
      setErrorMsg('Reset failed. Please verify code and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#011633] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-asymmetric p-8 sm:p-10 shadow-2xl border border-white/10">
        <div className="text-center mb-8">
          <div className="relative h-12 w-44 mx-auto mb-4">
            <Image
              src="/images/logo.png"
              alt="Ditya Group"
              fill
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-[#011633]">Executive Portal</h2>
          <p className="text-xs text-gray-500 mt-1">Authorized Administrator Access Only</p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {!showForgot ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#011633] uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-asymmetric text-sm focus:outline-none focus:border-[#FF5722]"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-bold text-[#011633] uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgot(true);
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className="text-xs text-[#FF5722] hover:underline font-semibold cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-asymmetric text-sm focus:outline-none focus:border-[#FF5722]"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-ditya-orange text-sm font-semibold flex items-center justify-center space-x-2 shadow-md cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : !otpSent ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <p className="text-xs text-gray-600">
              Enter your admin email to receive a 6-digit one-time verification code via email.
            </p>
            <div>
              <label className="block text-xs font-bold text-[#011633] uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-asymmetric text-sm focus:outline-none focus:border-[#FF5722]"
              />
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-ditya-orange text-xs uppercase tracking-wider"
              >
                {loading ? 'Sending Code...' : 'Send Verification OTP'}
              </button>
              <button
                type="button"
                onClick={() => setShowForgot(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-[#011633]"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#011633] uppercase tracking-wider mb-1.5">
                Enter 6-Digit OTP
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 text-center tracking-widest text-lg font-bold border border-gray-300 rounded-asymmetric focus:outline-none focus:border-[#FF5722]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#011633] uppercase tracking-wider mb-1.5">
                Set New Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                placeholder="Min 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-asymmetric text-sm focus:outline-none focus:border-[#FF5722]"
              />
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-ditya-orange text-xs uppercase tracking-wider"
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-[#011633]"
              >
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
