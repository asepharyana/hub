import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Code2,
  Container,
  Cpu,
  ExternalLink,
  GitBranch,
  Server,
  Terminal,
} from "lucide-react";
import { motion } from "motion/react";

import { ProjectCard } from "#/components/portfolio/project-card";
import { Badge } from "#/components/ui/badge";
import { buttonVariants } from "#/components/ui/button";
import {
  MotionItem,
  Reveal,
  ScaleReveal,
  StaggerContainer,
  Typewriter,
} from "#/components/ui/motion-primitives";
import { projects, toWord } from "#/lib/projects";
import { cn } from "#/lib/utils";

// Skill groups, in the order they read best: what he builds on, then what he
// runs it with, then what he ships it through.
const skills = [
  { icon: Code2, label: "Node.js, Bun, Axum, Hono" },
  { icon: Server, label: "PostgreSQL, Redis, Prometheus" },
  { icon: Container, label: "Docker, nginx" },
  { icon: Cpu, label: "Rust, TypeScript, Python" },
  { icon: GitBranch, label: "GitHub Actions CI/CD" },
  { icon: Terminal, label: "systemd, Caddy, Tailscale" },
];

// Only tech that is load-bearing somewhere in the catalogue. Dapr, NATS and
// Jaeger were here once and nothing in any repo used them.
const techTags = [
  "TypeScript",
  "Rust",
  "Python",
  "Node.js",
  "Bun",
  "React",
  "Vite",
  "TanStack Router",
  "Hono",
  "Axum",
  "Elysia",
  "Drizzle",
  "PostgreSQL",
  "Redis",
  "Prometheus",
  "OpenTelemetry",
  "discord.js",
  "Tauri",
  "TensorFlow",
  "ONNX Runtime",
  "systemd",
  "Caddy",
  "Tailscale",
  "GitHub Actions",
];

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-1 flex-col">
      {/* ── Hero — terminal-inspired ── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-28 text-center sm:py-36">
        {/* Animated gradient background */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.45_0.13_265_/_0.06)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,oklch(0.7_0.15_75_/_0.06)_0%,transparent_70%)]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0, 1] as const }}
        />

        <div className="relative">
          <motion.p
            className="mb-2 font-mono text-xs text-muted-foreground"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="text-primary dark:text-primary">~</span> whoami
          </motion.p>
          <motion.h1
            className="font-mono text-3xl font-bold tracking-tight sm:text-5xl"
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0.25, 0.1, 0, 1] as const,
            }}
          >
            <span className="text-muted-foreground">$&nbsp;</span>
            <Typewriter
              text="Asep Haryana Saputra"
              className="gradient-text font-mono"
              speed={0.045}
              startDelay={200}
            />
          </motion.h1>
          <motion.p
            className="mx-auto mt-3 max-w-lg font-mono text-xs text-muted-foreground sm:text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="text-muted-foreground/50"># </span>
            Teknik Informatika student building backend systems and the
            infrastructure that runs them.
          </motion.p>
        </div>

        <motion.div
          className="relative mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.a
            href="#projects"
            className={cn(buttonVariants({ size: "lg" }))}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
              <ArrowRight className="size-4" />
            </motion.span>
          </motion.a>
          <motion.a
            href="https://github.com/asepharyana"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            GitHub
            <ExternalLink className="size-4" />
          </motion.a>
        </motion.div>
      </section>

      {/* ── Content — staggered sections ── */}
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 pb-28">
        {/* About */}
        <Reveal>
          <div>
            <p className="mb-2 font-mono text-xs text-muted-foreground">
              <span className="text-primary dark:text-primary">~</span> about
            </p>
            <div className="space-y-3 leading-relaxed text-muted-foreground">
              <p>
                I&rsquo;m a Teknik Informatika student working on backend
                services and the infrastructure around them — Postgres schemas,
                systemd units, and the deploy path that gets a commit onto a VPS
                without manual steps.
              </p>
              <p>
                Most of what&rsquo;s below is something I built, deployed and
                still run: an API over sources that have no API, a GitHub App
                that reviews its own pull requests, an S3-compatible front door,
                and an LLM moderation pipeline with an audit trail.
              </p>
              <p>
                I contributed the backend to the ZeaVis Edu capstone team
                (&ldquo;AI for Smart Education&rdquo; by Pijak &times; IBM
                SkillsBuild) — architecture, the RESTful API, and deployment.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Skills & Tools */}
        <Reveal>
          <div>
            <p className="mb-2 font-mono text-xs text-muted-foreground">
              <span className="text-primary dark:text-primary">~</span> skills
            </p>
            <StaggerContainer className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {skills.map((s) => {
                const Icon = s.icon;
                return (
                  <MotionItem key={s.label}>
                    <motion.div
                      className="flex items-center gap-3 rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm transition-all duration-300"
                      whileHover={{
                        y: -2,
                        borderColor: "var(--ring)",
                        boxShadow: "0 4px 14px oklch(0 0 0 / 0.08)",
                      }}
                    >
                      <Icon className="size-4 shrink-0 text-primary dark:text-primary" />
                      <span>{s.label}</span>
                    </motion.div>
                  </MotionItem>
                );
              })}
            </StaggerContainer>
            <StaggerContainer
              staggerVariants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.03, delayChildren: 0.1 },
                },
              }}
              className="flex flex-wrap gap-1.5"
            >
              {techTags.map((t) => (
                <MotionItem key={t}>
                  <motion.span
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant="outline"
                      className="text-[11px] font-normal transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
                    >
                      {t}
                    </Badge>
                  </motion.span>
                </MotionItem>
              ))}
            </StaggerContainer>
          </div>
        </Reveal>

        {/* Projects */}
        <Reveal>
          <div id="projects" className="scroll-mt-24">
            <p className="mb-2 font-mono text-xs text-muted-foreground">
              <span className="text-primary dark:text-primary">~</span> projects
            </p>
            <p className="mb-4 text-sm text-muted-foreground">
              {projects.length === 1
                ? "One service"
                : `${toWord(projects.length)} services`}{" "}
              I built and run, most of them live right now.
            </p>
            <StaggerContainer className="flex flex-col gap-4">
              {projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </StaggerContainer>
          </div>
        </Reveal>

        {/* Infrastructure CTA */}
        <Reveal>
          <ScaleReveal>
            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.25 }}>
              <div className="relative overflow-hidden rounded-xl border border-primary/10 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />
                <div className="flex flex-col items-center gap-4 p-(--card-spacing) py-10">
                  <p className="text-base font-medium">
                    This site doubles as a live infrastructure monitor.
                  </p>
                  <p className="max-w-md text-sm text-muted-foreground">
                    The dashboard reads this VPS directly — 29 systemd units,
                    plus Prometheus for CPU, memory, disk and network. Same box
                    that serves the page.
                  </p>
                  <motion.a
                    href="/dashboard"
                    className={cn(buttonVariants())}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Live Dashboard
                    <ArrowRight className="size-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </ScaleReveal>
        </Reveal>
      </div>

      {/* Footer */}
      <motion.footer
        className="mt-auto border-t py-6 text-center text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p>
          &copy; {new Date().getFullYear()} Asep Haryana Saputra &mdash;{" "}
          <motion.a
            href="https://github.com/asepharyana"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
            whileHover={{ color: "var(--primary)" }}
          >
            GitHub
          </motion.a>
        </p>
      </motion.footer>
    </div>
  );
}
