import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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

test("server-renders the vote dossier", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Голос по фактам/);
  assert.match(html, /Кто изменил правила выбора судей/);
  assert.match(html, /№ 43884/);
  assert.match(html, /третье чтение/);
  assert.match(html, /67/);
  assert.match(html, /Официальный PDF Кнессета/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("explains the evidence boundary", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /Отсутствие фамилии не/);
  assert.match(html, /не означает голос/);
  assert.match(html, /Отделяем факт от оценки/);
  assert.match(html, /Не рекомендует партию/);
});
