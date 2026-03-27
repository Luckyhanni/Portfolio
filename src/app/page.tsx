export default function Home() {
  const projects = [
    {
      title: "Honorarrechner (C#/.NET)",
      desc: "Interne Desktop-App zur Honorar-/Beratungskalkulation (WinForms/WPF), wartbar & tabellengetrieben.",
      tags: ["C#", ".NET", "WinForms/WPF"],
    },
    {
      title: "Neumandats-Übersicht (Web)",
      desc: "Webanwendung für strukturierte Mandatsübersicht und Workflow-Verbesserung.",
      tags: ["Web", "CRUD"],
    },
    {
      title: "Abrechnung / Rechnungen Tool",
      desc: "Tooling für Abrechnungs-/Rechnungsprozesse (interne Software bei SFS).",
      tags: ["Tooling", "Business"],
    },
    {
      title: "Vacation Invasion (Unreal Multiplayer)",
      desc: "Multiplayer-Party-Game: Team-Selection, Replication/PlayerState, UI-Flow, Packaging.",
      tags: ["Unreal", "C++", "Blueprints"],
    },
    {
      title: "KI-NPC-Dialoge (Bachelorarbeit)",
      desc: "LLM-gestützte NPC-Dialoge – praxisnahes Systemdesign und Evaluation.",
      tags: ["KI", "LLM", "Game AI"],
    },
  ];

  const skills = [
    { group: "Sprachen", items: ["C#", "C++ (Unreal)", "JavaScript/TypeScript"] },
    { group: "Engines", items: ["Unity (C#)", "Unreal (C++/Blueprints)"] },
    { group: "Frameworks", items: [".NET (WinForms/WPF)", "Web Apps"] },
    { group: "Interessen", items: ["KI", "Tooling", "3D-Druck", "Prototyping"] },
  ];

  return (
    <main style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
      <Header />

      <section id="top" style={{ padding: "64px 0 24px" }}>
        <div style={container}>
          <p style={{ color: "#64748b", margin: 0 }}>Game Design (B.Sc.) · Programmierung · KI</p>
          <h1 style={{ margin: "10px 0 0", fontSize: 42, letterSpacing: -0.8 }}>
            Johannes Blank
          </h1>
          <p style={{ marginTop: 14, color: "#334155", maxWidth: 720, lineHeight: 1.6 }}>
            Ich entwickle Desktop-Apps (C#/.NET), Webanwendungen und Games (Unity/Unreal).
            Aktuell: Bachelorarbeit zu KI-gestützten NPC-Dialogen.
          </p>

          <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
            <a href="#projects" style={primaryBtn}>Projekte</a>
            <a href="#contact" style={secondaryBtn}>Kontakt</a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, marginTop: 26 }}>
            <Stat title="Business Tooling" value="SFS Apps + Web" />
            <Stat title="Games" value="5 Uni-Projekte" />
            <Stat title="Fokus" value="KI + Engineering" />
          </div>
        </div>
      </section>

      <Section id="projects" title="Projekte" subtitle="Auswahl aus Business-Tooling, Game Dev und KI.">
        <div style={{ ...container, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
          {projects.map((p) => (
            <div key={p.title} style={card}>
              <h3 style={{ margin: 0, fontSize: 16 }}>{p.title}</h3>
              <p style={{ marginTop: 8, color: "#475569", lineHeight: 1.55, fontSize: 14 }}>{p.desc}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                {p.tags.map((t) => (
                  <span key={t} style={tag}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="about" title="Über mich" subtitle="Kurz & klar.">
        <div style={container}>
          <div style={card}>
            <p style={{ margin: 0, color: "#334155", lineHeight: 1.7 }}>
              Ich baue lieber funktionierende Lösungen als nur Demos: interne Tools, sauberes UI, klare Datenlogik.
              Neben Uni-Projekten entwickle ich privat Prototypen (z. B. Web-Buzzer + Unity) und mache gerne Projekte
              mit 3D-Druck.
            </p>
          </div>
        </div>
      </Section>

      <Section id="skills" title="Skills" subtitle="Kompakt gruppiert.">
        <div style={{ ...container, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
          {skills.map((s) => (
            <div key={s.group} style={card}>
              <h3 style={{ margin: 0, fontSize: 16 }}>{s.group}</h3>
              <ul style={{ margin: "10px 0 0", paddingLeft: 16, color: "#475569", lineHeight: 1.7, fontSize: 14 }}>
                {s.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" title="Kontakt" subtitle="Trag deine echten Links ein.">
        <div style={container}>
          <div style={{ ...card, display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
            <p style={{ margin: 0, color: "#334155" }}>
              Email: <span style={{ color: "#64748b" }}>dein.name@email.de</span><br />
              GitHub: <span style={{ color: "#64748b" }}>github.com/deinname</span><br />
              LinkedIn: <span style={{ color: "#64748b" }}>linkedin.com/in/deinname</span>
            </p>
          </div>
        </div>
      </Section>

      <footer style={{ borderTop: "1px solid #e2e8f0", padding: "26px 0", marginTop: 20 }}>
        <div style={{ ...container, color: "#64748b", fontSize: 14 }}>
          © {new Date().getFullYear()} Johannes Blank
        </div>
      </footer>
    </main>
  );
}

function Header() {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,.85)", backdropFilter: "blur(10px)", borderBottom: "1px solid #e2e8f0" }}>
      <div style={{ ...container, height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#top" style={{ fontWeight: 650, textDecoration: "none", color: "#0f172a" }}>Johannes Blank</a>
        <nav style={{ display: "flex", gap: 14, fontSize: 14 }}>
          <a href="#projects" style={navLink}>Projekte</a>
          <a href="#about" style={navLink}>Über mich</a>
          <a href="#skills" style={navLink}>Skills</a>
          <a href="#contact" style={navLink}>Kontakt</a>
        </nav>
      </div>
    </header>
  );
}

function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: "52px 0" }}>
      <div style={container}>
        <h2 style={{ margin: 0, fontSize: 26, letterSpacing: -0.3 }}>{title}</h2>
        {subtitle ? <p style={{ marginTop: 8, color: "#64748b", maxWidth: 780, lineHeight: 1.6 }}>{subtitle}</p> : null}
      </div>
      <div style={{ marginTop: 16 }}>{children}</div>
    </section>
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div style={card}>
      <p style={{ margin: 0, color: "#64748b", fontSize: 12 }}>{title}</p>
      <p style={{ marginTop: 8, marginBottom: 0, fontSize: 18, fontWeight: 650 }}>{value}</p>
    </div>
  );
}

const container: React.CSSProperties = { maxWidth: 980, padding: "0 18px", margin: "0 auto" };

const card: React.CSSProperties = {
  border: "1px solid #e2e8f0",
  borderRadius: 18,
  padding: 18,
  background: "#fff",
};

const tag: React.CSSProperties = {
  fontSize: 12,
  padding: "6px 10px",
  borderRadius: 999,
  background: "#f1f5f9",
  color: "#334155",
};

const primaryBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 14px",
  borderRadius: 14,
  textDecoration: "none",
  background: "#0f172a",
  color: "#fff",
  fontSize: 14,
  fontWeight: 600,
};

const secondaryBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "10px 14px",
  borderRadius: 14,
  textDecoration: "none",
  border: "1px solid #e2e8f0",
  color: "#0f172a",
  fontSize: 14,
  fontWeight: 600,
};

const navLink: React.CSSProperties = { textDecoration: "none", color: "#475569" };