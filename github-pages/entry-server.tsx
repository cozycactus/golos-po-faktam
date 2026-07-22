import { renderToString } from "react-dom/server";
import {
  githubPagesBasePath,
  StaticRoute,
  staticRoutes,
  type StaticRouteKey,
} from "./routes";

export { staticRoutes };

export function render(routeKey: StaticRouteKey) {
  return renderToString(
    <StaticRoute routeKey={routeKey} basePath={githubPagesBasePath} />,
  );
}
