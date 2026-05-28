'use client';

import Image from 'next/image';

import { ShoppingCart } from 'lucide-react';

import { useCartStore } from '@/store/cart.store';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { studentApi } from '@/api/student.api';

export default function CartPage() {
  const router = useRouter();

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  const [loading, setLoading] =
    useState(false);
    
  const user = useAuthStore((state) => state.user) 
  const items = useCartStore(
    (state) => state.items
  );

  const removeFromCart = useCartStore(
    (state) => state.removeFromCart
  );

  const total = items.reduce(
    (acc, item) => acc + item.price,
    0
  );

  const handlePurchase = async () => {
  try {
    if (!user) {
      toast.error('Please login first');
      return;
    }

    setLoading(true);

    for (const course of items) {
      try {
        await studentApi.enrollCourse(course.id);
      } catch (error: any) {
        console.log(error);

        // ignore already enrolled
      }
    }

    clearCart();

    toast.success(
      'Courses purchased successfully'
    );

    router.push('/student/my-learning');
  } catch (error) {
    console.log(error);

    toast.error('Purchase failed');
  } finally {
    setLoading(false);
  }
};

  console.log("user in cart page", user);
  console.log("items in cart page", items, total);

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <ShoppingCart
            className="text-primary"
            size={30}
          />

          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Shopping Cart
            </h1>

            <p className="mt-2 text-muted-foreground">
              Review your selected courses.
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-10 text-center">
            <h2 className="text-2xl font-bold">
              Your cart is empty
            </h2>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-5">
              {items.map((course) => (
                <div
                  key={course.id}
                  className="flex gap-5 rounded-2xl border border-border bg-white p-5"
                >
                  <div className="relative aspect-video w-44 overflow-hidden rounded-xl">
                    <Image
                      src={
                        course.image ||
                        '/placeholder.jpg'
                      }
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <h2 className="mb-2 text-xl font-bold">
                      {course.title}
                    </h2>

                    <p className="mb-2 text-sm text-muted-foreground">
                      {course.subtitle}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      By{' '}
                      {
                        course.instructor
                          ?.name
                      }
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-2xl font-bold">
                        ₹{course.price}
                      </span>

                      <button
                        onClick={() =>
                          removeFromCart(
                            course.id
                          )
                        }
                        className="font-medium text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="sticky top-24 h-fit rounded-2xl border border-border bg-white p-6">
              <h3 className="mb-6 text-2xl font-bold">
                Order Summary
              </h3>

              <div className="mb-6 border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">
                    Total
                  </span>

                  <span className="text-3xl font-bold">
                    ₹{total}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                disabled={loading}
                className="h-12 w-full rounded-xl bg-primary font-semibold text-white disabled:opacity-50"
              >
                {loading
                  ? 'Processing...'
                  : 'Purchase Courses'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}