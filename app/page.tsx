import { VoteExplorer, type VoteResult } from "./VoteExplorer";

export const dynamic = "force-dynamic";

const VOTE_ID = 43884;
const API_ROOT = "https://knesset.gov.il/OdataV4/ParliamentInfo";

type KnessetVote = {
  Id: number;
  VoteDateTime: string;
  VoteMethodDesc: string;
  VoteStatusDesc: string;
  VoteTitle: string;
  VoteSubject: string;
  ForOptionDesc: string;
  AgainstOptionDesc: string;
  LastUpdatedDate: string;
};

type KnessetResult = {
  FirstName: string;
  LastName: string;
  ResultDesc: string;
};

const fallbackResults: VoteResult[] = [
  { firstName: "משה", lastName: "אבוטבול", result: "for" },
  { firstName: "יולי יואל", lastName: "אדלשטיין", result: "for" },
  { firstName: "אמיר", lastName: "אוחנה", result: "for" },
  { firstName: "ינון", lastName: "אזולאי", result: "for" },
  { firstName: "ישראל", lastName: "אייכלר", result: "for" },
  { firstName: "דן", lastName: "אילוז", result: "for" },
  { firstName: "ואליד", lastName: "אלהואשלה", result: "present" },
  { firstName: "עמיחי", lastName: "אליהו", result: "for" },
  { firstName: "זאב", lastName: "אלקין", result: "for" },
  { firstName: "משה", lastName: "ארבל", result: "for" },
  { firstName: "יעקב", lastName: "אשר", result: "for" },
  { firstName: "אביחי אברהם", lastName: "בוארון", result: "for" },
  { firstName: "אוריאל", lastName: "בוסו", result: "for" },
  { firstName: "מישל", lastName: "בוסקילה", result: "for" },
  { firstName: "דוד", lastName: "ביטן", result: "for" },
  { firstName: "בועז", lastName: "ביסמוט", result: "for" },
  { firstName: "איתמר", lastName: "בן גביר", result: "for" },
  { firstName: "אברהם", lastName: "בצלאל", result: "for" },
  { firstName: "אליהו", lastName: "ברוכי", result: "for" },
  { firstName: "ניר", lastName: "ברקת", result: "for" },
  { firstName: "ששון ששי", lastName: "גואטה", result: "for" },
  { firstName: "טלי", lastName: "גוטליב", result: "for" },
  { firstName: "מאי", lastName: "גולן", result: "for" },
  { firstName: "גילה", lastName: "גמליאל", result: "for" },
  { firstName: "אבי", lastName: "דיכטר", result: "for" },
  { firstName: "גלית", lastName: "דיסטל אטבריאן", result: "for" },
  { firstName: "אלי", lastName: "דלל", result: "for" },
  { firstName: "שלום", lastName: "דנינו", result: "for" },
  { firstName: "אריה מכלוף", lastName: "דרעי", result: "for" },
  { firstName: "עמית", lastName: "הלוי", result: "for" },
  { firstName: "שרן מרים", lastName: "השכל", result: "for" },
  { firstName: "ניסים", lastName: "ואטורי", result: "for" },
  { firstName: "מיכל מרים", lastName: "וולדיגר", result: "for" },
  { firstName: "יצחק שמעון", lastName: "וסרלאוף", result: "for" },
  { firstName: "יוסף", lastName: "טייב", result: "for" },
  { firstName: "אוהד", lastName: "טל", result: "for" },
  { firstName: "יעקב", lastName: "טסלר", result: "for" },
  { firstName: "אלמוג", lastName: "כהן", result: "for" },
  { firstName: "אופיר", lastName: "כץ", result: "for" },
  { firstName: "ישראל", lastName: "כץ", result: "for" },
  { firstName: "מיקי", lastName: "לוי", result: "against" },
  { firstName: "יריב", lastName: "לוין", result: "for" },
  { firstName: "סימון", lastName: "מושיאשוילי", result: "for" },
  { firstName: "מרב", lastName: "מיכאלי", result: "present" },
  { firstName: "יונתן", lastName: "מישרקי", result: "for" },
  { firstName: "חנוך דב", lastName: "מלביצקי", result: "for" },
  { firstName: "ארז", lastName: "מלול", result: "for" },
  { firstName: "מיכאל", lastName: "מלכיאלי", result: "for" },
  { firstName: "צגה", lastName: "מלקו", result: "for" },
  { firstName: "אבי", lastName: "מעוז", result: "for" },
  { firstName: "בנימין", lastName: "נתניהו", result: "for" },
  { firstName: "משה", lastName: "סולומון", result: "for" },
  { firstName: "לימור", lastName: "סון הר מלך", result: "for" },
  { firstName: "אופיר", lastName: "סופר", result: "for" },
  { firstName: "אורית מלכה", lastName: "סטרוק", result: "for" },
  { firstName: "משה", lastName: "סעדה", result: "for" },
  { firstName: "גדעון", lastName: "סער", result: "for" },
  { firstName: "עפיף", lastName: "עבד", result: "for" },
  { firstName: "חוה אתי", lastName: "עטייה", result: "for" },
  { firstName: "צביקה", lastName: "פוגל", result: "for" },
  { firstName: "יצחק", lastName: "פינדרוס", result: "for" },
  { firstName: "משה", lastName: "פסל", result: "for" },
  { firstName: "אריאל", lastName: "קלנר", result: "for" },
  { firstName: "יצחק", lastName: "קרויזר", result: "for" },
  { firstName: "שלמה", lastName: "קרעי", result: "for" },
  { firstName: "אליהו", lastName: "רביבו", result: "for" },
  { firstName: "משה", lastName: "רוט", result: "for" },
  { firstName: "שמחה", lastName: "רוטמן", result: "for" },
  { firstName: "קטי קטרין", lastName: "שטרית", result: "for" },
  { firstName: "אושר", lastName: "שקלים", result: "for" },
];

function normalizeResult(result: string): VoteResult["result"] {
  if (result === "בעד") return "for";
  if (result === "נגד") return "against";
  if (result === "נוכח") return "present";
  return "other";
}

async function getVoteData() {
  const resultsQuery = new URLSearchParams({
    $filter: `VoteID eq ${VOTE_ID}`,
    $top: "200",
    $count: "true",
  });

  try {
    const [voteResponse, resultsResponse] = await Promise.all([
      fetch(`${API_ROOT}/KNS_PlenumVote(${VOTE_ID})`, {
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
    const payload = (await resultsResponse.json()) as {
      value: KnessetResult[];
    };

    if (vote.Id !== VOTE_ID || !Array.isArray(payload.value)) {
      throw new Error("Unexpected Knesset API response");
    }

    return {
      live: true,
      lastUpdated: vote.LastUpdatedDate,
      results: payload.value.map((row) => ({
        firstName: row.FirstName,
        lastName: row.LastName,
        result: normalizeResult(row.ResultDesc),
      })),
    };
  } catch (error) {
    console.error("[knesset-api] using verified fallback snapshot", error);
    return {
      live: false,
      lastUpdated: "2025-03-31T11:13:26.78+03:00",
      results: fallbackResults,
    };
  }
}

function formatSourceDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function Home() {
  const voteData = await getVoteData();

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Голос по фактам — наверх">
          <span className="wordmark-dot" aria-hidden="true" />
          <span>ГОЛОС</span>
          <span className="wordmark-slash">/</span>
          <span>ФАКТАМ</span>
        </a>
        <nav aria-label="Навигация по странице">
          <a href="#context">Что изменилось</a>
          <a href="#members">Как голосовали</a>
          <a href="#method">Методика</a>
        </nav>
        <span className="language-pill">RU · עברית</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">ДОСЬЕ ГОЛОСОВАНИЯ · № 43884</p>
          <h1>Кто изменил правила выбора судей?</h1>
          <p className="hero-lede">
            Не пересказываем лозунги. Показываем окончательное голосование,
            текст закона и границы того, что из них действительно следует.
          </p>
          <div className="hero-meta" aria-label="Сведения о голосовании">
            <span>27 марта 2025</span>
            <span>третье чтение</span>
            <span>поимённое</span>
            <span>применение — с 26-го Кнессета</span>
          </div>
        </div>

        <div className="vote-score" aria-label="67 за, 1 против, 2 присутствовали без голоса">
          <div className="score-primary">
            <span className="score-number">67</span>
            <span className="score-label">за принятие</span>
          </div>
          <div className="score-secondary">
            <div>
              <strong>1</strong>
              <span>против</span>
            </div>
            <div>
              <strong>2</strong>
              <span>присутствовали</span>
            </div>
          </div>
          <p className="score-note">50 депутатов не имеют строки в этой поимённой записи</p>
        </div>
      </section>

      <section className="stage-warning" aria-label="Важное пояснение">
        <span className="warning-index">01</span>
        <p>
          У закона было множество голосований по отдельным поправкам с тем же
          названием. Здесь показана запись, где прямо указано:
          <strong> «принять законопроект в третьем чтении»</strong>.
        </p>
        <a
          href="https://knesset.gov.il/OdataV4/ParliamentInfo/KNS_PlenumVote?%24filter=Id%20eq%2043884"
          target="_blank"
          rel="noreferrer"
        >
          Открыть запись ↗
        </a>
      </section>

      <section className="context-section" id="context">
        <div className="section-heading">
          <p className="eyebrow">ЧТО НАПИСАНО В ЗАКОНЕ</p>
          <h2>Без ярлыков: состав, пороги, последствия</h2>
        </div>

        <div className="context-grid">
          <article className="context-card context-before">
            <span className="card-kicker">БЫЛО</span>
            <h3>Компромисс через 7 из 9</h3>
            <p>
              Три судьи Верховного суда, два министра, два депутата и два
              представителя Коллегии адвокатов. Для назначения в Верховный суд
              требовалось семь голосов.
            </p>
            <p className="card-conclusion">
              Ни судьи, ни коалиция не могли назначить кандидата самостоятельно.
            </p>
          </article>

          <article className="context-card context-after">
            <span className="card-kicker">СТАЛО ПО ПОПРАВКЕ</span>
            <h3>Пять голосов и партийные представители</h3>
            <p>
              Два места Коллегии адвокатов заменены юристами, которых отдельно
              выбирают коалиция и оппозиция. Для Верховного суда нужны пять
              голосов с участием обеих сторон.
            </p>
            <p className="card-conclusion">
              Согласие действующего судьи для назначения в Верховный суд больше
              не является обязательным. Применение поправки отложено до начала
              работы 26-го Кнессета.
            </p>
          </article>

          <article className="context-card context-limit">
            <span className="card-kicker">ГРАНИЦА ВЫВОДА</span>
            <h3>Не «коалиция назначает одна»</h3>
            <p>
              В обычном порядке закон требует участия представителя оппозиции.
              Для нижестоящих судов дополнительно нужен голос судьи.
            </p>
            <p className="card-conclusion">
              Точный спор — не о полном единоличном контроле, а о степени
              политизации и исчезновении судейского вето.
            </p>
          </article>
        </div>

        <div className="source-strip">
          <span>ПЕРВИЧНЫЙ ИСТОЧНИК</span>
          <p>Основной закон: Судебная власть, поправка № 4</p>
          <a
            href="https://fs.knesset.gov.il/25/law/25_lsr_6165425.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Официальный PDF Кнессета ↗
          </a>
        </div>
        <p className="scope-note">
          Эта поправка меняет порядок назначения судей. Она не изменяет напрямую
          полномочия БАГАЦа рассматривать петиции или отменять законы.
        </p>
      </section>

      <VoteExplorer
        results={voteData.results}
        isLive={voteData.live}
        sourceUpdated={formatSourceDate(voteData.lastUpdated)}
      />

      <section className="claim-section" aria-labelledby="claim-title">
        <div className="claim-label">ПРОВЕРКА ТЕЗИСА</div>
        <div className="claim-content">
          <p className="claim-quote" id="claim-title">
            «Теперь коалиция сможет сама назначать любых судей»
          </p>
          <div className="claim-verdict">
            <span>НЕТОЧНО</span>
            <p>
              Для обычного решения необходим представитель оппозиции; для
              нижестоящих судов — ещё и судья. Но для назначения в Верховный суд
              согласие судей действительно перестаёт быть обязательным.
            </p>
          </div>
        </div>
      </section>

      <section className="method-section" id="method">
        <div className="section-heading">
          <p className="eyebrow">КАК МЫ НЕ МАНИПУЛИРУЕМ</p>
          <h2>Четыре правила карточки</h2>
        </div>
        <ol className="method-list">
          <li>
            <span>01</span>
            <p><strong>Показываем стадию.</strong> Поправка и окончательное принятие — разные действия.</p>
          </li>
          <li>
            <span>02</span>
            <p><strong>Не додумываем отсутствие.</strong> Нет строки депутата — это не голос «против».</p>
          </li>
          <li>
            <span>03</span>
            <p><strong>Отделяем факт от оценки.</strong> Текст закона — факт; «хорошо» или «плохо» — позиция.</p>
          </li>
          <li>
            <span>04</span>
            <p><strong>Даём первоисточник.</strong> Любой вывод можно проверить без доверия к приложению.</p>
          </li>
        </ol>
      </section>

      <footer>
        <div className="footer-mark">ГОЛОС / ФАКТАМ</div>
        <p>
          Независимый прототип. Не рекомендует партию и не принимает решений за
          избирателя.
        </p>
        <div className="footer-status">
          <span className={voteData.live ? "status-dot live" : "status-dot"} />
          {voteData.live ? "Данные получены из API Кнессета" : "Показан проверенный резервный снимок"}
        </div>
      </footer>
    </main>
  );
}
