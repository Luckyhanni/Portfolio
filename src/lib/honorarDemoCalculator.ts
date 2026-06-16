import {
  DEMO_GEBUEHRENTABELLEN,
  DEMO_TABELLEN_WERTE,
  PRIVATE_LEISTUNG_OPTIONS,
  type DemoGebuehrentabelle,
  type Gewerbeart,
  type JahresabschlussTyp,
  type PrivatDemoState,
  type PrivatLeistungEintrag,
  type PrivatLeistungKey,
  type UnternehmenInput,
  type UnternehmensArt,
} from "../data/honorarDemoValues";

export type HonorarBreakdownItem = {
  label: string;
  monatlich: number;
  jaehrlich: number;
  detail: string;
};

export type UnternehmenHonorarResult = {
  monatlich: number;
  jaehrlich: number;
  fibu: HonorarBreakdownItem;
  jahresabschluss: HonorarBreakdownItem;
  lohn: HonorarBreakdownItem;
  selbstbucher: HonorarBreakdownItem;
  jahresabschlussTypLabel: string;
  gewerbeartLabel: string;
};

export type PrivatLeistungResult = {
  id: string;
  key: PrivatLeistungKey;
  name: string;
  preis: number;
  wert1: number;
  wert2: number;
  requiresInput: boolean;
};

export type PrivatHonorarResult = {
  monatlich: number;
  jaehrlich: number;
  leistungen: PrivatLeistungResult[];
};

const currencyFormatter = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

export function formatEuro(value: number): string {
  return currencyFormatter.format(value);
}

export function parseDemoNumber(value: string | number): number {
  if (typeof value === "number") {
    return Number.isFinite(value) ? Math.max(0, value) : 0;
  }

  const normalized = value
    .trim()
    .replace(/\s/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  if (!normalized) {
    return 0;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}

export function calculateUnternehmenHonorar(input: UnternehmenInput): UnternehmenHonorarResult {
  const umsatzImJahr = parseDemoNumber(input.umsatzImJahr);
  const bilanzsumme = parseDemoNumber(input.bilanzsumme);
  const jahresueberschuss = parseDemoNumber(input.jahresueberschuss);
  const anzahlMitarbeiter = Math.floor(parseDemoNumber(input.anzahlMitarbeiter));

  const fibu = input.hatFibu
    ? calculateFibu(umsatzImJahr, input.gewerbeart)
    : createItem("Finanzbuchhaltung", 0, "Nicht ausgewählt.");
  const lohn =
    input.hatLohn && anzahlMitarbeiter > 0
      ? calculateLohn(anzahlMitarbeiter)
      : createItem("Lohnabrechnung", 0, "Nicht ausgewählt oder keine Mitarbeitenden.");
  const jahresabschluss = input.hatJahresabschluss
    ? calculateJahresabschluss(
        umsatzImJahr,
        bilanzsumme,
        jahresueberschuss,
        input.jahresabschlussTyp,
        input.unternehmensArt,
      )
    : createItem("Jahresabschluss", 0, "Nicht ausgewählt.");

  const selbstbucherBasis = jahresabschluss.jaehrlich + lohn.jaehrlich;
  const selbstbucher =
    input.istSelbstbucher && selbstbucherBasis > 0
      ? createItem(
          "Selbstbucher (+20%)",
          selbstbucherBasis * DEMO_TABELLEN_WERTE.selbstbucherZuschlag,
          "Demo-Zuschlag auf Jahresabschluss und Lohn.",
        )
      : createItem("Selbstbucher (+20%)", 0, "Nicht ausgewählt.");

  const jaehrlich = roundCurrency(
    fibu.jaehrlich + jahresabschluss.jaehrlich + lohn.jaehrlich + selbstbucher.jaehrlich,
  );

  return {
    monatlich: roundCurrency(jaehrlich / 12),
    jaehrlich,
    fibu,
    jahresabschluss,
    lohn,
    selbstbucher,
    jahresabschlussTypLabel: getJahresabschlussTypLabel(input.jahresabschlussTyp),
    gewerbeartLabel: getGewerbeartLabel(input.gewerbeart),
  };
}

export function calculatePrivatHonorar(state: PrivatDemoState): PrivatHonorarResult {
  const leistungen = state.leistungen.map(calculatePrivatLeistung);
  const jaehrlich = roundCurrency(leistungen.reduce((sum, item) => sum + item.preis, 0));

  return {
    monatlich: roundCurrency(jaehrlich / 12),
    jaehrlich,
    leistungen,
  };
}

export function getPrivatOption(key: PrivatLeistungKey) {
  return PRIVATE_LEISTUNG_OPTIONS.find((option) => option.key === key);
}

function calculateFibu(umsatzImJahr: number, gewerbeart: Gewerbeart): HonorarBreakdownItem {
  if (umsatzImJahr <= 0) {
    return createItem("Finanzbuchhaltung", 0, "Umsatz fehlt.");
  }

  const fullFee = calculateFullFee(umsatzImJahr, DEMO_GEBUEHRENTABELLEN.buchfuehrung);
  const multiplier = getFibuMultiplier(gewerbeart);
  const laufendeGebuehr = fullFee * multiplier;
  const auslagen = Math.min(
    laufendeGebuehr * DEMO_TABELLEN_WERTE.auslagenProzent,
    DEMO_TABELLEN_WERTE.auslagenMax,
  );
  const monatlich = Math.max(
    laufendeGebuehr + auslagen + DEMO_TABELLEN_WERTE.itPauschale,
    DEMO_TABELLEN_WERTE.fibuMinMonatlich,
  );

  return createItem(
    "Finanzbuchhaltung",
    monatlich * 12,
    `${getGewerbeartLabel(gewerbeart)}: ${formatEuro(fullFee)} volle Gebühr x ${multiplier.toFixed(
      2,
    )}.`,
  );
}

function calculateLohn(anzahlMitarbeiter: number): HonorarBreakdownItem {
  let monatlich = 0;

  if (anzahlMitarbeiter >= 1) {
    monatlich += DEMO_TABELLEN_WERTE.lohnErsterMitarbeiter;
  }

  if (anzahlMitarbeiter >= 2) {
    monatlich += Math.min(anzahlMitarbeiter - 1, 8) * DEMO_TABELLEN_WERTE.lohnZweiBisNeun;
  }

  if (anzahlMitarbeiter >= 10) {
    monatlich += Math.min(anzahlMitarbeiter - 9, 10) * DEMO_TABELLEN_WERTE.lohnZehnBisNeunzehn;
  }

  if (anzahlMitarbeiter >= 20) {
    monatlich +=
      Math.min(anzahlMitarbeiter - 19, 30) * DEMO_TABELLEN_WERTE.lohnZwanzigBisNeunundVierzig;
  }

  if (anzahlMitarbeiter >= 50) {
    monatlich +=
      Math.min(anzahlMitarbeiter - 49, 51) * DEMO_TABELLEN_WERTE.lohnFuenfzigBisHundert;
  }

  if (anzahlMitarbeiter >= 101) {
    monatlich += (anzahlMitarbeiter - 100) * DEMO_TABELLEN_WERTE.lohnAbHundertEins;
  }

  return createItem(
    "Lohnabrechnung",
    monatlich * 12,
    `${anzahlMitarbeiter} Mitarbeitende mit Demo-Staffelung.`,
  );
}

function calculateJahresabschluss(
  umsatzImJahr: number,
  bilanzsumme: number,
  jahresueberschuss: number,
  typ: JahresabschlussTyp,
  unternehmensArt: UnternehmensArt,
): HonorarBreakdownItem {
  if (typ === "euer") {
    return calculateEuer(umsatzImJahr, jahresueberschuss);
  }

  return calculateBilanz(umsatzImJahr, bilanzsumme, unternehmensArt);
}

function calculateEuer(umsatzImJahr: number, jahresueberschuss: number): HonorarBreakdownItem {
  if (umsatzImJahr <= 0 && jahresueberschuss <= 0) {
    return createItem("Einnahmenüberschussrechnung", 0, "Umsatz oder Jahresüberschuss fehlt.");
  }

  const bea =
    calculateFullFee(
      Math.max(jahresueberschuss, DEMO_TABELLEN_WERTE.beaMin),
      DEMO_GEBUEHRENTABELLEN.abschluss,
    ) * DEMO_TABELLEN_WERTE.beaSatz;
  const gewerbe =
    calculateFullFee(
      Math.max(jahresueberschuss, DEMO_TABELLEN_WERTE.gewerbeMin),
      DEMO_GEBUEHRENTABELLEN.beratung,
    ) * DEMO_TABELLEN_WERTE.gewerbeSatz;
  const umsatzsteuer =
    calculateFullFee(Math.max(umsatzImJahr, DEMO_TABELLEN_WERTE.ustMin), DEMO_GEBUEHRENTABELLEN.beratung) *
    DEMO_TABELLEN_WERTE.ustSatz;
  const pauschalen = DEMO_TABELLEN_WERTE.abschlussPauschaleSatz * 3;
  const jaehrlich = Math.max(
    bea + gewerbe + umsatzsteuer + pauschalen,
    DEMO_TABELLEN_WERTE.eurMinMonat * 12,
  );

  return createItem("Einnahmenüberschussrechnung", jaehrlich, "BEA, Gewerbe, USt und Pauschalen.");
}

function calculateBilanz(
  umsatzImJahr: number,
  bilanzsumme: number,
  unternehmensArt: UnternehmensArt,
): HonorarBreakdownItem {
  if (umsatzImJahr <= 0 && bilanzsumme <= 0) {
    return createItem("Jahresabschluss / Bilanz", 0, "Umsatz oder Bilanzsumme fehlt.");
  }

  const mittelwert = Math.max((umsatzImJahr + bilanzsumme) / 2, 1);
  const vollerAbschlusswert = calculateFullFee(mittelwert, DEMO_GEBUEHRENTABELLEN.abschluss);
  const vollerBeratungswert = calculateFullFee(mittelwert, DEMO_GEBUEHRENTABELLEN.beratung);
  const minMonat =
    unternehmensArt === "gesellschaft"
      ? DEMO_TABELLEN_WERTE.bilanzMinGesellschaftMonat
      : DEMO_TABELLEN_WERTE.bilanzMinEinzelunternehmenMonat;
  const jaehrlich = Math.max(
    vollerAbschlusswert * DEMO_TABELLEN_WERTE.bilanzAufstellungSatz +
      vollerAbschlusswert * DEMO_TABELLEN_WERTE.steuerbilanzSatz +
      vollerBeratungswert * DEMO_TABELLEN_WERTE.antragSatz +
      vollerBeratungswert * DEMO_TABELLEN_WERTE.ustJahrSatz +
      vollerBeratungswert * DEMO_TABELLEN_WERTE.gewStErklSatz +
      calculateFullFee(
        Math.max(mittelwert, DEMO_TABELLEN_WERTE.koerperschaftMin),
        DEMO_GEBUEHRENTABELLEN.beratung,
      ) *
        DEMO_TABELLEN_WERTE.koerperschaftSatz +
      DEMO_TABELLEN_WERTE.bilanzBescheidSatz * 4 +
      DEMO_TABELLEN_WERTE.eBilanzPauschale +
      DEMO_TABELLEN_WERTE.offenlegungPauschale,
    minMonat * 12,
  );

  return createItem(
    "Jahresabschluss / Bilanz",
    jaehrlich,
    `Mittelwert ${formatEuro(mittelwert)}.`,
  );
}

function calculatePrivatLeistung(leistung: PrivatLeistungEintrag): PrivatLeistungResult {
  const option = getPrivatOption(leistung.key);
  const wert1 = parseDemoNumber(leistung.wert1);
  const wert2 = parseDemoNumber(leistung.wert2);
  const preis = roundCurrency(calculatePrivatPreis(leistung.key, wert1, wert2));

  return {
    id: leistung.id,
    key: leistung.key,
    name: option?.name ?? "Private Leistung",
    preis,
    wert1,
    wert2,
    requiresInput: option?.requiresInput ?? false,
  };
}

function calculatePrivatPreis(key: PrivatLeistungKey, wert1: number, wert2: number): number {
  switch (key) {
    case "einkommensteuer":
      return calculateBeratungsLeistung(
        wert1,
        DEMO_TABELLEN_WERTE.einkommensteuerErklaerungMin,
        DEMO_TABELLEN_WERTE.einkommensteuerErklaerungSatz,
      );
    case "kapitalvermoegen":
      return calculateBeratungsLeistung(
        wert1,
        DEMO_TABELLEN_WERTE.ueberschussKapitalvermoegenMin,
        DEMO_TABELLEN_WERTE.ueberschussKapitalvermoegenSatz,
      );
    case "nichtselbst":
      return calculateBeratungsLeistung(
        wert1,
        DEMO_TABELLEN_WERTE.ueberschussNichtselbstMin,
        DEMO_TABELLEN_WERTE.ueberschussNichtselbstSatz,
      );
    case "gewerbe":
      return (
        calculateFullFee(
          Math.max(wert1, wert2, DEMO_TABELLEN_WERTE.ueberschussGewerbeMin),
          DEMO_GEBUEHRENTABELLEN.abschluss,
        ) * DEMO_TABELLEN_WERTE.ueberschussGewerbeSatz
      );
    case "sonstige":
      return calculateBeratungsLeistung(
        wert1,
        DEMO_TABELLEN_WERTE.ueberschussSonstigeMin,
        DEMO_TABELLEN_WERTE.ueberschussSonstigeSatz,
      );
    case "vermietung":
      return calculateBeratungsLeistung(
        wert1,
        DEMO_TABELLEN_WERTE.ueberschussVermietungMin,
        DEMO_TABELLEN_WERTE.ueberschussVermietungSatz,
      );
    case "ust":
      return calculateBeratungsLeistung(
        (wert1 + wert2) * 0.1,
        DEMO_TABELLEN_WERTE.ustErklaerungConsultingMin,
        DEMO_TABELLEN_WERTE.ustErklaerungConsultingSatz,
      );
    case "steuerbescheid":
      return DEMO_TABELLEN_WERTE.pruefungSteuerbescheidPauschale;
  }
}

function calculateBeratungsLeistung(value: number, min: number, multiplier: number): number {
  return calculateFullFee(Math.max(value, min), DEMO_GEBUEHRENTABELLEN.beratung) * multiplier;
}

function calculateFullFee(value: number, table: DemoGebuehrentabelle): number {
  const directHit = table.werte.find((entry) => value <= entry.gegenstandswertBis);

  if (directHit) {
    return directHit.volleGebuehr;
  }

  const lastEntry = table.werte[table.werte.length - 1];
  const baseFee = Math.max(lastEntry.volleGebuehr, table.maxFee);
  const baseLimit = Math.max(lastEntry.gegenstandswertBis, table.maxLimit);
  const increments = Math.ceil((value - baseLimit) / table.step);

  return baseFee + Math.max(0, increments) * table.addFee;
}

function createItem(label: string, jaehrlich: number, detail: string): HonorarBreakdownItem {
  const roundedJaehrlich = roundCurrency(jaehrlich);

  return {
    label,
    jaehrlich: roundedJaehrlich,
    monatlich: roundCurrency(roundedJaehrlich / 12),
    detail,
  };
}

function getFibuMultiplier(gewerbeart: Gewerbeart): number {
  if (gewerbeart === "bargeld") {
    return DEMO_TABELLEN_WERTE.bargeldGewerbeSatz;
  }

  if (gewerbeart === "online") {
    return DEMO_TABELLEN_WERTE.onlineHaendlerSatz;
  }

  return DEMO_TABELLEN_WERTE.fibuNormalSatz;
}

function getGewerbeartLabel(gewerbeart: Gewerbeart): string {
  if (gewerbeart === "bargeld") {
    return "Bargeldgewerbe";
  }

  if (gewerbeart === "online") {
    return "Onlinehändler";
  }

  return "Standard";
}

function getJahresabschlussTypLabel(typ: JahresabschlussTyp): string {
  return typ === "bilanz" ? "Bilanz" : "EÜR";
}

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}
