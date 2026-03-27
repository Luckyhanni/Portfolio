import Link from "next/link";
import Image from "next/image";
import { getProject, PROJECTS } from "../../../data/projects";

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);

  if (!project) {
    return (
      <main style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.h1}>Projekt nicht gefunden</h1>
          <Link href="/" style={styles.link}>← Zurück</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div style={{ ...styles.container, height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={styles.brand}>JOHANNES BLANK</Link>
          <nav style={{ display: "flex", gap: 18, fontSize: 14 }}>
            <Link href="/#projects" style={styles.navLink}>PORTFOLIO</Link>
            <Link href="/#about" style={styles.navLink}>ABOUT ME</Link>
          </nav>
        </div>
      </header>

      <section style={{ padding: "40px 0 18px" }}>
        <div style={styles.container}>
          <Link href="/#projects" style={styles.backBtn}>← Back</Link>

          {project.heroImage ? (
            <div style={styles.heroImageWrap}>
              <Image
                src={project.heroImage}
                alt={project.title}
                width={980}
                height={420}
                style={styles.heroImage}
                priority
              />
            </div>
          ) : null}

          <h1 style={styles.h1}>{project.title}</h1>
          {project.period ? <p style={styles.period}>{project.period}</p> : null}

          <div style={styles.tagRow}>
            {project.tags.map((t) => (
              <span key={t} style={styles.tag}>{t}</span>
            ))}
          </div>

          <div style={styles.card}>
            {project.description.map((p, i) => (
              <p key={i} style={{ ...styles.p, marginTop: i === 0 ? 0 : 10 }}>{p}</p>
            ))}

            {project.highlights?.length ? (
              <>
                <h3 style={{ ...styles.h3, marginTop: 16 }}>Highlights</h3>
                <ul style={styles.ul}>
                  {project.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </>
            ) : null}

            {project.links?.length ? (
              <>
                <h3 style={{ ...styles.h3, marginTop: 16 }}>Links</h3>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {project.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" style={styles.primaryBtn}>
                      {l.label}
                    </a>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={{ ...styles.container, color: stylesVars.textMuted, fontSize: 14 }}>
          © {new Date().getFullYear()} Johannes Blank
        </div>
      </footer>
    </main>
  );
}

// Optional: für Static Generation
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

const stylesVars = {
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
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
    background: stylesVars.pageBg,
    color: stylesVars.text,
    minHeight: "100vh",
  },
  container: { maxWidth: 980, padding: "0 18px", margin: "0 auto" },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    background: stylesVars.headerBg,
    borderBottom: `1px solid ${stylesVars.cardBorder}`,
  },
  brand: {
    fontWeight: 800,
    letterSpacing: 0.8,
    textDecoration: "none",
    color: stylesVars.text,
    fontSize: 14,
  },
  navLink: {
    textDecoration: "none",
    color: stylesVars.textMuted,
    fontWeight: 700,
    letterSpacing: 0.6,
  },

  backBtn: {
    display: "inline-block",
    textDecoration: "none",
    color: stylesVars.text,
    fontWeight: 800,
    marginBottom: 14,
  },

  heroImageWrap: {
    borderRadius: 18,
    overflow: "hidden",
    border: `1px solid ${stylesVars.cardBorder}`,
    background: "#0d141d",
    marginBottom: 16,
  },
  heroImage: {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "cover",
  },

  h1: { margin: "8px 0 0", fontSize: 34, letterSpacing: -0.6 },
  h3: { margin: 0, fontSize: 16, fontWeight: 800 },
  period: { margin: "8px 0 0", color: stylesVars.textMuted, fontWeight: 600 },

  tagRow: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 },
  tag: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(111, 135, 168, 0.14)",
    border: `1px solid rgba(143, 168, 203, 0.24)`,
    color: stylesVars.text,
  },

  card: {
    border: `1px solid ${stylesVars.cardBorder}`,
    borderRadius: 18,
    padding: 18,
    background: stylesVars.cardBg,
    marginTop: 16,
  },
  p: { margin: 0, color: stylesVars.textMuted, lineHeight: 1.7, fontSize: 14 },

  ul: { margin: "10px 0 0", paddingLeft: 18, color: stylesVars.textMuted, lineHeight: 1.7, fontSize: 14 },

  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 14px",
    borderRadius: 12,
    textDecoration: "none",
    background: stylesVars.accentStrong,
    color: "#0f1722",
    fontSize: 14,
    fontWeight: 800,
    boxShadow: "0 10px 24px rgba(20, 30, 44, 0.24)",
  },

  link: { color: stylesVars.accent, textDecoration: "none", fontWeight: 800 },

  footer: {
    borderTop: `1px solid ${stylesVars.cardBorder}`,
    padding: "26px 0",
    marginTop: 20,
    background: "rgba(7, 12, 18, 0.65)",
  },
};
