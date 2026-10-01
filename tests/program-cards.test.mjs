import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

test("program cards use their theme color across the full surface", () => {
  assert.match(css, /\.program-card\s*\{[^}]*background:\s*var\(--card[^;]*;/s);
});

test("mobile program grid presents two compact cards per row", () => {
  assert.match(
    css,
    /@media\s*\(max-width:\s*760px\)[\s\S]*?\.program-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*1fr\)/,
  );
});

test("mobile program cards hide the leading visual block", () => {
  assert.match(
    css,
    /@media\s*\(max-width:\s*760px\)[\s\S]*?\.program-grid\s+\.program-icon\s*\{[^}]*display:\s*none/,
  );
});
