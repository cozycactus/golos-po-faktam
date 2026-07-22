import type { VoteDossierData, VoteResultKind } from "../data/votes/types";

type VoteCatalogProps = {
  dossiers: readonly VoteDossierData[];
  basePath?: string;
};

function routeHref(basePath: string, path: string) {
  const prefix = basePath.endsWith("/") ? basePath : `${basePath}/`;
  return `${prefix}${path.replace(/^\/+/, "")}`;
}

function snapshotCounts(dossier: VoteDossierData) {
  return dossier.snapshot.results.reduce<Record<VoteResultKind, number>>(
    (counts, result) => {
      counts[result.result] += 1;
      return counts;
    },
    { for: 0, against: 0, present: 0, other: 0 },
  );
}

export function VoteCatalog({ dossiers, basePath = "/" }: VoteCatalogProps) {
  return (
    <main className="catalog-main">
      <header className="site-header">
        <a className="wordmark" href={basePath} aria-label="Голос по фактам — главная">
          <span className="wordmark-dot" aria-hidden="true" />
          <span>ГОЛОС</span>
          <span className="wordmark-slash">/</span>
          <span>ФАКТАМ</span>
        </a>
        <nav aria-label="Навигация по каталогу">
          <a href="#dossiers">Досье</a>
          <a href="#approach">Принципы</a>
          <a href="#roadmap">Следующие темы</a>
        </nav>
        <span className="language-pill">RU · עברית</span>
      </header>

      <section className="catalog-hero" id="top">
        <div className="catalog-hero-copy">
          <p className="eyebrow">АРХИВ РЕШЕНИЙ КНЕССЕТА</p>
          <h1>Не лозунги. Зафиксированные решения.</h1>
          <p className="hero-lede">
            Собираем окончательные голосования, тексты законов и границы выводов —
            без рекомендации, за кого голосовать.
          </p>
        </div>
        <aside className="catalog-index" aria-label="Состав архива">
          <span className="catalog-index-number">
            {String(dossiers.length).padStart(2, "0")}
          </span>
          <p>{dossiers.length === 1 ? "опубликованное досье" : "опубликованных досье"}</p>
          <small>Каждый вывод ведёт к официальной записи или тексту закона.</small>
        </aside>
      </section>

      <section className="catalog-section" id="dossiers" aria-labelledby="dossiers-title">
        <div className="catalog-section-head">
          <div className="section-heading">
            <p className="eyebrow">КАТАЛОГ</p>
            <h2 id="dossiers-title">Досье голосований</h2>
          </div>
          <p>
            Итоги считаются по поимённой записи. Отсутствие строки не превращается
            в голос «против».
          </p>
        </div>

        <div className="catalog-grid">
          {dossiers.map((dossier) => {
            const counts = snapshotCounts(dossier);
            const href = routeHref(basePath, `votes/${dossier.voteId}/`);

            return (
              <article className="vote-card" key={dossier.voteId}>
                <div className="vote-card-topline">
                  <span className="vote-card-topic">{dossier.catalog.topic}</span>
                  <span className="vote-card-id">№ {dossier.voteId}</span>
                </div>
                <div>
                  <p className="vote-card-id">{dossier.catalog.dateLabel}</p>
                  <h3 className="vote-card-title">
                    <a href={href}>{dossier.catalog.title}</a>
                  </h3>
                  <p className="vote-card-summary">{dossier.catalog.summary}</p>
                </div>
                <div className="vote-card-tags" aria-label="Характеристики голосования">
                  {dossier.catalog.tags.map((tag) => (
                    <span className="vote-card-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="vote-card-footer">
                  <div className="vote-card-score" aria-label="Итог поимённой записи">
                    <span className="vote-card-score-item">
                      <strong>{counts.for}</strong> за
                    </span>
                    <span className="vote-card-score-item">
                      <strong>{counts.against}</strong> против
                    </span>
                    <span className="vote-card-score-item">
                      <strong>{counts.present}</strong> присутствовали
                    </span>
                  </div>
                  <a className="vote-card-link" href={href}>
                    Открыть досье
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <p className="catalog-empty-note">
          Архив начинается с одного проверенного кейса. Новые карточки публикуются
          только после сверки стадии голосования, результата и первоисточника.
        </p>
      </section>

      <section className="catalog-roadmap" id="roadmap" aria-labelledby="roadmap-title">
        <div className="roadmap-card">
          <p className="eyebrow">В ОЧЕРЕДИ НА РАЗБОР</p>
          <h2 id="roadmap-title">Следующие темы</h2>
        </div>
        <div className="roadmap-card">
          <p>
            Каталог будет расти по темам, где особенно легко спутать заявление,
            поправку и окончательное решение.
          </p>
          <div className="roadmap-chips" aria-label="Планируемые разделы">
            <span className="roadmap-chip">Экономика</span>
            <span className="roadmap-chip">Безопасность</span>
            <span className="roadmap-chip">Религия и государство</span>
          </div>
        </div>
      </section>

      <section className="catalog-section" id="approach" aria-labelledby="approach-title">
        <div className="catalog-section-head">
          <div className="section-heading">
            <p className="eyebrow">ПРИНЦИПЫ</p>
            <h2 id="approach-title">Проверяемое вместо убедительного</h2>
          </div>
          <p>Приложение помогает проверить факт, а политический вывод оставляет читателю.</p>
        </div>
        <div className="catalog-principles">
          <article className="principle-card">
            <span>01</span>
            <h3>Сначала стадия</h3>
            <p>Поправка, процедурное решение и окончательное принятие обозначаются отдельно.</p>
          </article>
          <article className="principle-card">
            <span>02</span>
            <h3>Потом запись</h3>
            <p>Показываем именно тех депутатов и тот результат, которые есть в официальных данных.</p>
          </article>
          <article className="principle-card">
            <span>03</span>
            <h3>Затем граница вывода</h3>
            <p>Отделяем то, что следует из закона, от оценки его последствий.</p>
          </article>
        </div>
      </section>

      <footer>
        <div className="footer-mark">ГОЛОС / ФАКТАМ</div>
        <p>
          Независимый прототип. Не рекомендует партию и не принимает решений за
          избирателя.
        </p>
        <div className="footer-status">
          <span className="status-dot live" />
          Официальные источники указаны внутри каждого досье
        </div>
      </footer>
    </main>
  );
}
