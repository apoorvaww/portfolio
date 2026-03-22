"use client";

import React from "react";
import {
  User,
  MapPin,
  Globe,
  Languages,
  Heart,
  Mail,
  Smile,
} from "lucide-react";

const infoRows = [
  {
    icon: Languages,
    label: "Language",
    value: "English, Hindi",
  },
  {
    icon: Globe,
    label: "Nationality",
    value: "Indian",
  },
  {
    icon: Smile,
    label: "Gender",
    value: "Female",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mandi, Himachal Pradesh, India",
  },
  {
    icon: Mail,
    label: "Email",
    value: "apoorvawalia01@gmail.com",
  },
];

const hobbies = [
  "Reading Tech Blogs",
  "Open Source Contributing",
  "Exploring AI Research",
  "Building Side Projects",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-black text-white overflow-hidden py-24"
    >
      {/* Top separator */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-neutral-800 to-transparent" />

      {/* Subtle dot grid overlay — matches reference site texture but dark */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-12">

        {/* Section pill — exactly like reference */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900 px-4 py-1.5 text-sm text-neutral-400">
          <User className="h-4 w-4" />
          About me
        </div>

        {/* Large heading with emerald underline */}
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-2">
          Full-Stack Developer &amp; AI/ML Engineer,
        </h2>
        {/* Underline bar */}
        <div className="mb-8 h-1 w-24 rounded-full bg-emerald-500" />

        {/* Bio paragraph */}
        <p className="text-neutral-400 text-base leading-relaxed max-w-3xl mb-12">
          I am a Full-Stack Developer and AI/ML Engineer from Mandi, Himachal
          Pradesh, India. I&apos;m passionate about building scalable web
          applications and intelligent AI-driven systems. I specialize in
          Next.js, TypeScript, and the MERN stack on the frontend, while on the
          AI side I work with LangChain, vector databases, and LLM pipelines.
          Currently pursuing B.Tech in Computer Science (AI/ML) at Lovely
          Professional University, Jalandhar — CGPA 8.89. Recognized by Google
          for the Adversarial Nibbler Project, and an active open-source
          contributor with 250+ LeetCode problems solved.
        </p>

        {/* Info rows — 3 column grid like reference */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-8">
          {infoRows.map((row) => {
            const Icon = row.icon;
            return (
              <div key={row.label}>
                {/* Label with icon */}
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="h-5 w-5 text-emerald-400" />
                  <span className="text-lg font-semibold text-white">
                    {row.label}
                  </span>
                </div>
                {/* Emerald underline */}
                <div className="mb-3 h-0.5 w-10 rounded-full bg-emerald-500" />
                {/* Value */}
                <div className="flex items-center gap-2 text-sm text-neutral-400">
                  <span className="inline-block h-1.5 w-1.5 rounded-full border border-neutral-500" />
                  {row.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Hobbies */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Heart className="h-5 w-5 text-emerald-400" />
            <span className="text-lg font-semibold text-white">Hobbies</span>
          </div>
          <div className="mb-5 h-0.5 w-10 rounded-full bg-emerald-500" />
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {hobbies.map((h) => (
              <div key={h} className="flex items-center gap-2 text-sm text-neutral-400">
                <span className="inline-block h-1.5 w-1.5 rounded-full border border-neutral-500" />
                {h}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-neutral-800 to-transparent" />
    </section>
  );
}