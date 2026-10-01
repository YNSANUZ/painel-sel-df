import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("COP page presents the program before its modality lists", () => {
  assert.match(html, /Conheça os Centros Olímpicos e Paralímpicos/);
  assert.match(html, /data-count="12"/);
  assert.match(html, /data-count="26"/);
  assert.match(html, /data-count="12"/);
});

test("COP page exposes two expandable modality controls", () => {
  assert.match(html, /data-modality-panel="general"/);
  assert.match(html, /data-modality-panel="inclusive"/);
  assert.match(html, /id="generalPanel"/);
  assert.match(html, /id="inclusivePanel"/);
});

test("COP page no longer uses search or category chips", () => {
  assert.doesNotMatch(html, /id="modalitySearch"/);
  assert.doesNotMatch(html, /id="modalityFilters"/);
});
