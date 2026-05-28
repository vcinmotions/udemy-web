'use client';

import Image from 'next/image';
import {
  Sparkles,
  BookOpen,
  BadgeCheck,
  Layers3,
  ShieldCheck,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Tailored Brilliance',
    description:
      'We craft educational resources that align perfectly with your institution’s curriculum, goals, and learning vision.',
  },
  {
    icon: BadgeCheck,
    title: 'Excellence in Every Page',
    description:
      'Every print material is designed with premium quality standards to deliver the best learning experience.',
  },
  {
    icon: Layers3,
    title: 'Brand Harmony',
    description:
      'Your institution’s identity shines across every book and study material, creating a unified learning journey.',
  },
  {
    icon: BookOpen,
    title: 'Flexibility Redefined',
    description:
      'Enjoy on-demand printing solutions that reduce waste while giving you complete flexibility over your orders.',
  },
  {
    icon: ShieldCheck,
    title: 'Dedicated Support',
    description:
      'Our expert team supports you throughout the entire process — from customization to final delivery.',
  },
  {
    icon: Users,
    title: 'Educational Partnership',
    description:
      'We are more than a provider — we are your trusted partners in building a smarter educational future.',
  },
];

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles size={16} />
              Welcome to Smart Skills India
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Where Learning Meets Innovation
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Embark on a journey of educational excellence with
              Smart Skills India — your trusted destination for
              captivating and customized print materials designed
              for schools, institutions, and modern learning
              environments.
            </p>

            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              We create immersive educational experiences where
              your institution’s identity is seamlessly integrated
              into every book and study material, making learning
              both attractive and effective.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90">
                Explore Services
              </button>

              <button className="rounded-xl border border-border bg-white px-6 py-3 font-semibold text-foreground transition hover:bg-muted">
                Contact Us
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="absolute inset-0 rounded-[32px] bg-primary/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-border bg-white shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop"
                alt="Smart Skills India"
                width={1200}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="mx-auto mt-24 max-w-7xl px-4 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-foreground">
            Why Choose Smart Skills India?
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            We combine creativity, innovation, and educational
            expertise to deliver customized learning materials that
            elevate your institution’s learning experience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={28} />
                </div>

                <h3 className="mb-3 text-2xl font-bold text-foreground">
                  {feature.title}
                </h3>

                <p className="leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="mx-auto mt-24 max-w-7xl px-4 lg:px-8">
        <div className="overflow-hidden rounded-[36px] border border-border bg-gradient-to-br from-primary to-primary/80 px-8 py-16 text-white lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold md:text-5xl">
              Redefining Educational Experiences
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/90">
              Smart Skills India isn’t just a provider — we are
              your partners in building dynamic and engaging
              learning environments that reflect your institution’s
              vision.
            </p>

            <p className="mt-4 text-lg leading-8 text-white/90">
              Together, we create educational materials that
              inspire students, empower institutions, and pave the
              way for a brighter educational future.
            </p>

            <div className="mt-10">
              <button className="rounded-xl bg-white px-8 py-3 font-semibold text-primary transition hover:scale-105">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}