import { voteDossiers } from "../data/votes";
import { VoteCatalog } from "./VoteCatalog";

export default function Home() {
  return <VoteCatalog dossiers={voteDossiers} />;
}
