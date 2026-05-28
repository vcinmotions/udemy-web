'use client';

import {
  Shield,
  Database,
  Lock,
  RefreshCw,
  Users,
  Mail,
  Eye,
} from 'lucide-react';

const sections = [
  {
    icon: Shield,
    title: '1. Introduction',
    content:
      'Welcome to SmartSkills India’s Privacy Policy. This policy outlines how we collect, use, disclose, and protect your information when you use our services and website.',
  },
  {
    icon: Database,
    title: '2. Information We Collect',
    content:
      'We may collect personal information such as names, contact information, email addresses, phone numbers, and other relevant details necessary for providing our services. Information is collected when you provide it to us directly or when you interact with our website.',
  },
  {
    icon: Eye,
    title: '3. How We Use Your Information',
    content:
      'We use the collected information to provide, maintain, and improve our services. Your information may also be used for communication, customer support, personalization of content, and enhancing your overall experience with SmartSkills India.',
  },
  {
    icon: Users,
    title: '4. Information Sharing',
    content:
      'We do not sell, trade, or transfer your personal information to third parties. This excludes trusted partners and service providers who assist us in operating our website or delivering services, provided they agree to keep your information confidential.',
  },
  {
    icon: Lock,
    title: '5. Security',
    content:
      'We implement reasonable technical and organizational measures to protect your personal information. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.',
  },
  {
    icon: RefreshCw,
    title: '6. Changes to This Privacy Policy',
    content:
      'SmartSkills India may update this Privacy Policy from time to time. Any changes will be posted on this page with updated information to keep you informed about how your data is protected.',
  },
  {
    icon: Mail,
    title: '7. Contact Us',
    content:
      'If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at info@smartskillsindia.com.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        {/* HERO SECTION */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Shield size={16} />
            SmartSkills India Policies
          </div>

          <h1 className="text-4xl font-extrabold text-foreground md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Your privacy matters to us. This Privacy Policy
            explains how SmartSkills India collects, uses, and
            safeguards your personal information.
          </p>
        </div>

        {/* POLICY SECTIONS */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;

            return (
              <div
                key={index}
                className="rounded-[28px] border border-border bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={28} />
                </div>

                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  {section.title}
                </h2>

                <p className="leading-8 text-muted-foreground">
                  {section.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* BOTTOM SUPPORT SECTION */}
        <div className="mt-14 rounded-[28px] border border-primary/20 bg-primary/5 p-8">
          <h3 className="text-2xl font-bold text-foreground">
            Questions About Privacy?
          </h3>

          <p className="mt-3 leading-7 text-muted-foreground">
            We are committed to maintaining transparency and
            protecting your personal information. Feel free to
            contact us anytime for clarification regarding our
            privacy practices.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="mailto:info@smartskillsindia.com"
              className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}