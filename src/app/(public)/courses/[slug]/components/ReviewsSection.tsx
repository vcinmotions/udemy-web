'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { Star, ThumbsUp, ChevronDown } from 'lucide-react';
import type { Review } from '@/data/mockData';
import { motion } from 'framer-motion';

const ratingBreakdown = [
  { id: 'rb-5', stars: 5, percent: 72, count: 35222 },
  { id: 'rb-4', stars: 4, percent: 18, count: 8806 },
  { id: 'rb-3', stars: 3, percent: 6, count: 2935 },
  { id: 'rb-2', stars: 2, percent: 2, count: 979 },
  { id: 'rb-1', stars: 1, percent: 2, count: 978 },
];

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.content.length > 200;

  return (
    <div className="py-6 border-b border-border last:border-0">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-muted shrink-0">
          <AppImage
            src={review.avatar}
            alt={`${review.author} profile`}
            width={40}
            height={40}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-foreground">
              {review.author}
            </span>
            <span className="text-xs text-muted-foreground">
              {review.date}
            </span>
          </div>

          <div className="flex items-center gap-0.5 mt-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={`rstar-${review.id}-${s}`}
                size={13}
                className={
                  s <= review.rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>

          <div
            className={`mt-2 ${
              !expanded && isLong ? 'max-h-20 overflow-hidden relative' : ''
            }`}
          >
            <p className="text-sm text-foreground leading-relaxed">
              {review.content}
            </p>

            {!expanded && isLong && (
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
            )}
          </div>

          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-primary font-semibold mt-1 hover:underline"
            >
              {expanded ? 'Show less' : 'Show more'}
            </button>
          )}

          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-muted-foreground">Helpful?</span>
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-border rounded-full px-3 py-1 hover:bg-muted transition-colors">
              <ThumbsUp size={12} />
              {review.helpful}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection({
  reviews,
}: {
  reviews: Review[];
}) {
  const [visibleCount, setVisibleCount] = useState(4);

  if (!reviews?.length) {
    return (
      <p className="text-sm text-muted-foreground">
        No reviews available yet.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">
        Student Reviews
      </h2>

      {/* Summary */}
      <div className="flex flex-col sm:flex-row gap-8 mb-8 p-6 bg-muted/30 rounded-2xl border border-border">
        <div className="text-center sm:text-left">
          <div className="text-6xl font-extrabold text-foreground font-tabular">
            {reviews.length ? reviews[0]?.rating : 0}
          </div>

          <div className="flex items-center gap-0.5 justify-center sm:justify-start mt-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={`summary-star-${s}`}
                size={18}
                className="fill-amber-400 text-amber-400"
              />
            ))}
          </div>

          <p className="text-xs text-muted-foreground mt-1">
            Course Rating
          </p>
        </div>

        <div className="flex-1 space-y-2.5">
          {ratingBreakdown.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="flex items-center gap-0.5 shrink-0 w-20">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={`rb-star-${item.id}-${s}`}
                    size={11}
                    className={
                      s <= item.stars
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }
                  />
                ))}
              </div>

              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.percent}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: item.stars * 0.05,
                  }}
                />
              </div>

              <span className="text-xs text-muted-foreground w-8 text-right font-tabular">
                {item.percent}%
              </span>

              <span className="text-xs text-muted-foreground w-14 text-right font-tabular hidden sm:block">
                ({item.count.toLocaleString()})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div>
        {reviews.slice(0, visibleCount).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {visibleCount < reviews.length && (
        <button
          onClick={() => setVisibleCount((c) => c + 4)}
          className="mt-4 flex items-center gap-2 text-sm text-primary font-semibold hover:underline"
        >
          <ChevronDown size={16} />
          Show more reviews
        </button>
      )}
    </div>
  );
}