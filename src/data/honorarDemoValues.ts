export type DemoScreen =
  | "mandatstyp"
  | "unternehmen-daten"
  | "unternehmen-leistungen"
  | "fibu-details"
  | "ja-auswahl"
  | "euer-details"
  | "bilanz-details"
  | "lohn-details"
  | "privat-leistungen"
  | "privat-daten";

export type Gewerbeart = "standard" | "bargeld" | "online";
export type JahresabschlussTyp = "euer" | "bilanz";
export type UnternehmensArt = "einzelunternehmen" | "gesellschaft";

export type UnternehmenInput = {
  umsatzImJahr: string;
  bilanzsumme: string;
  jahresueberschuss: string;
  anzahlMitarbeiter: string;
  gewerbeart: Gewerbeart;
  unternehmensArt: UnternehmensArt;
  hatFibu: boolean;
  hatJahresabschluss: boolean;
  jahresabschlussTyp: JahresabschlussTyp;
  hatLohn: boolean;
  istSelbstbucher: boolean;
};

export type PrivatLeistungKey =
  | "einkommensteuer"
  | "kapitalvermoegen"
  | "nichtselbst"
  | "gewerbe"
  | "sonstige"
  | "vermietung"
  | "ust"
  | "steuerbescheid";

export type PrivatLeistungEintrag = {
  id: string;
  key: PrivatLeistungKey;
  wert1: string;
  wert2: string;
};

export type PrivatDemoState = {
  globalEinnahmen: string;
  leistungen: PrivatLeistungEintrag[];
};

export type HonorarDemoState = {
  screen: DemoScreen;
  history: DemoScreen[];
  unternehmen: UnternehmenInput;
  privat: PrivatDemoState;
};

export type PrivatLeistungOption = {
  key: PrivatLeistungKey;
  name: string;
  wert1Hint: string;
  wert2Hint?: string;
  hasWert2?: boolean;
  requiresInput: boolean;
};

export type GebuehrentabelleEintrag = {
  gegenstandswertBis: number;
  volleGebuehr: number;
};

export type DemoGebuehrentabelle = {
  werte: GebuehrentabelleEintrag[];
  maxLimit: number;
  maxFee: number;
  addFee: number;
  step: number;
};

export const DEFAULT_UNTERNEHMEN_INPUT: UnternehmenInput = {
  umsatzImJahr: "",
  bilanzsumme: "",
  jahresueberschuss: "",
  anzahlMitarbeiter: "",
  gewerbeart: "standard",
  unternehmensArt: "gesellschaft",
  hatFibu: true,
  hatJahresabschluss: true,
  jahresabschlussTyp: "bilanz",
  hatLohn: true,
  istSelbstbucher: false,
};

export const DEFAULT_PRIVAT_STATE: PrivatDemoState = {
  globalEinnahmen: "",
  leistungen: [],
};

export const DEFAULT_HONORAR_DEMO_STATE: HonorarDemoState = {
  screen: "mandatstyp",
  history: [],
  unternehmen: DEFAULT_UNTERNEHMEN_INPUT,
  privat: DEFAULT_PRIVAT_STATE,
};

export const PRIVATE_LEISTUNG_OPTIONS: PrivatLeistungOption[] = [
  {
    key: "einkommensteuer",
    name: "Einkommensteuererklärung",
    wert1Hint: "Einnahmen",
    requiresInput: true,
  },
  {
    key: "kapitalvermoegen",
    name: "Kapitalvermögen",
    wert1Hint: "Einnahmen",
    requiresInput: true,
  },
  {
    key: "nichtselbst",
    name: "Nichtselbst. Arbeit",
    wert1Hint: "Einnahmen",
    requiresInput: true,
  },
  {
    key: "gewerbe",
    name: "Gewerbebetrieb Selbstst.",
    wert1Hint: "Betriebseinnahmen",
    wert2Hint: "Betriebsausgaben",
    hasWert2: true,
    requiresInput: true,
  },
  {
    key: "sonstige",
    name: "Sonstige Einkünfte",
    wert1Hint: "Einnahmen",
    requiresInput: true,
  },
  {
    key: "vermietung",
    name: "Vermiet./Verpacht.",
    wert1Hint: "Einnahmen",
    requiresInput: true,
  },
  {
    key: "ust",
    name: "USt-Erklärung",
    wert1Hint: "Gesamtbetrag Entgelte",
    wert2Hint: "Entgelte Leistungsempfänger",
    hasWert2: true,
    requiresInput: true,
  },
  {
    key: "steuerbescheid",
    name: "Prüfung eines Steuerbescheids",
    wert1Hint: "",
    requiresInput: false,
  },
];

export const DEMO_TABELLEN_WERTE = {
  itPauschale: 35,
  auslagenProzent: 0.08,
  auslagenMax: 35,
  fibuMinMonatlich: 190,
  fibuNormalSatz: 0.6,
  onlineHaendlerSatz: 0.5,
  bargeldGewerbeSatz: 0.75,
  lohnErsterMitarbeiter: 38,
  lohnZweiBisNeun: 28,
  lohnZehnBisNeunzehn: 23,
  lohnZwanzigBisNeunundVierzig: 20,
  lohnFuenfzigBisHundert: 18,
  lohnAbHundertEins: 15,
  beaSatz: 1.1,
  beaMin: 15000,
  gewerbeSatz: 0.25,
  gewerbeMin: 8000,
  ustSatz: 0.25,
  ustMin: 8000,
  abschlussPauschaleSatz: 20,
  eurMinMonat: 90,
  bilanzAufstellungSatz: 2.2,
  bilanzAufstellungMin: 3000,
  antragSatz: 0.4,
  antragMin: 3000,
  steuerbilanzSatz: 0.4,
  steuerbilanzMin: 3000,
  koerperschaftSatz: 0.25,
  koerperschaftMin: 16000,
  ustJahrSatz: 0.25,
  ustJahrMin: 8000,
  gewStErklSatz: 0.25,
  gewStErklMin: 8000,
  bilanzBescheidSatz: 20,
  eBilanzPauschale: 120,
  offenlegungPauschale: 85,
  bilanzMinEinzelunternehmenMonat: 130,
  bilanzMinGesellschaftMonat: 220,
  selbstbucherZuschlag: 0.2,
  pruefungSteuerbescheidPauschale: 30,
  einkommensteuerErklaerungSatz: 0.1,
  einkommensteuerErklaerungMin: 8000,
  ueberschussKapitalvermoegenSatz: 0.05,
  ueberschussKapitalvermoegenMin: 8000,
  ueberschussNichtselbstSatz: 0.1,
  ueberschussNichtselbstMin: 8000,
  ueberschussGewerbeSatz: 1.5,
  ueberschussGewerbeMin: 17500,
  ueberschussSonstigeSatz: 0.05,
  ueberschussSonstigeMin: 8000,
  ueberschussVermietungSatz: 0.3,
  ueberschussVermietungMin: 8000,
  ustErklaerungConsultingSatz: 0.2,
  ustErklaerungConsultingMin: 8000,
} as const;

export const DEMO_GEBUEHRENTABELLEN = {
  buchfuehrung: {
    werte: [
      { gegenstandswertBis: 10000, volleGebuehr: 45 },
      { gegenstandswertBis: 25000, volleGebuehr: 70 },
      { gegenstandswertBis: 50000, volleGebuehr: 100 },
      { gegenstandswertBis: 100000, volleGebuehr: 155 },
      { gegenstandswertBis: 250000, volleGebuehr: 260 },
      { gegenstandswertBis: 500000, volleGebuehr: 420 },
      { gegenstandswertBis: 1000000, volleGebuehr: 680 },
      { gegenstandswertBis: 2000000, volleGebuehr: 1050 },
      { gegenstandswertBis: 5000000, volleGebuehr: 1800 },
    ],
    maxLimit: 5000000,
    maxFee: 1800,
    addFee: 140,
    step: 500000,
  },
  abschluss: {
    werte: [
      { gegenstandswertBis: 3000, volleGebuehr: 60 },
      { gegenstandswertBis: 6000, volleGebuehr: 90 },
      { gegenstandswertBis: 12000, volleGebuehr: 140 },
      { gegenstandswertBis: 25000, volleGebuehr: 210 },
      { gegenstandswertBis: 50000, volleGebuehr: 310 },
      { gegenstandswertBis: 100000, volleGebuehr: 480 },
      { gegenstandswertBis: 250000, volleGebuehr: 790 },
      { gegenstandswertBis: 500000, volleGebuehr: 1200 },
      { gegenstandswertBis: 1000000, volleGebuehr: 1900 },
      { gegenstandswertBis: 3000000, volleGebuehr: 3800 },
    ],
    maxLimit: 3000000,
    maxFee: 3800,
    addFee: 260,
    step: 500000,
  },
  beratung: {
    werte: [
      { gegenstandswertBis: 5000, volleGebuehr: 70 },
      { gegenstandswertBis: 10000, volleGebuehr: 105 },
      { gegenstandswertBis: 25000, volleGebuehr: 175 },
      { gegenstandswertBis: 50000, volleGebuehr: 270 },
      { gegenstandswertBis: 100000, volleGebuehr: 420 },
      { gegenstandswertBis: 250000, volleGebuehr: 680 },
      { gegenstandswertBis: 500000, volleGebuehr: 1000 },
      { gegenstandswertBis: 1000000, volleGebuehr: 1550 },
    ],
    maxLimit: 1000000,
    maxFee: 1550,
    addFee: 180,
    step: 250000,
  },
} satisfies Record<"buchfuehrung" | "abschluss" | "beratung", DemoGebuehrentabelle>;
