import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const htmlUrl = new URL("../dist-pages/index.html", import.meta.url);

test("builds a pre-rendered GitHub Pages dossier", async () => {
  const html = await readFile(htmlUrl, "utf8");

  assert.match(html, /Кто изменил правила выбора судей/);
  assert.match(html, /№ 43884/);
  assert.match(html, /Отсутствие фамилии не/);
  assert.match(html, /aria-label="67 за, 1 против, 2 присутствовали без голоса"/);
  assert.match(html, />50(?:<!-- -->)? депутатов не имеют строки/);
  assert.match(html, /cozycactus\.github\.io\/golos-po-faktam\/og\.png/);
  assert.match(html, /\/golos-po-faktam\/assets\//);
  assert.doesNotMatch(html, /localhost/);
});
