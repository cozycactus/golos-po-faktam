export type VoteResultKind = "for" | "against" | "present" | "other";

export type VoteResult = {
  firstName: string;
  lastName: string;
  result: VoteResultKind;
};

export type ContextCard = {
  tone: "before" | "after" | "limit";
  kicker: string;
  title: string;
  body: string;
  conclusion: string;
};

export type VoteSnapshot = {
  lastUpdated: string;
  results: readonly VoteResult[];
};

export type VoteDossierData = {
  voteId: number;
  totalMembers: number;
  catalog: {
    topic: string;
    title: string;
    summary: string;
    dateLabel: string;
    tags: readonly string[];
  };
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    meta: readonly string[];
  };
  voteRecordHref: string;
  rawResultsHref: string;
  stageNotice: {
    intro: string;
    emphasis: string;
  };
  context: {
    eyebrow: string;
    title: string;
    cards: readonly ContextCard[];
  };
  primarySource: {
    kicker: string;
    title: string;
    label: string;
    href: string;
  };
  scopeNote: string;
  claimCheck: {
    claim: string;
    verdict: string;
    explanation: string;
  };
  methodRules: readonly {
    number: string;
    title: string;
    explanation: string;
  }[];
  snapshot: VoteSnapshot;
};

export type ResolvedVoteData = {
  source: "live" | "snapshot";
  lastUpdated: string;
  results: readonly VoteResult[];
};
