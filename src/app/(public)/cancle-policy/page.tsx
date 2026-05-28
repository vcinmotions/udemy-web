'use client';

import {
  Ban,
  FileText,
  AlertTriangle,
  BadgeAlert,
  Mail,
} from 'lucide-react';

const sections = [
  {
    icon: FileText,
    title: '1. Cancellation Policy Overview',
    content:
      'SmartSkills India strives to process all customer orders efficiently and professionally. This Cancellation Policy outlines the terms applicable when an accepted order is canceled by the customer.',
  },
  {
    icon: Ban,
    title: '2. Order Cancellation',
    content:
      'If any order placed by the Customer and accepted by SmartSkills India (SSI) is canceled, the Customer may be required to pay reasonable cancellation charges.',
  },
  {
    icon: AlertTriangle,
    title: '3. Cancellation Charges',
    content:
      'Cancellation charges will include non-recoverable costs, operational expenses, commitments, and resources incurred by SSI from the time of order placement until the date of written notice of cancellation.',
  },
  {
    icon: BadgeAlert,
    title: '4. Important Conditions',
    content:
      'The applicable cancellation amount may vary depending on the stage of production, customization work completed, procurement of materials, printing progress, and other associated commitments already undertaken by SSI.',
    list: [
      'Customized or printed materials may carry higher cancellation charges.',
      'Orders already processed or dispatched may not be eligible for cancellation.',
      'Written notice of cancellation is mandatory.',
      'SSI reserves the right to determine reasonable cancellation costs based on incurred expenses.',
    ],
  },
  {
    icon: Mail,
    title: '5. Contact Us',
    content:
      'For cancellation requests or questions regarding this policy, please contact SmartSkills India at info@smartskillsindia.com.',
  },
];

export default function CancellationPolicyPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        {/* HERO */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Ban size={16} />
            SmartSkills India Policies
          </div>

          <h1 className="text-4xl font-extrabold text-foreground md:text-5xl">
            Cancellation Policy
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Please review our cancellation terms carefully before
            placing an order with SmartSkills India.
          </p>
        </div>

        {/* POLICY CONTENT */}
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

        {/* SUPPORT BOX */}
        <div className="mt-14 rounded-[28px] border border-primary/20 bg-primary/5 p-8">
          <h3 className="text-2xl font-bold text-foreground">
            Need Cancellation Assistance?
          </h3>

          <p className="mt-3 leading-7 text-muted-foreground">
            Our support team can assist you with cancellation
            requests, policy clarification, and order-related
            concerns.
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