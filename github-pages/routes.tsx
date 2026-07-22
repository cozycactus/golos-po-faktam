import { VoteCatalog } from "../app/VoteCatalog";
import { VoteDossier } from "../app/VoteDossier";
import { getVoteDossier, voteDossiers } from "../data/votes";

export const githubPagesBasePath = "/golos-po-faktam/";
export const githubPagesOrigin = "https://cozycactus.github.io";

export type StaticRouteKey = "/" | `/votes/${number}/`;

export type StaticRouteDefinition = {
  routeKey: StaticRouteKey;
  outputFile: string;
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
};

const siteUrl = `${githubPagesOrigin}${githubPagesBasePath}`;
const ogImage = `${siteUrl}og.png`;

const dossierRoutes: StaticRouteDefinition[] = voteDossiers.map((dossier) => ({
  routeKey: `/votes/${dossier.voteId}/`,
  outputFile: `votes/${dossier.voteId}/index.html`,
  title: `${dossier.catalog.title} — Голос по фактам`,
  description: dossier.catalog.summary,
  canonical: `${siteUrl}votes/${dossier.voteId}/`,
  ogImage,
}));

export const staticRoutes: readonly StaticRouteDefinition[] = [
  {
    routeKey: "/",
    outputFile: "index.html",
    title: "Голос по фактам — архив голосований Кнессета",
    description:
      "Окончательные голосования, тексты законов и границы выводов — без рекомендации, за кого голосовать.",
    canonical: siteUrl,
    ogImage,
  },
  ...dossierRoutes,
];

export function isStaticRouteKey(value: string): value is StaticRouteKey {
  return staticRoutes.some((route) => route.routeKey === value);
}

export function StaticRoute({
  routeKey,
  basePath,
}: {
  routeKey: StaticRouteKey;
  basePath: string;
}) {
  if (routeKey === "/") {
    return <VoteCatalog dossiers={voteDossiers} basePath={basePath} />;
  }

  const voteId = Number(routeKey.match(/^\/votes\/(\d+)\/$/)?.[1]);
  const dossier = getVoteDossier(voteId);

  if (!dossier) {
    throw new Error(`Static dossier route is not registered: ${routeKey}`);
  }

  return (
    <VoteDossier
      dossier={dossier}
      voteData={{ source: "snapshot", ...dossier.snapshot }}
      homeHref={basePath}
    />
  );
}
