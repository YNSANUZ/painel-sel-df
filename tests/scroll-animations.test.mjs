import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("route delegates animation timing to the viewport observer", () => {
  const route = app.match(/function route\(\) \{[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(route, /observeReveals\(activeView\)/);
  assert.doesNotMatch(route, /getBoundingClientRect/);
  assert.doesNotMatch(route, /animateCounts/);
});

test("reduced motion reveals final values without waiting for scrolling", () => {
  const observer = app.match(/function observeReveals[\s\S]*?\n\}/)?.[0] ?? "";

  assert.match(observer, /animateCounts\(x\)/);
});

test("the COP page uses the COPs label in bottom navigation", () => {
  assert.match(
    html,
    /data-nav="modalidades"[\s\S]*?<span>COPs<\/span>/,
  );
});
