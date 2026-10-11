import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { projects, toWord } from "./projects.ts";

describe("projects catalogue", () => {
  it("is not empty", () => {
    assert.ok(projects.length > 0);
  });

  it("has no duplicate names", () => {
    const names = projects.map((p) => p.name);
    assert.equal(new Set(names).size, names.length);
  });

  it("gives every project a tagline, summary and highlights", () => {
    for (const p of projects) {
      assert.ok(p.tagline.trim(), `${p.name} has no tagline`);
      assert.ok(p.summary.trim(), `${p.name} has no summary`);
      assert.ok(p.highlights.length > 0, `${p.name} has no highlights`);
      assert.ok(p.stack.length > 0, `${p.name} has no stack`);
    }
  });

  it("links only over https, and every project has at least one link", () => {
    for (const p of projects) {
      assert.ok(p.links.length > 0, `${p.name} has no link`);
      for (const l of p.links) {
        assert.ok(
          l.href.startsWith("https://"),
          `${p.name} link ${l.label} is not https: ${l.href}`,
        );
        assert.doesNotMatch(
          l.href,
          /\s/,
          `${p.name} link ${l.label} contains whitespace`,
        );
      }
    }
  });

  it("gives no project two links with the same label", () => {
    // `links()` orders Live before Source and the two labels differ, so a
    // duplicate would mean the factory was called with the same value twice.
    for (const p of projects) {
      const labels = p.links.map((l) => l.label);
      assert.equal(
        new Set(labels).size,
        labels.length,
        `${p.name} has repeated link labels`,
      );
    }
  });

  it("keeps the languages this portfolio is actually built in", () => {
    // The old tagline said TypeScript and Rust; both are load-bearing, so
    // dropping either would make the page misrepresent the work.
    const all = projects.flatMap((p) => p.stack).join(" ");
    for (const tech of ["TypeScript", "Rust"]) {
      assert.ok(all.includes(tech), `catalogue no longer mentions ${tech}`);
    }
  });
});

describe("toWord", () => {
  it("spells the counts the catalogue actually reaches", () => {
    // 1..12 are the whole range CARDINALS covers; below that the page would
    // print a digit and read like a different site.
    assert.equal(toWord(1), "One");
    assert.equal(toWord(7), "Seven");
    assert.equal(toWord(8), "Eight");
    assert.equal(toWord(12), "Twelve");
  });

  it("spells zero rather than returning an empty string", () => {
    // Regression: CARDINALS[0] was "", and a valid-but-empty lookup never
    // reaches the `??` fallback, so toWord(0) rendered as nothing at all.
    assert.equal(toWord(0), "Zero");
  });

  it("falls back to digits past the table", () => {
    assert.equal(toWord(13), "13");
    assert.equal(toWord(99), "99");
  });

  it("matches the catalogue length, so the count cannot go stale", () => {
    // The exact failure this replaced: the page read "Eight services" in a
    // hardcoded string while the array held a different number.
    assert.equal(
      toWord(projects.length),
      [
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
      ][projects.length - 1] ?? String(projects.length),
    );
  });
});
