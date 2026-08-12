import React, { useState, useEffect } from 'react';
import { reviewsService } from '../../services/reviews';
import { storageService } from '../../services/storage';
import type { Review } from '../../types/database';
import {
  Star,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  X,
  Sparkles,
  Quote,
} from 'lucide-react';

export const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<Partial<Review> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    const { data } = await reviewsService.getAllReviews();
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleOpenAddModal = () => {
    setEditingReview({
      client_name: '',
      business_name: '',
      role: 'Business Owner',
      testimonial: '',
      rating: 5,
      profile_image_url: '',
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (review: Review) => {
    setEditingReview({ ...review });
    setIsModalOpen(true);
  };

  const handleTogglePublished = async (review: Review) => {
    const updatedStatus = !review.is_published;
    await reviewsService.updateReview(review.id, { is_published: updatedStatus });
    setReviews((prev) =>
      prev.map((r) => (r.id === review.id ? { ...r, is_published: updatedStatus } : r))
    );
  };

  const handleDelete = async (id: string) => {
    await reviewsService.deleteReview(id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
    setDeleteConfirmId(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const { publicUrl } = await storageService.uploadImage(file, 'review-avatars');
    setUploadingImage(false);

    if (publicUrl && editingReview) {
      setEditingReview({ ...editingReview, profile_image_url: publicUrl });
    }
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview || !editingReview.client_name || !editingReview.testimonial) return;

    if (editingReview.id) {
      await reviewsService.updateReview(editingReview.id, editingReview);
    } else {
      await reviewsService.createReview(editingReview);
    }

    setIsModalOpen(false);
    setEditingReview(null);
    fetchReviews();
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1 text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${star <= rating ? 'fill-amber-400' : 'text-slate-700'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-400 fill-amber-400/20" />
            Client Reviews & Testimonials
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage client testimonials displayed in the public reviews section.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-400 transition-all cursor-pointer shadow-lg shadow-sky-500/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Review</span>
        </button>
      </div>

      {/* Reviews Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-400 text-xs font-semibold">
          Loading client reviews...
        </div>
      ) : reviews.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-3 bg-slate-900/20">
          <Quote className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No reviews added yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Click "Add Review" to publish client feedback and testimonials.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-card rounded-3xl p-6 border border-slate-800/90 flex flex-col justify-between space-y-4 bg-slate-900/40 hover:border-sky-500/40 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {renderStars(rev.rating)}

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      rev.is_published
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : 'bg-slate-900 text-slate-400 border-slate-700'
                    }`}
                  >
                    {rev.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{rev.testimonial}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {rev.profile_image_url ? (
                    <img
                      src={rev.profile_image_url}
                      alt={rev.client_name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-700"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 font-bold text-xs">
                      {rev.client_name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-extrabold text-white">{rev.client_name}</p>
                    <p className="text-[10px] text-slate-400">
                      {rev.role || 'Client'}{' '}
                      {rev.business_name ? `• ${rev.business_name}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleTogglePublished(rev)}
                    className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                      rev.is_published
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
                        : 'text-slate-400 bg-slate-900 border-slate-800'
                    }`}
                    title={rev.is_published ? 'Unpublish review' : 'Publish review'}
                  >
                    {rev.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => handleOpenEditModal(rev)}
                    className="p-1.5 rounded-lg text-sky-400 bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setDeleteConfirmId(rev.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 bg-slate-900 border border-slate-800 hover:border-rose-500/30 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Review Modal */}
      {isModalOpen && editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#090d16] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                {editingReview.id ? 'Edit Review' : 'Add Client Review'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveReview} className="space-y-4 text-xs">
              
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={editingReview.client_name || ''}
                  onChange={(e) => setEditingReview({ ...editingReview, client_name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Role / Position</label>
                  <input
                    type="text"
                    value={editingReview.role || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, role: e.target.value })}
                    placeholder="e.g. Founder & CEO"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Company / Business</label>
                  <input
                    type="text"
                    value={editingReview.business_name || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, business_name: e.target.value })}
                    placeholder="e.g. Apex Fitness"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Rating (1 to 5 Stars)</label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditingReview({ ...editingReview, rating: star })}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (editingReview.rating || 5) ? 'fill-amber-400' : 'text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Testimonial Text *</label>
                <textarea
                  rows={4}
                  required
                  value={editingReview.testimonial || ''}
                  onChange={(e) => setEditingReview({ ...editingReview, testimonial: e.target.value })}
                  placeholder="Client feedback and testimonial content..."
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                />
              </div>

              {/* Avatar Upload / URL */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="font-semibold text-slate-300 block">Profile Avatar Image</label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={editingReview.profile_image_url || ''}
                    onChange={(e) => setEditingReview({ ...editingReview, profile_image_url: e.target.value })}
                    placeholder="Avatar image URL..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl glass-input text-xs text-white"
                  />
                  <label className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5 text-sky-400" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingReview.is_published ?? true}
                    onChange={(e) => setEditingReview({ ...editingReview, is_published: e.target.checked })}
                    className="rounded border-slate-800 text-sky-500 focus:ring-sky-500"
                  />
                  <span className="font-bold text-slate-300">Publish Testimonial Publicly</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-sky-500 hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/20"
                >
                  Save Review
                </button>
              </div>

            </form>

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
            <h3 className="text-base font-extrabold text-white">Delete Review?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to delete this testimonial?
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
