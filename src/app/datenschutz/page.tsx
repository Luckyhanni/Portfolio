import Link from "next/link";

export default function DatenschutzPage() {
  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.headerInner}>
            <Link href="/" style={styles.brand}>JOHANNES BLANK</Link>

            <nav style={styles.nav}>
              <Link href="/#projects" style={styles.navLink}>PORTFOLIO</Link>
              <Link href="/#about" style={styles.navLink}>ÜBER MICH</Link>
            </nav>
          </div>
        </div>
      </header>

      <section style={styles.section}>
        <div style={styles.container}>
          <Link href="/" style={styles.backLink}>← Zurück zur Startseite</Link>

          <div style={styles.card}>
            <h1 style={styles.h1}>Datenschutzerklärung</h1>

            <Section
              title="1. Verantwortlicher"
              text={
                <>
                  Johannes Blank
                  <br />
                  Weidmannstraße 6
                  <br />
                  80997 München
                  <br />
                  Deutschland
                  <br />
                  E-Mail:{" "}
                  <a href="mailto:johannes_blank2001@gmx.de" style={styles.link}>
                    johannes_blank2001@gmx.de
                  </a>
                </>
              }
            />

            <Section
              title="2. Zugriff auf die Website"
              text="Beim Aufruf dieser Website werden technisch notwendige Verbindungsdaten verarbeitet, damit die Seite ausgeliefert und stabil dargestellt werden kann. Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, Browserinformationen, Betriebssystem sowie aufgerufene Seiten gehören."
            />

            <Section
              title="3. Kontaktaufnahme per E-Mail"
              text="Wenn Sie mich per E-Mail kontaktieren, verarbeite ich die von Ihnen übermittelten Angaben ausschließlich zur Bearbeitung Ihrer Anfrage und für mögliche Anschlussfragen."
            />

            <Section
              title="4. Eingebettete YouTube-Videos"
              text="Auf einzelnen Projektseiten sind YouTube-Videos eingebunden. Beim Laden oder Abspielen dieser Inhalte können personenbezogene Daten, insbesondere deine IP-Adresse sowie technische Nutzungsdaten, an YouTube beziehungsweise Google übertragen werden. Die Einbettung erfolgt über die datenschutzfreundlichere Domain youtube-nocookie.com, dennoch kann eine Datenverarbeitung durch YouTube nicht ausgeschlossen werden."
            />

            <Section
              title="5. Externe Links"
              text="Diese Website enthält Links zu externen Websites, zum Beispiel zu GitHub, LinkedIn, YouTube oder itch.io. Für die Inhalte und die Datenverarbeitung auf den verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich."
            />

            <Section
              title="6. Download von Dateien"
              text="Auf dieser Website können Sie Dateien wie meinen Lebenslauf herunterladen. Dabei können durch den Hosting-Anbieter technisch notwendige Zugriffsdaten verarbeitet werden."
            />

            <Section
              title="7. Ihre Rechte"
              text="Sie haben nach Maßgabe der gesetzlichen Vorschriften das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie auf Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten. Außerdem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function Section({
  title,
  text,
}: {
  title: string;
  text: React.ReactNode;
}) {
  return (
    <section style={styles.block}>
      <h2 style={styles.h2}>{title}</h2>
      <p style={styles.p}>{text}</p>
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
    maxWidth: 960,
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
  headerInner: {
    height: 56,
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
  section: {
    padding: "34px 0 80px",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    marginBottom: 18,
    textDecoration: "none",
    color: vars.text,
    fontWeight: 800,
  },
  card: {
    display: "grid",
    gap: 24,
    padding: 24,
    borderRadius: 24,
    border: `1px solid ${vars.cardBorder}`,
    background: vars.cardBg,
    boxShadow: "0 20px 44px rgba(0, 0, 0, 0.22)",
  },
  block: {
    display: "grid",
    gap: 10,
  },
  h1: {
    margin: 0,
    fontSize: "clamp(34px, 7vw, 40px)",
    lineHeight: 1.05,
    letterSpacing: -0.8,
    overflowWrap: "anywhere",
  },
  h2: {
    margin: 0,
    fontSize: 20,
    letterSpacing: -0.3,
  },
  p: {
    margin: 0,
    color: vars.textMuted,
    lineHeight: 1.8,
    fontSize: 15,
    overflowWrap: "anywhere",
  },
  link: {
    color: vars.accentStrong,
    textDecoration: "none",
    fontWeight: 800,
    overflowWrap: "anywhere",
  },
};
