import Image from "next/image";

type Project = {
  title: string;
  period?: string;
  desc: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
};

export default function Home() {
  const projects: Project[] = [
    {
      title: "Honorarrechner (C#/.NET)",
      period: "SFS (intern)",
      desc: "Interne Desktop-App zur Honorar-/Beratungskalkulation (WinForms/WPF), wartbar & tabellengetrieben.",
      tags: ["C#", ".NET", "WinForms", "WPF"],
      // link: "https://github.com/...",
      // linkLabel: "GitHub",
    },
    {
      title: "Neumandats-Übersicht (Web)",
      period: "SFS (intern)",
      desc: "Webanwendung für strukturierte Mandatsübersicht und Workflow-Verbesserung.",
      tags: ["Web", "CRUD", "UI"],
    },
    {
      title: "Abrechnung / Rechnungen Tool",
      period: "SFS (intern)",
      desc: "Tooling für Abrechnungs-/Rechnungsprozesse (interne Software).",
      tags: ["Tooling", "Business", "Automation"],
    },
    {
      title: "Vacation Invasion (Unreal Multiplayer)",
      period: "Uni-Projekt",
      desc: "Multiplayer-Party-Game: Team-Selection, Replication/PlayerState, UI-Flow, Packaging.",
      tags: ["Unreal", "C++", "Blueprints", "Multiplayer"],
      // link: "https://itch.io/...",
      // linkLabel: "itch.io",
    },
    {
      title: "KI-NPC-Dialoge (Bachelorarbeit)",
      period: "laufend",
      desc: "LLM-gestützte NPC-Dialoge – praxisnahes Systemdesign und Evaluation.",
      tags: ["KI", "LLM", "Game AI"],
    },
  ];

  const skills = [
    { group: "Sprachen", items: ["C#", "C++ (Unreal)", "TypeScript/JavaScript"] },
    { group: "Engines", items: ["Unity (C#)", "Unreal (C++/Blueprints)"] },
    { group: "Frameworks", items: [".NET (WinForms/WPF)", "Web Apps", "Next.js"] },
    { group: "Interessen", items: ["KI", "Tooling", "3D-Druck", "Prototyping"] },
  ];

  return (
    <main style={styles.page}>
      <Header />

      {/* HERO */}
      <section id="top" style={{ padding: "56px 0 22px" }}>
        <div style={styles.container}>
          <div style={styles.heroCard}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <h1 style={styles.h1}>Johannes Blank</h1>
              <p style={styles.subline}>B.Sc. Game Design · Programmierung · KI</p>
              <p style={styles.heroText}>
                Ich entwickle Desktop-Apps (C#/.NET), Webanwendungen und Games (Unity/Unreal).
                Aktuell: Bachelorarbeit zu KI-gestützten NPC-Dialogen.
              </p>

              <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
                <a href="#projects" style={styles.primaryBtn}>Portfolio</a>
                <a href="#about" style={styles.secondaryBtn}>About Me</a>
              </div>

              <div style={styles.statsRow}>
                <Stat title="Business Tooling" value="SFS Apps + Web" />
                <Stat title="Games" value="5 Uni-Projekte" />
                <Stat title="Fokus" value="KI + Engineering" />
              </div>
            </div>

            <div style={styles.heroRight}>
              <div style={styles.photoWrap}>
                <Image
                  src="/profile.jpg"
                  alt="Profilbild Johannes Blank"
                  width={240}
                  height={240}
                  style={styles.photo}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects">
        <div style={{ ...styles.container, display: "grid", gap: 14 }}>
          {projects.map((p) => (
            <ProjectRow key={p.title} p={p} />
          ))}
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about" title="About Me">
        <div style={styles.container}>
          <div style={styles.card}>
            <p style={styles.p}>
              Ich baue lieber funktionierende Lösungen als nur Demos: interne Tools, sauberes UI, klare Datenlogik.
              Neben Uni-Projekten entwickle ich privat Prototypen (z. B. Web-Buzzer + Unity) und mache gerne Projekte
              mit 3D-Druck.
            </p>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills">
        <div style={{ ...styles.container, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          {skills.map((s) => (
            <div key={s.group} style={styles.card}>
              <h3 style={styles.h3}>{s.group}</h3>
              <ul style={styles.ul}>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact">
        <div style={styles.container}>
          <div style={styles.card}>
            <p style={styles.p}>
              Email:{" "}
              <a style={styles.link} href="mailto:dein.name@email.de">
                dein.name@email.de
              </a>
              <br />
              GitHub:{" "}
              <a style={styles.link} href="https://github.com/deinname" target="_blank" rel="noreferrer">
                github.com/deinname
              </a>
              <br />
              LinkedIn:{" "}
              <a style={styles.link} href="https://linkedin.com/in/deinname" target="_blank" rel="noreferrer">
                linkedin.com/in/deinname
              </a>
            </p>
          </div>
        </div>
      </Section>

      <footer style={styles.footer}>
        <div style={{ ...styles.container, color: stylesVars.textMuted, fontSize: 14 }}>
          © {new Date().getFullYear()} Johannes Blank
        </div>
      </footer>
    </main>
  );
}

function Header() {
  return (
    <header style={styles.header}>
      <div style={{ ...styles.container, height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#top" style={styles.brand}>JOHANNES BLANK</a>

        <nav style={{ display: "flex", gap: 18, fontSize: 14 }}>
          <a href="#projects" style={styles.navLink}>PORTFOLIO</a>
          <a href="#about" style={styles.navLink}>ABOUT ME</a>
        </nav>
      </div>
    </header>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: "34px 0" }}>
      <div style={styles.container}>
        <h2 style={styles.h2}>{title}</h2>
      </div>
      <div style={{ marginTop: 14 }}>{children}</div>
    </section>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div style={styles.statCard}>
      <div style={{ fontSize: 12, color: stylesVars.textMuted }}>{title}</div>
      <div style={{ marginTop: 8, fontSize: 18, fontWeight: 700, color: stylesVars.text }}>{value}</div>
    </div>
  );
}

function ProjectRow({ p }: { p: Project }) {
  return (
    <div style={styles.projectRow}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
        <h3 style={{ ...styles.h3, margin: 0 }}>
          {p.link ? (
            <a href={p.link} target="_blank" rel="noreferrer" style={styles.linkStrong}>
              {p.title}
            </a>
          ) : (
            p.title
          )}
        </h3>
        {p.period ? <span style={styles.period}>{p.period}</span> : null}
      </div>

      <p style={{ ...styles.p, marginTop: 10 }}>{p.desc}</p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
        {p.tags.map((t) => (
          <span key={t} style={styles.tag}>{t}</span>
        ))}
      </div>

      {p.link ? (
        <div style={{ marginTop: 12 }}>
          <a href={p.link} target="_blank" rel="noreferrer" style={styles.learnMore}>
            Learn more →
          </a>
        </div>
      ) : null}
    </div>
  );
}

/** ===== Styling (Beige Theme) ===== */

const stylesVars = {
  pageBg: "#121010",
  headerBg: "#2a2420",
  cardBg: "#1b1715",
  cardBorder: "rgba(255, 240, 220, 0.12)",
  text: "#f3ede6",
  textMuted: "rgba(243, 237, 230, 0.75)",
  accent: "#d8c6b3", // beige accent
  accent2: "#bfa892",
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

  heroCard: {
    display: "flex",
    gap: 18,
    alignItems: "stretch",
    justifyContent: "space-between",
    border: `1px solid ${stylesVars.cardBorder}`,
    borderRadius: 18,
    background: stylesVars.cardBg,
    padding: 18,
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
    flexWrap: "wrap",
  },
  heroRight: {
    width: 260,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  photoWrap: {
    borderRadius: 14,
    overflow: "hidden",
    border: `1px solid ${stylesVars.cardBorder}`,
    background: "#0f0d0c",
  },
  photo: {
    display: "block",
    width: 240,
    height: 240,
    objectFit: "cover",
  },

  h1: { margin: 0, fontSize: 34, letterSpacing: -0.6 },
  subline: { margin: "8px 0 0", color: stylesVars.textMuted, fontWeight: 600 },
  heroText: { marginTop: 12, color: stylesVars.textMuted, lineHeight: 1.6, maxWidth: 640 },

  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 12,
    marginTop: 18,
  },
  statCard: {
    border: `1px solid ${stylesVars.cardBorder}`,
    borderRadius: 14,
    padding: 14,
    background: "rgba(255,255,255,0.03)",
  },

  h2: { margin: 0, fontSize: 26, letterSpacing: -0.3 },
  h3: { margin: 0, fontSize: 16, fontWeight: 800 },
  p: { margin: 0, color: stylesVars.textMuted, lineHeight: 1.7, fontSize: 14 },

  card: {
    border: `1px solid ${stylesVars.cardBorder}`,
    borderRadius: 18,
    padding: 18,
    background: stylesVars.cardBg,
  },

  projectRow: {
    border: `1px solid ${stylesVars.cardBorder}`,
    borderRadius: 18,
    padding: 18,
    background: stylesVars.cardBg,
  },
  period: {
    fontSize: 12,
    color: stylesVars.textMuted,
    padding: "4px 10px",
    borderRadius: 999,
    border: `1px solid ${stylesVars.cardBorder}`,
    background: "rgba(255,255,255,0.03)",
  },
  tag: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(216, 198, 179, 0.12)",
    border: `1px solid rgba(216, 198, 179, 0.22)`,
    color: stylesVars.text,
  },

  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 14px",
    borderRadius: 12,
    textDecoration: "none",
    background: stylesVars.accent,
    color: "#1a1412",
    fontSize: 14,
    fontWeight: 800,
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 14px",
    borderRadius: 12,
    textDecoration: "none",
    border: `1px solid rgba(216, 198, 179, 0.35)`,
    color: stylesVars.text,
    fontSize: 14,
    fontWeight: 800,
    background: "rgba(255,255,255,0.03)",
  },

  link: { color: stylesVars.accent, textDecoration: "none", fontWeight: 700 },
  linkStrong: { color: stylesVars.text, textDecoration: "none" },
  learnMore: { color: stylesVars.accent, textDecoration: "none", fontWeight: 800, fontSize: 14 },

  ul: { margin: "10px 0 0", paddingLeft: 16, color: stylesVars.textMuted, lineHeight: 1.7, fontSize: 14 },

  footer: {
    borderTop: `1px solid ${stylesVars.cardBorder}`,
    padding: "26px 0",
    marginTop: 20,
    background: "rgba(0,0,0,0.12)",
  },
};