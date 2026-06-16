"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import {
  DEFAULT_HONORAR_DEMO_STATE,
  PRIVATE_LEISTUNG_OPTIONS,
  type DemoScreen,
  type Gewerbeart,
  type HonorarDemoState,
  type JahresabschlussTyp,
  type PrivatLeistungEintrag,
  type PrivatLeistungKey,
  type UnternehmenInput,
} from "../../../../data/honorarDemoValues";
import {
  calculatePrivatHonorar,
  calculateUnternehmenHonorar,
  formatEuro,
  getPrivatOption,
  type HonorarBreakdownItem,
  type PrivatLeistungResult,
} from "../../../../lib/honorarDemoCalculator";

type UnternehmenTextField =
  | "umsatzImJahr"
  | "bilanzsumme"
  | "jahresueberschuss"
  | "anzahlMitarbeiter";

type NavAction = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
};

const titleByScreen: Record<DemoScreen, string> = {
  mandatstyp: "Mandatstyp",
  "unternehmen-daten": "Unternehmensdaten",
  "unternehmen-leistungen": "Leistungen",
  "fibu-details": "FiBu",
  "ja-auswahl": "Jahresabschluss",
  "euer-details": "EÜR",
  "bilanz-details": "Bilanz",
  "lohn-details": "Lohn",
  "privat-leistungen": "Private Leistungen",
  "privat-daten": "Privatdaten",
};

export default function HonorarDemo() {
  const router = useRouter();
  const [state, setState] = useState<HonorarDemoState>(DEFAULT_HONORAR_DEMO_STATE);
  const [nextPrivatId, setNextPrivatId] = useState(1);
  const [pickerOpen, setPickerOpen] = useState(false);

  const unternehmenResult = useMemo(
    () => calculateUnternehmenHonorar(state.unternehmen),
    [state.unternehmen],
  );
  const privatResult = useMemo(() => calculatePrivatHonorar(state.privat), [state.privat]);
  const activeResult = isPrivatScreen(state.screen)
    ? privatResult
    : state.screen === "mandatstyp"
      ? { jaehrlich: 0, monatlich: 0 }
      : unternehmenResult;
  const nextAction = getNextAction();

  function navigateTo(screen: DemoScreen) {
    setPickerOpen(false);
    setState((current) => ({
      ...current,
      screen,
      history: [...current.history, current.screen],
    }));
  }

  function goBack() {
    setPickerOpen(false);

    if (!state.history.length) {
      router.push("/projects/honorar-rechner");
      return;
    }

    setState((current) => {
      const nextHistory = current.history.slice(0, -1);
      return {
        ...current,
        screen: current.history[current.history.length - 1],
        history: nextHistory,
      };
    });
  }

  function updateUnternehmen(field: UnternehmenTextField, value: string) {
    setState((current) => ({
      ...current,
      unternehmen: {
        ...current.unternehmen,
        [field]: value,
      },
    }));
  }

  function setGewerbeart(next: Gewerbeart, checked: boolean) {
    setState((current) => ({
      ...current,
      unternehmen: {
        ...current.unternehmen,
        gewerbeart: checked ? next : "standard",
      },
    }));
  }

  function toggleUnternehmenLeistung(field: "hatFibu" | "hatJahresabschluss" | "hatLohn", value: boolean) {
    setState((current) => ({
      ...current,
      unternehmen: {
        ...current.unternehmen,
        [field]: value,
        istSelbstbucher: field === "hatFibu" && value ? false : current.unternehmen.istSelbstbucher,
      },
    }));
  }

  function toggleSelbstbucher(value: boolean) {
    setState((current) => ({
      ...current,
      unternehmen: {
        ...current.unternehmen,
        istSelbstbucher: value,
        hatFibu: value ? false : current.unternehmen.hatFibu,
      },
    }));
  }

  function setJahresabschlussTyp(value: JahresabschlussTyp) {
    setState((current) => ({
      ...current,
      unternehmen: {
        ...current.unternehmen,
        jahresabschlussTyp: value,
      },
    }));
  }

  function addPrivatLeistung(key: PrivatLeistungKey) {
    const id = `privat-${nextPrivatId}`;
    setNextPrivatId((current) => current + 1);
    setPickerOpen(false);
    setState((current) => ({
      ...current,
      privat: {
        ...current.privat,
        leistungen: [
          ...current.privat.leistungen,
          {
            id,
            key,
            wert1: current.privat.globalEinnahmen,
            wert2: "",
          },
        ],
      },
    }));
  }

  function removePrivatLeistung(id: string) {
    setState((current) => ({
      ...current,
      privat: {
        ...current.privat,
        leistungen: current.privat.leistungen.filter((leistung) => leistung.id !== id),
      },
    }));
  }

  function updateGlobalEinnahmen(value: string) {
    setState((current) => ({
      ...current,
      privat: {
        ...current.privat,
        globalEinnahmen: value,
        leistungen: current.privat.leistungen.map((leistung) => {
          const option = getPrivatOption(leistung.key);
          return option?.requiresInput ? { ...leistung, wert1: value } : leistung;
        }),
      },
    }));
  }

  function updatePrivatValue(id: string, field: "wert1" | "wert2", value: string) {
    setState((current) => ({
      ...current,
      privat: {
        ...current.privat,
        leistungen: current.privat.leistungen.map((leistung) =>
          leistung.id === id ? { ...leistung, [field]: value } : leistung,
        ),
      },
    }));
  }

  function getNextAction(): NavAction | undefined {
    if (state.screen === "unternehmen-daten") {
      return { label: "Weiter", onClick: () => navigateTo("unternehmen-leistungen") };
    }

    if (state.screen === "privat-leistungen") {
      return {
        label: "Weiter",
        disabled: !privatResult.leistungen.some((leistung) => leistung.requiresInput),
        onClick: () => navigateTo("privat-daten"),
      };
    }

    return undefined;
  }

  return (
    <main style={styles.page}>
      <div style={styles.appWindow}>
        <header style={styles.header}>
          <div style={styles.logoBox}>
            <Image
              src="/Honorar%20Rechner%20Logo.png"
              alt="Honorarrechner Logo"
              width={100}
              height={100}
              style={styles.logoImage}
              priority
            />
          </div>
          <h1 style={styles.title}>{titleByScreen[state.screen]}</h1>
          <div style={styles.headerSpacer} />
        </header>

        <section style={styles.content}>{renderScreen()}</section>

        <footer style={styles.footer}>
          <div style={styles.footerLeft} />
          <div style={styles.totalBox}>
            <div style={styles.yearTotal}>Jahres Honorar: {formatEuro(activeResult.jaehrlich)}</div>
            <div style={styles.monthTotal}>Monats Honorar: {formatEuro(activeResult.monatlich)}</div>
          </div>
          <div style={styles.navButtons}>
            <button type="button" onClick={goBack} style={styles.navButton}>
              Zurück
            </button>
            {nextAction ? (
              <button
                type="button"
                onClick={nextAction.onClick}
                disabled={nextAction.disabled}
                style={{
                  ...styles.navButton,
                  ...(nextAction.disabled ? styles.navButtonDisabled : null),
                }}
              >
                {nextAction.label}
              </button>
            ) : null}
          </div>
        </footer>
      </div>
      <p style={styles.demoHint}>
        Demo mit fiktiven Werten. Keine Excel-Dateien, keine Speicherung, keine echten Kanzlei- oder
        Mandantendaten.
      </p>
    </main>
  );

  function renderScreen(): ReactNode {
    switch (state.screen) {
      case "mandatstyp":
        return <MandatstypScreen onSelect={navigateTo} />;
      case "unternehmen-daten":
        return (
          <UnternehmenDatenScreen
            input={state.unternehmen}
            onTextChange={updateUnternehmen}
            onGewerbeartChange={setGewerbeart}
          />
        );
      case "unternehmen-leistungen":
        return (
          <UnternehmenLeistungenScreen
            input={state.unternehmen}
            result={unternehmenResult}
            onToggle={toggleUnternehmenLeistung}
            onToggleSelbstbucher={toggleSelbstbucher}
            onNavigate={navigateTo}
          />
        );
      case "fibu-details":
        return <DetailScreen item={unternehmenResult.fibu} title="FiBu-Berechnung" />;
      case "ja-auswahl":
        return (
          <JaAuswahlScreen
            onSelect={(typ) => {
              setJahresabschlussTyp(typ);
              navigateTo(typ === "euer" ? "euer-details" : "bilanz-details");
            }}
          />
        );
      case "euer-details":
      case "bilanz-details":
        return <DetailScreen item={unternehmenResult.jahresabschluss} title={unternehmenResult.jahresabschlussTypLabel} />;
      case "lohn-details":
        return <DetailScreen item={unternehmenResult.lohn} title="Lohnabrechnung" />;
      case "privat-leistungen":
        return (
          <PrivatLeistungenScreen
            pickerOpen={pickerOpen}
            result={privatResult}
            onTogglePicker={() => setPickerOpen((current) => !current)}
            onAdd={addPrivatLeistung}
            onRemove={removePrivatLeistung}
          />
        );
      case "privat-daten":
        return (
          <PrivatDatenScreen
            entries={state.privat.leistungen}
            result={privatResult}
            globalEinnahmen={state.privat.globalEinnahmen}
            onGlobalChange={updateGlobalEinnahmen}
            onValueChange={updatePrivatValue}
          />
        );
    }
  }
}

function MandatstypScreen({ onSelect }: { onSelect: (screen: DemoScreen) => void }) {
  return (
    <div style={styles.mandatCards}>
      <MandatCard title="Privat" subtitle="Privatmandat" onClick={() => onSelect("privat-leistungen")} />
      <MandatCard
        title="Unternehmen"
        subtitle="Unternehmensmandat"
        onClick={() => onSelect("unternehmen-daten")}
      />
      <MandatCard title="StartUp" subtitle="coming soon..." disabled />
    </div>
  );
}

function MandatCard({
  title,
  subtitle,
  disabled = false,
  onClick,
}: {
  title: string;
  subtitle: string;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles.mandatCard,
        ...(disabled ? styles.mandatCardDisabled : null),
      }}
    >
      <span style={styles.mandatTitle}>{title}</span>
      <span style={styles.mandatSubtitle}>{subtitle}</span>
    </button>
  );
}

function UnternehmenDatenScreen({
  input,
  onTextChange,
  onGewerbeartChange,
}: {
  input: UnternehmenInput;
  onTextChange: (field: UnternehmenTextField, value: string) => void;
  onGewerbeartChange: (gewerbeart: Gewerbeart, checked: boolean) => void;
}) {
  return (
    <div style={styles.companyForm}>
      <DemoTextField
        label="Umsatz im Jahr"
        value={input.umsatzImJahr}
        onChange={(value) => onTextChange("umsatzImJahr", value)}
      />
      <DemoTextField
        label="Bilanzsumme"
        value={input.bilanzsumme}
        onChange={(value) => onTextChange("bilanzsumme", value)}
      />
      <DemoTextField
        label="Jahresüberschuss"
        value={input.jahresueberschuss}
        onChange={(value) => onTextChange("jahresueberschuss", value)}
      />
      <DemoTextField
        label="Anzahl Mitarbeiter"
        value={input.anzahlMitarbeiter}
        onChange={(value) => onTextChange("anzahlMitarbeiter", value)}
      />
      <div style={styles.companyChecks}>
        <Checkbox
          label="Bargeldgewerbe"
          checked={input.gewerbeart === "bargeld"}
          onChange={(checked) => onGewerbeartChange("bargeld", checked)}
        />
        <Checkbox
          label="Onlinehändler"
          checked={input.gewerbeart === "online"}
          onChange={(checked) => onGewerbeartChange("online", checked)}
        />
      </div>
    </div>
  );
}

function UnternehmenLeistungenScreen({
  input,
  result,
  onToggle,
  onToggleSelbstbucher,
  onNavigate,
}: {
  input: UnternehmenInput;
  result: ReturnType<typeof calculateUnternehmenHonorar>;
  onToggle: (field: "hatFibu" | "hatJahresabschluss" | "hatLohn", value: boolean) => void;
  onToggleSelbstbucher: (value: boolean) => void;
  onNavigate: (screen: DemoScreen) => void;
}) {
  return (
    <div style={styles.serviceGrid}>
      <div style={styles.serviceHeader}>Monatlich</div>
      <div style={styles.serviceHeader}>Jährlich</div>
      <div />

      <ServiceRow
        item={result.fibu}
        checked={input.hatFibu}
        label="FiBu"
        linkLabel="zur FiBu"
        onChecked={(checked) => onToggle("hatFibu", checked)}
        onOpen={() => onNavigate("fibu-details")}
      />
      <ServiceRow
        item={result.jahresabschluss}
        checked={input.hatJahresabschluss}
        label="JA"
        linkLabel="zum JA"
        onChecked={(checked) => onToggle("hatJahresabschluss", checked)}
        onOpen={() => onNavigate("ja-auswahl")}
      />
      <ServiceRow
        item={result.lohn}
        checked={input.hatLohn}
        label="Lohn"
        linkLabel="zum Lohn"
        onChecked={(checked) => onToggle("hatLohn", checked)}
        onOpen={() => onNavigate("lohn-details")}
      />
      <ServiceRow
        item={result.selbstbucher}
        checked={input.istSelbstbucher}
        label="Selbstbucher (+20%)"
        onChecked={onToggleSelbstbucher}
      />
    </div>
  );
}

function ServiceRow({
  item,
  checked,
  label,
  linkLabel,
  onChecked,
  onOpen,
}: {
  item: HonorarBreakdownItem;
  checked: boolean;
  label: string;
  linkLabel?: string;
  onChecked: (checked: boolean) => void;
  onOpen?: () => void;
}) {
  return (
    <>
      <div style={styles.serviceValue}>{formatEuro(item.monatlich)}</div>
      <div style={styles.serviceValue}>{formatEuro(item.jaehrlich)}</div>
      <div style={styles.serviceAction}>
        <Checkbox label={label} checked={checked} onChange={onChecked} strong />
        {linkLabel && checked ? (
          <button type="button" onClick={onOpen} style={styles.inlineLink}>
            {linkLabel}
          </button>
        ) : null}
      </div>
    </>
  );
}

function JaAuswahlScreen({ onSelect }: { onSelect: (typ: JahresabschlussTyp) => void }) {
  return (
    <div style={styles.mandatCards}>
      <MandatCard title="EÜR" subtitle="Einnahmenüberschussrechnung" onClick={() => onSelect("euer")} />
      <MandatCard title="Bilanz" subtitle="Jahresabschluss" onClick={() => onSelect("bilanz")} />
    </div>
  );
}

function DetailScreen({ title, item }: { title: string; item: HonorarBreakdownItem }) {
  return (
    <div style={styles.detailPanel}>
      <h2 style={styles.detailTitle}>{title}</h2>
      <p style={styles.detailText}>{item.detail}</p>
      <div style={styles.detailTotals}>
        <span>Monatlich</span>
        <strong>{formatEuro(item.monatlich)}</strong>
        <span>Jährlich</span>
        <strong>{formatEuro(item.jaehrlich)}</strong>
      </div>
    </div>
  );
}

function PrivatLeistungenScreen({
  pickerOpen,
  result,
  onTogglePicker,
  onAdd,
  onRemove,
}: {
  pickerOpen: boolean;
  result: ReturnType<typeof calculatePrivatHonorar>;
  onTogglePicker: () => void;
  onAdd: (key: PrivatLeistungKey) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div style={styles.privateLayout}>
      <aside style={styles.privateAddCard}>
        <span style={styles.privateLabel}>Leistung hinzufügen</span>
        <button type="button" onClick={onTogglePicker} style={styles.primaryActionButton}>
          Leistung hinzufügen
        </button>
        <div style={styles.priceLine}>
          <span>Preis</span>
          <strong>{result.leistungen.length ? formatEuro(result.leistungen[result.leistungen.length - 1].preis) : "-"}</strong>
        </div>
        <div style={styles.privateTotalCard}>
          <span>Gesamtsumme</span>
          <strong>{formatEuro(result.jaehrlich)}</strong>
        </div>
        {pickerOpen ? <LeistungPicker onAdd={onAdd} /> : null}
      </aside>

      <section style={styles.privateListCard}>
        <div style={styles.privateListHeader}>
          <span>Leistung</span>
          <span>Preis</span>
          <span />
        </div>
        <div style={styles.privateList}>
          {result.leistungen.length ? (
            result.leistungen.map((leistung, index) => (
              <PrivatLeistungRow
                key={leistung.id}
                index={index}
                leistung={leistung}
                onRemove={onRemove}
              />
            ))
          ) : (
            <div style={styles.emptyPrivate}>Noch keine Leistung ausgewählt.</div>
          )}
        </div>
      </section>
    </div>
  );
}

function LeistungPicker({ onAdd }: { onAdd: (key: PrivatLeistungKey) => void }) {
  return (
    <div style={styles.picker}>
      {PRIVATE_LEISTUNG_OPTIONS.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => onAdd(option.key)}
          style={styles.pickerOption}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
}

function PrivatLeistungRow({
  index,
  leistung,
  onRemove,
}: {
  index: number;
  leistung: PrivatLeistungResult;
  onRemove: (id: string) => void;
}) {
  return (
    <div
      style={{
        ...styles.privateRow,
        background: pastelColors[index % pastelColors.length],
      }}
    >
      <div style={styles.privateName}>
        <span style={styles.privateIndex}>{index + 1})</span>
        <span>{leistung.name}</span>
      </div>
      <strong style={styles.privatePrice}>{formatEuro(leistung.preis)}</strong>
      <button type="button" onClick={() => onRemove(leistung.id)} style={styles.removeButton}>
        X
      </button>
    </div>
  );
}

function PrivatDatenScreen({
  entries,
  result,
  globalEinnahmen,
  onGlobalChange,
  onValueChange,
}: {
  entries: PrivatLeistungEintrag[];
  result: ReturnType<typeof calculatePrivatHonorar>;
  globalEinnahmen: string;
  onGlobalChange: (value: string) => void;
  onValueChange: (id: string, field: "wert1" | "wert2", value: string) => void;
}) {
  const inputEntries = entries.filter((entry) => getPrivatOption(entry.key)?.requiresInput);

  return (
    <div style={styles.privateDataPanel}>
      <div style={styles.globalIncomeRow}>
        <span style={styles.privateColumnHeader}>Einnahmen (global)</span>
        <input
          value={globalEinnahmen}
          onChange={(event) => onGlobalChange(event.target.value)}
          inputMode="decimal"
          style={styles.compactInput}
          placeholder="Einnahmen"
        />
      </div>

      <div style={styles.privateDataHeader}>
        <span>Bereich / Berechnungsbasis</span>
        <span>Eingabe 1</span>
        <span>Eingabe 2</span>
      </div>

      <div style={styles.privateDataRows}>
        {inputEntries.length ? (
          inputEntries.map((entry, index) => {
            const option = getPrivatOption(entry.key);
            const calculated = result.leistungen.find((leistung) => leistung.id === entry.id);

            return (
              <div
                key={entry.id}
                style={{
                  ...styles.privateDataRow,
                  background: pastelColors[index % pastelColors.length],
                }}
              >
                <div style={styles.privateName}>
                  <span style={styles.privateIndex}>{index + 1})</span>
                  <span>{option?.name}</span>
                </div>
                <input
                  value={entry.wert1}
                  onChange={(event) => onValueChange(entry.id, "wert1", event.target.value)}
                  inputMode="decimal"
                  style={styles.compactInput}
                  placeholder={option?.wert1Hint}
                />
                {option?.hasWert2 ? (
                  <input
                    value={entry.wert2}
                    onChange={(event) => onValueChange(entry.id, "wert2", event.target.value)}
                    inputMode="decimal"
                    style={styles.compactInput}
                    placeholder={option.wert2Hint}
                  />
                ) : (
                  <span style={styles.noSecondValue}>-</span>
                )}
                <span style={styles.privateDataPrice}>{formatEuro(calculated?.preis ?? 0)}</span>
              </div>
            );
          })
        ) : (
          <div style={styles.emptyPrivate}>Für die ausgewählten Leistungen sind keine Eingabewerte nötig.</div>
        )}
      </div>
    </div>
  );
}

function DemoTextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label style={styles.inputGroup}>
      <span style={styles.inputLabel}>{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        inputMode="decimal"
        style={styles.textInput}
      />
    </label>
  );
}

function Checkbox({
  label,
  checked,
  strong = false,
  onChange,
}: {
  label: string;
  checked: boolean;
  strong?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label style={{ ...styles.checkboxLabel, ...(strong ? styles.checkboxLabelStrong : null) }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        style={styles.checkbox}
      />
      <span>{label}</span>
    </label>
  );
}

function isPrivatScreen(screen: DemoScreen) {
  return screen === "privat-leistungen" || screen === "privat-daten";
}

const pastelColors = ["#f7fbff", "#e9f7ff", "#f2f8ea", "#fff5e8", "#f6ecff", "#edf9f2"];

const colors = {
  outside: "#7fb0d6",
  panel: "#0077be",
  panelHover: "#198fd5",
  panelPressed: "#11689a",
  white: "#ffffff",
  softWhite: "#f9f9f9",
  textBlue: "#003b5c",
  textMidBlue: "#2e5a78",
};

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: colors.outside,
    color: colors.white,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    boxSizing: "border-box",
  },
  appWindow: {
    width: "min(1120px, calc(100vw - 32px))",
    minHeight: "min(628px, calc(100vh - 64px))",
    background: colors.panel,
    borderRadius: 40,
    padding: 30,
    display: "grid",
    gridTemplateRows: "116px minmax(0, 1fr) 82px",
    boxSizing: "border-box",
    boxShadow: "0 12px 28px rgba(0, 39, 70, 0.35)",
  },
  header: {
    display: "grid",
    gridTemplateColumns: "120px minmax(0, 1fr) 120px",
    alignItems: "start",
  },
  logoBox: {
    width: 100,
    height: 100,
    borderRadius: 2,
    overflow: "hidden",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  title: {
    margin: "34px 0 0",
    textAlign: "center",
    fontSize: "clamp(28px, 3.1vw, 36px)",
    lineHeight: 1.08,
    fontWeight: 800,
    color: colors.white,
    textDecoration: "underline",
    textUnderlineOffset: 4,
    letterSpacing: 0,
  },
  headerSpacer: {
    minWidth: 1,
  },
  content: {
    minHeight: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "auto",
    padding: "6px 0",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    gap: 18,
    alignItems: "end",
    flexWrap: "wrap",
  },
  footerLeft: {
    flex: "1 1 160px",
    minHeight: 1,
  },
  totalBox: {
    flex: "0 1 320px",
    minWidth: 280,
    textAlign: "center",
    alignSelf: "end",
  },
  yearTotal: {
    fontSize: 22,
    fontWeight: 800,
    lineHeight: 1.25,
  },
  monthTotal: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 650,
  },
  navButtons: {
    flex: "1 1 320px",
    display: "flex",
    justifyContent: "flex-end",
    gap: 14,
    flexWrap: "wrap",
  },
  navButton: {
    width: 150,
    height: 45,
    borderRadius: 22,
    border: "1px solid rgba(255, 255, 255, 0.78)",
    background: "rgba(255, 255, 255, 0.13)",
    color: colors.white,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
  },
  navButtonDisabled: {
    opacity: 0.35,
    cursor: "not-allowed",
  },
  demoHint: {
    width: "min(1040px, calc(100vw - 48px))",
    margin: "10px 0 0",
    color: "rgba(255, 255, 255, 0.86)",
    fontSize: 12,
    lineHeight: 1.45,
    textAlign: "center",
  },
  mandatCards: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "clamp(18px, 4vw, 44px)",
    flexWrap: "wrap",
    padding: "20px 0",
  },
  mandatCard: {
    width: 230,
    height: 122,
    borderRadius: 28,
    border: "2px solid rgba(255, 255, 255, 0.16)",
    background: colors.panel,
    color: colors.white,
    cursor: "pointer",
    display: "grid",
    alignContent: "center",
    justifyItems: "center",
    gap: 8,
    boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.04)",
  },
  mandatCardDisabled: {
    opacity: 0.38,
    cursor: "not-allowed",
  },
  mandatTitle: {
    fontSize: 23,
    fontWeight: 800,
    lineHeight: 1,
  },
  mandatSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.82)",
  },
  companyForm: {
    width: "min(760px, 100%)",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(220px, 1fr))",
    columnGap: "min(18vw, 190px)",
    rowGap: 20,
    alignItems: "center",
  },
  inputGroup: {
    display: "grid",
    justifyItems: "center",
    gap: 8,
  },
  inputLabel: {
    color: "#e0e0e0",
    fontSize: 16,
    fontWeight: 700,
  },
  textInput: {
    width: "min(280px, 100%)",
    height: 38,
    border: "2px solid transparent",
    borderRadius: 15,
    background: colors.softWhite,
    color: colors.textBlue,
    padding: "8px 12px",
    boxSizing: "border-box",
    fontSize: 18,
    outline: "none",
    textAlign: "center",
  },
  companyChecks: {
    gridColumn: "1 / -1",
    display: "flex",
    justifyContent: "center",
    gap: 34,
    flexWrap: "wrap",
    marginTop: 18,
  },
  checkboxLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    color: colors.white,
    fontSize: 17,
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
  checkboxLabelStrong: {
    fontSize: 21,
    fontWeight: 800,
  },
  checkbox: {
    width: 14,
    height: 14,
    accentColor: colors.white,
    flex: "0 0 auto",
  },
  serviceGrid: {
    width: "min(540px, 100%)",
    display: "grid",
    gridTemplateColumns: "120px 120px minmax(220px, 1fr)",
    columnGap: 16,
    rowGap: 22,
    alignItems: "center",
  },
  serviceHeader: {
    color: "rgba(255, 255, 255, 0.88)",
    fontSize: 18,
    textDecoration: "underline",
    textAlign: "right",
    paddingRight: 36,
  },
  serviceValue: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 750,
    textAlign: "right",
    paddingRight: 20,
    whiteSpace: "nowrap",
  },
  serviceAction: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  inlineLink: {
    border: 0,
    background: "transparent",
    color: "rgba(255, 255, 255, 0.82)",
    fontSize: 15,
    textDecoration: "underline",
    cursor: "pointer",
    padding: 0,
  },
  detailPanel: {
    width: "min(620px, 100%)",
    border: "1px solid rgba(255, 255, 255, 0.22)",
    borderRadius: 20,
    padding: 22,
    background: "rgba(255, 255, 255, 0.12)",
    display: "grid",
    gap: 16,
  },
  detailTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 800,
    textAlign: "center",
  },
  detailText: {
    margin: 0,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 1.6,
    textAlign: "center",
  },
  detailTotals: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "8px 18px",
    justifyContent: "center",
    alignItems: "center",
    color: colors.white,
  },
  privateLayout: {
    width: "min(920px, 100%)",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
    gap: 22,
    alignItems: "start",
  },
  privateAddCard: {
    position: "relative",
    background: "#f7fbff",
    borderRadius: 18,
    padding: 18,
    color: colors.textBlue,
    display: "grid",
    gap: 14,
    boxShadow: "0 6px 12px rgba(0, 39, 70, 0.12)",
  },
  privateLabel: {
    color: colors.textMidBlue,
    fontSize: 14,
    fontWeight: 700,
  },
  primaryActionButton: {
    height: 42,
    border: 0,
    borderRadius: 10,
    background: colors.panel,
    color: colors.white,
    fontSize: 14,
    fontWeight: 800,
    cursor: "pointer",
  },
  priceLine: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    color: colors.textMidBlue,
  },
  privateTotalCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    background: colors.white,
    borderRadius: 12,
    border: "1px solid #d6e6f2",
    padding: 14,
    color: colors.textMidBlue,
  },
  picker: {
    position: "absolute",
    zIndex: 5,
    top: 70,
    left: 18,
    right: 18,
    borderRadius: 14,
    border: "1px solid #d6e6f2",
    background: colors.white,
    boxShadow: "0 12px 28px rgba(0, 39, 70, 0.24)",
    padding: 8,
    display: "grid",
    gap: 6,
  },
  pickerOption: {
    border: 0,
    borderRadius: 8,
    background: "#eef7fd",
    color: colors.textBlue,
    padding: "9px 10px",
    textAlign: "left",
    fontWeight: 700,
    cursor: "pointer",
  },
  privateListCard: {
    background: "#f7fbff",
    borderRadius: 18,
    padding: 18,
    color: colors.textBlue,
    minHeight: 300,
    display: "grid",
    gridTemplateRows: "auto minmax(0, 1fr)",
    gap: 10,
  },
  privateListHeader: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 90px 32px",
    gap: 12,
    color: colors.textMidBlue,
    fontSize: 13,
  },
  privateList: {
    overflow: "auto",
    display: "grid",
    alignContent: "start",
    gap: 8,
  },
  privateRow: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto auto",
    gap: 12,
    alignItems: "center",
    borderRadius: 10,
    border: "1px solid #d6e6f2",
    padding: "8px 9px",
    color: colors.textBlue,
  },
  privateName: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    minWidth: 0,
    fontSize: 14,
    fontWeight: 700,
  },
  privateIndex: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 28,
    minHeight: 24,
    borderRadius: 7,
    border: "1px solid #d6e6f2",
    background: colors.white,
    color: colors.textMidBlue,
    fontSize: 12,
  },
  privatePrice: {
    fontSize: 14,
    whiteSpace: "nowrap",
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    border: 0,
    background: "#d9534f",
    color: colors.white,
    fontWeight: 800,
    cursor: "pointer",
  },
  emptyPrivate: {
    borderRadius: 10,
    border: "1px dashed #c6dceb",
    padding: 14,
    color: colors.textMidBlue,
    background: "#ffffff",
    fontSize: 14,
  },
  privateDataPanel: {
    width: "min(900px, 100%)",
    border: "1px solid rgba(255, 255, 255, 0.22)",
    borderRadius: 14,
    background: "rgba(255, 255, 255, 0.12)",
    padding: 14,
    display: "grid",
    gap: 10,
  },
  globalIncomeRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  privateColumnHeader: {
    color: "#d7eaf8",
    fontSize: 13,
    fontWeight: 700,
  },
  compactInput: {
    width: "min(220px, 100%)",
    height: 34,
    border: "1px solid transparent",
    borderRadius: 10,
    background: colors.softWhite,
    color: colors.textBlue,
    padding: "6px 9px",
    fontSize: 14,
    boxSizing: "border-box",
    outline: "none",
  },
  privateDataHeader: {
    display: "grid",
    gridTemplateColumns: "minmax(220px, 2.4fr) minmax(150px, 1fr) minmax(150px, 1fr) 100px",
    gap: 10,
    color: "#d7eaf8",
    fontSize: 13,
    fontWeight: 700,
  },
  privateDataRows: {
    overflow: "auto",
    display: "grid",
    alignContent: "start",
    gap: 8,
    maxHeight: 270,
  },
  privateDataRow: {
    display: "grid",
    gridTemplateColumns: "minmax(220px, 2.4fr) minmax(150px, 1fr) minmax(150px, 1fr) 100px",
    gap: 10,
    alignItems: "center",
    borderRadius: 10,
    border: "1px solid #d6e6f2",
    padding: 8,
    color: colors.textBlue,
  },
  noSecondValue: {
    color: "#8cadc3",
    textAlign: "center",
  },
  privateDataPrice: {
    fontSize: 13,
    fontWeight: 800,
    textAlign: "right",
    whiteSpace: "nowrap",
  },
};
