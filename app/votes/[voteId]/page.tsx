import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VoteDossier } from "../../VoteDossier";
import { getVoteDossier } from "../../../data/votes";
import { getResolvedVoteData } from "../../../lib/knesset.server";

export const dynamic = "force-dynamic";

type VotePageProps = {
  params: Promise<{ voteId: string }>;
};

export async function generateMetadata({ params }: VotePageProps): Promise<Metadata> {
  const { voteId } = await params;
  const dossier = getVoteDossier(voteId);

  if (!dossier) {
    return { title: "Досье не найдено — Голос по фактам" };
  }

  const title = `${dossier.catalog.title} — Голос по фактам`;
  const description = dossier.catalog.summary;

  return {
    title,
    description,
    alternates: { canonical: `/votes/${dossier.voteId}/` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/votes/${dossier.voteId}/`,
      locale: "ru_RU",
      images: [
        {
          url: "/og.png",
          width: 1732,
          height: 908,
          alt: `${dossier.catalog.title} — досье голосования № ${dossier.voteId}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export default async function VotePage({ params }: VotePageProps) {
  const { voteId } = await params;
  const dossier = getVoteDossier(voteId);

  if (!dossier) notFound();

  const voteData = await getResolvedVoteData(dossier);
  return <VoteDossier dossier={dossier} voteData={voteData} homeHref="/" />;
}
