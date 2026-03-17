"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, FileText } from "lucide-react";
import { BackgroundRippleEffect } from "./ui/background-ripple-effect";
import {Navbar} from "./navbar";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 z-0">
        <BackgroundRippleEffect />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 items-center gap-16 px-30 py-32">
        <div className="text-left">
          <p className="text-md tracking-widest text-neutral-300 uppercase">
            Hello, I am
          </p>

          <h1 className="mt-3 text-5xl md:text-6xl font-semibold tracking-tight">
            Apoorva Walia
          </h1>

          <p className="mt-6 text-lg text-neutral-300 max-w-lg">
            I am a 
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild>
              <a href="https://github.com/apoorvaww" target="_blank">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>

            <Button variant="outline" asChild>
              <a href="https://linkedin.com/in/apoorva-walia" target="_blank">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>

            <Button variant="secondary" asChild>
              <a href="/resume.pdf" target="_blank">
                <FileText className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900/70 backdrop-blur-xl p-6 shadow-2xl">
            <div className="mb-4 flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            <pre className="text-sm text-green-400 leading-relaxed">
              {`const dev = {
  name: "Apoorva",
  stack: ["Next.js", "TypeScript"],
  focus: "Agentic AI + Scalable Apps",
};

export default dev;`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
