"use client";

import React, { useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Send,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "apoorvawalia01@gmail.com",
    href: "mailto:apoorvawalia01@gmail.com",
    color: "emerald",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/apoorvaww",
    href: "https://github.com/apoorvaww",
    color: "purple",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/apoorva-walia",
    href: "https://linkedin.com/in/apoorva-walia",
    color: "blue",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mandi, Himachal Pradesh, India",
    href: null,
    color: "pink",
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string }> = {
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
  },
  blue: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
  },
  purple: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
  },
  pink: {
    border: "border-pink-500/30",
    bg: "bg-pink-500/10",
    text: "text-pink-400",
  },
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Wire up to Resend / Formspree / your own API route
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  }

  return (
    <section
      id="contact"
      className="relative bg-black text-white overflow-hidden py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-neutral-800 to-transparent" />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">
        {/* Section pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-1.5 text-sm text-neutral-400">
          <MessageSquare className="h-4 w-4" />
          Contact
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Get In Touch.
        </h2>
        <div className="mb-5 h-1 w-24 rounded-full bg-emerald-500" />

        <p className="text-neutral-400 text-base leading-relaxed max-w-xl mb-14">
          I&apos;m open to full-time roles, freelance projects, and interesting
          collaborations. Drop a message and I&apos;ll get back to you soon.
        </p>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* ── Left — contact cards ── */}
          <div className="flex flex-col gap-4">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              const c = colorMap[link.color];
              const inner = (
                <div
                  className={`flex items-center gap-4 rounded-2xl border ${c.border} ${c.bg} p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${c.border} ${c.bg}`}
                  >
                    <Icon className={`h-5 w-5 ${c.text}`} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600 mb-0.5">
                      {link.label}
                    </p>
                    <p className="text-sm text-neutral-200 break-all">
                      {link.value}
                    </p>
                  </div>
                </div>
              );

              return link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  {inner}
                </a>
              ) : (
                <div key={link.label}>{inner}</div>
              );
            })}

            {/* Availability */}
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-sm text-emerald-400">
                Currently open to opportunities
              </span>
            </div>
          </div>

          {/* ── Right — form card (same shell as hero code card) ── */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 backdrop-blur-xl p-6 shadow-2xl">
            {/* Window chrome */}
            <div className="mb-5 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            {sent ? (
              <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                <CheckCircle2 className="h-12 w-12 text-emerald-400" />
                <h3 className="text-xl font-semibold text-white">
                  Message sent!
                </h3>
                <p className="text-sm text-neutral-500">
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", message: "" });
                  }}
                  className="mt-2 rounded-xl border border-neutral-700 px-5 py-2 text-sm text-neutral-300 hover:border-neutral-500 hover:text-white transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs text-neutral-500">
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-neutral-500">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-colors"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs text-neutral-500">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full resize-none rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition-all hover:bg-neutral-200 disabled:opacity-60 active:scale-95"
                >
                  {loading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="mt-20 text-center text-xs text-neutral-800">
          Built with Next.js · Tailwind CSS · ShadCN — Apoorva Walia © 2025
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-neutral-800 to-transparent" />
    </section>
  );
}
