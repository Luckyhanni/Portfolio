import Link from "next/link";

export default function ImpressumPage() {
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
            <h1 style={styles.h1}>Impressum</h1>

            <div style={styles.block}>
              <h2 style={styles.h2}>Angaben gemäß § 5 DDG</h2>
              <p style={styles.p}>
                Johannes Blank
                <br />
                Weidmannstraße 6
                <br />
                80997 München
                <br />
                Deutschland
              </p>
            </div>

            <div style={styles.block}>
              <h2 style={styles.h2}>Kontakt</h2>
              <p style={styles.p}>
                E-Mail:{" "}
                <a href="mailto:johannes_blank2001@gmx.de" style={styles.link}>
                  johannes_blank2001@gmx.de
                </a>
              </p>
            </div>

            <div style={styles.block}>
              <h2 style={styles.h2}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
              <p style={styles.p}>
                Johannes Blank
                <br />
                Weidmannstraße 6
                <br />
                80997 München
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
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
