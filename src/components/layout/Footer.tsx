'use client';

import React from 'react';
import Link from 'next/link';

import { Globe } from 'lucide-react';

import AppLogo from '@/components/ui/AppLogo';

const footerLinks = {
  Company: [
    {
      name: 'About Us',
      href: '/about-us',
    },
    {
      name: 'Careers',
      href: '/#',
    },
    {
      name: 'Press',
      href: '/#',
    },
    {
      name: 'Blog',
      href: '/#',
    },
    {
      name: 'Investors',
      href: '/#',
    },
  ],

  Learners: [
    {
      name: 'SmartSkills Business',
      href: '/#',
    },
    {
      name: 'Mobile App',
      href: '/#',
    },
    {
      name: 'Affiliate Program',
      href: '/#',
    },
    {
      name: 'Scholarships',
      href: '/#',
    },
  ],

  Instructors: [
    {
      name: 'Become an Instructor',
      href: '/signup/instructor',
    },
    {
      name: 'Instructor Hub',
      href: '/login',
    },
    {
      name: 'Instructor FAQ',
      href: '/instructor-faq',
    },
  ],

  Support: [
    {
      name: 'Contact Us',
      href: '/contact',
    },
    {
      name: 'Privacy Policy',
      href: '/privacy-policy',
    },
    {
      name: 'Refund Return Policy',
      href: '/refund-policy',
    },
    {
      name: 'Cancellation Policy',
      href: '/cancle-policy',
    },
    {
      name: 'Payments',
      href: '/payments',
    },
    {
      name: 'Terms of Service',
      href: '/terms-of-use',
    },
  ],
};

const socialLinks = [
  {
    // icon: Facebook,
    href: 'https://facebook.com',
    label: 'Facebook',
  },
  {
    // icon: Instagram,
    href: 'https://instagram.com',
    label: 'Instagram',
  },
  {
    // icon: Linkedin,
    href: 'https://linkedin.com',
    label: 'LinkedIn',
  },
  {
    // icon: Youtube,
    href: 'https://youtube.com',
    label: 'YouTube',
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#101010] text-white">
      <div className="mx-auto max-w-screen-2xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5">
          {/* BRAND */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="mb-5 flex items-center gap-2">
              <AppLogo size={164} />
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-gray-400">
              Welcome to Smart Skills India – Where Learning Meets
              Innovation! Embark on a journey of educational
              excellence with Smart Skills India, your go-to
              learning platform.
            </p>

            <div className="mt-10 space-y-2">
              <p className="max-w-xs text-sm leading-relaxed text-gray-400">
                <span className="font-semibold text-white">
                  Address:
                </span>{' '}
                33/A 2nd Floor, Gami Industrial Park, Navi Mumbai,
                Maharashtra
              </p>

              <p className="text-sm leading-relaxed text-gray-400">
                <span className="font-semibold text-white">
                  Phone:
                </span>{' '}
                +91 9867745266 / +91 7738184456
              </p>

              <p className="text-sm leading-relaxed text-gray-400">
                <span className="font-semibold text-white">
                  Email:
                </span>{' '}
                info@smartskillsindia.com
              </p>
            </div>

            {/* SOCIAL LINKS */}
            {/* <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={`social-link-${index}`}
                    href={social.href}
                    target="_blank"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </Link>
                );
              })}
            </div> */}
          </div>

          {/* FOOTER LINKS */}
          {Object.entries(footerLinks).map(
            ([section, links]) => (
              <div key={`footer-section-${section}`}>
                <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-300">
                  {section}
                </h4>

                <ul className="space-y-3">
                  {links.map((link) => (
                    <li
                      key={`footer-link-${section}-${link.name}`}
                    >
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 transition-colors hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        {/* BOTTOM */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-gray-500">
            © 2026 SmartSkills India. All Rights Reserved.
          </p>

          <button className="flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 transition-colors hover:border-gray-500">
            <Globe size={16} className="text-gray-400" />

            <span className="text-sm text-gray-400">
              English
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}