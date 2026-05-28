'use client';

import {
  ShieldCheck,
  FileText,
  Scale,
  AlertTriangle,
  Mail,
} from 'lucide-react';

const sections = [
  {
    icon: ShieldCheck,
    title: '1. Acceptance of Terms',
    content:
      'By accessing or using SmartSkills India’s website, you agree to comply with and be bound by these Terms of Use. If you do not agree with these terms, please do not use our website.',
  },
  {
    icon: FileText,
    title: '2. Use License',
    content:
      'Permission is granted to temporarily download one copy of the materials on SmartSkills India’s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.',
    list: [
      'Modify or copy the materials.',
      'Use the materials for any commercial purpose or public display.',
      'Attempt to decompile or reverse engineer any software contained on SmartSkills India’s website.',
      'Remove any copyright or proprietary notations from the materials.',
      'Transfer the materials to another person or mirror the materials on another server.',
    ],
  },
  {
    icon: AlertTriangle,
    title: '3. Disclaimer',
    content:
      'The materials on SmartSkills India’s website are provided on an “as is” basis. SmartSkills India makes no warranties, expressed or implied, and hereby disclaims all other warranties including implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.',
  },
  {
    icon: Scale,
    title: '4. Limitations',
    content:
      'In no event shall SmartSkills India or its suppliers be liable for any damages including, without limitation, damages for loss of data or profit, or due to business interruption arising out of the use or inability to use the materials on SmartSkills India’s website.',
  },
  {
    icon: FileText,
    title: '5. Revisions and Errata',
    content:
      'The materials appearing on SmartSkills India’s website may include technical, typographical, or photographic errors. SmartSkills India does not warrant that any of the materials on its website are accurate, complete, or current.',
  },
  {
    icon: Scale,
    title: '6. Governing Law',
    content:
      'These terms and conditions are governed by and construed in accordance with the laws of Maharashtra, India, and you irrevocably submit to the exclusive jurisdiction of the courts located in Maharashtra.',
  },
  {
    icon: Mail,
    title: '7. Contact Us',
    content:
      'If you have any questions or concerns regarding our Terms of Use, please contact us at info@smartskillsindia.com.',
  },
];

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        {/* HERO */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <ShieldCheck size={16} />
            SmartSkills India Policies
          </div>

          <h1 className="text-4xl font-extrabold text-foreground md:text-5xl">
            Terms of Use
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Please read these Terms of Use carefully before using
            SmartSkills India’s website and services.
          </p>
        </div>

        {/* TERMS CARDS */}
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

                {section.list && (
                  <ul className="mt-5 space-y-3">
                    {section.list.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <div className="mt-2 h-2 w-2 rounded-full bg-primary" />

                        <span className="leading-7">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTTOM NOTE */}
        <div className="mt-14 rounded-[28px] border border-primary/20 bg-primary/5 p-8">
          <h3 className="text-2xl font-bold text-foreground">
            Need Assistance?
          </h3>

          <p className="mt-3 leading-7 text-muted-foreground">
            If you require additional clarification regarding our
            Terms of Use or policies, feel free to contact our
            support team anytime.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="mailto:info@smartskillsindia.com"
              className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}