import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const htmlUrl = new URL("../dist-pages/index.html", import.meta.url);
const serverEntryUrl = new URL("../dist-pages-ssr/entry-server.js", import.meta.url);
const serverOutputUrl = new URL("../dist-pages-ssr/", import.meta.url);
const outputRoot = fileURLToPath(new URL("../dist-pages/", import.meta.url));

const { render, staticRoutes } = await import(serverEntryUrl.href);
const template = await readFile(htmlUrl, "utf8");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

for (const route of staticRoutes) {
  const escapedRouteKey = escapeHtml(route.routeKey);
  const mountPoint = `<div id="root" data-route="${escapedRouteKey}"></div>`;
  const renderedApp = render(route.routeKey);
  let html = template
    .replaceAll("__PAGE_TITLE__", escapeHtml(route.title))
    .replaceAll("__PAGE_DESCRIPTION__", escapeHtml(route.description))
    .replaceAll("__PAGE_CANONICAL__", escapeHtml(route.canonical))
    .replaceAll("__PAGE_OG_IMAGE__", escapeHtml(route.ogImage))
    .replaceAll("__ROUTE_KEY__", escapedRouteKey);

  if (!html.includes(mountPoint)) {
    throw new Error(`Static HTML mount point was not found for ${route.routeKey}`);
  }

  html = html.replace(
    mountPoint,
    () => `<div id="root" data-route="${escapedRouteKey}">${renderedApp}</div>`,
  );

  const unresolvedTokens = html.match(/__[A-Z][A-Z0-9_]*__/g);
  if (unresolvedTokens) {
    throw new Error(
      `Unresolved static HTML tokens for ${route.routeKey}: ${unresolvedTokens.join(", ")}`,
    );
  }

  const outputPath = fileURLToPath(
    new URL(route.outputFile, new URL("../dist-pages/", import.meta.url)),
  );

  if (!outputPath.startsWith(outputRoot)) {
    throw new Error(`Static route output escapes dist-pages: ${route.outputFile}`);
  }

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
}

await rm(serverOutputUrl, { recursive: true, force: true });
