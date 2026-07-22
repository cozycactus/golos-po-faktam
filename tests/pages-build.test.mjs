import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pagesRootUrl = new URL("../dist-pages/", import.meta.url);
const catalogueUrl = new URL("index.html", pagesRootUrl);
const dossierUrl = new URL("votes/43884/index.html", pagesRootUrl);

function canonicalHref(html) {
  const tag = html.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i)?.[0];
  return tag?.match(/\bhref=["']([^"']+)["']/i)?.[1];
}

function assertProductionShell(html, routePattern) {
  assert.match(
    html,
    new RegExp(`<div\\b(?=[^>]*\\bid=["']root["'])(?=[^>]*\\bdata-route=["']${routePattern}["'])[^>]*>`, "i"),
  );
  assert.match(html, /(?:src|href)="\/golos-po-faktam\/assets\//);
  assert.doesNotMatch(html, /(?:src|href)="\/assets\//);
  assert.doesNotMatch(html, /localhost/i);
  assert.doesNotMatch(html, /__[A-Z][A-Z0-9_]*__/);
}

test("builds a pre-rendered GitHub Pages catalogue", async () => {
  const html = await readFile(catalogueUrl, "utf8");

  assert.match(html, /Не лозунги\. Зафиксированные решения\./);
  assert.match(html, /Кто изменил правила выбора судей\?/);
  assert.match(html, /href="\/golos-po-faktam\/votes\/43884\/"/);
  assert.equal(canonicalHref(html), "https://cozycactus.github.io/golos-po-faktam/");
  assert.match(html, /cozycactus\.github\.io\/golos-po-faktam\/og\.png/);
  assertProductionShell(html, "/");
});

test("builds vote dossier 43884 at its nested GitHub Pages route", async () => {
  const html = await readFile(dossierUrl, "utf8");

  assert.match(html, /Кто изменил правила выбора судей\?/);
  assert.match(html, /№ 43884/);
  assert.match(html, /aria-label="67 за, 1 против, 2 присутствовали без голоса"/);
  assert.match(html, />50(?:<!-- -->)? депутатов не имеют строки/);
  assert.match(html, /Официальный PDF Кнессета/);
  assert.match(html, /Отсутствие фамилии не/);
  assert.match(html, /Отделяем факт от оценки/);
  assert.match(html, /Не рекомендует партию/);
  assert.equal(
    canonicalHref(html),
    "https://cozycactus.github.io/golos-po-faktam/votes/43884/",
  );
  assert.match(html, /href="\/golos-po-faktam\/"/);
  assert.match(html, /cozycactus\.github\.io\/golos-po-faktam\/og\.png/);
  assertProductionShell(html, "/votes/43884/");
});
