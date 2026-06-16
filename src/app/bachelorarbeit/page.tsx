import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bachelorarbeit | Johannes Blank",
  description:
    "Bachelorarbeit von Johannes Blank zu KI-gestützten NPC-Dialogen in Unity, Wissensgrenzen, Prompt-Architektur und Evaluation.",
};

const facts = [
  { value: "91", label: "Seiten Abschlussarbeit" },
  { value: "3", label: "NPC-Rollen im Krimi" },
  { value: "12", label: "evaluierte Testfälle" },
  { value: "Unity", label: "C# Prototyp" },
];

const focusAreas = [
  {
    title: "Problem",
    body: "LLMs können flexible Dialoge erzeugen, aber ohne Kontrolle auch Halluzinationen, Spoiler oder Rollenbrüche verursachen.",
  },
  {
    title: "Ziel",
    body: "NPC-Antworten sollen zur Figur, zum aktuellen Fallzustand und zum begrenzten Wissen der jeweiligen Rolle passen.",
  },
  {
    title: "Ansatz",
    body: "Der Prototyp kombiniert NPC-Profile, Wissensmatrix, State-Flags, Memory, Constraints, Scope-Guard und Logging.",
  },
];

const npcRoles = [
  {
    name: "Clara Weber",
    role: "Täterfigur mit internem Wissen",
    body: "Clara kennt kritische Zusammenhänge, darf diese aber vor der Fallauflösung nicht offenlegen. Sie testet vor allem Wissensgrenzen und Spoiler-Schutz.",
  },
  {
    name: "Anton Stein",
    role: "Falsche Fährte",
    body: "Anton wirkt verdächtig und defensiv, besitzt aber kein Täterwissen. Damit prüft der Prototyp Verdachtsdruck ohne falsche sichere Aussagen.",
  },
  {
    name: "Mira Feld",
    role: "Zeugin von außen",
    body: "Mira kann Beobachtungen schildern, muss aber Unsicherheit ausdrücken und darf keine Schlussfolgerungen als Fakten verkaufen.",
  },
];

const systemSteps = [
  {
    title: "NPC-Profil",
    body: "Rolle, Motivation, Persönlichkeit und Sprachstil machen aus einer Antwort Figurenrede statt Chatbot-Text.",
  },
  {
    title: "Wissensmatrix",
    body: "Erlaubtes, gesperrtes und freischaltbares Wissen wird pro NPC getrennt, damit Hinweise nicht zu früh auftauchen.",
  },
  {
    title: "State & Memory",
    body: "Gefundene Hinweise und relevante Vorinteraktionen werden kontrolliert in den Kontext zurückgeführt.",
  },
  {
    title: "PromptBuilder",
    body: "Jede Anfrage erhält ein strukturiertes Kontextpaket aus Profil, Wissen, State, Memory und Antwortregeln.",
  },
  {
    title: "Responder & Logging",
    body: "Dummy- und API-Modus sind austauschbar. Die Evaluation speichert Prompt, Antwort, Testfall und Screenshots nachvollziehbar.",
  },
];

const implementationItems = [
  "Unity-Szene mit NPC-Auswahl, Chatbereich, Eingabe und Debug-/Evaluationspanel",
  "C#-Datenmodell für NpcProfile, GameState, NpcMemory, DialogueTurn und DialogueTurnResult",
  "PromptBuilder für kontrollierte Kontextgenerierung statt ungefiltertem Chat-Verlauf",
  "API-Modus für Evaluation und Dummy-Modus als offline nutzbarer Fallback",
  "Scope-Guard gegen themenfremde, medizinische, technische oder Meta-Fragen",
  "Logging der Testfälle mit Promptversion, State, Eingabe, Antwort und Screenshot-Pfad",
];

const screenshots = [
  {
    src: "/bachelorarbeit/evaluation-role.png",
    title: "Rolle und Charakter",
    body: "Clara antwortet als kontrollierte Haushälterin und nennt nur erlaubte Fallinformationen.",
  },
  {
    src: "/bachelorarbeit/evaluation-knowledge.png",
    title: "Wissensbegrenzung",
    body: "Eine direkte Schuldfrage wird abgewehrt, ohne die Fallauflösung vorzeitig zu verraten.",
  },
  {
    src: "/bachelorarbeit/evaluation-memory.png",
    title: "Dialog-Memory",
    body: "Der NPC greift eine vorherige Frage korrekt auf, ohne zusätzliche Details zu erfinden.",
  },
  {
    src: "/bachelorarbeit/evaluation-scope.png",
    title: "Scope-Guard",
    body: "Themenfremde Fragen werden im Charakter abgewehrt und zurück auf den Krimi-Fall gelenkt.",
  },
  {
    src: "/bachelorarbeit/evaluation-state.png",
    title: "State-Abhängigkeit",
    body: "State-Flags werden als Kontext genutzt, zeigen aber auch die Grenze reiner Prompt-Steuerung.",
  },
];

const resultCards = [
  {
    label: "Stark",
    title: "Charakter und Wissen",
    body: "Die NPCs blieben in den Testfällen in Rolle. Kritische Halluzinationen, Spoiler, Rollenbrüche oder Meta-Brüche traten nicht auf.",
  },
  {
    label: "Stark",
    title: "Memory und Scope",
    body: "Frühere relevante Informationen konnten wieder aufgegriffen werden. Off-Topic- und Meta-Fragen wurden zuverlässig abgegrenzt.",
  },
  {
    label: "Grenze",
    title: "State ist nicht genug",
    body: "State-Flags halfen als Kontext, ersetzten aber keine harte Freigabelogik. Freigeschaltete Informationen wurden teilweise zu vorsichtig ausgespielt.",
  },
];

export default function BachelorarbeitPage() {
  return (
    <main style={styles.page}>
      <Header />

      <section style={styles.heroSection}>
        <div style={styles.container}>
          <Link href="/#projects" style={styles.backLink}>
            Zurück zum Portfolio
          </Link>

          <div className="bachelorHeroGrid" style={styles.heroGrid}>
            <div style={styles.heroTextColumn}>
              <span style={styles.eyebrow}>Bachelorarbeit · Game Design · Unity</span>
              <h1 className="bachelorHeroTitle" style={styles.h1}>
                KI-gestützte NPC-Dialoge, die nicht alles wissen dürfen
              </h1>
              <p style={styles.lead}>
                In meiner Bachelorarbeit habe ich untersucht, wie ein KI-gestütztes Dialogsystem in einem
                kleinen Krimi-Prototyp glaubwürdig bleibt: Figuren sollen frei antworten können, aber nur
                innerhalb ihrer Rolle, ihres Wissens und des aktuellen Spielzustands.
              </p>

              <div style={styles.actionRow}>
                <a
                  className="bachelorAction"
                  href="/downloads/bachelorarbeit-johannes-blank.pdf"
                  download
                  style={styles.primaryBtn}
                >
                  Abschlussarbeit herunterladen
                </a>
                <a className="bachelorAction" href="#einblicke" style={styles.secondaryBtn}>
                  Screenshots ansehen
                </a>
              </div>

              <div style={styles.factGrid}>
                {facts.map((fact) => (
                  <div key={fact.label} style={styles.factCard}>
                    <strong style={styles.factValue}>{fact.value}</strong>
                    <span style={styles.factLabel}>{fact.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="bachelorCoverPanel" aria-label="Deckblatt der Bachelorarbeit" style={styles.coverPanel}>
              <Image
                src="/bachelorarbeit-deckblatt.png"
                alt="Deckblatt der Bachelorarbeit KI-gestützte NPC-Dialoge in Unity"
                width={592}
                height={838}
                priority
                style={styles.coverImage}
              />
            </aside>
          </div>
        </div>
      </section>

      <Section id="frage" title="Worum es geht">
        <div style={styles.focusGrid}>
          {focusAreas.map((item) => (
            <article key={item.title} style={styles.infoCard}>
              <span style={styles.infoLabel}>{item.title}</span>
              <p style={styles.cardText}>{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="prototyp" title="Der Prototyp: Haus Lindenfels">
        <div className="bachelorSplitLayout" style={styles.splitLayout}>
          <div style={styles.textBlock}>
            <p style={styles.p}>
              Der praktische Teil ist ein Unity-Prototyp eines kleinen Krimi-Szenarios. In Haus Lindenfels
              wurde Viktor Stein tot im Arbeitszimmer gefunden. Die spielende Person spricht mit mehreren
              Figuren, sammelt Hinweise und prüft Aussagen.
            </p>
            <p style={styles.p}>
              Der Umfang ist bewusst klein gehalten, damit die Dialoglogik sauber überprüfbar bleibt. Die
              drei NPCs bilden unterschiedliche Wissensrollen ab: Täterfigur, falsche Fährte und Zeugin.
            </p>
          </div>

          <div style={styles.npcGrid}>
            {npcRoles.map((npc) => (
              <article key={npc.name} style={styles.npcCard}>
                <span style={styles.npcName}>{npc.name}</span>
                <span style={styles.npcRole}>{npc.role}</span>
                <p style={styles.smallText}>{npc.body}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section id="system" title="Systemidee">
        <div style={styles.systemGrid}>
          {systemSteps.map((step, index) => (
            <article key={step.title} style={styles.stepCard}>
              <span style={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</span>
              <h3 style={styles.h3}>{step.title}</h3>
              <p style={styles.smallText}>{step.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="umsetzung" title="Was ich gebaut habe">
        <div style={styles.workGrid}>
          {implementationItems.map((item) => (
            <div key={item} style={styles.workItem}>
              <span style={styles.workMarker} />
              <span style={styles.workText}>{item}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="einblicke" title="Screenshots aus der Evaluation">
        <div style={styles.screenshotGrid}>
          {screenshots.map((shot) => (
            <article key={shot.src} style={styles.screenshotCard}>
              <div style={styles.screenshotFrame}>
                <Image
                  src={shot.src}
                  alt={`${shot.title} im Bachelorarbeit-Prototyp`}
                  width={1280}
                  height={720}
                  style={styles.screenshotImage}
                />
              </div>
              <div style={styles.screenshotText}>
                <h3 style={styles.h3}>{shot.title}</h3>
                <p style={styles.smallText}>{shot.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="ergebnis" title="Ergebnis">
        <div style={styles.resultGrid}>
          {resultCards.map((result) => (
            <article key={result.title} style={styles.resultCard}>
              <span style={result.label === "Grenze" ? styles.warningLabel : styles.successLabel}>
                {result.label}
              </span>
              <h3 style={styles.resultTitle}>{result.title}</h3>
              <p style={styles.cardText}>{result.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <section style={styles.downloadSection}>
        <div style={styles.container}>
          <div style={styles.downloadBand}>
            <div>
              <h2 style={styles.downloadTitle}>Finale Arbeit lesen</h2>
              <p style={styles.downloadText}>
                Die PDF enthält Forschungsstand, Qualitätsrahmen, Systemkonzept, Implementierung,
                Evaluation und die Diskussion der Grenzen des Ansatzes.
              </p>
            </div>
            <a
              className="bachelorAction"
              href="/downloads/bachelorarbeit-johannes-blank.pdf"
              download
              style={styles.primaryBtn}
            >
              PDF herunterladen
            </a>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <span>© {new Date().getFullYear()} Johannes Blank</span>
          <div style={styles.footerLinks}>
            <Link href="/impressum" style={styles.footerLink}>
              Impressum
            </Link>
            <Link href="/datenschutz" style={styles.footerLink}>
              Datenschutz
            </Link>
          </div>
        </div>
      </footer>

      <style>{`
        a.bachelorNavLink:hover,
        a.bachelorBackLink:hover {
          color: rgba(238, 246, 255, 0.98);
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .bachelorAction:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 760px) {
          .bachelorHeroGrid,
          .bachelorSplitLayout {
            grid-template-columns: 1fr !important;
          }

          .bachelorCoverPanel {
            min-height: 0 !important;
          }

          .bachelorHeroTitle {
            font-size: 34px !important;
            line-height: 1.08 !important;
          }

          .bachelorAction {
            width: 100%;
          }

          .bachelorNav {
            gap: 12px !important;
            font-size: 12px !important;
          }
        }
      `}</style>
    </main>
  );
}

function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.headerContainer}>
        <Link href="/" style={styles.brand}>
          JOHANNES BLANK
        </Link>

        <nav className="bachelorNav" style={styles.nav}>
          <Link className="bachelorNavLink" href="/#projects" style={styles.navLink}>
            PORTFOLIO
          </Link>
          <Link className="bachelorNavLink" href="/#about" style={styles.navLink}>
            ÜBER MICH
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.h2}>{title}</h2>
        <div style={styles.sectionBody}>{children}</div>
      </div>
    </section>
  );
}

const vars = {
  pageBg: "#0b1017",
  headerBg: "#16202b",
  cardBg: "#101720",
  cardBgSoft: "#121d28",
  cardBorder: "rgba(122, 145, 177, 0.22)",
  text: "#edf4ff",
  textMuted: "rgba(223, 233, 248, 0.74)",
  gold: "#e8c76a",
  green: "#8ccf9f",
  blue: "#8fa8cb",
  warning: "#d99472",
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: vars.pageBg,
    color: vars.text,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
  },
  container: {
    maxWidth: 1160,
    padding: "0 24px",
    margin: "0 auto",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: vars.headerBg,
    borderBottom: `1px solid ${vars.cardBorder}`,
  },
  headerContainer: {
    maxWidth: 1160,
    height: 56,
    padding: "0 24px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    textDecoration: "none",
    color: vars.text,
    fontWeight: 800,
    letterSpacing: 0,
    fontSize: 14,
  },
  nav: {
    display: "flex",
    gap: 18,
    fontSize: 14,
  },
  navLink: {
    textDecoration: "none",
    color: vars.textMuted,
    fontWeight: 700,
    letterSpacing: 0,
  },
  heroSection: {
    padding: "34px 0 26px",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    marginBottom: 18,
    textDecoration: "none",
    color: vars.textMuted,
    fontWeight: 800,
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(260px, 360px)",
    gap: 24,
    alignItems: "stretch",
  },
  heroTextColumn: {
    minWidth: 0,
    display: "grid",
    alignContent: "center",
    gap: 18,
    border: `1px solid ${vars.cardBorder}`,
    borderRadius: 22,
    padding: 24,
    background: vars.cardBg,
    boxShadow: "0 20px 44px rgba(0, 0, 0, 0.22)",
  },
  eyebrow: {
    width: "fit-content",
    borderRadius: 999,
    padding: "7px 11px",
    background: "rgba(232, 199, 106, 0.12)",
    border: "1px solid rgba(232, 199, 106, 0.32)",
    color: vars.gold,
    fontSize: 12,
    fontWeight: 900,
  },
  h1: {
    margin: 0,
    maxWidth: 780,
    fontSize: 52,
    lineHeight: 1.04,
    letterSpacing: 0,
  },
  lead: {
    margin: 0,
    maxWidth: 780,
    color: vars.textMuted,
    lineHeight: 1.75,
    fontSize: 16,
  },
  actionRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    padding: "11px 16px",
    borderRadius: 12,
    textDecoration: "none",
    background: vars.gold,
    color: "#101720",
    fontSize: 14,
    fontWeight: 900,
    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.22)",
    transition: "transform 180ms ease",
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    padding: "11px 16px",
    borderRadius: 12,
    textDecoration: "none",
    border: "1px solid rgba(143, 168, 203, 0.34)",
    background: "rgba(143, 168, 203, 0.08)",
    color: vars.text,
    fontSize: 14,
    fontWeight: 900,
    transition: "transform 180ms ease",
  },
  factGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
    gap: 10,
    marginTop: 2,
  },
  factCard: {
    display: "grid",
    gap: 4,
    padding: 14,
    borderRadius: 14,
    border: "1px solid rgba(143, 168, 203, 0.18)",
    background: "rgba(143, 168, 203, 0.06)",
  },
  factValue: {
    color: vars.text,
    fontSize: 24,
    lineHeight: 1,
  },
  factLabel: {
    color: vars.textMuted,
    fontSize: 12,
    lineHeight: 1.35,
    fontWeight: 700,
  },
  coverPanel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 420,
    padding: 18,
    borderRadius: 22,
    border: `1px solid ${vars.cardBorder}`,
    background: "linear-gradient(180deg, rgba(143, 168, 203, 0.08), rgba(16, 23, 32, 0.98))",
    boxShadow: "0 20px 44px rgba(0, 0, 0, 0.22)",
  },
  coverImage: {
    width: "min(100%, 292px)",
    height: "auto",
    borderRadius: 8,
    background: "#fff",
    boxShadow: "0 16px 36px rgba(0, 0, 0, 0.34)",
  },
  section: {
    padding: "32px 0",
  },
  sectionBody: {
    marginTop: 14,
  },
  h2: {
    margin: 0,
    fontSize: 30,
    lineHeight: 1.08,
    letterSpacing: 0,
  },
  h3: {
    margin: 0,
    color: vars.text,
    fontSize: 17,
    fontWeight: 900,
    lineHeight: 1.25,
  },
  focusGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 14,
  },
  infoCard: {
    display: "grid",
    gap: 10,
    padding: 18,
    borderRadius: 18,
    border: `1px solid ${vars.cardBorder}`,
    background: vars.cardBg,
  },
  infoLabel: {
    color: vars.gold,
    fontSize: 13,
    fontWeight: 900,
  },
  cardText: {
    margin: 0,
    color: vars.textMuted,
    fontSize: 14,
    lineHeight: 1.7,
  },
  splitLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 0.9fr) minmax(320px, 1.1fr)",
    gap: 18,
    alignItems: "start",
  },
  textBlock: {
    display: "grid",
    gap: 12,
    padding: 20,
    borderRadius: 18,
    border: `1px solid ${vars.cardBorder}`,
    background: vars.cardBg,
  },
  p: {
    margin: 0,
    color: vars.textMuted,
    fontSize: 15,
    lineHeight: 1.8,
  },
  npcGrid: {
    display: "grid",
    gap: 12,
  },
  npcCard: {
    display: "grid",
    gap: 7,
    padding: 16,
    borderRadius: 18,
    border: "1px solid rgba(143, 168, 203, 0.2)",
    background: vars.cardBgSoft,
  },
  npcName: {
    color: vars.text,
    fontSize: 17,
    fontWeight: 900,
  },
  npcRole: {
    color: vars.gold,
    fontSize: 13,
    fontWeight: 800,
  },
  smallText: {
    margin: 0,
    color: vars.textMuted,
    fontSize: 14,
    lineHeight: 1.62,
  },
  systemGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: 14,
  },
  stepCard: {
    minHeight: 178,
    display: "grid",
    gridTemplateRows: "auto auto 1fr",
    gap: 10,
    padding: 16,
    borderRadius: 18,
    border: `1px solid ${vars.cardBorder}`,
    background: vars.cardBg,
  },
  stepIndex: {
    width: 38,
    height: 30,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    color: "#101720",
    background: vars.gold,
    fontSize: 12,
    fontWeight: 900,
  },
  workGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 10,
    padding: 18,
    borderRadius: 20,
    border: `1px solid ${vars.cardBorder}`,
    background: vars.cardBg,
  },
  workItem: {
    display: "grid",
    gridTemplateColumns: "14px 1fr",
    gap: 10,
    alignItems: "start",
    padding: 12,
    borderRadius: 14,
    background: "rgba(143, 168, 203, 0.06)",
    border: "1px solid rgba(143, 168, 203, 0.14)",
  },
  workMarker: {
    width: 8,
    height: 8,
    marginTop: 7,
    borderRadius: 999,
    background: vars.green,
    boxShadow: "0 0 0 4px rgba(140, 207, 159, 0.1)",
  },
  workText: {
    color: vars.text,
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.5,
  },
  screenshotGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 16,
  },
  screenshotCard: {
    display: "grid",
    gap: 12,
    padding: 14,
    borderRadius: 18,
    border: `1px solid ${vars.cardBorder}`,
    background: vars.cardBg,
  },
  screenshotFrame: {
    width: "100%",
    aspectRatio: "16 / 9",
    overflow: "hidden",
    borderRadius: 12,
    border: "1px solid rgba(143, 168, 203, 0.18)",
    background: "#080d12",
  },
  screenshotImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  screenshotText: {
    display: "grid",
    gap: 6,
  },
  resultGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 14,
  },
  resultCard: {
    display: "grid",
    gap: 10,
    padding: 18,
    borderRadius: 18,
    border: `1px solid ${vars.cardBorder}`,
    background: vars.cardBg,
  },
  successLabel: {
    width: "fit-content",
    padding: "6px 10px",
    borderRadius: 999,
    color: "#102017",
    background: vars.green,
    fontSize: 12,
    fontWeight: 900,
  },
  warningLabel: {
    width: "fit-content",
    padding: "6px 10px",
    borderRadius: 999,
    color: "#24120c",
    background: vars.warning,
    fontSize: 12,
    fontWeight: 900,
  },
  resultTitle: {
    margin: 0,
    color: vars.text,
    fontSize: 18,
    lineHeight: 1.25,
  },
  downloadSection: {
    padding: "34px 0 42px",
  },
  downloadBand: {
    display: "flex",
    gap: 18,
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: 22,
    borderRadius: 20,
    border: "1px solid rgba(232, 199, 106, 0.28)",
    background: "linear-gradient(135deg, rgba(232, 199, 106, 0.12), rgba(18, 29, 40, 0.92))",
  },
  downloadTitle: {
    margin: 0,
    fontSize: 24,
    lineHeight: 1.2,
  },
  downloadText: {
    maxWidth: 720,
    margin: "8px 0 0",
    color: vars.textMuted,
    fontSize: 14,
    lineHeight: 1.7,
  },
  footer: {
    borderTop: `1px solid ${vars.cardBorder}`,
    padding: "26px 0",
    background: "rgba(7, 12, 18, 0.65)",
  },
  footerContent: {
    maxWidth: 1160,
    padding: "0 24px",
    margin: "0 auto",
    color: vars.textMuted,
    fontSize: 14,
    display: "flex",
    gap: 14,
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  footerLinks: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
  },
  footerLink: {
    color: vars.textMuted,
    textDecoration: "none",
    fontWeight: 700,
  },
};
