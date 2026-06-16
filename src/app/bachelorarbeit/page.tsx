import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bachelorarbeit | Johannes Blank",
  description:
    "Bachelorarbeit von Johannes Blank zu KI-gestützten NPC-Dialogen in einem Unity-Krimi-Prototyp.",
};

const thesisFeatures = [
  "Kleines Krimi-Szenario als spielbarer Kontext",
  "Mehrere NPCs mit eigenen Rollenprofilen",
  "NPC-Wissen und klar definierte Wissensgrenzen",
  "GameState als Grundlage für zustandsabhängige Antworten",
  "Dialog-Memory für vorherige Gesprächsinformationen",
  "PromptBuilder für strukturierte System- und Kontext-Prompts",
  "Dummy-Modus und vorbereitete sichere API-Anbindung",
  "Dialog-Logging zur späteren Auswertung",
];

const builtByMe = [
  "Architektur des Dialogsystems",
  "NPC-Profile und Wissensmodell",
  "Promptstruktur und Constraints",
  "UI für NPC-Auswahl und Chat",
  "Dummy-Responder für reproduzierbare Tests",
  "Sichere API-Vorbereitung ohne API-Keys im Repository",
  "Logging und Auswertbarkeit der Dialoge",
  "Evaluation anhand festgelegter Qualitätskriterien",
];

const screenshotTopics = [
  "Chat-UI",
  "NPC-Auswahl",
  "Prompt-/Systemarchitektur",
  "Evaluation und Logging",
];

const qualityCriteria = [
  "Charakterkonsistenz",
  "Welt- und State-Konsistenz",
  "Wissensbegrenzung",
  "Umgang mit Nichtwissen",
  "Memory-Korrektheit",
  "Spielerische Sinnhaftigkeit",
  "Vermeidung von Spoilern, Halluzinationen und Meta-Brüchen",
];

export default function BachelorarbeitPage() {
  return (
    <main style={styles.page}>
      <Header />

      <section style={styles.heroSection}>
        <div style={styles.container}>
          <Link href="/#projects" style={styles.backLink}>← Zurück zum Portfolio</Link>

          <div style={styles.heroCard}>
            <div style={styles.heroTextColumn}>
              <span style={styles.eyebrow}>Bachelorarbeit</span>
              <h1 style={styles.h1}>KI-gestützte NPC-Dialoge in einem Krimi-Prototyp</h1>
              <p style={styles.lead}>
                Für meine Bachelorarbeit habe ich ein Unity-basiertes Dialogsystem entwickelt, das NPC-Gespräche mithilfe strukturierter Prompts, begrenztem NPC-Wissen, Spielzustand und Dialog-Memory kontrolliert steuert.
              </p>

              <div style={styles.actionRow}>
                <a
                  href="/downloads/bachelorarbeit-johannes-blank.pdf"
                  download
                  style={styles.primaryBtn}
                >
                  Bachelorarbeit herunterladen
                </a>
                <a href="#prototyp" style={styles.secondaryBtn}>
                  Zum Prototyp
                </a>
              </div>
            </div>

            <div aria-label="Dialogsystem Ablauf" style={styles.heroDiagram}>
              {["NPC-Profil", "GameState", "Memory", "PromptBuilder", "Antwort"].map((item, index) => (
                <div key={item} style={styles.diagramStep}>
                  <span style={styles.diagramIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <span style={styles.diagramLabel}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section id="worum-geht-es" title="Worum geht es?">
        <div style={styles.card}>
          <p style={styles.p}>
            Klassische NPC-Dialoge in Spielen sind oft statisch: Die Figur reagiert mit vorbereiteten Sätzen, unabhängig davon, was vorher passiert ist oder was sie eigentlich wissen dürfte. Große Sprachmodelle können solche Gespräche dynamischer machen und NPCs flexibler auf Spielende reagieren lassen.
          </p>
          <p style={styles.p}>
            Genau dabei entstehen aber neue Risiken. Ein KI-NPC kann falsches Wissen erfinden, wichtige Hinweise zu früh verraten, aus der Rolle fallen oder Dinge sagen, die nicht zur Spielwelt passen. Die Arbeit untersucht deshalb nicht freie KI-Kommunikation um jeden Preis, sondern kontrollierte Dialoge mit klaren Grenzen.
          </p>
        </div>
      </Section>

      <Section id="prototyp" title="Praktischer Prototyp">
        <div style={styles.featureGrid}>
          {thesisFeatures.map((feature) => (
            <article key={feature} style={styles.featureCard}>
              <span style={styles.featureDot} />
              <p style={styles.featureText}>{feature}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="arbeit" title="Was ich daran gebaut habe">
        <div style={styles.twoColumnCard}>
          {builtByMe.map((item, index) => (
            <div key={item} style={styles.workItem}>
              <span style={styles.workIndex}>{String(index + 1).padStart(2, "0")}</span>
              <span style={styles.workText}>{item}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section id="screenshots" title="Screenshots / Einblicke">
        <div style={styles.screenshotGrid}>
          {screenshotTopics.map((topic) => (
            <article key={topic} style={styles.screenshotCard}>
              <div style={styles.screenshotPlaceholder}>
                <span style={styles.screenshotLineLong} />
                <span style={styles.screenshotLine} />
                <span style={styles.screenshotLineShort} />
              </div>
              <h3 style={styles.h3}>{topic}</h3>
              <p style={styles.smallText}>Platzhalter für spätere Einblicke aus dem Unity-Prototyp.</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="qualitaet" title="Qualitätskriterien">
        <div style={styles.criteriaGrid}>
          {qualityCriteria.map((criterion) => (
            <div key={criterion} style={styles.criterionCard}>
              {criterion}
            </div>
          ))}
        </div>
      </Section>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <span>© {new Date().getFullYear()} Johannes Blank</span>
          <div style={styles.footerLinks}>
            <Link href="/impressum" style={styles.footerLink}>Impressum</Link>
            <Link href="/datenschutz" style={styles.footerLink}>Datenschutz</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 720px) {
          .bachelor-section {
            padding: 26px 0 !important;
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
        <Link href="/" style={styles.brand}>JOHANNES BLANK</Link>

        <nav style={styles.nav}>
          <Link href="/#projects" style={styles.navLink}>PORTFOLIO</Link>
          <Link href="/#about" style={styles.navLink}>ÜBER MICH</Link>
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
    <section id={id} className="bachelor-section" style={styles.section}>
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
  cardBorder: "rgba(122, 145, 177, 0.2)",
  text: "#edf4ff",
  textMuted: "rgba(223, 233, 248, 0.74)",
  accent: "#6f87a8",
  accentStrong: "#8fa8cb",
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
    letterSpacing: 0.8,
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
    letterSpacing: 0.6,
  },
  heroSection: {
    padding: "34px 0 24px",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    marginBottom: 18,
    textDecoration: "none",
    color: vars.text,
    fontWeight: 800,
  },
  heroCard: {
    display: "flex",
    gap: 22,
    flexWrap: "wrap",
    alignItems: "stretch",
    border: `1px solid ${vars.cardBorder}`,
    borderRadius: 24,
    padding: 22,
    background: vars.cardBg,
    boxShadow: "0 20px 44px rgba(0, 0, 0, 0.22)",
  },
  heroTextColumn: {
    flex: "1 1 560px",
    minWidth: 0,
    display: "grid",
    gap: 14,
    alignContent: "center",
  },
  eyebrow: {
    width: "fit-content",
    borderRadius: 999,
    padding: "7px 11px",
    background: "rgba(143, 168, 203, 0.14)",
    border: `1px solid rgba(143, 168, 203, 0.24)`,
    fontSize: 12,
    fontWeight: 800,
    color: vars.text,
  },
  h1: {
    margin: 0,
    fontSize: "clamp(34px, 7vw, 56px)",
    lineHeight: 0.98,
    letterSpacing: -1.2,
    maxWidth: 820,
  },
  lead: {
    margin: 0,
    maxWidth: 760,
    color: vars.textMuted,
    lineHeight: 1.75,
    fontSize: 16,
  },
  actionRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 4,
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    padding: "11px 16px",
    borderRadius: 12,
    textDecoration: "none",
    background: vars.accentStrong,
    color: "#0f1722",
    fontSize: 14,
    fontWeight: 800,
    boxShadow: "0 10px 24px rgba(20, 30, 44, 0.24)",
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    padding: "11px 16px",
    borderRadius: 12,
    textDecoration: "none",
    border: `1px solid rgba(143, 168, 203, 0.28)`,
    background: "rgba(143, 168, 203, 0.08)",
    color: vars.text,
    fontSize: 14,
    fontWeight: 800,
  },
  heroDiagram: {
    flex: "1 1 320px",
    minWidth: 280,
    display: "grid",
    gap: 10,
    alignContent: "center",
    padding: 16,
    borderRadius: 20,
    border: `1px solid rgba(143, 168, 203, 0.18)`,
    background: "linear-gradient(180deg, rgba(143, 168, 203, 0.09), rgba(13, 20, 29, 0.62))",
  },
  diagramStep: {
    display: "grid",
    gridTemplateColumns: "42px 1fr",
    gap: 10,
    alignItems: "center",
    padding: "12px 14px",
    borderRadius: 14,
    border: `1px solid rgba(143, 168, 203, 0.18)`,
    background: "rgba(16, 23, 32, 0.84)",
  },
  diagramIndex: {
    color: vars.accentStrong,
    fontSize: 12,
    fontWeight: 900,
  },
  diagramLabel: {
    color: vars.text,
    fontSize: 14,
    fontWeight: 800,
  },
  section: {
    padding: "32px 0",
  },
  sectionBody: {
    marginTop: 14,
  },
  h2: {
    margin: 0,
    fontSize: 28,
    lineHeight: 1.05,
    letterSpacing: -0.5,
  },
  h3: {
    margin: 0,
    fontSize: 16,
    fontWeight: 800,
  },
  card: {
    display: "grid",
    gap: 12,
    border: `1px solid ${vars.cardBorder}`,
    borderRadius: 22,
    padding: 22,
    background: vars.cardBg,
  },
  p: {
    margin: 0,
    color: vars.textMuted,
    lineHeight: 1.8,
    fontSize: 15,
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: 14,
  },
  featureCard: {
    display: "grid",
    gridTemplateColumns: "14px 1fr",
    gap: 10,
    alignItems: "start",
    border: `1px solid ${vars.cardBorder}`,
    borderRadius: 18,
    padding: 16,
    background: vars.cardBg,
  },
  featureDot: {
    width: 9,
    height: 9,
    marginTop: 7,
    borderRadius: 999,
    background: vars.accentStrong,
    boxShadow: "0 0 0 4px rgba(143, 168, 203, 0.1)",
  },
  featureText: {
    margin: 0,
    color: vars.textMuted,
    lineHeight: 1.6,
    fontSize: 14,
  },
  twoColumnCard: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 10,
    border: `1px solid ${vars.cardBorder}`,
    borderRadius: 22,
    padding: 18,
    background: vars.cardBg,
  },
  workItem: {
    display: "grid",
    gridTemplateColumns: "38px 1fr",
    gap: 10,
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    background: "rgba(143, 168, 203, 0.06)",
    border: `1px solid rgba(143, 168, 203, 0.14)`,
  },
  workIndex: {
    color: vars.accentStrong,
    fontSize: 12,
    fontWeight: 900,
  },
  workText: {
    color: vars.text,
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 1.45,
  },
  screenshotGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 14,
  },
  screenshotCard: {
    display: "grid",
    gap: 12,
    border: `1px solid ${vars.cardBorder}`,
    borderRadius: 18,
    padding: 14,
    background: vars.cardBg,
  },
  screenshotPlaceholder: {
    aspectRatio: "16 / 10",
    display: "grid",
    alignContent: "center",
    gap: 10,
    padding: 18,
    borderRadius: 14,
    border: `1px dashed rgba(143, 168, 203, 0.28)`,
    background: "rgba(13, 20, 29, 0.92)",
  },
  screenshotLineLong: {
    width: "82%",
    height: 10,
    borderRadius: 999,
    background: "rgba(143, 168, 203, 0.24)",
  },
  screenshotLine: {
    width: "64%",
    height: 10,
    borderRadius: 999,
    background: "rgba(143, 168, 203, 0.18)",
  },
  screenshotLineShort: {
    width: "42%",
    height: 10,
    borderRadius: 999,
    background: "rgba(143, 168, 203, 0.12)",
  },
  smallText: {
    margin: 0,
    color: vars.textMuted,
    lineHeight: 1.55,
    fontSize: 13,
  },
  criteriaGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  criterionCard: {
    padding: "10px 12px",
    borderRadius: 999,
    border: `1px solid rgba(143, 168, 203, 0.24)`,
    background: "rgba(111, 135, 168, 0.14)",
    color: vars.text,
    fontSize: 13,
    fontWeight: 700,
  },
  footer: {
    borderTop: `1px solid ${vars.cardBorder}`,
    padding: "26px 0",
    marginTop: 34,
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
