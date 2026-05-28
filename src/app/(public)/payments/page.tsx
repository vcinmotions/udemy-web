'use client';

import { useState } from 'react';

import {
  CreditCard,
  Wallet,
  Landmark,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  BadgeIndianRupee,
} from 'lucide-react';

const faqs = [
  {
    question: 'What is an EMI payment option?',
    answer:
      'The EMI or Equated Monthly Instalment payment option allows you to pay for your orders in easy monthly installments, provided you have a card from a partner bank.',
  },
  {
    question: 'How does the COD payment option work?',
    answer:
      'While making your purchase, select the Cash on Delivery payment option. You can then pay in cash when our logistics partner delivers your order to you. Please note that this option is only available at select PIN codes.',
  },
  {
    question: 'Which payment methods are accepted?',
    answer:
      'We accept Debit Cards, Credit Cards, UPI, Net Banking, Wallets, EMI options, and Cash on Delivery in selected locations.',
  },
  {
    question: 'Is my payment information secure?',
    answer:
      'Yes. All transactions are processed through secure and encrypted payment gateways to ensure maximum protection of your payment details.',
  },
  {
    question: 'How long does payment confirmation take?',
    answer:
      'Most payments are confirmed instantly. However, certain banking methods may take a few minutes depending on your bank or payment provider.',
  },
];

export default function PaymentFaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* HERO */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <ShieldCheck size={16} />
            Secure Payments
          </div>

          <h1 className="text-4xl font-extrabold text-foreground md:text-5xl">
            Payment Information & FAQs
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Learn more about payment options, EMI plans, Cash on
            Delivery, and secure transactions at SmartSkills India.
          </p>
        </div>

        {/* PAYMENT METHODS */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[28px] border border-border bg-white p-7 shadow-sm">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <CreditCard size={28} />
            </div>

            <h3 className="mb-3 text-2xl font-bold text-foreground">
              Cards
            </h3>

            <p className="leading-7 text-muted-foreground">
              Pay securely using Debit Cards and Credit Cards from
              leading banks.
            </p>
          </div>

          <div className="rounded-[28px] border border-border bg-white p-7 shadow-sm">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Wallet size={28} />
            </div>

            <h3 className="mb-3 text-2xl font-bold text-foreground">
              UPI & Wallets
            </h3>

            <p className="leading-7 text-muted-foreground">
              Use UPI apps and digital wallets for fast and
              hassle-free payments.
            </p>
          </div>

          <div className="rounded-[28px] border border-border bg-white p-7 shadow-sm">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Landmark size={28} />
            </div>

            <h3 className="mb-3 text-2xl font-bold text-foreground">
              Net Banking
            </h3>

            <p className="leading-7 text-muted-foreground">
              Transfer payments directly from your bank account
              using secure banking gateways.
            </p>
          </div>

          <div className="rounded-[28px] border border-border bg-white p-7 shadow-sm">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <BadgeIndianRupee size={28} />
            </div>

            <h3 className="mb-3 text-2xl font-bold text-foreground">
              EMI & COD
            </h3>

            <p className="leading-7 text-muted-foreground">
              Flexible EMI options and Cash on Delivery available
              at selected locations.
            </p>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="rounded-[32px] border border-border bg-white p-6 shadow-sm md:p-10">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-lg text-muted-foreground">
              Find answers to the most common payment-related
              questions.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-border"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between bg-white px-6 py-5 text-left transition hover:bg-muted/40"
                  >
                    <span className="pr-4 text-lg font-semibold text-foreground">
                      {faq.question}
                    </span>

                    {isOpen ? (
                      <ChevronUp
                        size={20}
                        className="text-primary"
                      />
                    ) : (
                      <ChevronDown
                        size={20}
                        className="text-muted-foreground"
                      />
                    )}
                  </button>

                  {isOpen && (
                    <div className="border-t border-border px-6 py-5">
                      <p className="leading-8 text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SUPPORT BOX */}
        <div className="mt-14 rounded-[28px] border border-primary/20 bg-primary/5 p-8">
          <h3 className="text-2xl font-bold text-foreground">
            Need Payment Assistance?
          </h3>

          <p className="mt-3 leading-7 text-muted-foreground">
            Our support team is available to help you with payment
            issues, transaction queries, EMI options, and order
            assistance.
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