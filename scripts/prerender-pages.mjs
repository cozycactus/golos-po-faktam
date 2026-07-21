import { readFile, rm, writeFile } from "node:fs/promises";

const htmlUrl = new URL("../dist-pages/index.html", import.meta.url);
const serverEntryUrl = new URL("../dist-pages-ssr/entry-server.js", import.meta.url);
const serverOutputUrl = new URL("../dist-pages-ssr/", import.meta.url);

const { render } = await import(serverEntryUrl.href);
const renderedApp = render();
const html = await readFile(htmlUrl, "utf8");
const mountPoint = '<div id="root"></div>';

if (!html.includes(mountPoint)) {
  throw new Error("Static HTML mount point was not found");
}

await writeFile(
  htmlUrl,
  html.replace(mountPoint, `<div id="root">${renderedApp}</div>`),
  "utf8",
);
await rm(serverOutputUrl, { recursive: true, force: true });
