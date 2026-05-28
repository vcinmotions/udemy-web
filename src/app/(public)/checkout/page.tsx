'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Trash2,
  Ticket,
  Sparkles,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { api } from '@/api/axios';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const cartCourses = [
  {
    id: 'react-nextjs',
    title: 'The Complete React & Next.js Bootcamp',
    instructor: 'Sarah Johnson',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
    price: 499,
    originalPrice: 3499,
    duration: '42 hours',
    level: 'Beginner',
  },
  {
    id: 'typescript-masterclass',
    title: 'Advanced TypeScript Masterclass',
    instructor: 'David Miller',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
    price: 699,
    originalPrice: 4299,
    duration: '28 hours',
    level: 'Intermediate',
  },
];

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState('');

  const subtotal = useMemo(
    () =>
      cartCourses.reduce(
        (acc, course) => acc + course.price,
        0
      ),
    []
  );

  const discount = useMemo(
    () =>
      cartCourses.reduce(
        (acc, course) =>
          acc + (course.originalPrice - course.price),
        0
      ),
    []
  );

  const total = subtotal;

  const handleCheckout = async () => {
    try {
      setLoading(true);

      // Example: checkout first course
      // Replace with your real API
      const courseId = cartCourses[0].id;

      const { data } = await api.post(
        `/payments/checkout/${courseId}`
      );

      // FREE COURSE
      if (data.data.type === 'free') {
        window.location.href = `/learn/${courseId}`;
        return;
      }

      const options = {
        key: data.data.razorpayKeyId,
        amount: data.data.amount,
        currency: data.data.currency,
        name: 'Smart Skills India',
        description: data.data.courseName,
        image: data.data.courseImage,
        order_id: data.data.razorpayOrderId,

        prefill: {
          name: data.data.studentName,
          email: data.data.studentEmail,
        },

        theme: {
          color: '#7c3aed',
        },

        handler: async function (response: any) {
          try {
            await api.post('/payments/verify', {
              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,

              dbOrderId: data.data.dbOrderId,
            });

            window.location.href = `/learn/${courseId}`;
          } catch (err) {
            console.error(err);
            alert('Payment verification failed');
          }
        },

        modal: {
          ondismiss: () => {
            console.log(
              'Payment popup closed by user'
            );
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <main className="min-h-screen bg-[#f5f7fb] pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* TOP HEADER */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold mb-5">
              <ShieldCheck className="w-4 h-4" />
              100% Secure Checkout
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Complete Your Purchase
            </h1>

            <p className="text-gray-500 mt-3 text-lg max-w-2xl">
              Unlock premium courses and start learning
              from industry experts today.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">
            {/* LEFT */}
            <div className="space-y-8">
              {/* BENEFITS */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  'Lifetime Access',
                  'Certificate Included',
                  'Mobile & TV Access',
                ].map((item) => (
                  <div
                    key={item}
                    className="bg-white border border-gray-200 rounded-2xl p-5"
                  >
                    <CheckCircle2 className="w-6 h-6 text-violet-600 mb-3" />

                    <p className="font-semibold text-gray-800">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* BILLING */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-violet-700" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Billing Information
                    </h2>

                    <p className="text-sm text-gray-500">
                      Enter your details below
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="h-14 rounded-2xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-violet-300"
                  />

                  <input
                    type="text"
                    placeholder="Last Name"
                    className="h-14 rounded-2xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-violet-300"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="sm:col-span-2 h-14 rounded-2xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-violet-300"
                  />

                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="sm:col-span-2 h-14 rounded-2xl border border-gray-200 px-4 outline-none focus:ring-2 focus:ring-violet-300"
                  />
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                  <Lock className="w-4 h-4" />
                  Your information is encrypted & secure
                </div>
              </div>

              {/* PAYMENT CARD */}
              <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-8 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <p className="text-white/70 text-sm mb-2">
                    Payment Partner
                  </p>

                  <h2 className="text-3xl font-black mb-4">
                    Razorpay Secure Payments
                  </h2>

                  <p className="text-white/80 leading-relaxed max-w-xl">
                    Pay securely using UPI, Cards,
                    Netbanking, Wallets and more.
                  </p>

                  <div className="flex flex-wrap gap-3 mt-6">
                    {[
                      'UPI',
                      'Visa',
                      'Mastercard',
                      'Paytm',
                      'Netbanking',
                    ].map((item) => (
                      <div
                        key={item}
                        className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-sm font-medium"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <aside className="sticky top-28">
              <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
                {/* HEADER */}
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Order Summary
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    {cartCourses.length} courses added
                  </p>
                </div>

                {/* COURSES */}
                <div className="max-h-[420px] overflow-y-auto">
                  {cartCourses.map((course) => (
                    <div
                      key={course.id}
                      className="p-5 border-b border-gray-100"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-28 h-20 rounded-2xl overflow-hidden shrink-0">
                          <Image
                            src={course.image}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/courses/${course.id}`}
                            className="font-semibold text-sm line-clamp-2 hover:text-violet-700 transition"
                          >
                            {course.title}
                          </Link>

                          <p className="text-xs text-gray-500 mt-1">
                            by {course.instructor}
                          </p>

                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                            <span>{course.duration}</span>
                            <span>•</span>
                            <span>{course.level}</span>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-lg">
                                ₹{course.price}
                              </span>

                              <span className="text-sm line-through text-gray-400">
                                ₹{course.originalPrice}
                              </span>
                            </div>

                            <button className="text-red-500 hover:text-red-600 transition">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* COUPON */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Ticket className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                      <input
                        type="text"
                        placeholder="Coupon code"
                        value={coupon}
                        onChange={(e) =>
                          setCoupon(e.target.value)
                        }
                        className="w-full h-12 rounded-2xl border border-gray-200 pl-11 pr-4 outline-none focus:ring-2 focus:ring-violet-300"
                      />
                    </div>

                    <button className="h-12 px-5 rounded-2xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition">
                      Apply
                    </button>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>

                    <div className="flex items-center justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>

                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                      <span className="text-xl font-bold">
                        Total
                      </span>

                      <span className="text-3xl font-black">
                        ₹{total}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full h-14 rounded-2xl bg-violet-600 hover:bg-violet-700 transition text-white font-bold text-lg mt-6 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay Securely with Razorpay
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-gray-500 leading-relaxed mt-4">
                    By completing your purchase, you agree
                    to our Terms & Privacy Policy.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

    </>
  );
}