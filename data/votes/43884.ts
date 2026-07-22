import type { VoteDossierData } from "./types";

export const vote43884 = {
  voteId: 43884,
  totalMembers: 120,
  catalog: {
    topic: "Судебная система",
    title: "Кто изменил правила выбора судей?",
    summary:
      "Окончательное голосование по поправке № 4: новый состав комиссии, новые пороги и отложенное применение.",
    dateLabel: "27 марта 2025",
    tags: ["Основной закон", "третье чтение", "поимённое"],
  },
  hero: {
    eyebrow: "ДОСЬЕ ГОЛОСОВАНИЯ · № 43884",
    title: "Кто изменил правила выбора судей?",
    lede:
      "Не пересказываем лозунги. Показываем окончательное голосование, текст закона и границы того, что из них действительно следует.",
    meta: [
      "27 марта 2025",
      "третье чтение",
      "поимённое",
      "применение — с 26-го Кнессета",
    ],
  },
  voteRecordHref:
    "https://knesset.gov.il/OdataV4/ParliamentInfo/KNS_PlenumVote?%24filter=Id%20eq%2043884",
  rawResultsHref:
    "https://knesset.gov.il/OdataV4/ParliamentInfo/KNS_PlenumVoteResult?%24filter=VoteID%20eq%2043884&%24top=200",
  stageNotice: {
    intro:
      "У закона было множество голосований по отдельным поправкам с тем же названием. Здесь показана запись, где прямо указано:",
    emphasis: "«принять законопроект в третьем чтении»",
  },
  context: {
    eyebrow: "ЧТО НАПИСАНО В ЗАКОНЕ",
    title: "Без ярлыков: состав, пороги, последствия",
    cards: [
      {
        tone: "before",
        kicker: "БЫЛО",
        title: "Компромисс через 7 из 9",
        body:
          "Три судьи Верховного суда, два министра, два депутата и два представителя Коллегии адвокатов. Для назначения в Верховный суд требовалось семь голосов.",
        conclusion:
          "Ни судьи, ни коалиция не могли назначить кандидата самостоятельно.",
      },
      {
        tone: "after",
        kicker: "СТАЛО ПО ПОПРАВКЕ",
        title: "Пять голосов и партийные представители",
        body:
          "Два места Коллегии адвокатов заменены юристами, которых отдельно выбирают коалиция и оппозиция. Для Верховного суда нужны пять голосов с участием обеих сторон.",
        conclusion:
          "Согласие действующего судьи для назначения в Верховный суд больше не является обязательным. Применение поправки отложено до начала работы 26-го Кнессета.",
      },
      {
        tone: "limit",
        kicker: "ГРАНИЦА ВЫВОДА",
        title: "Не «коалиция назначает одна»",
        body:
          "В обычном порядке закон требует участия представителя оппозиции. Для нижестоящих судов дополнительно нужен голос судьи.",
        conclusion:
          "Точный спор — не о полном единоличном контроле, а о степени политизации и исчезновении судейского вето.",
      },
    ],
  },
  primarySource: {
    kicker: "ПЕРВИЧНЫЙ ИСТОЧНИК",
    title: "Основной закон: Судебная власть, поправка № 4",
    label: "Официальный PDF Кнессета ↗",
    href: "https://fs.knesset.gov.il/25/law/25_lsr_6165425.pdf",
  },
  scopeNote:
    "Эта поправка меняет порядок назначения судей. Она не изменяет напрямую полномочия БАГАЦа рассматривать петиции или отменять законы.",
  claimCheck: {
    claim: "«Теперь коалиция сможет сама назначать любых судей»",
    verdict: "НЕТОЧНО",
    explanation:
      "Для обычного решения необходим представитель оппозиции; для нижестоящих судов — ещё и судья. Но для назначения в Верховный суд согласие судей действительно перестаёт быть обязательным.",
  },
  methodRules: [
    {
      number: "01",
      title: "Показываем стадию.",
      explanation: "Поправка и окончательное принятие — разные действия.",
    },
    {
      number: "02",
      title: "Не додумываем отсутствие.",
      explanation: "Нет строки депутата — это не голос «против».",
    },
    {
      number: "03",
      title: "Отделяем факт от оценки.",
      explanation: "Текст закона — факт; «хорошо» или «плохо» — позиция.",
    },
    {
      number: "04",
      title: "Даём первоисточник.",
      explanation: "Любой вывод можно проверить без доверия к приложению.",
    },
  ],
  snapshot: {
    lastUpdated: "2025-03-31T11:13:26.78+03:00",
    results: [
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
    ],
  },
} as const satisfies VoteDossierData;
