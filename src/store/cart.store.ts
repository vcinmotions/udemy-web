import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartCourse {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  image?: string;
  price: number;
  originalPrice?: number | null;
  instructor?: {
    name: string;
  };
}

interface CartState {
  items: CartCourse[];

  addToCart: (course: CartCourse) => void;

  removeFromCart: (courseId: string) => void;

  clearCart: () => void;

  isInCart: (courseId: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (course) => {
        const exists = get().items.find(
          (item) => item.id === course.id
        );

        if (exists) return;

        set((state) => ({
          items: [...state.items, course],
        }));
      },

      removeFromCart: (courseId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== courseId
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      isInCart: (courseId) => {
        return get().items.some(
          (item) => item.id === courseId
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);