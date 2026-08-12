import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { inquiriesService } from '../../services/inquiries';
import { projectsService } from '../../services/projects';
import { reviewsService } from '../../services/reviews';
import type { Inquiry } from '../../types/database';
import {
  Inbox,
  Clock,
  CheckCircle2,
  FolderKanban,
  Star,
  Sparkles,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  User,
} from 'lucide-react';

export const AdminDashboardOverview: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [projectCount, setProjectCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [inqRes, projRes, revRes] = await Promise.all([
        inquiriesService.getAllInquiries(),
        projectsService.getAllProjects(),
        reviewsService.getAllReviews(),
      ]);

      setInquiries(inqRes.data || []);
      setProjectCount((projRes.data || []).length);
      setReviewCount((revRes.data || []).length);
    } catch (err) {
      console.error('Error loading dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter((i) => i.status === 'new').length;
  const inProgressInquiries = inquiries.filter((i) => i.status === 'in_progress' || i.status === 'contacted').length;
  const completedProjects = inquiries.filter((i) => i.status === 'completed').length + projectCount;
  const publishedReviews = reviewCount;
  const publishedProjects = projectCount;

  const recentInquiries = inquiries.slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-500/15 text-sky-400 border border-sky-500/30">New</span>;
      case 'contacted':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">Contacted</span>;
      case 'in_progress':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">In Progress</span>;
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Completed</span>;
      case 'rejected':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">Rejected</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-slate-400">{status}</span>;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-sky-400" />
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time performance metrics, project inquiries, and client feedback summary.
          </p>
        </div>

        <button
          onClick={fetchData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-sky-400 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Total Inquiries */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800/90 bg-slate-900/50 space-y-3 relative overflow-hidden group hover:border-sky-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Inquiries</span>
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-3xl font-black text-white">{totalInquiries}</span>
            <span className="text-xs text-sky-400 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> Client Leads
            </span>
          </div>
        </div>

        {/* New Inquiries */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800/90 bg-slate-900/50 space-y-3 relative overflow-hidden group hover:border-sky-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">New Inquiries</span>
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-3xl font-black text-white">{newInquiries}</span>
            <span className="text-xs text-indigo-400 font-semibold">Requires Action</span>
          </div>
        </div>

        {/* In-Progress Inquiries */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800/90 bg-slate-900/50 space-y-3 relative overflow-hidden group hover:border-sky-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">In-Progress</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-3xl font-black text-white">{inProgressInquiries}</span>
            <span className="text-xs text-amber-400 font-semibold">Active Deals</span>
          </div>
        </div>

        {/* Completed Projects */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800/90 bg-slate-900/50 space-y-3 relative overflow-hidden group hover:border-sky-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Projects</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-3xl font-black text-white">{completedProjects}</span>
            <span className="text-xs text-emerald-400 font-semibold">Delivered</span>
          </div>
        </div>

        {/* Published Reviews */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800/90 bg-slate-900/50 space-y-3 relative overflow-hidden group hover:border-sky-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Published Reviews</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Star className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-3xl font-black text-white">{publishedReviews}</span>
            <span className="text-xs text-amber-400 font-semibold">Testimonials</span>
          </div>
        </div>

        {/* Portfolio Projects */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800/90 bg-slate-900/50 space-y-3 relative overflow-hidden group hover:border-sky-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Portfolio Projects</span>
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-3xl font-black text-white">{publishedProjects}</span>
            <span className="text-xs text-sky-400 font-semibold">Live Showcase</span>
          </div>
        </div>

      </div>

      {/* Recent Inquiries List Container */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800/90 bg-slate-900/40 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-white">Recent Project Inquiries</h2>
            <p className="text-xs text-slate-400">Latest business lead submissions from visitors.</p>
          </div>

          <Link
            to="/admin/inquiries"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-sky-400 hover:text-sky-300 bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500/20 transition-all"
          >
            <span>Manage All Inquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-400 text-xs font-semibold">
            Loading recent inquiries...
          </div>
        ) : recentInquiries.length === 0 ? (
          <div className="py-12 text-center space-y-3 border border-dashed border-slate-800 rounded-2xl">
            <Inbox className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">No project inquiries received yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Project Type</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Submitted Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 font-bold">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs">{inq.name}</p>
                          <p className="text-[11px] text-slate-400">{inq.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-300 font-semibold">{inq.project_type}</td>
                    <td className="py-4 px-4 text-slate-300">{inq.budget_range || 'N/A'}</td>
                    <td className="py-4 px-4 text-slate-400">
                      {new Date(inq.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(inq.status)}</td>
                    <td className="py-4 px-4 text-right">
                      <Link
                        to="/admin/inquiries"
                        className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 font-semibold"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
