'use client';

import {
  Mail,
  MapPin,
  Phone,
  Send,
  Clock3,
} from 'lucide-react';

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* HERO */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Send size={16} />
            Contact Smart Skills India
          </div>

          <h1 className="text-4xl font-extrabold text-foreground md:text-5xl">
            Get In Touch With Us
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
            Have questions, inquiries, or partnership ideas?
            We’d love to hear from you. Our team is here to
            support your educational journey.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_420px]">
          {/* CONTACT FORM */}
          <div className="rounded-[32px] border border-border bg-white p-8 shadow-sm lg:p-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                Send Us A Message
              </h2>

              <p className="mt-3 text-muted-foreground">
                Fill out the form below and our team will get back
                to you as soon as possible.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    First Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter first name"
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Last Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter last name"
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="h-12 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Enter subject"
                  className="h-12 w-full rounded-xl border border-border bg-background px-4 outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Write your message..."
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 font-semibold text-white transition hover:opacity-90"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-6">
            {/* ADDRESS */}
            <div className="rounded-[28px] border border-border bg-white p-7 shadow-sm">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MapPin size={28} />
              </div>

              <h3 className="mb-3 text-2xl font-bold text-foreground">
                Office Address
              </h3>

              <p className="leading-7 text-muted-foreground">
                33/A 2nd Floor, Gami Industrial Park 39A,
                MIDC Industrial Area, Pawne, Navi Mumbai,
                Maharashtra 400705
              </p>
            </div>

            {/* PHONE */}
            <div className="rounded-[28px] border border-border bg-white p-7 shadow-sm">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Phone size={28} />
              </div>

              <h3 className="mb-3 text-2xl font-bold text-foreground">
                Phone Numbers
              </h3>

              <div className="space-y-2">
                <p className="text-muted-foreground">
                  +91 9867745266
                </p>

                <p className="text-muted-foreground">
                  +91 7738184456
                </p>
              </div>
            </div>

            {/* EMAIL */}
            <div className="rounded-[28px] border border-border bg-white p-7 shadow-sm">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Mail size={28} />
              </div>

              <h3 className="mb-3 text-2xl font-bold text-foreground">
                Email Address
              </h3>

              <p className="text-muted-foreground">
                info@smartskillsindia.com
              </p>
            </div>

            {/* HOURS */}
            {/* <div className="rounded-[28px] border border-border bg-white p-7 shadow-sm">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Clock3 size={28} />
              </div>

              <h3 className="mb-3 text-2xl font-bold text-foreground">
                Working Hours
              </h3>

              <div className="space-y-2 text-muted-foreground">
                <p>Monday - Saturday</p>
                <p>9:00 AM - 7:00 PM</p>
              </div>
            </div> */}
          </div>
        </div>

        {/* MAP SECTION */}
        <div className="mt-16 overflow-hidden rounded-[32px] border border-border bg-white shadow-sm">
          <iframe
            src="https://www.google.com/maps?q=33/A%202nd%20Floor,%20Gami%20Industrial%20Park%2039A,%20MIDC%20Industrial%20Area,%20Pawne,%20Navi%20Mumbai,%20Maharashtra%20400705&output=embed"
            width="100%"
            height="450"
            loading="lazy"
            className="border-0"
            allowFullScreen
          />
        </div>
      </div>
    </main>
  );
}