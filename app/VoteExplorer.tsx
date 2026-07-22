"use client";

import { useMemo, useState } from "react";
import type { VoteResult } from "../data/votes/types";

export type { VoteResult } from "../data/votes/types";

type Filter = "all" | VoteResult["result"];

type VoteExplorerProps = {
  results: readonly VoteResult[];
  isLive: boolean;
  sourceUpdated: string;
  rawResultsHref: string;
};

const aliasLists: Record<string, readonly string[]> = {
  "משה אבוטבול": ["Моше Абутбул", "Моше Абутбуль", "Moshe Abutbul"],
  "יולי יואל אדלשטיין": ["Юлий Эдельштейн", "Юли Эдельштейн", "Yuli Edelstein", "Yuli Yoel Edelstein"],
  "אמיר אוחנה": ["Амир Охана", "Amir Ohana"],
  "ינון אזולאי": ["Инон Азулай", "Йинон Азулай", "Yinon Azoulay", "Yinon Azulai"],
  "ישראל אייכלר": ["Исраэль Эйхлер", "Israel Eichler", "Yisrael Eichler"],
  "דן אילוז": ["Дан Иллуз", "Дан Илуз", "Dan Illouz"],
  "ואליד אלהואשלה": ["Валид аль-Хавашла", "Валид аль-Хуашла", "Waleed Alhwashla", "Walid al-Huashla"],
  "עמיחי אליהו": ["Амихай Элияху", "Amichay Eliyahu", "Amichai Eliyahu"],
  "זאב אלקין": ["Зеэв Элькин", "Zeev Elkin", "Ze'ev Elkin"],
  "משה ארבל": ["Моше Арбель", "Moshe Arbel"],
  "יעקב אשר": ["Яаков Ашер", "Yaakov Asher", "Jacob Asher"],
  "אביחי אברהם בוארון": ["Авихай Авраам Буарон", "Авихай Буарон", "Avichay Avraham Buaron", "Avihai Boaron"],
  "אוריאל בוסו": ["Уриэль Бусо", "Uriel Busso", "Uriel Buso"],
  "מישל בוסקילה": ["Мишель Бускила", "Mishel Buskila", "Michel Buskila", "Michael Buskila"],
  "דוד ביטן": ["Давид Битан", "David Bitan"],
  "בועז ביסמוט": ["Боаз Бисмут", "Boaz Bismuth"],
  "איתמר בן גביר": ["Итамар Бен-Гвир", "Itamar Ben Gvir", "Itamar Ben-Gvir"],
  "אברהם בצלאל": ["Авраам Бецалель", "Avraham Betzalel", "Avraham Bezalel"],
  "אליהו ברוכי": ["Элиягу Барухи", "Eliyahu Baruchi"],
  "ניר ברקת": ["Нир Баркат", "Nir Barkat"],
  "ששון ששי גואטה": ["Сассон Сасси Гетта", "Сассон Гетта", "Сассон Гуэтта", "Sasson Sassi Guetta", "Sasson Guetta"],
  "טלי גוטליב": ["Тали Готлиб", "Tally Gotliv", "Tali Gotliv", "Tali Gottlieb"],
  "מאי גולן": ["Май Голан", "May Golan"],
  "גילה גמליאל": ["Гила Гамлиэль", "Gila Gamliel"],
  "אבי דיכטר": ["Ави Дихтер", "Avi Dichter", "Avi Dicter"],
  "גלית דיסטל אטבריאן": ["Галит Дистель-Атбарьян", "Galit Distel Atbaryan", "Galit Distel-Atbaryan"],
  "אלי דלל": ["Эли Далаль", "Эли Даллаль", "Eli Dallal", "Eli Dellal"],
  "שלום דנינו": ["Шалом Данино", "Shalom Danino"],
  "אריה מכלוף דרעי": ["Арье Махлуф Дери", "Арье Дери", "Aryeh Machluf Deri", "Aryeh Deri"],
  "עמית הלוי": ["Амит Галеви", "Амит Халеви", "Amit Halevi", "Amit Halevy"],
  "שרן מרים השכל": ["Шарен Мириам Хаскель", "Шаррен Хаскель", "Sharren Miriam Haskel", "Sharren Haskel"],
  "ניסים ואטורי": ["Нисим Ватури", "Ниссим Ватури", "Nissim Vaturi"],
  "מיכל מרים וולדיגר": ["Михаль Мириам Вальдигер", "Михаль Вальдигер", "Michal Miriam Woldiger", "Michal Waldiger"],
  "יצחק שמעון וסרלאוף": ["Ицхак Шимон Вассерлауф", "Ицхак Вассерлауф", "Yitzhak Shimon Wasserlauf", "Yitzhak Wasserlauf"],
  "יוסף טייב": ["Йосеф Тайеб", "Йосеф Таиб", "Yosef Taieb"],
  "אוהד טל": ["Охад Таль", "Ohad Tal"],
  "יעקב טסלר": ["Яаков Теслер", "Yaakov Tesler", "Yaakov Tessler", "Jacob Tessler"],
  "אלמוג כהן": ["Альмог Коэн", "Almog Cohen"],
  "אופיר כץ": ["Офир Кац", "Ofir Katz"],
  "ישראל כץ": ["Исраэль Кац", "Israel Katz", "Yisrael Katz"],
  "מיקי לוי": ["Мики Леви", "Mickey Levy", "Miki Levy"],
  "יריב לוין": ["Ярив Левин", "Yariv Levin"],
  "סימון מושיאשוילי": ["Симон Мошиашвили", "Семион Мошиашвили", "Simon Moshiashvili", "Semion Moshiashvili"],
  "מרב מיכאלי": ["Мерав Михаэли", "Мейрав Михаэли", "Merav Michaeli", "Meirav Michaeli"],
  "יונתן מישרקי": ["Йонатан Мишраки", "Yonatan Mishraki", "Yonatan Mashriki", "Jonathan Misharki"],
  "חנוך דב מלביצקי": ["Ханох Дов Мильвицкий", "Ханох Мильвицкий", "Hanoch Dov Milwidsky", "Hanoch Milwidsky"],
  "ארז מלול": ["Эрез Малуль", "Erez Malul"],
  "מיכאל מלכיאלי": ["Михаэль Малкиэли", "Michael Malkieli", "Michael Malchieli"],
  "צגה מלקו": ["Цега Мелаку", "Tsega Melaku"],
  "אבי מעוז": ["Ави Маоз", "Avi Maoz"],
  "בנימין נתניהו": ["Биньямин Нетаньяху", "Беньямин Нетаньяху", "Benjamin Netanyahu", "Binyamin Netanyahu", "Биби"],
  "משה סולומון": ["Моше Соломон", "Moshe Solomon"],
  "לימור סון הר מלך": ["Лимор Сон Хар-Мелех", "Limor Sonn Har Melech", "Limor Son Har-Melech"],
  "אופיר סופר": ["Офир Софер", "Ofir Sofer"],
  "אורית מלכה סטרוק": ["Орит Малка Струк", "Орит Струк", "Orit Malka Strock", "Orit Strook", "Orit Strock"],
  "משה סעדה": ["Моше Саада", "Moshe Saada"],
  "גדעון סער": ["Гидеон Саар", "Gideon Saar", "Gideon Sa'ar"],
  "עפיף עבד": ["Афиф Абед", "Афеф Абед", "Afef Abed", "Afif Abed"],
  "חוה אתי עטייה": ["Хава Эти Атия", "Эти Атия", "Etty Hava Atia", "Eti Atiya"],
  "צביקה פוגל": ["Цвика Фогель", "Tzvika Foghel", "Zvika Fogel"],
  "יצחק פינדרוס": ["Ицхак Пиндрус", "Yitzhak Pindrus", "Yitzhak Zeev Pindrus", "Isaac Pindrus"],
  "משה פסל": ["Моше Пасаль", "Moshe Passal"],
  "אריאל קלנר": ["Ариэль Каллнер", "Ариэль Кальнер", "Ariel Kallner"],
  "יצחק קרויזר": ["Ицхак Кройзер", "Yitzhak Kroizer", "Yitzhak Kreuzer"],
  "שלמה קרעי": ["Шломо Караи", "Шломо Каръи", "Shlomo Karhi"],
  "אליהו רביבו": ["Элиягу Ревиво", "Eliyahu Revivo"],
  "משה רוט": ["Моше Рот", "Moshe Roth"],
  "שמחה רוטמן": ["Симха Ротман", "Simcha Rothman"],
  "קטי קטרין שטרית": ["Кэти Катрин Шитрит", "Кети Шитрит", "Keti Shitrit", "Kathrin Shitrit", "Katy Shitrit"],
  "אושר שקלים": ["Ошер Шекалим", "Ошер Шкалим", "Osher Shkalim", "Osher Shekalim"],
};

const aliases: Record<string, { display: string; search: string }> = Object.fromEntries(
  Object.entries(aliasLists).map(([name, values]) => [
    name,
    { display: values[0], search: values.slice(1).join(" ") },
  ]),
);

const filterLabels: { value: Filter; label: string }[] = [
  { value: "all", label: "Все записи" },
  { value: "for", label: "За" },
  { value: "against", label: "Против" },
  { value: "present", label: "Присутствовали" },
];

const resultLabels: Record<VoteResult["result"], string> = {
  for: "За",
  against: "Против",
  present: "Присутствовал·а",
  other: "Иная запись",
};

function normalize(value: string) {
  return value
    .toLocaleLowerCase("ru")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[־'"״׳.,–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function fullName(result: VoteResult) {
  return `${result.firstName} ${result.lastName}`.trim();
}

export function VoteExplorer({
  results,
  isLive,
  sourceUpdated,
  rawResultsHref,
}: VoteExplorerProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [visibleCount, setVisibleCount] = useState(16);

  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query);

    return results
      .filter((result) => filter === "all" || result.result === filter)
      .filter((result) => {
        if (!normalizedQuery) return true;
        const hebrewName = fullName(result);
        const alias = aliases[hebrewName];
        return normalize(`${hebrewName} ${alias?.display ?? ""} ${alias?.search ?? ""}`).includes(
          normalizedQuery,
        );
      });
  }, [filter, query, results]);

  const shown = filtered.slice(0, visibleCount);

  return (
    <section className="members-section" id="members" aria-labelledby="members-title">
      <div className="members-intro">
        <div className="section-heading">
          <p className="eyebrow">ПОИМЁННАЯ ЗАПИСЬ</p>
          <h2 id="members-title">Найдите депутата</h2>
        </div>
        <p className="members-explainer">
          В официальной записи есть {results.length} строк. Отсутствие фамилии не
          означает голос «против» — оно означает только отсутствие
          зарегистрированного результата в этой записи.
        </p>
      </div>

      <div className="search-panel">
        <label htmlFor="member-search">Имя или фамилия на русском, английском или иврите</label>
        <div className="search-input-wrap">
          <span aria-hidden="true">⌕</span>
          <input
            id="member-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisibleCount(16);
            }}
            placeholder="Например, Нетаньяху или נתניהו"
            autoComplete="off"
          />
          {query ? (
            <button
              type="button"
              className="clear-button"
              onClick={() => {
                setQuery("");
                setVisibleCount(16);
              }}
            >
              Очистить
            </button>
          ) : null}
        </div>

        <div className="filter-row" aria-label="Фильтр результата">
          {filterLabels.map((item) => (
            <button
              type="button"
              key={item.value}
              aria-pressed={filter === item.value}
              onClick={() => {
                setFilter(item.value);
                setVisibleCount(16);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="results-meta" aria-live="polite">
        <p>
          Найдено: <strong>{filtered.length}</strong>
        </p>
        <p className="api-state">
          <span className={isLive ? "status-dot live" : "status-dot"} />
          {isLive ? "API Кнессета" : "резервный снимок"} · источник обновлён {sourceUpdated}
        </p>
      </div>

      {shown.length ? (
        <div className="member-grid" role="list">
          {shown.map((result) => {
            const hebrewName = fullName(result);
            const alias = aliases[hebrewName];
            return (
              <article className="member-row" role="listitem" key={`${hebrewName}-${result.result}`}>
                <div className="member-index" aria-hidden="true">
                  {String(results.indexOf(result) + 1).padStart(2, "0")}
                </div>
                <div className="member-name">
                  <strong>{alias?.display ?? hebrewName}</strong>
                  {alias ? <span dir="rtl">{hebrewName}</span> : <span>официальное написание</span>}
                </div>
                <span className={`result-badge result-${result.result}`}>
                  {resultLabels[result.result]}
                </span>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <strong>Совпадений нет</strong>
          <p>Проверьте написание или выберите другой результат голосования.</p>
        </div>
      )}

      {visibleCount < filtered.length ? (
        <button
          type="button"
          className="load-more"
          onClick={() => setVisibleCount((current) => current + 16)}
        >
          Показать ещё <span aria-hidden="true">↓</span>
        </button>
      ) : null}

      <a
        className="raw-data-link"
        href={rawResultsHref}
        target="_blank"
        rel="noreferrer"
      >
        Посмотреть необработанные данные Кнессета ↗
      </a>
    </section>
  );
}
