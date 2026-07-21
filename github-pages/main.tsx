import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { Dossier, snapshotVoteData } from "../app/page";
import "../app/globals.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Missing #root element");
}

hydrateRoot(
  root,
  <StrictMode>
    <Dossier voteData={snapshotVoteData} />
  </StrictMode>,
);
