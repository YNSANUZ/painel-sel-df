import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

test("modality icons constrain the nested svg inside its visual container", () => {
  assert.match(
    css,
    /\.modality-item\s*>\s*span\s*>\s*svg\s*\{[^}]*width:\s*22px;[^}]*height:\s*22px;/s,
  );
});
