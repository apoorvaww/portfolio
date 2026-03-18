"use client";

import React from "react";
import { GraduationCap, Trophy, Code2, GitMerge } from "lucide-react";

const educationItems = [
  {
    degree: "B.Tech — Computer Science (AI/ML)",
    institution: "Lovely Professional University",
    location: "Jalandhar, Punjab",
    period: "Aug 2023 – Present",
    grade: "CGPA: 8.89",
    description:
      "Pursuing a Bachelor's in Computer Science with specialization in Artificial Intelligence and Machine Learning. Coursework covers Data Structures & Algorithms, Machine Learning, Deep Learning, Database Systems, and Software Engineering.",
    icon: GraduationCap,
    color: "emerald",
  },
  {
    degree: "Intermediate (Class XII)",
    institution: "Jawahar Navodaya Vidyalaya",
    location: "Mandi, Himachal Pradesh",
    period: "Apr 2020 – Mar 2022",
    grade: "Percentage: 92.3%",
    description:
      "Completed senior secondary education with a focus on Science (PCM + CS). Developed foundational programming skills and a strong aptitude for Mathematics.",
    icon: GraduationCap,
    color: "blue",
  },
];

const achievementItems = [
  {
    title: "Google Adversarial Nibbler — Honorary Award",
    org: "Google",
    period: "2024",
    description:
      "Evaluated robustness of a large-scale text-to-image model by designing adversarial prompts to test safety and reliability under edge-case scenarios. Recognized for innovative test inputs.",
    icon: Trophy,
    color: "yellow",
  },
  {
    title: "Open Source Contributions",
    org: "GitHub",
    period: "Ongoing",
    description:
      "Contributed to real-world open-source repositories through feature enhancements and issue resolution in collaborative development environments.",
    icon: GitMerge,
    color: "pink",
  },
];

const colorMap: Record<
  string,
  { dot: string; border: string; bg: string; text: string; ring: string }
> = {
  emerald: {
    dot: "bg-emerald-500",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    ring: "ring-emerald-500/20",
  },
  blue: {
    dot: "bg-blue-500",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    ring: "ring-blue-500/20",
  },
  yellow: {
    dot: "bg-yellow-500",
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    ring: "ring-yellow-500/20",
  },
  purple: {
    dot: "bg-purple-500",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    ring: "ring-purple-500/20",
  },
  pink: {
    dot: "bg-pink-500",
    border: "border-pink-500/30",
    bg: "bg-pink-500/10",
    text: "text-pink-400",
    ring: "ring-pink-500/20",
  },
};

export default function Education() {
  return (
    <section
      id="education"
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
          <GraduationCap className="h-4 w-4" />
          Education &amp; Achievements
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          My Background.
        </h2>
        <div className="mb-5 h-1 w-24 rounded-full bg-emerald-500" />
        <p className="text-neutral-400 text-base leading-relaxed max-w-2xl mb-14">
          Academic background, notable achievements, and milestones that have
          shaped my journey as a developer and engineer.
        </p>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-0 items-start">
          {/* Education timeline */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-emerald-400" />
              Education
            </h3>
            <div className="relative">
              {/* Spine line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-neutral-800" />

              <div className="space-y-8 pl-12">
                {educationItems.map((edu, i) => {
                  const c = colorMap[edu.color];
                  const Icon = edu.icon;
                  return (
                    <div key={i} className="relative">
                      {/* Dot on spine */}
                      <div
                        className={`absolute -left-[2.15rem] top-1 flex h-7 w-7 items-center justify-center rounded-full ${c.bg} ${c.border} border ring-4 ${c.ring}`}
                      >
                        <Icon className={`h-3.5 w-3.5 ${c.text}`} />
                      </div>

                      <div
                        className={`rounded-2xl border ${c.border} ${c.bg} p-5`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <h4 className="text-base font-semibold text-white leading-snug">
                            {edu.degree}
                          </h4>
                          <span
                            className={`text-xs font-mono ${c.text} shrink-0`}
                          >
                            {edu.period}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-400 mb-1">
                          {edu.institution} · {edu.location}
                        </p>
                        <p className={`text-sm font-medium mb-3 ${c.text}`}>
                          {edu.grade}
                        </p>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Achievements timeline */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
              Achievements
            </h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-neutral-800" />

              <div className="space-y-8 pl-12">
                {achievementItems.map((ach, i) => {
                  const c = colorMap[ach.color];
                  const Icon = ach.icon;
                  return (
                    <div key={i} className="relative">
                      <div
                        className={`absolute -left-[2.15rem] top-1 flex h-7 w-7 items-center justify-center rounded-full ${c.bg} ${c.border} border ring-4 ${c.ring}`}
                      >
                        <Icon className={`h-3.5 w-3.5 ${c.text}`} />
                      </div>

                      <div
                        className={`rounded-2xl border ${c.border} ${c.bg} p-5`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <h4 className="text-base font-semibold text-white leading-snug">
                            {ach.title}
                          </h4>
                          <span
                            className={`text-xs font-mono ${c.text} shrink-0`}
                          >
                            {ach.period}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-400 mb-3">
                          {ach.org}
                        </p>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {ach.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-neutral-800 to-transparent" />
    </section>
  );
}
