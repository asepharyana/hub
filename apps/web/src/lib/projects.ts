/**
 * Project catalogue for the portfolio landing page.
 *
 * Every entry is a project that exists in a repo under github.com/asepharyana
 * and, where claimed, answers 200 on its public hostname. Descriptions state
 * what the code actually does — a claim here that the repository contradicts
 * is a bug in this file.
 *
 * Static data: fine for a personal portfolio. Move to a CMS/content layer if
 * this ever exceeds ~50 items.
 */

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  /** Display name, matching the repo name where one exists. */
  name: string;
  /** One line, no period — it sits directly under the name. */
  tagline: string;
  /** Two or three sentences on what it does and why it exists. */
  summary: string;
  /** Concrete mechanisms, not adjectives. */
  highlights: readonly string[];
  stack: readonly string[];
  links: readonly ProjectLink[];
  /** Attribution that is not implied by the name: team work, or a fork. */
  context?: string;
}

/** Live site first, then source. Omit a link rather than point it nowhere. */
function links(live?: string, source?: string): ProjectLink[] {
  const out: ProjectLink[] = [];
  if (live) out.push({ label: "Live", href: live });
  if (source) out.push({ label: "Source", href: source });
  return out;
}

const CARDINALS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
] as const;

/**
 * Spells a small count as a word.
 *
 * Exists so the "N services" line cannot drift from the catalogue the way a
 * hardcoded "Eight" did after an entry was removed. Past twelve it falls back
 * to digits, which is still correct — just less charming.
 */
export function toWord(n: number): string {
  return CARDINALS[n] ?? String(n);
}

export const projects: readonly Project[] = [
  {
    name: "ZeaVis Edu",
    tagline: "Computer Vision diagnosis for corn leaf disease",
    summary:
      "An educational app that helps farmers, agriculture students and field extension officers identify corn leaf disease from a photo — Blight, Rust, Leaf Spot or Healthy — with treatment guidance alongside the verdict. Built as a capstone for the Pijak × IBM SkillsBuild programme.",
    highlights: [
      "EfficientNetV2B0 classifier trained in Keras, served through a Rust inference service (Axum + ONNX Runtime)",
      "Bun + Elysia API with Drizzle and PostgreSQL; React 19 + Vite web client",
      "Tauri 2 build for Android, so the diagnosis works in the field without a browser",
      "Streamed, size-validated uploads — the untrusted path into the system",
    ],
    stack: [
      "TypeScript",
      "Rust",
      "Bun",
      "Elysia",
      "Axum",
      "Drizzle",
      "PostgreSQL",
      "ONNX Runtime",
      "TensorFlow",
      "Tauri 2",
    ],
    links: links(
      "https://zeavisedu.asepharyana.my.id/",
      "https://github.com/ATLAS-PJK-GM007/ZeaVis-Edu",
    ),
    context:
      "Capstone team of five — I owned system architecture, the RESTful API, and deployment.",
  },
  {
    name: "GMW — Guild Moderation Watcher",
    tagline: "LLM moderation for a Discord guild, with an audit trail",
    summary:
      "A self-hosted watcher for a Discord guild. It captures every message and the evidence around it, judges each one against a written policy with an LLM, deletes what violates that policy, and shows the whole pipeline on a live dashboard.",
    highlights: [
      "Capture never waits on the model — messages queue as rows, workers claim them under a time-boxed lease",
      "A message the model could not read is never auto-deleted, at any confidence",
      "Every enforcement attempt is written to an audit table, not inferred from a deleted_at flag",
      "Seven dashboard views over Postgres and Redis, updated live over WebSocket",
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "Hono",
      "oRPC",
      "Drizzle",
      "PostgreSQL",
      "Redis",
      "discord.js",
      "TanStack Router",
      "prom-client",
    ],
    links: links(
      "https://gmw.asepharyana.my.id/",
      "https://github.com/asepharyana/GMW",
    ),
  },
  {
    name: "scraper",
    tagline: "Rust/Axum scraping and image-proxy API",
    summary:
      "A public HTTP API over sources that have no usable API: anime and comic aggregators, social-media video, and an image proxy. Ships an OpenAPI document and a Swagger UI, and exports its own metrics.",
    highlights: [
      "Nine route groups — anime, comics, downloaders, search, stalk, image proxy, tools — behind one Axum router",
      "OpenTelemetry metrics over OTLP, with the middleware wired at the router rather than per handler",
      "Rate limiting, retry and cache-aside built from the published Mytheclipse crates",
      "Playwright fallback for hosts where a plain HTTP fetch hits an anti-bot challenge",
    ],
    stack: [
      "Rust",
      "Axum",
      "Tokio",
      "utoipa",
      "OpenTelemetry",
      "Redis",
      "Playwright",
      "Swagger UI",
    ],
    links: links(
      "https://scraper.asepharyana.my.id/docs",
      "https://github.com/asepharyana/scraper",
    ),
  },
  {
    name: "pr-agent-server",
    tagline: "GitHub App that reviews and merges its own PRs",
    summary:
      "A GitHub App that runs an LLM review over every pull request and can merge on its own judgement. Webhook in, review queue, diff budgeted into a prompt, verdict posted back — all through a self-hosted OpenAI-compatible endpoint.",
    highlights: [
      "HMAC-verified webhook, deduped per PR, two reviews in flight",
      "Diff is budgeted before it is prompted, so a large PR cannot blow the context window",
      "A worker app re-polls open PRs on a timer, so a missed webhook is not a missed review",
      "Web UI over the full review history",
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "Hono",
      "oRPC",
      "Drizzle",
      "GitHub App",
      "TanStack Router",
      "Vitest",
    ],
    links: links(
      "https://pr-agent.asepharyana.my.id/",
      "https://github.com/asepharyana/pr-agent-server",
    ),
  },
  {
    name: "MCPedia",
    tagline: "Markdown knowledge base, readable by humans and agents",
    summary:
      "Content lives as plain Markdown in Git. It is indexed into Postgres — weighted full-text plus chunked embeddings — and served through one Core layer that the web UI, the MCP server, the API and the worker all share.",
    highlights: [
      "The same content is queryable by a person in a browser and by an agent over MCP",
      "Weighted tsvector search alongside cosine similarity, not one instead of the other",
      "A BullMQ worker reindexes on a git push webhook, so the index follows the repository",
      "One shared Core: no interface re-implements business logic",
    ],
    stack: [
      "TypeScript",
      "Next.js 16",
      "tRPC",
      "PostgreSQL",
      "pgvector",
      "BullMQ",
      "MCP",
    ],
    links: links(
      "https://wiki.asepharyana.my.id/",
      "https://github.com/asepharyana/mcpedia",
    ),
  },
  {
    name: "TeleUploader",
    tagline: "File uploads to Telegram, and an S3-compatible front door",
    summary:
      "Upload files to a private Telegram channel and get a public download link back. It also speaks enough S3 to be mounted as a bucket, which is how it backs the upload front end.",
    highlights: [
      "S3-compatible surface: SigV4 auth, range reads, multipart, virtual-host addressing",
      "Bounded concurrency and streaming, so a large object never sits fully in memory",
      "Hono + oRPC over Drizzle and PostgreSQL behind PgBouncer",
      "Deploys as a single systemd unit — the Docker path is legacy and unused",
    ],
    stack: [
      "TypeScript",
      "Hono",
      "oRPC",
      "Drizzle",
      "PostgreSQL",
      "AWS SDK",
      "Telegram Bot API",
      "Vitest",
    ],
    links: links(
      "https://upload.asepharyana.my.id/",
      "https://github.com/asepharyana/TeleUploader",
    ),
  },
  {
    name: "mytheclipse",
    tagline: "Rust toolkit for async services — published on crates.io",
    summary:
      "A family of Rust crates covering the parts of a service that are easy to get subtly wrong: async I/O, background queues, caching, resiliency, traffic control and observability. Other services here are built on it.",
    highlights: [
      "Published as separate crates so a consumer pulls only the layer it needs",
      "Cache-aside and L2-Redis behind one interface, with the Redis client fix carried in-tree",
      "Consumed in production by the scraper service",
    ],
    stack: ["Rust", "Tokio", "Redis", "crates.io"],
    links: links(
      "https://crates.io/crates/mytheclipse",
      "https://github.com/asepharyana/mytheclipse",
    ),
  },
];
