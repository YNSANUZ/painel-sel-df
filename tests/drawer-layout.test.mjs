import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

test("closed desktop drawer is hidden and only becomes visible when open", () => {
  assert.match(css, /\.drawer\s*\{[^}]*visibility:\s*hidden;/s);
  assert.match(css, /\.drawer\.open\s*\{[^}]*visibility:\s*visible;/s);
});
