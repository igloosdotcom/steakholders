import { useState } from 'react';
import { X, ZoomIn, Star, ExternalLink, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import { REVIEWS, BRAND_INFO } from '../data/content';
import { ReviewItem } from '../types/steakholders';

// Clean Google "G" Logo SVG component
function GoogleGIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function GuestbookSection() {
  const [activeReviewModal, setActiveReviewModal] = useState<ReviewItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'ribeye' | 'sirloin' | 'london'>('all');

  const filteredReviews = REVIEWS.filter(rev => {
    if (activeCategory === 'ribeye') {
      return rev.quote.toLowerCase().includes('ribeye') || rev.orderType?.toLowerCase().includes('ribeye');
    }
    if (activeCategory === 'sirloin') {
      return rev.quote.toLowerCase().includes('sirloin') || rev.orderType?.toLowerCase().includes('sirloin');
    }
    if (activeCategory === 'london') {
      return rev.quote.toLowerCase().includes('london') || rev.location?.toLowerCase().includes('london');
    }
    return true;
  });

  return (
    <section id="reviews" className="py-28 bg-[#0c0c0e] relative border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[#c5a880] font-medium">
            <span>05</span>
            <span className="w-6 h-[1px] bg-[#c5a880]/60" />
            <span>Verified Reputation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f5f2eb] tracking-tight">
            Genuine Google Reviews
          </h2>
          <p className="text-stone-400 text-sm font-light leading-relaxed">
            Real feedback from weekend visitors at our Birmingham Hub, verified on our Google Business Profile.
          </p>
        </div>

        {/* Official Google Scorecard Banner */}
        <div className="mb-14 p-8 sm:p-10 bg-stone-950 border border-stone-800/90 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Score & Stars */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-stone-700/80 flex items-center justify-center shadow-inner">
                  <GoogleGIcon className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-serif font-normal text-white">
                      {BRAND_INFO.googleRating}
                    </span>
                    <span className="text-stone-500 text-sm font-mono">/ 5.0</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 justify-center sm:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="sm:border-l sm:border-stone-800 sm:pl-6 space-y-1">
                <div className="text-xs uppercase font-mono tracking-widest text-[#c5a880]">
                  Official Google Rating
                </div>
                <div className="text-stone-300 text-xs font-light">
                  Based on {BRAND_INFO.googleReviewCount}+ genuine customer reviews on Google Maps
                </div>
                <div className="text-[11px] text-stone-500 font-light flex items-center justify-center sm:justify-start gap-1.5 pt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{BRAND_INFO.fullAddress}</span>
                </div>
              </div>
            </div>

            {/* Direct Link to Google Business Profile */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <a
                href={BRAND_INFO.googleBusinessLink}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-[#c5a880] hover:bg-[#d6bc96] text-[#09090a] font-medium text-xs tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2"
              >
                <GoogleGIcon className="w-4 h-4" />
                <span>View on Google</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={BRAND_INFO.googleBusinessLink}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-5 py-3 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 font-medium text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquarePlus className="w-3.5 h-3.5 text-stone-400" />
                <span>Leave a Review</span>
              </a>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 pb-10 flex-wrap">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-all border ${
              activeCategory === 'all'
                ? 'bg-stone-800 text-[#f5f2eb] border-[#c5a880]'
                : 'bg-transparent text-stone-400 border-stone-800 hover:border-stone-700 hover:text-stone-200'
            }`}
          >
            All Reviews ({REVIEWS.length})
          </button>
          <button
            onClick={() => setActiveCategory('ribeye')}
            className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-all border ${
              activeCategory === 'ribeye'
                ? 'bg-stone-800 text-[#f5f2eb] border-[#c5a880]'
                : 'bg-transparent text-stone-400 border-stone-800 hover:border-stone-700 hover:text-stone-200'
            }`}
          >
            Prime Ribeye
          </button>
          <button
            onClick={() => setActiveCategory('sirloin')}
            className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-all border ${
              activeCategory === 'sirloin'
                ? 'bg-stone-800 text-[#f5f2eb] border-[#c5a880]'
                : 'bg-transparent text-stone-400 border-stone-800 hover:border-stone-700 hover:text-stone-200'
            }`}
          >
            Signature Sirloin
          </button>
          <button
            onClick={() => setActiveCategory('london')}
            className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-all border ${
              activeCategory === 'london'
                ? 'bg-stone-800 text-[#f5f2eb] border-[#c5a880]'
                : 'bg-transparent text-stone-400 border-stone-800 hover:border-stone-700 hover:text-stone-200'
            }`}
          >
            London Visitors
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map(rev => (
            <div
              key={rev.id}
              className="bg-stone-950 border border-stone-800/80 hover:border-[#c5a880]/60 transition-all duration-300 flex flex-col justify-between group p-6 sm:p-7 relative"
            >
              <div>
                {/* Author Info Bar with Google icon */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold text-white shadow-sm"
                      style={{ backgroundColor: rev.avatarBg || '#c5a880' }}
                    >
                      {rev.initials || rev.author.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-stone-100 font-medium text-sm flex items-center gap-1.5">
                        <span>{rev.author}</span>
                      </div>
                      <div className="text-[11px] text-stone-500 font-light flex items-center gap-1">
                        <span>{rev.badge || 'Verified Google Reviewer'}</span>
                        {rev.date && (
                          <>
                            <span>·</span>
                            <span>{rev.date}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Google G stamp */}
                  <a
                    href={BRAND_INFO.googleBusinessLink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 hover:opacity-80 transition-opacity"
                    title="View on Google"
                  >
                    <GoogleGIcon className="w-4 h-4 opacity-90" />
                  </a>
                </div>

                {/* Star Rating & Order Tag */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>
                  {rev.orderType && (
                    <span className="text-[10px] font-mono text-[#c5a880] tracking-wider uppercase">
                      {rev.highlight}
                    </span>
                  )}
                </div>

                {/* Review Quote Body */}
                <blockquote className="text-stone-300 text-xs sm:text-sm font-light italic leading-relaxed mb-4">
                  "{rev.quote}"
                </blockquote>

                {/* Dish Recommendation Pill */}
                {rev.dishRecommended && (
                  <div className="text-[11px] text-stone-400 font-light bg-stone-900/60 border border-stone-800/80 p-2.5 mb-4">
                    <span className="text-stone-500 uppercase tracking-widest text-[9px] block font-mono">
                      Recommended:
                    </span>
                    <span className="text-stone-300 italic">{rev.dishRecommended}</span>
                  </div>
                )}
              </div>

              {/* Bottom Card Footer with Optional Screenshot Preview */}
              <div className="pt-4 border-t border-stone-900 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Verified Google Review</span>
                </div>

                {rev.image && (
                  <button
                    onClick={() => setActiveReviewModal(rev)}
                    className="text-[11px] text-[#c5a880] hover:text-white flex items-center gap-1 font-mono uppercase tracking-wider transition-colors"
                  >
                    <ZoomIn className="w-3 h-3" />
                    <span>View Note</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout: Leave a Google Review */}
        <div className="mt-16 p-8 bg-stone-950/80 border border-stone-800 text-center max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2">
            <GoogleGIcon className="w-5 h-5" />
            <span className="font-serif text-lg text-stone-200">
              Tried our Steakholders weekend box?
            </span>
          </div>
          <p className="text-xs text-stone-400 font-light max-w-lg mx-auto">
            Your reviews help our family-run kitchen continue sourcing the finest Angus HMC beef in the UK. We read every single comment.
          </p>
          <div className="pt-2">
            <a
              href={BRAND_INFO.googleBusinessLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 text-xs font-mono uppercase tracking-widest transition-colors"
            >
              <span>Write a Google Review</span>
              <ExternalLink className="w-3 h-3 text-[#c5a880]" />
            </a>
          </div>
        </div>

        {/* Lightbox / Zoom Modal */}
        {activeReviewModal && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActiveReviewModal(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-stone-950 border border-stone-800 p-6 space-y-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="text-xs uppercase tracking-widest text-[#c5a880] font-medium flex items-center gap-2">
                  <GoogleGIcon className="w-3.5 h-3.5" />
                  <span>Google Review · {activeReviewModal.author}</span>
                </div>
                <button
                  onClick={() => setActiveReviewModal(null)}
                  className="p-1 text-stone-400 hover:text-white"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {activeReviewModal.image && (
                <div className="max-h-[65vh] overflow-auto flex justify-center bg-black p-2 border border-stone-900">
                  <img
                    src={activeReviewModal.image}
                    alt="Verified Visitor Review"
                    referrerPolicy="no-referrer"
                    className="max-h-full object-contain"
                  />
                </div>
              )}

              <div className="text-xs text-stone-300 italic pt-2 leading-relaxed">
                "{activeReviewModal.quote}"
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-900 text-[11px] text-stone-500">
                <span>{activeReviewModal.badge || 'Verified Google Reviewer'}</span>
                <a
                  href={BRAND_INFO.googleBusinessLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#c5a880] hover:underline flex items-center gap-1"
                >
                  <span>Open Google Business Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
