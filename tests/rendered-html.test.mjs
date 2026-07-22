import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const workerPromise = import(workerUrl.href).then(({ default: worker }) => worker);

async function render(pathname) {
  const worker = await workerPromise;

  return worker.fetch(
    new Request(new URL(pathname, "http://localhost"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function renderHtml(pathname) {
  const response = await render(pathname);
  assert.equal(response.status, 200, `expected ${pathname} to render successfully`);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("server-renders the vote catalogue at the root route", async () => {
  const html = await renderHtml("/");

  assert.match(html, /Голос по фактам/);
  assert.match(html, /Не лозунги\. Зафиксированные решения\./);
  assert.match(html, /href="\/votes\/43884\/?"/);
  assert.match(html, /Кто изменил правила выбора судей\?/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("server-renders vote dossier 43884 with its evidence boundary", async () => {
  const html = await renderHtml("/votes/43884/");

  assert.match(html, /Кто изменил правила выбора судей\?/);
  assert.match(html, /№ 43884/);
  assert.match(html, /третье чтение/);
  assert.match(html, /aria-label="67 за, 1 против, 2 присутствовали без голоса"/);
  assert.match(html, /Официальный PDF Кнессета/);
  assert.match(html, /Отсутствие фамилии не/);
  assert.match(html, /не означает голос/);
  assert.match(html, /Отделяем факт от оценки/);
  assert.match(html, /Не рекомендует партию/);
  assert.match(html, /property="og:title" content="Кто изменил правила выбора судей\? — Голос по фактам"/);
  assert.match(html, /name="twitter:title" content="Кто изменил правила выбора судей\? — Голос по фактам"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});
