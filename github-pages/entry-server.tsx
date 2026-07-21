import { renderToString } from "react-dom/server";
import { Dossier, snapshotVoteData } from "../app/page";

export function render() {
  return renderToString(<Dossier voteData={snapshotVoteData} />);
}
