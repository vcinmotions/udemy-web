'use client';

import {
  BadgeDollarSign,
  ShieldCheck,
  RefreshCcw,
  Clock3,
  Ban,
  Mail,
} from 'lucide-react';

const sections = [
  {
    icon: BadgeDollarSign,
    title: '1. Overview',
    content:
      'Thank you for shopping with SmartSkills India. We value your trust and strive to ensure customer satisfaction. If you are not entirely satisfied with your purchase, we are here to help.',
  },
  {
    icon: ShieldCheck,
    title: '2. Eligibility for Refund',
    content:
      'To be eligible for a refund, the following conditions must be met:',
    list: [
      'The refund request must be made within 7 days of the purchase date.',
      'The item or service must be unused and in the same condition as received.',
      'The item must be in its original packaging, where applicable.',
      'Valid proof of purchase or order confirmation must be provided.',
    ],
  },
  {
    icon: RefreshCcw,
    title: '3. Refund Process',
    content:
      'To request a refund, please contact our customer service team at customerservice@smartskillsindia.com with your order details and the reason for your refund request. Our team will review the request and provide further instructions regarding the process.',
  },
  {
    icon: Clock3,
    title: '4. Refund Timeframe',
    content:
      'Once your return or refund request is received and inspected, we will notify you regarding the approval or rejection of your refund. If approved, the refund will be processed and credited back to your original payment method within 7–10 business days.',
  },
  {
    icon: Ban,
    title: '5. Non-Refundable Items',
    content:
      'Certain products and services are non-refundable. These may include:',
    list: [
      'Downloaded digital products or eBooks.',
      'Customized educational materials.',
      'Services already delivered or completed.',
      'Promotional or discounted items marked as non-refundable.',
    ],
  },
  {
    icon: Mail,
    title: '6. Contact Us',
    content:
      'If you have any questions or concerns regarding our Refund Policy, please contact us at info@smartskillsindia.com.',
  },
];

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        {/* HERO */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <BadgeDollarSign size={16} />
            SmartSkills India Policies
          </div>

          <h1 className="text-4xl font-extrabold text-foreground md:text-5xl">
            Refund Policy
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            We aim to provide the best experience for our
            customers. Please review our refund policy carefully
            before making a purchase.
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

        {/* SUPPORT SECTION */}
        <div className="mt-14 rounded-[28px] border border-primary/20 bg-primary/5 p-8">
          <h3 className="text-2xl font-bold text-foreground">
            Need Help With A Refund?
          </h3>

          <p className="mt-3 leading-7 text-muted-foreground">
            Our support team is here to assist you with refund
            requests, order concerns, and policy-related questions.
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