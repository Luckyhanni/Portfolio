import Link from "next/link";

export default function TimelyDemoPage() {
  return (
    <main style={styles.page}>
      <section style={styles.section}>
        <div style={styles.card}>
          <span style={styles.badge}>Demo verfügbar</span>
          <h1 style={styles.h1}>Timely Demo</h1>
          <p style={styles.p}>
            Die interaktive Demo fuer Timely wird hier vorbereitet. Die Route ist bereits angelegt,
            damit der Demo-Link im Portfolio stabil bleibt und spaeter direkt mit der echten Demo
            ersetzt werden kann.
          </p>
          <div style={styles.actionRow}>
            <Link href="/projects/timely" style={styles.secondaryButton}>
              Zum Projekt
            </Link>
            <Link href="/#projects" style={styles.primaryButton}>
              Zur Projektliste
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

const stylesVars = {
  pageBg: "#0b1017",
  cardBg: "#101720",
  cardBorder: "rgba(122, 145, 177, 0.2)",
  text: "#edf4ff",
  textMuted: "rgba(223, 233, 248, 0.74)",
  accentStrong: "#8fa8cb",
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    padding: 24,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
    background: stylesVars.pageBg,
    color: stylesVars.text,
  },
  section: {
    width: "min(100%, 760px)",
  },
  card: {
    display: "grid",
    gap: 16,
    padding: 24,
    borderRadius: 22,
    border: `1px solid ${stylesVars.cardBorder}`,
    background: stylesVars.cardBg,
    boxShadow: "0 20px 44px rgba(0, 0, 0, 0.22)",
  },
  badge: {
    width: "fit-content",
    fontSize: 12,
    fontWeight: 900,
    color: "#0f1722",
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(237, 244, 255, 0.32)",
    background: stylesVars.accentStrong,
  },
  h1: {
    margin: 0,
    fontSize: 42,
    lineHeight: 1.02,
    letterSpacing: -1,
  },
  p: {
    margin: 0,
    color: stylesVars.textMuted,
    lineHeight: 1.75,
    fontSize: 15,
  },
  actionRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 4,
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
    padding: "10px 14px",
    borderRadius: 12,
    textDecoration: "none",
    background: stylesVars.accentStrong,
    color: "#0f1722",
    fontSize: 14,
    fontWeight: 900,
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
    padding: "10px 14px",
    borderRadius: 12,
    textDecoration: "none",
    background: "rgba(143, 168, 203, 0.08)",
    color: stylesVars.text,
    border: `1px solid rgba(143, 168, 203, 0.24)`,
    fontSize: 14,
    fontWeight: 900,
  },
};
