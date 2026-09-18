'use client';

import React, { useState, useEffect } from 'react';
import { KeyRound, X, AlertCircle, CheckCircle2, Eye, EyeOff, Mail, ShieldCheck, Loader2 } from 'lucide-react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [activeTab, setActiveTab] = useState<'current' | 'otp' | 'email'>('current');
  const [adminEmail, setAdminEmail] = useState('groupditya@gmail.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);

  // Email update state
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [emailUpdatePassword, setEmailUpdatePassword] = useState('');

  // OTP flow
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/admin/profile')
        .then((res) => res.json())
        .then((data) => {
          if (data?.data?.adminEmail) {
            setAdminEmail(data.data.adminEmail);
            setNewAdminEmail(data.data.adminEmail);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendOtp = async () => {
    setSendingOtp(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpSent(true);
      } else {
        setError(data.message || 'Failed to dispatch OTP code.');
      }
    } catch {
      setError('Network error while requesting verification OTP.');
    } finally {
      setSendingOtp(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    setLoading(true);
    try {
      const payload =
        activeTab === 'otp'
          ? { otp: otp.trim(), newPassword }
          : { currentPassword, newPassword };

      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess('Administrator password updated successfully!');
        setTimeout(() => {
          setSuccess(null);
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setOtp('');
          setOtpSent(false);
          onClose();
        }, 1800);
      } else {
        setError(data.message || 'Failed to update administrator password.');
      }
    } catch {
      setError('Network error while saving password.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const clean = newAdminEmail.trim().toLowerCase();
    if (!clean.endsWith('@gmail.com') && !clean.endsWith('@googlemail.com')) {
      setError('Admin email must be a valid @gmail.com address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newEmail: clean, password: emailUpdatePassword }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setAdminEmail(clean);
        setSuccess(`Admin Gmail updated to ${clean}!`);
        setTimeout(() => {
          setSuccess(null);
          setEmailUpdatePassword('');
          onClose();
        }, 2000);
      } else {
        setError(data.message || 'Failed to update administrator email.');
      }
    } catch {
      setError('Network error while updating admin email.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError(null);
      setSuccess(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#011633] border border-white/15 rounded-asymmetric p-6 sm:p-8 shadow-2xl text-white">
        <button
          onClick={handleClose}
          disabled={loading}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#FF5722]/20 border border-[#FF5722]/40 flex items-center justify-center text-[#FF5722]">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Admin Security Settings</h2>
            <p className="text-xs text-gray-400">Current Login: {adminEmail}</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/10 mb-5 overflow-x-auto">
          <button
            type="button"
            onClick={() => {
              setActiveTab('current');
              setError(null);
            }}
            className={`pb-2.5 px-3 text-xs font-bold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'current'
                ? 'border-[#FF5722] text-[#FF5722]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Current Password
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('otp');
              setError(null);
            }}
            className={`pb-2.5 px-3 text-xs font-bold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'otp'
                ? 'border-[#FF5722] text-[#FF5722]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Gmail OTP
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('email');
              setError(null);
            }}
            className={`pb-2.5 px-3 text-xs font-bold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
              activeTab === 'email'
                ? 'border-[#FF5722] text-[#FF5722]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Admin Gmail
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-800/60 text-red-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-green-950/60 border border-green-500/50 flex items-center justify-center text-green-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-semibold text-white">{success}</h3>
            <p className="text-xs text-gray-400">
              Changes have been securely applied to your administrator credentials in MariaDB.
            </p>
          </div>
        ) : activeTab === 'email' ? (
          <form onSubmit={handleEmailSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Current Admin Gmail</label>
              <div className="p-3 bg-[#001025] rounded-asymmetric border border-white/10 text-gray-400 flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#FF5722]" />
                <span>{adminEmail}</span>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">New Administrator Gmail</label>
              <input
                required
                type="email"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                placeholder="newadmin@gmail.com"
                className="w-full bg-[#001025] border border-white/20 rounded-asymmetric p-3 text-white placeholder-gray-500 focus:border-[#FF5722] outline-none text-xs"
              />
              <p className="text-[11px] text-gray-400 mt-1">Must be a valid @gmail.com address.</p>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Confirm Admin Password</label>
              <input
                required
                type="password"
                value={emailUpdatePassword}
                onChange={(e) => setEmailUpdatePassword(e.target.value)}
                placeholder="Enter password to authorize change"
                className="w-full bg-[#001025] border border-white/20 rounded-asymmetric p-3 text-white placeholder-gray-500 focus:border-[#FF5722] outline-none text-xs"
              />
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="w-1/2 py-3 bg-white/10 hover:bg-white/15 text-gray-300 rounded-asymmetric font-semibold transition-colors text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 py-3 btn-ditya-orange font-semibold transition-all text-xs shadow-md disabled:opacity-50 flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Update Gmail</span>
                )}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
            {activeTab === 'current' ? (
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Current Password</label>
                <input
                  required
                  type={showPasswords ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full bg-[#001025] border border-white/20 rounded-asymmetric p-3 text-white placeholder-gray-500 focus:border-[#FF5722] outline-none text-xs"
                />
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-gray-300 font-semibold">
                    6-Digit Gmail OTP Code
                  </label>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={sendingOtp}
                    className="text-[11px] text-[#FF5722] hover:underline font-bold cursor-pointer"
                  >
                    {sendingOtp ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send Code to Gmail'}
                  </button>
                </div>
                <input
                  required
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder={`Code sent to ${adminEmail}`}
                  className="w-full bg-[#001025] border border-white/20 rounded-asymmetric p-3 text-center tracking-widest text-base font-bold text-white placeholder-gray-500 focus:border-[#FF5722] outline-none"
                />
                {otpSent && (
                  <p className="text-[11px] text-green-400 mt-1 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>OTP dispatched to {adminEmail}!</span>
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-gray-300 font-semibold mb-1">New Password</label>
              <input
                required
                type={showPasswords ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-[#001025] border border-white/20 rounded-asymmetric p-3 text-white placeholder-gray-500 focus:border-[#FF5722] outline-none text-xs"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Confirm New Password</label>
              <input
                required
                type={showPasswords ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full bg-[#001025] border border-white/20 rounded-asymmetric p-3 text-white placeholder-gray-500 focus:border-[#FF5722] outline-none text-xs"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setShowPasswords((prev) => !prev)}
                className="text-[11px] text-gray-400 hover:text-gray-200 flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                {showPasswords ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPasswords ? 'Hide passwords' : 'Show passwords'}</span>
              </button>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="w-1/2 py-3 bg-white/10 hover:bg-white/15 text-gray-300 rounded-asymmetric font-semibold transition-colors text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-1/2 py-3 btn-ditya-orange font-semibold transition-all text-xs shadow-md disabled:opacity-50 flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Update Password</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
