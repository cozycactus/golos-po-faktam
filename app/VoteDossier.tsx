import type {
  ResolvedVoteData,
  VoteDossierData,
  VoteResultKind,
} from "../data/votes/types";
import { VoteExplorer } from "./VoteExplorer";

type VoteDossierProps = {
  dossier: VoteDossierData;
  voteData: ResolvedVoteData;
  homeHref?: string;
};

function formatSourceDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jerusalem",
  }).format(new Date(value));
}

export function VoteDossier({
  dossier,
  voteData,
  homeHref = "/",
}: VoteDossierProps) {
  const resultCounts = voteData.results.reduce<Record<VoteResultKind, number>>(
    (counts, row) => {
      counts[row.result] += 1;
      return counts;
    },
    { for: 0, against: 0, present: 0, other: 0 },
  );
  const withoutRegisteredResult = Math.max(
    0,
    dossier.totalMembers - voteData.results.length,
  );
  const isLive = voteData.source === "live";

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href={homeHref} aria-label="Голос по фактам — все досье">
          <span className="wordmark-dot" aria-hidden="true" />
          <span>ГОЛОС</span>
          <span className="wordmark-slash">/</span>
          <span>ФАКТАМ</span>
        </a>
        <nav aria-label="Навигация по странице">
          <a href={homeHref}>Все досье</a>
          <a href="#context">Что изменилось</a>
          <a href="#members">Как голосовали</a>
          <a href="#method">Методика</a>
        </nav>
        <span className="language-pill">RU · עברית</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">{dossier.hero.eyebrow}</p>
          <h1>{dossier.hero.title}</h1>
          <p className="hero-lede">{dossier.hero.lede}</p>
          <div className="hero-meta" aria-label="Сведения о голосовании">
            {dossier.hero.meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>

        <div
          className="vote-score"
          aria-label={`${resultCounts.for} за, ${resultCounts.against} против, ${resultCounts.present} присутствовали без голоса`}
        >
          <div className="score-primary">
            <span className="score-number">{resultCounts.for}</span>
            <span className="score-label">за принятие</span>
          </div>
          <div className="score-secondary">
            <div>
              <strong>{resultCounts.against}</strong>
              <span>против</span>
            </div>
            <div>
              <strong>{resultCounts.present}</strong>
              <span>присутствовали</span>
            </div>
          </div>
          <p className="score-note">
            {withoutRegisteredResult} депутатов не имеют строки в этой поимённой записи
          </p>
        </div>
      </section>

      <section className="stage-warning" aria-label="Важное пояснение">
        <span className="warning-index">01</span>
        <p>
          {dossier.stageNotice.intro} <strong>{dossier.stageNotice.emphasis}</strong>.
        </p>
        <a href={dossier.voteRecordHref} target="_blank" rel="noreferrer">
          Открыть запись ↗
        </a>
      </section>

      <section className="context-section" id="context">
        <div className="section-heading">
          <p className="eyebrow">{dossier.context.eyebrow}</p>
          <h2>{dossier.context.title}</h2>
        </div>

        <div className="context-grid">
          {dossier.context.cards.map((card) => (
            <article className={`context-card context-${card.tone}`} key={card.title}>
              <span className="card-kicker">{card.kicker}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <p className="card-conclusion">{card.conclusion}</p>
            </article>
          ))}
        </div>

        <div className="source-strip">
          <span>{dossier.primarySource.kicker}</span>
          <p>{dossier.primarySource.title}</p>
          <a href={dossier.primarySource.href} target="_blank" rel="noreferrer">
            {dossier.primarySource.label}
          </a>
        </div>
        <p className="scope-note">{dossier.scopeNote}</p>
      </section>

      <VoteExplorer
        results={voteData.results}
        isLive={isLive}
        sourceUpdated={formatSourceDate(voteData.lastUpdated)}
        rawResultsHref={dossier.rawResultsHref}
      />

      <section className="claim-section" aria-labelledby="claim-title">
        <div className="claim-label">ПРОВЕРКА ТЕЗИСА</div>
        <div className="claim-content">
          <p className="claim-quote" id="claim-title">
            {dossier.claimCheck.claim}
          </p>
          <div className="claim-verdict">
            <span>{dossier.claimCheck.verdict}</span>
            <p>{dossier.claimCheck.explanation}</p>
          </div>
        </div>
      </section>

      <section className="method-section" id="method">
        <div className="section-heading">
          <p className="eyebrow">КАК МЫ НЕ МАНИПУЛИРУЕМ</p>
          <h2>Четыре правила карточки</h2>
        </div>
        <ol className="method-list">
          {dossier.methodRules.map((rule) => (
            <li key={rule.number}>
              <span>{rule.number}</span>
              <p>
                <strong>{rule.title}</strong> {rule.explanation}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <footer>
        <div className="footer-mark">ГОЛОС / ФАКТАМ</div>
        <p>
          Независимый прототип. Не рекомендует партию и не принимает решений за
          избирателя.
        </p>
        <div className="footer-status">
          <span className={isLive ? "status-dot live" : "status-dot"} />
          {isLive
            ? "Данные получены из API Кнессета"
            : "Показан проверенный резервный снимок"}
        </div>
      </footer>
    </main>
  );
}
