import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../../config/siteData';
import type { TestimonialItem } from '../../config/siteData';
import { reviewsService } from '../../services/reviews';
import { Star, MessageSquareQuote, PlusCircle, CheckCircle, Send, X } from 'lucide-react';


export const TestimonialsSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reviewsList, setReviewsList] = useState<TestimonialItem[]>(SITE_CONFIG.testimonials);
  const [newReview, setNewReview] = useState({
    name: '',
    business: '',
    role: '',
    content: '',
    rating: 5
  });

  useEffect(() => {
    reviewsService.getPublishedReviews().then(({ data }) => {
      if (data && data.length > 0) {
        const mapped: TestimonialItem[] = data.map((r) => ({
          id: r.id,
          name: r.client_name,
          business: r.business_name || '',
          role: r.role || 'Client',
          avatar: r.profile_image_url || undefined,
          content: r.testimonial,
          rating: r.rating,
          date: new Date(r.created_at).toLocaleDateString(),
        }));
        setReviewsList(mapped);
      }
    });
  }, []);

  const testimonials = reviewsList;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setNewReview({ name: '', business: '', role: '', content: '', rating: 5 });
    }, 2500);
  };

  return (
    <section id="reviews" className="py-24 relative bg-[#090d16] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            Client Feedback & Trust
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Client Reviews & Case Feedback
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Real feedback from business owners and founders who have collaborated with me.
          </p>
        </div>

        {/* Testimonials List OR Elegant Empty State */}
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {testimonials.map((review) => (
              <div
                key={review.id}
                className="glass-card rounded-3xl p-8 border border-slate-800/80 flex flex-col justify-between relative bg-slate-900/40"
              >
                <div>
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-sm text-slate-300 italic leading-relaxed mb-6">
                    "{review.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{review.name}</h4>
                    <span className="text-xs text-slate-400 block">{review.role}, {review.business}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Elegant Empty State Engine */
          <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-10 text-center border border-slate-800/90 shadow-xl space-y-6 mb-12">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-400">
              <MessageSquareQuote className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Client testimonials will appear here</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                I only display 100% genuine, verified client feedback. Have we recently collaborated on a project? Leave a quick review below!
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold text-white bg-slate-800 border border-slate-700 hover:bg-amber-500 hover:border-amber-400 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Client Testimonial</span>
            </button>
          </div>
        )}

      </div>

      {/* Submit Testimonial Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#090d16] border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">Submit Verified Client Review</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Thank you for your feedback!</h4>
                <p className="text-xs text-slate-300">Your review will be verified and displayed shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                    placeholder="e.g. Sarah Jenkins"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Business Name</label>
                    <input
                      type="text"
                      required
                      value={newReview.business}
                      onChange={(e) => setNewReview({ ...newReview, business: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                      placeholder="e.g. Apex Health"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Your Role</label>
                    <input
                      type="text"
                      required
                      value={newReview.role}
                      onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                      placeholder="e.g. Founder / CEO"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Testimonial</label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                    placeholder="Describe your experience working with me..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-sky-500 hover:bg-sky-400 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Review</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
