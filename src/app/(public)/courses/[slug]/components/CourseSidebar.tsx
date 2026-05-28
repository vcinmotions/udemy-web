// COURSE SIDEBAR FIXED
// components/course/CourseSidebar.tsx

'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Play,
  Heart,
  Share2,
  ShoppingCart,
  Zap,
  Shield,
  Smartphone,
  Award,
  Infinity,
  Clock,
  FileText,
  Download,
  Tag,
} from 'lucide-react';

import { motion } from 'framer-motion';

import AppImage from '@/components/ui/AppImage';

import { useCartStore } from '@/store/cart.store';

import {
  useWishlistStore,
} from '@/store/wishlist.store';

import { Course } from '@/types/course.types';

interface CourseSidebarProps {
  course: Course;
  onPreviewClick: () => void;
}

export default function CourseSidebar({
  course,
  onPreviewClick,
}: CourseSidebarProps) {
  const [timeLeft, setTimeLeft] =
    useState({
      hours: 11,
      minutes: 42,
      seconds: 18,
    });

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  const isInCart = useCartStore(
    (state) =>
      state.isInCart(course.id)
  );

  // WISHLIST
  const addToWishlist =
    useWishlistStore(
      (state) =>
        state.addToWishlist
    );

  const removeFromWishlist =
    useWishlistStore(
      (state) =>
        state.removeFromWishlist
    );

  const isInWishlist =
    useWishlistStore(
      (state) =>
        state.isInWishlist(course.id)
    );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let {
          hours,
          minutes,
          seconds,
        } = prev;

        seconds--;

        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }

        if (minutes < 0) {
          minutes = 59;
          hours--;
        }

        if (hours < 0) {
          return {
            hours: 11,
            minutes: 59,
            seconds: 59,
          };
        }

        return {
          hours,
          minutes,
          seconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const discount = Math.round(
    ((course.originalPrice -
      course.price) /
      course.originalPrice) *
      100
  );

  const courseIncludes = [
    {
      id: 'inc-video',
      icon: Play,
      text: `${course.totalHours} hours on-demand video`,
    },
    {
      id: 'inc-articles',
      icon: FileText,
      text: `${course.totalArticles} articles`,
    },
    {
      id: 'inc-download',
      icon: Download,
      text: 'Downloadable resources',
    },
    {
      id: 'inc-mobile',
      icon: Smartphone,
      text: 'Access on mobile and TV',
    },
    {
      id: 'inc-lifetime',
      icon: Infinity,
      text: 'Full lifetime access',
    },
    {
      id: 'inc-cert',
      icon: Award,
      text: 'Certificate of completion',
    },
  ];

  const pad = (n: number) =>
    String(n).padStart(2, '0');

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(course.id);
    } else {
      addToWishlist({
        id: course.id,
        slug: course.slug,
        title: course.title,
        subtitle: course.subtitle,
        description:
          course.description,
        image: course.image,
        price: course.price,
        originalPrice:
          course.originalPrice,

        instructor: {
          name:
            course.instructor?.name,
        },

        rating: course.rating,
        students: String(
          course.studentCount || 0
        ),

        duration: `${course.totalHours} Hours`,

        lectures:
          course.totalLectures,

        bestseller:
          course.badge ===
          'Bestseller',
      });
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 0.3,
      }}
      className="bg-white border border-border rounded-2xl shadow-card overflow-hidden"
    >
      {/* Preview */}
      <div
        className="relative aspect-video cursor-pointer group"
        onClick={onPreviewClick}
      >
        <AppImage
          src={course.image}
          alt={course.title}
          fill
          className="object-cover group-hover:brightness-75 transition-all duration-300"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-modal group-hover:scale-110 transition-transform duration-200">
            <Play
              size={24}
              className="text-primary fill-primary ml-1"
            />
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* PRICE */}
        <div className="flex items-end gap-3 mb-2">
          <span className="text-3xl font-extrabold">
            ₹{course.price}
          </span>

          <span className="line-through text-muted-foreground">
            ₹{course.originalPrice}
          </span>

          <span className="ml-auto text-sm font-bold text-success bg-success/10 px-2 py-0.5 rounded">
            {discount}% OFF
          </span>
        </div>

        {/* TIMER */}
        <div className="flex items-center gap-2 mb-4 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          <Clock
            size={14}
            className="text-amber-600"
          />

          <span className="text-xs text-amber-700 font-medium">
            <span className="font-bold">
              {pad(timeLeft.hours)}:
              {pad(timeLeft.minutes)}
              :
              {pad(timeLeft.seconds)}
            </span>{' '}
            left at this price
          </span>
        </div>

        {/* BUTTONS */}
        <div className="space-y-2.5 mb-4">
          <button className="btn-primary w-full flex items-center justify-center gap-2">
            <Zap size={16} />
            Enroll Now — ₹
            {course.price}
          </button>

          <button
            onClick={() =>
              addToCart({
                id: course.id,
                slug: course.slug,
                title: course.title,
                subtitle:
                  course.subtitle,
                image: course.image,
                price: course.price,
                originalPrice:
                  course.originalPrice,
                instructor: {
                  name:
                    course.instructor
                      ?.name,
                },
              })
            }
            disabled={isInCart}
            className={`w-full flex items-center justify-center gap-2 font-semibold px-5 py-3 rounded-lg border-2 transition-all ${
              isInCart
                ? 'bg-primary/10 border-primary text-primary'
                : 'border-border hover:border-primary hover:text-primary'
            }`}
          >
            <ShoppingCart size={16} />

            {isInCart
              ? 'Already In Cart'
              : 'Add To Cart'}
          </button>
        </div>

        {/* WISHLIST */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={handleWishlist}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border text-sm font-medium transition-all ${
              isInWishlist
                ? 'bg-red-50 border-red-200 text-red-500'
                : 'hover:bg-muted border-border text-muted-foreground'
            }`}
          >
            <Heart
              size={15}
              className={
                isInWishlist
                  ? 'fill-red-500'
                  : ''
              }
            />

            {isInWishlist
              ? 'Wishlisted'
              : 'Wishlist'}
          </button>

          <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-sm font-medium">
            <Share2 size={15} />
            Share
          </button>
        </div>

        {/* INCLUDES */}
        <div>
          <h4 className="text-sm font-semibold mb-3">
            This course includes:
          </h4>

          <ul className="space-y-2.5">
            {courseIncludes.map(
              (item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-2.5 text-sm"
                >
                  <item.icon
                    size={15}
                  />

                  {item.text}
                </li>
              )
            )}
          </ul>
        </div>

        {/* TAGS */}
        <div className="mt-5 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-1.5">
            {course.tags?.map(
              (tag) => (
                <span
                  key={tag}
                  className="text-xs bg-muted border border-border px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}