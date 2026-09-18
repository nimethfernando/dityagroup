'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Phone,
  Mail,
  Calendar,
  Trash2,
  CheckCircle,
  Clock,
  LogOut,
  RefreshCw,
  Search,
  Filter,
} from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  service?: string | null;
  message?: string | null;
  source: string;
  status: string;
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/inquiries?status=${filterStatus}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setInquiries(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [filterStatus]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this customer inquiry?')) return;
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete inquiry:', err);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const filtered = inquiries.filter((inq) => {
    const q = searchQuery.toLowerCase();
    return (
      inq.name.toLowerCase().includes(q) ||
      inq.phone.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      (inq.service && inq.service.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-800 pb-20">
      {/* Top Admin Header */}
      <header className="bg-[#011633] text-white py-4 px-6 shadow-md border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-[1240px] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative h-9 w-36">
              <Image
                src="/images/logo-white.png"
                alt="Ditya Group"
                fill
                className="object-contain object-left"
              />
            </div>
            <span className="text-xs bg-[#FF5722] text-white px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={fetchInquiries}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer text-xs flex items-center space-x-1.5"
              title="Refresh"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-[#FF5722] hover:bg-[#e64a19] text-white transition-colors cursor-pointer text-xs flex items-center space-x-1.5 font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10">
        {/* Title & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#011633]">
              Consultation Inquiries & Leads
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Real-time customer inquiries from website consultation popups and contact forms
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-white border border-gray-200 px-4 py-2 rounded-asymmetric text-xs font-bold text-[#011633] shadow-sm">
              Total Leads: {inquiries.length}
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-asymmetric border border-gray-200/80 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by name, phone, email, service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-asymmetric text-xs focus:outline-none focus:border-[#FF5722]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-gray-400 mr-1 hidden sm:block" />
            {['ALL', 'NEW', 'CONTACTED', 'RESOLVED', 'ARCHIVED'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  filterStatus === st
                    ? 'bg-[#011633] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Inquiries Table / Cards */}
        {loading ? (
          <div className="text-center py-20 bg-white rounded-asymmetric border border-gray-200">
            <RefreshCw className="w-8 h-8 animate-spin text-[#FF5722] mx-auto mb-3" />
            <p className="text-sm text-gray-500 font-medium">Loading inquiries from MariaDB...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-asymmetric border border-gray-200 shadow-sm">
            <p className="text-base font-bold text-[#011633]">No inquiries found</p>
            <p className="text-xs text-gray-400 mt-1">
              New submissions from the Consultation Popup or Contact page will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-asymmetric p-6 border border-gray-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-base font-bold text-[#011633]">{item.name}</h3>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider ${
                        item.status === 'NEW'
                          ? 'bg-orange-100 text-[#FF5722]'
                          : item.status === 'CONTACTED'
                          ? 'bg-blue-100 text-blue-700'
                          : item.status === 'RESOLVED'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-[11px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                      {item.source}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                    <a
                      href={`tel:${item.phone}`}
                      className="flex items-center space-x-1.5 text-[#011633] hover:text-[#FF5722] font-semibold"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#FF5722]" />
                      <span>{item.phone}</span>
                    </a>
                    <a
                      href={`mailto:${item.email}`}
                      className="flex items-center space-x-1.5 hover:text-[#FF5722]"
                    >
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      <span>{item.email}</span>
                    </a>
                    <span className="flex items-center space-x-1.5 text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(item.createdAt).toLocaleString()}</span>
                    </span>
                  </div>

                  {item.service && (
                    <p className="text-xs text-[#011633] font-semibold">
                      Service Interest: <span className="text-[#FF5722]">{item.service}</span>
                    </p>
                  )}

                  {item.message && (
                    <p className="text-xs text-gray-600 bg-[#F9F9F9] p-3 rounded-lg border border-gray-100 italic">
                      “{item.message}”
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 shrink-0 pt-2 md:pt-0 w-full md:w-auto justify-end border-t md:border-t-0 border-gray-100">
                  <select
                    value={item.status}
                    onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                    className="text-xs font-semibold px-3 py-1.5 border border-gray-300 rounded-asymmetric bg-white focus:outline-none focus:border-[#FF5722]"
                  >
                    <option value="NEW">Set NEW</option>
                    <option value="CONTACTED">Set CONTACTED</option>
                    <option value="RESOLVED">Set RESOLVED</option>
                    <option value="ARCHIVED">Set ARCHIVED</option>
                  </select>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
