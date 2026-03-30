import Link from "next/link";
import Image from "next/image";
import type { IconType } from "react-icons";
import { DiVisualstudio } from "react-icons/di";
import {
  FaDatabase,
  FaFileExcel,
  FaListCheck,
  FaMicrosoft,
  FaWindows,
  FaWpforms,
} from "react-icons/fa6";
import {
  SiBlender,
  SiCplusplus,
  SiDotnet,
  SiGit,
  SiGithub,
  SiPython,
  SiReact,
  SiRender,
  SiUnity,
  SiUnrealengine,
} from "react-icons/si";
import { TbBrandCSharp, TbBrandVscode } from "react-icons/tb";
import { GAME_PROJECTS, Project, SOFTWARE_PROJECTS } from "../data/projects";

export default function Home() {
  const skills = [
    { name: "C#", icon: TbBrandCSharp, color: "#9b4f96" },
    { name: ".NET", icon: SiDotnet, color: "#7c65d1" },
    { name: "Unity", icon: SiUnity, color: "#d9e0ec" },
    { name: "Unreal", icon: SiUnrealengine, color: "#f3f7ff" },
    { name: "Blender", icon: SiBlender, color: "#ff8a00" },
    { name: "Python", icon: SiPython, color: "#f2c14e" },
    { name: "React", icon: SiReact, color: "#5bd3ff" },
    { name: "Git", icon: SiGit, color: "#f05033" },
    { name: "VS Code", icon: TbBrandVscode, color: "#2f8fff" },
    { name: "Visual Studio", icon: DiVisualstudio, color: "#9b6dff" },
    { name: "C++", icon: SiCplusplus, color: "#4f90d9" },
    { name: "Power Automate", icon: FaMicrosoft, color: "#3d8bff" },
  ];
  const gameStatLogos = GAME_PROJECTS.map((project) => ({
    src: project.logoImage,
    alt: `${project.title} Logo`,
    href: `/projects/${project.slug}`,
  })).filter((logo): logo is { src: string; alt: string; href: string } => Boolean(logo.src));
  const softwareStatLogos = SOFTWARE_PROJECTS.map((project) => ({
    src: project.logoImage,
    alt: `${project.title} Logo`,
    href: `/projects/${project.slug}`,
  })).filter((logo): logo is { src: string; alt: string; href: string } => Boolean(logo.src));

  return (
    <main style={styles.page}>
      <Header />

      {/* HERO */}
      <section id="top" style={{ padding: "28px 0 18px" }}>
        <div style={styles.container}>
          <div style={styles.heroCard}>
            <div style={styles.heroMain}>
              <h1 style={styles.h1}>Johannes Blank</h1>
              <p style={styles.subline}>B.Sc. Game Design · Programmierung · KI</p>
              <p style={styles.heroText}>
                Ich entwickle Desktop-Apps (C#/.NET), Webanwendungen und Games (Unity/Unreal).
                Aktuell: Bachelorarbeit zu KI-gestützten NPC-Dialogen.
              </p>
            </div>

            <div style={styles.heroRight}>
              <div style={styles.photoWrap}>
                <Image
                  src="/profile.jpg"
                  alt="Profilbild Johannes Blank"
                  width={184}
                  height={184}
                  style={styles.photo}
                  priority
                />
              </div>
            </div>

            <div style={styles.statsRow}>
              <Stat
                title="Games"
                logos={gameStatLogos}
              />
              <Stat
                title="Software"
                logos={softwareStatLogos}
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects" titleStyle={styles.projectsSectionTitle}>
        <div style={{ ...styles.container, display: "grid", gap: 28 }}>
          <CategoryBlock
            title="Games"
            subtitle=""
            projects={GAME_PROJECTS}
          />
          <CategoryBlock
            title="Software"
            subtitle=""
            projects={SOFTWARE_PROJECTS}
          />
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
        <div style={styles.container}>
          <div style={styles.skillsGrid}>
            {skills.map((skill) => (
              <SkillLogoItem key={skill.name} skill={skill} />
            ))}
          </div>
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
          <a href="#projects" className="navLink" style={styles.navLink}>PORTFOLIO</a>
          <a href="#about" className="navLink" style={styles.navLink}>ABOUT ME</a>
        </nav>
      </div>
    </header>
  );
}

function Section({
  id,
  title,
  children,
  titleStyle,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  titleStyle?: React.CSSProperties;
}) {
  return (
    <section id={id} style={{ padding: "34px 0" }}>
      <div style={styles.container}>
        <h2 style={{ ...styles.h2, ...titleStyle }}>{title}</h2>
      </div>
      <div style={{ marginTop: 14 }}>{children}</div>
    </section>
  );
}

function Stat({
  title,
  value,
  icons,
  logos,
}: {
  title: string;
  value?: string;
  icons?: string[];
  logos?: { src: string; alt: string; href: string }[];
}) {
  return (
    <div style={styles.statCard}>
      <div style={{ fontSize: 12, color: stylesVars.textMuted }}>{title}</div>
      {value ? (
        <div style={{ marginTop: 8, fontSize: 18, fontWeight: 700, color: stylesVars.text }}>{value}</div>
      ) : null}
      {logos?.length ? (
        <div
          style={{
            ...styles.statLogoRow,
            gridTemplateColumns: `repeat(${logos.length}, minmax(0, 1fr))`,
            marginTop: value ? 12 : 10,
          }}
        >
          {logos.map((logo) => (
            <Link
              key={logo.src}
              href={logo.href}
              aria-label={logo.alt}
              title={logo.alt}
              className="statLogoLink"
              style={styles.statLogoLink}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={56}
                height={56}
                unoptimized
                style={styles.statLogoImage}
              />
            </Link>
          ))}
        </div>
      ) : null}
      {icons?.length ? (
        <div style={styles.statIconRow}>
          {icons.map((icon, index) => (
            <ProjectTechIcon key={`${title}-${icon}-${index}`} tech={icon} compact />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CategoryBlock({
  title,
  subtitle,
  projects,
  emptyText,
}: {
  title: string;
  subtitle: string;
  projects: Project[];
  emptyText?: string;
}) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <h3 style={styles.categoryTitle}>{title}</h3>
        <p style={{ ...styles.p, marginTop: 6 }}>{subtitle}</p>
      </div>

      {projects.length > 0 ? (
        <div style={{ display: "grid", gap: 14 }}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={index === 0}
            />
          ))}
        </div>
      ) : (
        <div style={styles.placeholderCard}>
          <p style={styles.p}>{emptyText ?? "Noch keine Projekte vorhanden."}</p>
        </div>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const projectUsesLogoPanel = !project.heroImage && Boolean(project.logoImage);
  const projectVisualSrc = project.heroImage ?? project.logoImage;
  const projectVisualFit = project.heroImage ? "cover" : "contain";

  return (
    <Link
      href={`/projects/${project.slug}`}
      style={{ textDecoration: "none" }}
      className="projectLink"
    >
      <div className="projectRow" style={styles.projectRow}>
        <div style={styles.projectContentRow}>
          <div style={styles.projectMainColumn}>
            <div className="projectHeading" style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
              <h3 className="projectTitle" style={{ ...styles.h3, margin: 0, color: stylesVars.text }}>{project.title}</h3>
              {project.period ? <span className="projectPeriod" style={styles.period}>{project.period}</span> : null}
            </div>

            <p className="projectSummary" style={{ ...styles.p, marginTop: 10 }}>{project.short}</p>

            <div style={styles.projectMetaRow}>
              {project.techIcons?.length ? (
                <div style={styles.projectTechRow}>
                  {project.techIcons.map((tech) => (
                    <ProjectTechIcon key={tech} tech={tech} />
                  ))}
                </div>
              ) : null}

              <div className="projectTags" style={styles.projectTagsRow}>
                {project.tags.map((tag) => (
                  <span key={tag} style={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>

            <div className="projectFooter" style={{ marginTop: 12 }}>
              <span className="learnMore" style={styles.learnMore}>Learn more →</span>
            </div>
          </div>

          {projectVisualSrc ? (
            <div
              style={
                projectUsesLogoPanel
                  ? styles.projectImageColumnCompact
                  : styles.projectImageColumn
              }
            >
              <div
                style={
                  projectUsesLogoPanel
                    ? styles.projectImageWrapCompact
                    : styles.projectImageWrap
                }
              >
                <Image
                  src={projectVisualSrc}
                  alt={`${project.title} Vorschau`}
                  width={projectUsesLogoPanel ? 200 : 280}
                  height={projectUsesLogoPanel ? 112 : 160}
                  priority={priority}
                  loading={priority ? "eager" : undefined}
                  unoptimized={!project.heroImage}
                  style={{
                    ...styles.projectImage,
                    objectFit: projectVisualFit,
                    padding: project.heroImage ? 0 : 12,
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

function ProjectTechIcon({
  tech,
  compact = false,
}: {
  tech: string;
  compact?: boolean;
}) {
  const config = projectTechIconMap[tech];

  if (!config) {
    return null;
  }

  const Icon = config.icon;

  return (
    <div
      title={config.label}
      aria-label={config.label}
      style={compact ? styles.projectTechIconWrapCompact : styles.projectTechIconWrap}
    >
      <Icon size={compact ? 18 : 26} color={config.color} aria-hidden="true" />
    </div>
  );
}

function SkillLogoItem({
  skill,
}: {
  skill: { name: string; icon: IconType; color: string };
}) {
  const Icon = skill.icon;

  return (
    <div className="skillLogoItem" style={styles.skillLogoItem}>
      <div className="skillLogoIconWrap" style={styles.skillLogoIconWrap}>
        <Icon size={44} color={skill.color} aria-hidden="true" />
      </div>
      <span style={styles.skillLogoLabel}>{skill.name}</span>
    </div>
  );
}

/** ===== Styling (Navy Theme) ===== */

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

const projectTechIconMap: Record<
  string,
  { icon: IconType; color: string; label: string }
> = {
  csharp: {
    icon: TbBrandCSharp,
    color: "#9b4f96",
    label: "C#",
  },
  dotnet: {
    icon: SiDotnet,
    color: "#7c65d1",
    label: ".NET",
  },
  unity: {
    icon: SiUnity,
    color: "#d9e0ec",
    label: "Unity",
  },
  unreal: {
    icon: SiUnrealengine,
    color: "#f3f7ff",
    label: "Unreal Engine",
  },
  excel: {
    icon: FaFileExcel,
    color: "#2f8f56",
    label: "Excel",
  },
  database: {
    icon: FaDatabase,
    color: "#7bb7ff",
    label: "Datenbank",
  },
  windows: {
    icon: FaWindows,
    color: "#4aa2ff",
    label: "Windows / WinForms",
  },
  render: {
    icon: SiRender,
    color: "#9ea9ff",
    label: "Render",
  },
  github: {
    icon: SiGithub,
    color: "#edf4ff",
    label: "GitHub",
  },
  microsoft: {
    icon: FaMicrosoft,
    color: "#5aa6ff",
    label: "Microsoft",
  },
  "power-automate": {
    icon: FaMicrosoft,
    color: "#3d8bff",
    label: "Power Automate",
  },
  forms: {
    icon: FaWpforms,
    color: "#65b5ff",
    label: "Forms",
  },
  planner: {
    icon: FaListCheck,
    color: "#88c5ff",
    label: "Planner",
  },
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
    background: stylesVars.pageBg,
    color: stylesVars.text,
    minHeight: "100vh",
  },
  container: { maxWidth: 1160, padding: "0 24px", margin: "0 auto" },

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
    flexWrap: "wrap",
    gap: 20,
    alignItems: "start",
    border: `1px solid ${stylesVars.cardBorder}`,
    borderRadius: 22,
    background: stylesVars.cardBg,
    padding: 20,
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
  },
  heroMain: {
    flex: "1 1 540px",
    minWidth: 0,
  },
  heroRight: {
    flex: "0 1 184px",
    width: "min(100%, 184px)",
    marginLeft: "auto",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  photoWrap: {
    width: "100%",
    borderRadius: 14,
    overflow: "hidden",
    border: `1px solid ${stylesVars.cardBorder}`,
    background: "#0d141d",
  },
  photo: {
    display: "block",
    width: "100%",
    height: "auto",
    aspectRatio: "1 / 1",
    objectFit: "cover",
    objectPosition: "center 18%",
  },

  h1: { margin: 0, fontSize: 40, lineHeight: 1.02, letterSpacing: -0.8 },
  subline: { margin: "8px 0 0", color: stylesVars.textMuted, fontWeight: 600 },
  heroText: { marginTop: 12, color: stylesVars.textMuted, lineHeight: 1.65, maxWidth: 620 },

  statsRow: {
    flex: "1 0 100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: 14,
    alignItems: "start",
    marginTop: 4,
  },
  statCard: {
    border: `1px solid ${stylesVars.cardBorder}`,
    borderRadius: 16,
    padding: 16,
    background: "rgba(143, 168, 203, 0.06)",
  },
  statIconRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginTop: 12,
  },
  statLogoRow: {
    display: "grid",
    gap: 6,
    marginTop: 12,
  },
  statLogoLink: {
    width: "100%",
    height: "auto",
    aspectRatio: "1 / 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 14,
    border: `1px solid rgba(143, 168, 203, 0.2)`,
    background: "transparent",
    textDecoration: "none",
    transition: "transform 180ms ease, border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease",
  },
  statLogoImage: {
    width: "112%",
    height: "112%",
    objectFit: "cover",
    objectPosition: "center",
  },

  h2: { margin: 0, fontSize: 26, letterSpacing: -0.3 },
  projectsSectionTitle: {
    fontSize: 56,
    lineHeight: 0.96,
    letterSpacing: -1.8,
    fontWeight: 900,
    textAlign: "center",
  },
  categoryTitle: { margin: 0, fontSize: 20, fontWeight: 800, letterSpacing: -0.2 },
  h3: { margin: 0, fontSize: 16, fontWeight: 800 },
  p: { margin: 0, color: stylesVars.textMuted, lineHeight: 1.7, fontSize: 14 },

  card: {
    border: `1px solid ${stylesVars.cardBorder}`,
    borderRadius: 18,
    padding: 18,
    background: stylesVars.cardBg,
  },

  placeholderCard: {
    border: `1px dashed ${stylesVars.cardBorder}`,
    borderRadius: 18,
    padding: 18,
    background: "rgba(143, 168, 203, 0.04)",
  },
  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
    gap: 18,
    alignItems: "start",
  },
  skillLogoItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "12px 8px",
    borderRadius: 18,
    border: `1px solid rgba(122, 145, 177, 0.14)`,
    background: "rgba(16, 23, 32, 0.56)",
    textAlign: "center",
    transition: "transform 180ms ease, border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease",
  },
  skillLogoIconWrap: {
    width: 64,
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    background: "linear-gradient(180deg, rgba(143, 168, 203, 0.09), rgba(111, 135, 168, 0.02))",
    boxShadow: "inset 0 1px 0 rgba(237, 244, 255, 0.04)",
  },
  skillLogoLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: stylesVars.text,
    lineHeight: 1.25,
  },

  projectRow: {
    border: `1px solid ${stylesVars.cardBorder}`,
    borderRadius: 18,
    padding: 18,
    background: stylesVars.cardBg,
    boxShadow: "0 12px 30px rgba(0,0,0,0.22)",
    cursor: "pointer",
  },
  projectContentRow: {
    display: "flex",
    gap: 18,
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  projectMainColumn: {
    flex: "1 1 420px",
    minWidth: 280,
  },
  projectImageColumn: {
    width: 280,
    flex: "0 0 280px",
    display: "flex",
    alignItems: "flex-start",
  },
  projectImageColumnCompact: {
    width: 200,
    flex: "0 0 200px",
    display: "flex",
    alignItems: "flex-start",
  },
  projectImageWrap: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 16,
    border: `1px solid rgba(143, 168, 203, 0.18)`,
    background: "#0d141d",
  },
  projectImageWrapCompact: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 16,
    border: `1px solid rgba(143, 168, 203, 0.18)`,
    background: "#0d141d",
  },
  projectImage: {
    display: "block",
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
  projectTechRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
  },
  projectMetaRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: 14,
  },
  projectTagsRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    alignItems: "center",
  },
  projectTechIconWrap: {
    width: 42,
    height: 42,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    border: `1px solid rgba(143, 168, 203, 0.22)`,
    background: "rgba(143, 168, 203, 0.06)",
    boxShadow: "inset 0 1px 0 rgba(237, 244, 255, 0.04)",
  },
  projectTechIconWrapCompact: {
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    border: `1px solid rgba(143, 168, 203, 0.18)`,
    background: "rgba(143, 168, 203, 0.05)",
    boxShadow: "inset 0 1px 0 rgba(237, 244, 255, 0.03)",
  },

  period: {
    fontSize: 12,
    color: stylesVars.textMuted,
    padding: "4px 10px",
    borderRadius: 999,
    border: `1px solid ${stylesVars.cardBorder}`,
    background: "rgba(143, 168, 203, 0.06)",
  },

  tag: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(111, 135, 168, 0.14)",
    border: `1px solid rgba(143, 168, 203, 0.24)`,
    color: stylesVars.text,
  },

  learnMore: {
    color: "rgba(243, 237, 230, 0.80)",
    fontWeight: 800,
    fontSize: 14,
  },

  link: { color: stylesVars.accent, textDecoration: "none", fontWeight: 800 },

  ul: { margin: "10px 0 0", paddingLeft: 16, color: stylesVars.textMuted, lineHeight: 1.7, fontSize: 14 },

  footer: {
    borderTop: `1px solid ${stylesVars.cardBorder}`,
    padding: "26px 0",
    marginTop: 20,
    background: "rgba(7, 12, 18, 0.65)",
  },
};
