import { vote43884 } from "./43884";
import type { VoteDossierData } from "./types";

export const voteDossiers: readonly VoteDossierData[] = [vote43884];
export { vote43884 };

export function getVoteDossier(voteId: number | string) {
  const normalizedId = Number(voteId);
  return voteDossiers.find((dossier) => dossier.voteId === normalizedId);
}

export type { ResolvedVoteData, VoteDossierData, VoteResult } from "./types";
