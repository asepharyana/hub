import { motion } from "motion/react";

import { Badge } from "#/components/ui/badge";
import { buttonVariants } from "#/components/ui/button";
import {
  MotionItem,
  StaggerContainer,
} from "#/components/ui/motion-primitives";
import type { Project } from "#/lib/projects";
import { cn } from "#/lib/utils";

/**
 * One project card.
 *
 * Split out of the route because the route now renders a list: at one card the
 * markup lived inline, and a second card would have been a copy-paste of it.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <MotionItem>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="h-full"
      >
        <CardShell>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-heading text-lg leading-snug font-medium">
                {project.name}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {project.tagline}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              {project.links.map((link) => (
                <motion.a
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {project.summary}
          </p>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Panel title="What it does">
              <ul className="list-inside list-disc space-y-1">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </Panel>
            <Panel title="Details">
              <p>{project.context ?? "Built and maintained end to end."}</p>
            </Panel>
          </div>

          <StaggerContainer
            staggerVariants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
            }}
            className="mt-4 flex flex-wrap gap-1.5"
          >
            {project.stack.map((t) => (
              <MotionItem key={t}>
                <motion.span
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant="secondary"
                    className="text-[10px] font-normal"
                  >
                    {t}
                  </Badge>
                </motion.span>
              </MotionItem>
            ))}
          </StaggerContainer>
        </CardShell>
      </motion.div>
    </MotionItem>
  );
}

/** Gradient top-edge accent, shared by every card on the page. */
function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-primary/10 bg-card p-(--card-spacing) text-sm text-card-foreground shadow-xs transition-all duration-300 ease-out hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />
      {children}
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="rounded-lg border border-border bg-muted/30 p-3 transition-all duration-300"
      whileHover={{
        y: -2,
        borderColor: "var(--ring)",
        backgroundColor: "oklch(0.7 0.15 75 / 0.04)",
      }}
    >
      <p className="mb-2 text-xs font-semibold tracking-wider text-foreground uppercase">
        {title}
      </p>
      <div className="space-y-1 text-xs text-muted-foreground">{children}</div>
    </motion.div>
  );
}
