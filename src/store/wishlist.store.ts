// store/wishlist.store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistCourse {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  price: number;
  originalPrice?: number | null;
  instructor?: {
    name: string;
  };
  rating?: number;
  students?: string;
  duration?: string;
  lectures?: number;
  bestseller?: boolean;
}

interface WishlistState {
  items: WishlistCourse[];

  addToWishlist: (
    course: WishlistCourse
  ) => void;

  removeFromWishlist: (
    courseId: string
  ) => void;

  clearWishlist: () => void;

  isInWishlist: (
    courseId: string
  ) => boolean;
}

export const useWishlistStore =
  create<WishlistState>()(
    persist(
      (set, get) => ({
        items: [],

        addToWishlist: (course) => {
          const exists = get().items.find(
            (item) =>
              item.id === course.id
          );

          if (exists) return;

          set((state) => ({
            items: [
              ...state.items,
              course,
            ],
          }));
        },

        removeFromWishlist: (
          courseId
        ) => {
          set((state) => ({
            items: state.items.filter(
              (item) =>
                item.id !== courseId
            ),
          }));
        },

        clearWishlist: () => {
          set({ items: [] });
        },

        isInWishlist: (courseId) => {
          return get().items.some(
            (item) =>
              item.id === courseId
          );
        },
      }),
      {
        name: 'wishlist-storage',
      }
    )
  );