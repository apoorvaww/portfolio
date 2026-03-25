"use client";

import React from "react";
import { Lightbulb } from "lucide-react";

// All icons from devicons CDN — colored SVGs
const skillCategories = [
  {
    label: "Programming Languages",
    skills: [
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      },
    ],
  },
  {
    label: "Frontend",
    skills: [
      {
        name: "React.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Next.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        invert: true,
      },
      {
        name: "HTML5",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      },
    ],
  },
  {
    label: "Backend & Databases",
    skills: [
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Express.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        invert: true,
      },
      {
        name: "MongoDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
      {
        name: "NeonDB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      },
    ],
  },
  {
    label: "AI / LLM",
    skills: [
      {
        name: "LangChain",
        icon: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4",
      },
      {
        name: "HuggingFace",
        icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
      },
      {
        name: "Gemini API",
        icon: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
      },
      {
        name: "Qdrant",
        icon: "https://avatars.githubusercontent.com/u/73504361?s=200&v=4",
      },
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
    ],
  },
  {
    label: "Tools & Platforms",
    skills: [
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "GitHub",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        invert: true,
      },
      {
        name: "Vercel",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
        invert: true,
      },
      {
        name: "VS Code",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      },
      {
        name: "Postman",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
      },
    ],
  },
];

function SkillIcon({
  name,
  icon,
  invert,
}: {
  name: string;
  icon: string;
  invert?: boolean;
}) {
  return (
    <div className="group flex flex-col items-center gap-3">
      {/* Icon container */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900 transition-all duration-300 group-hover:border-emerald-500/50 group-hover:bg-neutral-800 group-hover:-translate-y-1 group-hover:shadow-[0_8px_24px_rgba(16,185,129,0.15)]">
        <img
          src={icon}
          alt={name}
          className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-110"
          style={invert ? { filter: "invert(1)" } : {}}
        />
      </div>
      {/* Name below icon — exactly like reference */}
      <span className="text-xs text-neutral-500 group-hover:text-emerald-400 transition-colors text-center">
        {name}
      </span>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
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
          <Lightbulb className="h-4 w-4" />
          My Skills
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
          My Technical Experience/Skills
        </h2>
        <div className="mb-5 h-1 w-24 rounded-full bg-emerald-500" />

        <p className="text-neutral-400 text-base leading-relaxed max-w-2xl mb-14">
          I have a solid understanding of full-stack web development and AI/ML
          systems. I specialize in building scalable applications using Next.js,
          TypeScript, Node.js, and LangChain-based LLM pipelines with vector
          databases.
        </p>

        {/* Categories */}
        <div className="space-y-14">
          {skillCategories.map((cat) => (
            <div key={cat.label}>
              {/* Category heading — matches reference exactly */}
              <h3 className="text-xl font-semibold text-white mb-8">
                {cat.label}
              </h3>
              {/* Icon grid */}
              <div className="flex flex-wrap gap-8">
                {cat.skills.map((skill) => (
                  <SkillIcon
                    key={skill.name + cat.label}
                    name={skill.name}
                    icon={skill.icon}
                    invert={skill.invert}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-neutral-800 to-transparent" />
    </section>
  );
}
