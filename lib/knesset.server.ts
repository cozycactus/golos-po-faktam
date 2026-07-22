import type {
  ResolvedVoteData,
  VoteDossierData,
  VoteResultKind,
} from "../data/votes/types";

const API_ROOT = "https://knesset.gov.il/OdataV4/ParliamentInfo";

type KnessetVote = {
  Id: number;
  LastUpdatedDate: string;
};

type KnessetResult = {
  FirstName: string;
  LastName: string;
  ResultDesc: string;
};

function normalizeResult(result: string): VoteResultKind {
  if (result === "בעד") return "for";
  if (result === "נגד") return "against";
  if (result === "נוכח") return "present";
  return "other";
}

export async function getResolvedVoteData(
  dossier: VoteDossierData,
): Promise<ResolvedVoteData> {
  const resultsQuery = new URLSearchParams({
    $filter: `VoteID eq ${dossier.voteId}`,
    $top: "200",
    $count: "true",
  });

  try {
    const [voteResponse, resultsResponse] = await Promise.all([
      fetch(`${API_ROOT}/KNS_PlenumVote(${dossier.voteId})`, {
        cache: "no-store",
        headers: { accept: "application/json" },
      }),
      fetch(`${API_ROOT}/KNS_PlenumVoteResult?${resultsQuery}`, {
        cache: "no-store",
        headers: { accept: "application/json" },
      }),
    ]);

    if (!voteResponse.ok || !resultsResponse.ok) {
      throw new Error("Knesset API did not return a successful response");
    }

    const vote = (await voteResponse.json()) as KnessetVote;
    const payload = (await resultsResponse.json()) as { value: KnessetResult[] };

    if (vote.Id !== dossier.voteId || !Array.isArray(payload.value)) {
      throw new Error("Unexpected Knesset API response");
    }

    return {
      source: "live",
      lastUpdated: vote.LastUpdatedDate,
      results: payload.value.map((row) => ({
        firstName: row.FirstName,
        lastName: row.LastName,
        result: normalizeResult(row.ResultDesc),
      })),
    };
  } catch (error) {
    console.error(
      `[knesset-api] using verified fallback snapshot for vote ${dossier.voteId}`,
      error,
    );
    return {
      source: "snapshot",
      lastUpdated: dossier.snapshot.lastUpdated,
      results: dossier.snapshot.results,
    };
  }
}
