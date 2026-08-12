import React, { useState, useEffect } from 'react';
import { inquiriesService } from '../../services/inquiries';
import type { Inquiry, InquiryStatus } from '../../types/database';
import {
  Inbox,
  Search,
  Trash2,
  Mail,
  MessageSquare,
  X,
} from 'lucide-react';

export const AdminInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    const { data } = await inquiriesService.getAllInquiries();
    setInquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    await inquiriesService.updateStatus(id, newStatus);
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleDelete = async (id: string) => {
    await inquiriesService.deleteInquiry(id);
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    if (selectedInquiry?.id === id) {
      setSelectedInquiry(null);
    }
    setDeleteConfirmId(null);
  };

  // Search & Filter Logic
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus =
      selectedStatusFilter === 'All'
        ? true
        : selectedStatusFilter === 'New'
        ? inq.status === 'new'
        : selectedStatusFilter === 'Contacted'
        ? inq.status === 'contacted'
        : selectedStatusFilter === 'In Progress'
        ? inq.status === 'in_progress'
        : selectedStatusFilter === 'Completed'
        ? inq.status === 'completed'
        : selectedStatusFilter === 'Rejected'
        ? inq.status === 'rejected'
        : true;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      inq.name.toLowerCase().includes(query) ||
      inq.email.toLowerCase().includes(query) ||
      (inq.business_name && inq.business_name.toLowerCase().includes(query)) ||
      inq.project_type.toLowerCase().includes(query) ||
      inq.description.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: InquiryStatus) => {
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
            <Inbox className="w-6 h-6 text-sky-400" />
            Project Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage incoming client project briefs, update deal statuses, and initiate follow-ups.
          </p>
        </div>
      </div>

      {/* Search & Status Filters Toolbar */}
      <div className="glass-panel p-4 rounded-3xl border border-slate-800/90 bg-slate-900/40 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, email, business..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-sky-500 border border-slate-800"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {['All', 'New', 'Contacted', 'In Progress', 'Completed', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedStatusFilter === status
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Inquiries Table / Cards Container */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-xs font-semibold">
          Loading inquiries...
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-3 bg-slate-900/20">
          <Inbox className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No inquiries found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchQuery || selectedStatusFilter !== 'All'
              ? 'Try adjusting your search criteria or status filter.'
              : 'Public website visitors who submit inquiry forms will appear here.'}
          </p>
        </div>
      ) : (
        <div className="glass-panel rounded-3xl border border-slate-800/90 overflow-hidden bg-slate-900/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider bg-slate-950/40">
                  <th className="py-3.5 px-4">Client Name</th>
                  <th className="py-3.5 px-4">Project Type</th>
                  <th className="py-3.5 px-4">Budget</th>
                  <th className="py-3.5 px-4">Timeline</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-bold text-white text-xs">{inq.name}</p>
                        <p className="text-[11px] text-slate-400">{inq.email}</p>
                        {inq.business_name && (
                          <span className="text-[10px] text-sky-400 font-semibold block mt-0.5">
                            {inq.business_name}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-200 font-semibold">{inq.project_type}</td>
                    <td className="py-4 px-4 text-slate-300">{inq.budget_range || 'N/A'}</td>
                    <td className="py-4 px-4 text-slate-300">{inq.deadline || 'N/A'}</td>
                    <td className="py-4 px-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value as InquiryStatus)}
                        className="bg-slate-950 text-xs font-semibold text-slate-200 border border-slate-800 rounded-lg px-2 py-1 focus:ring-1 focus:ring-sky-500 cursor-pointer"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-sky-400 hover:text-white bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20 transition-all cursor-pointer"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(inq.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 bg-slate-900 border border-slate-800 hover:border-rose-500/40 transition-all cursor-pointer"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#090d16] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider block mb-1">
                  Inquiry Details
                </span>
                <h3 className="text-xl font-extrabold text-white">{selectedInquiry.name}</h3>
                <p className="text-xs text-slate-400">{selectedInquiry.email}</p>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Project Type</span>
                <p className="text-xs font-extrabold text-white">{selectedInquiry.project_type}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Estimated Budget</span>
                <p className="text-xs font-extrabold text-emerald-400">{selectedInquiry.budget_range || 'Not specified'}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Target Deadline</span>
                <p className="text-xs font-bold text-slate-200">{selectedInquiry.deadline || 'Not specified'}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Business Name</span>
                <p className="text-xs font-bold text-slate-200">{selectedInquiry.business_name || 'Individual / Personal'}</p>
              </div>
            </div>

            {/* Full Description */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300">Project Brief & Requirements:</span>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.description}
              </div>
            </div>

            {/* Status Change Selector inside Modal */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Current Status:</span>
                {getStatusBadge(selectedInquiry.status)}
              </div>

              <select
                value={selectedInquiry.status}
                onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value as InquiryStatus)}
                className="bg-slate-900 text-xs font-bold text-slate-200 border border-slate-700 rounded-xl px-3 py-1.5 focus:ring-1 focus:ring-sky-500 cursor-pointer"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
              <a
                href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(`Chetan Web Studio - Inquiry Response: ${selectedInquiry.project_type}`)}`}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
              >
                <Mail className="w-4 h-4" />
                <span>Reply by Email</span>
              </a>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Hi ${selectedInquiry.name}, thanks for reaching out to Chetan Web Studio regarding your ${selectedInquiry.project_type} inquiry!`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-sm w-full bg-[#090d16] border border-slate-800 rounded-3xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-white">Delete Inquiry?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to delete this inquiry record permanently?
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
