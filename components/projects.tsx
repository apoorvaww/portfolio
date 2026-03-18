"use client";

import React from "react";
import { Layers, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "LPUConnect — A Community Platform For LPU.",
    description:
      "A full-stack community platform enabling LPU students and alumni to collaborate, share resources, and form project teams. Features secure role-based access via Clerk, scalable PostgreSQL backend with Drizzle ORM, and mentorship matchmaking workflows.",
    tags: ["Next.js", "Drizzle ORM", "NeonDB", "Clerk", "TypeScript"],
    status: "Ongoing",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "YouTube Chatbot — RAG Pipeline Over Transcripts.",
    description:
      "A Retrieval-Augmented Generation pipeline that extracts insights and answers user queries from YouTube video transcripts. Orchestrated with LangChain, semantic embeddings from HuggingFace Sentence Transformers, and Qdrant for vector search.",
    tags: ["Next.js", "LangChain", "Qdrant", "HuggingFace", "RAG"],
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "MysteryMsg — Anonymous Messaging Platform.",
    description:
      "A full-stack anonymous messaging platform built with Next.js & TypeScript. Implements NextAuth.js with email verification via Resend, and integrates Google Gemini API to generate AI-powered personalized quick replies.",
    tags: ["Next.js", "NextAuth.js", "Gemini API", "Resend", "ShadCN"],
    status: "Live",
    liveUrl: "#",
    githubUrl: "#",
  },
];

// Rotating tag colors — matching the reference's colorful pill style
const tagColors = [
  "border-blue-500/40 text-blue-300 bg-blue-500/10",
  "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
  "border-purple-500/40 text-purple-300 bg-purple-500/10",
  "border-yellow-500/40 text-yellow-300 bg-yellow-500/10",
  "border-pink-500/40 text-pink-300 bg-pink-500/10",
  "border-cyan-500/40 text-cyan-300 bg-cyan-500/10",
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative bg-black text-white overflow-hidden py-24"
    >
      {/* Top separator */}
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
          <Layers className="h-4 w-4" />
          Projects
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          My Projects
        </h2>
        <div className="mb-5 h-1 w-24 rounded-full bg-emerald-500" />

        <p className="text-neutral-400 text-base leading-relaxed max-w-3xl mb-14">
          I love to build cool projects. Here you&apos;ll find a curated
          collection of my technical work — each one represents a journey of
          problem-solving, continuous learning, and shipping real products.
        </p>

        {/* Project card grid — matches reference 3-column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <div
              key={i}
              className="group flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
            >
              {/* Status dot */}
              <div className="mb-4 flex items-center gap-2">
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${
                    p.status === "Live" ? "bg-emerald-400" : "bg-yellow-400"
                  }`}
                />
                <span
                  className={`text-xs font-mono ${
                    p.status === "Live" ? "text-emerald-400" : "text-yellow-400"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white leading-snug mb-3">
                {p.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-neutral-500 leading-relaxed mb-5 flex-1">
                {p.description}
              </p>

              {/* Tag pills — colorful like reference */}
              <div className="mb-6 flex flex-wrap gap-2">
                {p.tags.map((tag, j) => (
                  <span
                    key={tag}
                    className={`rounded-full border px-3 py-0.5 text-xs ${
                      tagColors[j % tagColors.length]
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Buttons — "Visit Project" like reference + GitHub */}
              <div className="flex gap-3 mt-auto">
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition-all hover:bg-neutral-200 active:scale-95"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Project
                </a>
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm text-neutral-300 transition-all hover:border-neutral-600 hover:text-white active:scale-95"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/apoorvaww"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-900 px-6 py-3 text-sm text-neutral-300 transition-all hover:border-emerald-500/40 hover:text-emerald-400"
          >
            <Github className="h-4 w-4" />
            View all projects on GitHub
          </a>
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-neutral-800 to-transparent" />
    </section>
  );
}