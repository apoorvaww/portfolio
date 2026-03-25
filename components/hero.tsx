"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, FileText } from "lucide-react";

// ── Typewriter ────────────────────────────────────────────────────────────────
const ROLES = [
  "Full-Stack Developer",
  "Aspiring AI/ML Engineer",
];

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(current.slice(0, charIdx + 1));
          if (charIdx + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIdx((c) => c + 1);
          }
        } else {
          setDisplay(current.slice(0, charIdx - 1));
          if (charIdx - 1 === 0) {
            setDeleting(false);
            setCharIdx(0);
            setWordIdx((w) => (w + 1) % words.length);
          } else {
            setCharIdx((c) => c - 1);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function RippleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CELL = 40;
    let cols = 0,
      rows = 0;
    let cells: { opacity: number }[] = [];
    let animId: number;
    let intervalId: NodeJS.Timeout;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);

      cols = Math.ceil(canvas.offsetWidth / CELL) + 1;
      rows = Math.ceil(canvas.offsetHeight / CELL) + 1;

      cells = Array.from({ length: cols * rows }, () => ({ opacity: 0 }));
    };

    const rippleFrom = (oc: number, or_: number) => {
      cells.forEach((cell, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const dist = Math.sqrt((c - oc) ** 2 + (r - or_) ** 2);

        setTimeout(() => {
          if (cells[i]) cells[i].opacity = 0.7;
        }, dist * 40);
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const c = Math.floor((e.clientX - rect.left) / CELL);
      const r = Math.floor((e.clientY - rect.top) / CELL);
      const idx = r * cols + c;

      if (cells[idx]) {
        cells[idx].opacity = Math.max(cells[idx].opacity, 0.4);
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      rippleFrom(
        Math.floor((e.clientX - rect.left) / CELL),
        Math.floor((e.clientY - rect.top) / CELL),
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      cells.forEach((cell, i) => {
        if (cell.opacity > 0) {
          cell.opacity = Math.max(0, cell.opacity - 0.012);
        }

        const x = (i % cols) * CELL;
        const y = Math.floor(i / cols) * CELL;

        // grid
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, CELL, CELL);

        // glow
        if (cell.opacity > 0.01) {
          ctx.fillStyle = `rgba(16,185,129,${cell.opacity * 0.2})`;
          ctx.fillRect(x + 1, y + 1, CELL - 2, CELL - 2);

          ctx.strokeStyle = `rgba(16,185,129,${cell.opacity * 0.7})`;
          ctx.strokeRect(x + 0.5, y + 0.5, CELL - 1, CELL - 1);
        }
      });

      animId = requestAnimationFrame(draw);
    };

    resize();

    // initial ripple
    setTimeout(() => {
      rippleFrom(Math.floor(cols / 2), Math.floor(rows / 2));
    }, 1000);

    // auto ripple
    intervalId = setInterval(() => {
      rippleFrom(
        Math.floor(Math.random() * cols),
        Math.floor(Math.random() * rows),
      );
    }, 8000);

    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(intervalId);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
  );
}

export default function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section className="relative min-h-screen bg-[#050505] text-white overflow-hidden flex items-center">
      {/* Full-section animated ripple grid */}
      <RippleCanvas />

      {/* Content — two column, matches screenshot */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-8 md:px-16 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16">
          {/* ── Left ── */}
          <div>
            <p className="text-xs tracking-[0.3em] text-neutral-400 uppercase mb-4">
              Hello, I am
            </p>

            <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-tight mb-4">
              Apoorva Walia
            </h1>

            <p className="text-xl text-neutral-300 mb-4 h-8">
              I&apos;m a{" "}
              <span className="text-emerald-400 font-medium">
                {role}
                <span className="animate-pulse">|</span>
              </span>
            </p>

            <p className="text-base text-neutral-400 max-w-md leading-relaxed mb-8">
              Building scalable full-stack apps with Next.js &amp; the MERN
              stack, and AI-driven systems using LangChain, vector databases,
              and LLM pipelines. Currently pursuing B.Tech (CS — AI/ML) at LPU ·
              CGPA 8.89.
            </p>

            {/* Stats */}
            <div className="flex gap-10 mb-10">
              {[
                { num: "3+", label: "Projects" },
                { num: "250+", label: "LeetCode" },
                { num: "8.89", label: "CGPA" },
              ].map((s) => (
                <div key={s.label}>
                  <span className="block text-xl font-bold text-white">
                    {s.num}
                  </span>
                  <span className="text-sm text-neutral-500">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a
                  href="https://github.com/apoorvaww"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://linkedin.com/in/apoorva-walia"
                  target="_blank"
                  rel="noreferrer"
                  className="text-black"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="secondary" asChild>
                <a href="/resume.pdf" target="_blank" rel="noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </div>
          </div>

          {/* ── Right — code card ── */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900/70 backdrop-blur-xl p-6 shadow-2xl">
              <div className="mb-4 flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <span className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="h-3 w-3 rounded-full bg-green-500" />
              </div>

              <pre className="text-sm text-green-400 leading-relaxed font-mono">
                {`const apoorva = {
  role: "Full-Stack + AI/ML Dev",
  stack: [
    "Next.js", "TypeScript",
    "LangChain", "Qdrant",
  ],
  currently: "LPUConnect 🚀",
  focus: "Agentic AI + Scalable Apps",
  award: "Google Nibbler 🏆",
};

export default apoorva;`}
              </pre>

              <div className="mt-5 h-px w-full bg-linear-to-r from-transparent via-emerald-500/40 to-transparent" />

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "LangChain",
                  "Qdrant",
                  "Gemini API",
                  "PostgreSQL",
                  "HuggingFace",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-700 bg-neutral-800 px-3 py-0.5 text-xs text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-linear-to-t from-black to-transparent" />
    </section>
  );
}
