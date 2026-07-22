import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import "../app/globals.css";
import { isStaticRouteKey, StaticRoute } from "./routes";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Missing #root element");
}

const routeKey = root.dataset.route;

if (!routeKey || !isStaticRouteKey(routeKey)) {
  throw new Error("Missing or unknown static route key on #root element");
}

hydrateRoot(
  root,
  <StrictMode>
    <StaticRoute routeKey={routeKey} basePath={import.meta.env.BASE_URL} />
  </StrictMode>,
);
