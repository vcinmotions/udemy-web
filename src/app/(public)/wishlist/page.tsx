// WISHLIST PAGE FIXED
// app/wishlist/page.tsx

'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';

import Image from 'next/image';
import Link from 'next/link';

import {
  Heart,
  Star,
  ShoppingCart,
  Trash2,
  Clock3,
  PlayCircle,
} from 'lucide-react';

import {
  useWishlistStore,
} from '@/store/wishlist.store';

import {
  useCartStore,
} from '@/store/cart.store';

export default function WishlistPage() {
  const wishlistCourses =
    useWishlistStore(
      (state) => state.items
    );

  const removeFromWishlist =
    useWishlistStore(
      (state) =>
        state.removeFromWishlist
    );

  const clearWishlist =
    useWishlistStore(
      (state) =>
        state.clearWishlist
    );

  const addToCart = useCartStore(
    (state) => state.addToCart
  );

  return (
    <>

      <main className="min-h-screen bg-[#f7f9fc] pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* HERO */}
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-primary to-purple-600 p-8 md:p-12 mb-10">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-extrabold text-white mb-4">
                  My Wishlist
                </h1>

                <p className="text-white/80 text-lg">
                  Keep track of your
                  favorite courses.
                </p>
              </div>

              <div className="bg-white/10 rounded-3xl px-8 py-6 text-white">
                <h2 className="text-5xl font-extrabold">
                  {
                    wishlistCourses.length
                  }
                </h2>

                <p className="text-white/70 mt-2 text-sm">
                  Saved Courses
                </p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          {wishlistCourses.length >
            0 && (
            <div className="bg-white border border-border rounded-2xl p-4 mb-8 flex justify-between">
              <button
                onClick={() => {
                  wishlistCourses.forEach(
                    (course) => {
                      addToCart({
                        id: course.id,
                        slug:
                          course.slug,
                        title:
                          course.title,
                        subtitle:
                          course.subtitle,
                        image:
                          course.image,
                        price:
                          course.price,
                        originalPrice:
                          course.originalPrice,
                        instructor:
                          course.instructor,
                      });
                    }
                  );
                }}
                className="px-5 h-11 rounded-xl bg-primary text-white font-medium"
              >
                Add All To Cart
              </button>

              <button
                onClick={
                  clearWishlist
                }
                className="px-5 h-11 rounded-xl border border-border font-medium"
              >
                Clear Wishlist
              </button>
            </div>
          )}

          {/* EMPTY */}
          {wishlistCourses.length ===
          0 ? (
            <div className="bg-white border border-dashed border-border rounded-3xl p-14 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-primary" />
              </div>

              <h2 className="text-3xl font-bold mb-3">
                Your wishlist is
                empty
              </h2>

              <p className="text-muted-foreground mb-8">
                Browse courses and
                save them here.
              </p>

              <Link
                href="/courses"
                className="inline-flex h-12 px-6 rounded-2xl bg-primary text-white font-semibold items-center"
              >
                Explore Courses
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {wishlistCourses.map(
                (course) => (
                  <div
                    key={course.id}
                    className="bg-white border border-border rounded-3xl overflow-hidden"
                  >
                    <div className="flex flex-col xl:flex-row">
                      <div className="relative xl:w-[360px] aspect-video">
                        <Image
                          src={
                            course.image ||
                            ''
                          }
                          alt={
                            course.title
                          }
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 p-6">
                        <Link
                          href={`/course/${course.slug}`}
                        >
                          <h2 className="text-3xl font-bold mb-3 hover:text-primary">
                            {
                              course.title
                            }
                          </h2>
                        </Link>

                        <p className="text-muted-foreground mb-5">
                          {
                            course.description
                          }
                        </p>

                        <div className="flex flex-wrap gap-5 text-sm mb-6">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />

                            {
                              course.rating
                            }
                          </div>

                          <div className="flex items-center gap-1.5">
                            <Clock3 className="w-4 h-4" />

                            {
                              course.duration
                            }
                          </div>

                          <div className="flex items-center gap-1.5">
                            <PlayCircle className="w-4 h-4" />

                            {
                              course.lectures
                            }{' '}
                            Lectures
                          </div>
                        </div>

                        <div className="flex gap-4">
                          <button
                            onClick={() =>
                              addToCart(
                                {
                                  id: course.id,
                                  slug:
                                    course.slug,
                                  title:
                                    course.title,
                                  subtitle:
                                    course.subtitle,
                                  image:
                                    course.image,
                                  price:
                                    course.price,
                                  originalPrice:
                                    course.originalPrice,
                                  instructor:
                                    course.instructor,
                                }
                              )
                            }
                            className="h-12 px-6 rounded-2xl bg-primary text-white font-semibold flex items-center gap-2"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add To Cart
                          </button>

                          <button
                            onClick={() =>
                              removeFromWishlist(
                                course.id
                              )
                            }
                            className="h-12 px-6 rounded-2xl border border-border font-semibold hover:text-red-500 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col items-end justify-between">
                        <div>
                          <div className="text-4xl font-extrabold">
                            ₹
                            {
                              course.price
                            }
                          </div>

                          <div className="line-through text-muted-foreground">
                            ₹
                            {
                              course.originalPrice
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}