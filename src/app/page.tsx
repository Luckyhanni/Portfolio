import Link from "next/link";
import Image from "next/image";
import type { IconType } from "react-icons";
import { DiVisualstudio } from "react-icons/di";
import {
  FaDatabase,
  FaFileExcel,
  FaMicrosoft,
  FaWindows,
} from "react-icons/fa6";
import {
  SiBlender,
  SiCplusplus,
  SiDotnet,
  SiGit,
  SiGithub,
  SiJavascript,
  SiNodedotjs,
  SiOpenai,
  SiPython,
  SiReact,
  SiRender,
  SiSupabase,
  SiUnity,
  SiUnrealengine,
} from "react-icons/si";
import { TbApi, TbAutomation, TbBrain, TbBrandCSharp, TbBrandVscode } from "react-icons/tb";
import {
  BACHELOR_PROJECT,
  GAME_PROJECTS,
  HOBBY_PROJECTS,
  Project,
  SOFTWARE_PROJECTS,
  projectHasDemo,
} from "../data/projects";

type StatProjectTile = {
  project: Project;
  imageSrc?: string;
  href: string;
  actionLabel: string;
  hasDemo: boolean;
  isExternal: boolean;
};

export default function Home() {
  const skills = [
    { name: "C#", icon: TbBrandCSharp, color: "#9b4f96" },
    { name: ".NET", icon: SiDotnet, color: "#7c65d1" },
    { name: "C++", icon: SiCplusplus, color: "#4f90d9" },
    { name: "Python", icon: SiPython, color: "#f2c14e" },
    { name: "React", icon: SiReact, color: "#5bd3ff" },
    { name: "Git", icon: SiGit, color: "#f05033" },
    { name: "VS Code", icon: TbBrandVscode, color: "#2f8fff" },
    { name: "Visual Studio", icon: DiVisualstudio, color: "#9b6dff" },
    { name: "Unity", icon: SiUnity, color: "#d9e0ec" },
    { name: "Unreal", icon: SiUnrealengine, color: "#f3f7ff" },
    { name: "Blender", icon: SiBlender, color: "#ff8a00" },
    { name: "Power Automate", icon: FaMicrosoft, color: "#3d8bff" },
  ];
  const softwareStatProjects = SOFTWARE_PROJECTS.map(createStatProjectTile);
  const gameStatProjects = GAME_PROJECTS.map(createStatProjectTile);
  const hobbyStatProjects = HOBBY_PROJECTS.map(createStatProjectTile);

  return (
    <main style={styles.page}>
      <Header />

      {/* HERO */}
      <section id="top" style={{ padding: "28px 0 18px" }}>
        <div style={styles.heroContainer}>
          <div className="heroCard" style={styles.heroCard}>
            <div style={styles.heroMain}>
              <h1 style={styles.h1}>Johannes Blank</h1>
              <p style={styles.subline}>B.Sc. Game Design · Programmierung · KI</p>
              <p style={styles.heroText}>
                Ich entwickle Desktop-Apps (C#/.NET), Webanwendungen und Spielprototypen (Unity/Unreal).
                Aktuell: Bachelorarbeit zu KI-gestützten NPC-Dialogen.
              </p>
            </div>

            <div className="heroRight" style={styles.heroRight}>
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

            <div className="heroStatsRow" style={styles.statsRow}>
              <Stat
                title="Software"
                projects={softwareStatProjects}
              />
              <Stat
                title="Spielprototypen"
                projects={gameStatProjects}
              />
              <Stat
                title="Hobby-Projekte"
                projects={hobbyStatProjects}
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <Section id="projects" title="Projekte" titleStyle={styles.projectsSectionTitle}>
        <div className="projectFilterRoot" style={styles.projectFilterRoot}>
          <input
            className="projectFilterInput projectFilterAll"
            type="radio"
            name="project-demo-filter"
            id="projects-filter-all"
            defaultChecked
          />
          <input
            className="projectFilterInput projectFilterDemo"
            type="radio"
            name="project-demo-filter"
            id="projects-filter-demo"
          />

          <div style={styles.projectFilterBar} className="projectFilterBar" aria-label="Projektfilter">
            <label className="projectFilterLabel" style={styles.projectFilterLabel} htmlFor="projects-filter-all">
              Alle Projekte
            </label>
            <label className="projectFilterLabel" style={styles.projectFilterLabel} htmlFor="projects-filter-demo">
              Mit Demo
            </label>
          </div>

          <div className="projectGroups" style={{ ...styles.container, display: "grid", gap: 28 }}>
            <CategoryBlock
              title="Bachelorarbeit"
              subtitle=""
              projects={[BACHELOR_PROJECT]}
              projectHref={(project) => `/${project.slug}`}
            />
            <CategoryBlock
              title="Software"
              subtitle=""
              projects={SOFTWARE_PROJECTS}
            />
            <CategoryBlock
              title="Hobby-Projekte"
              subtitle=""
              projects={HOBBY_PROJECTS}
            />
            <CategoryBlock
              title="Spielprototypen"
              subtitle=""
              projects={GAME_PROJECTS}
            />
          </div>
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about" title="Über mich">
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.aboutContent}>
              <p style={styles.p}>
                Ich bin 24 Jahre alt, lebe aktuell in München und habe im Studium meine Begeisterung fürs Programmieren
                entdeckt. Mich reizt vor allem, aus Ideen funktionierende Software zu machen, egal ob Webanwendung,
                Desktop-Tool oder Spielprototyp.
                In letzter Zeit beschäftigt mich besonders das Thema KI, deshalb schreibe ich aktuell auch meine
                Bachelorarbeit zu KI-gestützten NPC-Dialogen.
              </p>

              <div className="aboutMetaRow" style={styles.aboutMetaRow}>
                <p className="aboutEmail" style={styles.p}>
                  E-Mail:{" "}
                  <a style={styles.link} href="mailto:johannes_blank2001@gmx.de">
                    johannes_blank2001@gmx.de
                  </a>
                </p>

                <a
                  className="downloadBtn"
                  href="/JohannesBlank_Lebenslauf.pdf"
                  download
                  style={styles.downloadBtn}
                >
                  Lebenslauf herunterladen
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skill Set">
        <div style={styles.container}>
          <div style={styles.skillsGrid}>
            {skills.map((skill) => (
              <SkillLogoItem key={skill.name} skill={skill} />
            ))}
          </div>
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
        .projectFilterInput {
          position: absolute;
          inline-size: 1px;
          block-size: 1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          white-space: nowrap;
        }

        .projectFilterDemo:checked ~ .projectGroups .projectCardWrapper[data-has-demo="false"] {
          display: none;
        }

        .projectFilterRoot:has(.projectFilterDemo:checked) .categoryBlock[data-has-demo-section="false"] {
          display: none !important;
        }

        .projectFilterAll:checked ~ .projectFilterBar label[for="projects-filter-all"],
        .projectFilterDemo:checked ~ .projectFilterBar label[for="projects-filter-demo"] {
          background: #8fa8cb !important;
          border-color: rgba(237, 244, 255, 0.3) !important;
          color: #0f1722 !important;
          box-shadow: 0 10px 24px rgba(20, 30, 44, 0.24);
        }

        .projectActionLink:hover,
        .projectFilterLabel:hover {
          transform: translateY(-1px);
        }

        .statLogoRow {
          scrollbar-width: none;
        }

        .statLogoRow::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 900px) {
          .heroStatsRow {
            justify-content: center !important;
          }
        }

        @media (max-width: 760px) {
          .heroCard {
            grid-template-columns: 1fr !important;
            grid-template-areas:
              "main"
              "photo"
              "stats" !important;
            width: 100% !important;
            max-width: calc(100vw - 24px) !important;
          }

          .heroRight {
            justify-self: center !important;
          }
        }

        @media (max-width: 640px) {
          .heroStatsRow {
            justify-content: center !important;
          }

          .statLogoRow {
            grid-template-columns: repeat(var(--stat-mobile-columns), 90px) !important;
            overflow-x: visible !important;
            overflow-y: hidden !important;
            padding-bottom: 2px !important;
          }

          .heroRight {
            margin-left: auto !important;
            margin-right: auto !important;
            justify-content: center !important;
          }

          .aboutMetaRow {
            grid-template-columns: 1fr !important;
            row-gap: 12px;
          }

          .aboutEmail {
            overflow-wrap: anywhere;
          }

          .downloadBtn {
            width: 100%;
          }

          .projectContentRow {
            justify-content: flex-start !important;
          }

          .projectImageColumn,
          .projectImageColumnCompact {
            margin-left: auto;
            margin-right: auto;
          }

          .projectActionLink {
            flex: 1 1 150px;
          }
        }

        @media (max-width: 460px) {
          .statLogoRow {
            grid-template-columns: repeat(var(--stat-narrow-columns), 90px) !important;
          }
        }
      `}</style>

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
          <a href="#about" className="navLink" style={styles.navLink}>ÜBER MICH</a>
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
  projects,
}: {
  title: string;
  value?: string;
  icons?: string[];
  projects?: StatProjectTile[];
}) {
  const projectColumns = projects?.length ? Math.min(projects.length, 4) : 1;
  const projectGridStyle = {
    ...styles.statLogoRow,
    "--stat-columns": projectColumns,
    "--stat-mobile-columns": Math.min(projectColumns, 3),
    "--stat-narrow-columns": Math.min(projectColumns, 2),
  } as React.CSSProperties;

  return (
    <div className="statCard" style={styles.statCard}>
      <div style={{ fontSize: 12, color: stylesVars.textMuted }}>{title}</div>
      {value ? (
        <div style={{ marginTop: 8, fontSize: 18, fontWeight: 700, color: stylesVars.text }}>{value}</div>
      ) : null}
      {projects?.length ? (
        <div
          className="statLogoRow"
          style={{
            ...projectGridStyle,
            marginTop: value ? 12 : 10,
          }}
        >
          {projects.map((projectTile) => (
            <ProjectIconTile
              key={projectTile.project.slug}
              projectTile={projectTile}
            />
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

function createStatProjectTile(project: Project): StatProjectTile {
  const demoUrl = project.demoUrl?.trim();
  const href = demoUrl || `/projects/${project.slug}`;

  return {
    project,
    imageSrc: project.logoImage ?? project.heroImage,
    href,
    actionLabel: demoUrl ? "Zur Demo" : "Projekt ansehen",
    hasDemo: Boolean(demoUrl),
    isExternal: isExternalHref(href),
  };
}

function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function shouldUseUnoptimizedImage(src?: string): boolean {
  const normalizedSrc = src?.toLowerCase() ?? "";
  return normalizedSrc.endsWith(".svg") || normalizedSrc.endsWith(".gif");
}

function ProjectIconTile({
  projectTile,
}: {
  projectTile: StatProjectTile;
}) {
  const content = (
    <>
      <span style={styles.statLogoVisual}>
        {projectTile.imageSrc ? (
          <Image
            src={projectTile.imageSrc}
            alt={`${projectTile.project.title} Logo`}
            width={88}
            height={88}
            unoptimized={shouldUseUnoptimizedImage(projectTile.imageSrc) || !projectTile.project.heroImage}
            style={styles.statLogoImage}
          />
        ) : (
          <span style={styles.statLogoFallbackText}>{projectTile.project.title}</span>
        )}
      </span>
      <span
        className="statLogoButton"
        style={projectTile.hasDemo ? styles.statLogoDemoButton : styles.statLogoDetailButton}
      >
        {projectTile.actionLabel}
      </span>
    </>
  );
  const sharedProps = {
    "aria-label": `${projectTile.project.title}: ${projectTile.actionLabel}`,
    title: `${projectTile.project.title}: ${projectTile.actionLabel}`,
    className: "statLogoLink",
    "data-has-demo": projectTile.hasDemo ? "true" : "false",
    style: {
      ...styles.statLogoLink,
      ...(projectTile.hasDemo ? styles.statLogoLinkDemo : null),
    },
  };

  if (projectTile.hasDemo) {
    return (
      <Link
        {...sharedProps}
        href={projectTile.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </Link>
    );
  }

  if (projectTile.isExternal) {
    return (
      <a
        {...sharedProps}
        href={projectTile.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link {...sharedProps} href={projectTile.href}>
      {content}
    </Link>
  );
}

function CategoryBlock({
  title,
  subtitle,
  projects,
  emptyText,
  projectHref,
}: {
  title: string;
  subtitle: string;
  projects: Project[];
  emptyText?: string;
  projectHref?: (project: Project) => string;
}) {
  const hasDemoProject = projects.some(projectHasDemo);

  return (
    <div
      className="categoryBlock"
      data-has-demo-section={hasDemoProject ? "true" : "false"}
      style={{ display: "grid", gap: 12 }}
    >
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
              href={projectHref?.(project)}
            />
          ))}
        </div>
      ) : emptyText ? (
        <div style={styles.placeholderCard}>
          <p style={styles.p}>{emptyText}</p>
        </div>
      ) : null}
    </div>
  );
}

function ProjectCard({
  project,
  priority = false,
  href,
}: {
  project: Project;
  priority?: boolean;
  href?: string;
}) {
  const projectUsesLogoPanel = !project.heroImage && Boolean(project.logoImage);
  const projectVisualSrc = project.heroImage ?? project.logoImage;
  const projectVisualFit = project.heroImageFit ?? (project.heroImage ? "cover" : "contain");
  const detailHref = href ?? `/projects/${project.slug}`;
  const hasDemo = projectHasDemo(project);
  const demoHref = project.demoUrl ?? (hasDemo ? detailHref : undefined);

  return (
    <div
      className="projectCardWrapper"
      data-has-demo={hasDemo ? "true" : "false"}
      style={{ minWidth: 0 }}
    >
      <div className="projectRow" style={styles.projectRow}>
        <div className="projectContentRow" style={styles.projectContentRow}>
          <div style={styles.projectMainColumn}>
            <div className="projectHeading" style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
              <h3 className="projectTitle" style={{ ...styles.h3, margin: 0, color: stylesVars.text }}>{project.title}</h3>
              {project.period ? <span className="projectPeriod" style={styles.period}>{project.period}</span> : null}
              {project.status && project.status !== "Demo verfügbar" ? (
                <span style={styles.statusPill}>{project.status}</span>
              ) : null}
              {hasDemo ? <span style={styles.demoBadge}>Demo verfügbar</span> : null}
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

            <div className="projectFooter" style={styles.projectActionRow}>
              {demoHref ? (
                <ProjectActionLink href={demoHref} style={styles.demoButton} openInNewTab>
                  Demo ansehen
                </ProjectActionLink>
              ) : null}
              {project.githubUrl ? (
                <ProjectActionLink href={project.githubUrl} style={styles.secondaryButton}>
                  GitHub
                </ProjectActionLink>
              ) : null}
              <ProjectActionLink href={detailHref} style={styles.detailButton}>
                Mehr erfahren
              </ProjectActionLink>
            </div>
          </div>

          {projectVisualSrc ? (
            <div
              className={
                projectUsesLogoPanel
                  ? "projectImageColumnCompact"
                  : "projectImageColumn"
              }
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
                  unoptimized={!project.heroImage || shouldUseUnoptimizedImage(projectVisualSrc)}
                  style={{
                    ...styles.projectImage,
                    objectFit: projectVisualFit,
                    padding: projectVisualFit === "contain" ? 10 : 0,
                  }}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ProjectActionLink({
  href,
  children,
  style,
  openInNewTab = false,
}: {
  href: string;
  children: React.ReactNode;
  style: React.CSSProperties;
  openInNewTab?: boolean;
}) {
  const actionStyle = { ...styles.projectActionLink, ...style };
  const newTabProps = openInNewTab
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  if (href.startsWith("/")) {
    return (
      <Link className="projectActionLink" href={href} style={actionStyle} {...newTabProps}>
        {children}
      </Link>
    );
  }

  return (
    <a
      className="projectActionLink"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={actionStyle}
    >
      {children}
    </a>
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
  javascript: {
    icon: SiJavascript,
    color: "#f7df1e",
    label: "JavaScript",
  },
  nodejs: {
    icon: SiNodedotjs,
    color: "#68a063",
    label: "Node.js",
  },
  microsoft: {
    icon: FaMicrosoft,
    color: "#5aa6ff",
    label: "Microsoft",
  },
  vscode: {
    icon: TbBrandVscode,
    color: "#2f8fff",
    label: "Visual Studio Code",
  },
  visualstudio: {
    icon: DiVisualstudio,
    color: "#9b6dff",
    label: "Visual Studio",
  },
  openai: {
    icon: SiOpenai,
    color: "#edf4ff",
    label: "OpenAI API",
  },
  "react-typescript": {
    icon: SiReact,
    color: "#5bd3ff",
    label: "React & TypeScript",
  },
  "node-express": {
    icon: SiNodedotjs,
    color: "#68a063",
    label: "Node.js Backend Development",
  },
  "rest-api": {
    icon: TbApi,
    color: "#7bb7ff",
    label: "REST API Architecture",
  },
  "supabase-postgresql": {
    icon: SiSupabase,
    color: "#3ecf8e",
    label: "Supabase / PostgreSQL Integration",
  },
  "algorithmic-meal-planning": {
    icon: TbBrain,
    color: "#f2c14e",
    label: "Algorithmic Recommendation Logic",
  },
  "data-automation": {
    icon: TbAutomation,
    color: "#9ea9ff",
    label: "Automated Data Processing",
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
  heroContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    boxSizing: "border-box",
    padding: "0 16px",
    marginInline: "auto",
  },

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
    display: "inline-grid",
    gridTemplateColumns: "minmax(320px, 620px) auto",
    gridTemplateAreas: `"main photo" "stats stats"`,
    width: "max-content",
    maxWidth: "calc(100vw - 32px)",
    boxSizing: "border-box",
    gap: "20px 28px",
    alignItems: "start",
    border: `1px solid ${stylesVars.cardBorder}`,
    borderRadius: 22,
    background: stylesVars.cardBg,
    padding: 20,
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
  },
  heroMain: {
    gridArea: "main",
    minWidth: 0,
    maxWidth: 620,
  },
  heroRight: {
    gridArea: "photo",
    width: 184,
    justifySelf: "end",
    marginLeft: 0,
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
    gridArea: "stats",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 14,
    width: "fit-content",
    maxWidth: "100%",
    justifySelf: "center",
    alignItems: "start",
    marginTop: 4,
  },
  statCard: {
    width: "fit-content",
    maxWidth: "100%",
    flex: "0 1 auto",
    boxSizing: "border-box",
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
    gridTemplateColumns: "repeat(var(--stat-columns), 90px)",
    justifyContent: "start",
    gap: 8,
    marginTop: 12,
    overflowX: "visible",
    overflowY: "visible",
    paddingBottom: 0,
  },
  statLogoLink: {
    flex: "0 0 90px",
    width: 90,
    height: 128,
    display: "grid",
    gridTemplateRows: "minmax(0, 1fr) 32px",
    alignItems: "stretch",
    gap: 5,
    overflow: "hidden",
    borderRadius: 14,
    border: `1px solid rgba(143, 168, 203, 0.2)`,
    background: "rgba(13, 20, 29, 0.86)",
    textDecoration: "none",
    padding: 6,
    boxSizing: "border-box",
    transition: "transform 180ms ease, border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease",
  },
  statLogoLinkDemo: {
    border: `1px solid rgba(86, 155, 255, 0.66)`,
    boxShadow: "0 0 0 1px rgba(86, 155, 255, 0.12), 0 0 20px rgba(42, 126, 255, 0.12)",
  },
  statLogoVisual: {
    width: "100%",
    height: "auto",
    aspectRatio: "1 / 1",
    minWidth: 0,
    minHeight: 0,
    flex: "0 0 auto",
    alignSelf: "start",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 10,
    background: "linear-gradient(180deg, rgba(143, 168, 203, 0.08), rgba(7, 12, 18, 0.36))",
  },
  statLogoImage: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    padding: 8,
    objectFit: "contain",
    objectPosition: "center",
  },
  statLogoFallbackText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: "6px 5px",
    boxSizing: "border-box",
    color: stylesVars.text,
    fontSize: 10,
    lineHeight: 1.12,
    fontWeight: 900,
    textAlign: "center",
    overflowWrap: "anywhere",
    overflow: "hidden",
  },
  statLogoDemoButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 32,
    minHeight: 0,
    padding: "3px 5px",
    boxSizing: "border-box",
    borderRadius: 10,
    border: "1px solid rgba(237, 244, 255, 0.28)",
    background: stylesVars.accentStrong,
    color: "#0f1722",
    fontSize: 10,
    fontWeight: 900,
    lineHeight: 1.05,
    textAlign: "center",
    whiteSpace: "normal",
  },
  statLogoDetailButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 32,
    minHeight: 0,
    padding: "3px 5px",
    boxSizing: "border-box",
    borderRadius: 10,
    border: `1px solid rgba(143, 168, 203, 0.24)`,
    background: "rgba(143, 168, 203, 0.1)",
    color: stylesVars.text,
    fontSize: 10,
    fontWeight: 900,
    lineHeight: 1.05,
    textAlign: "center",
    whiteSpace: "normal",
  },

  h2: { margin: 0, fontSize: 26, letterSpacing: -0.3 },
  projectsSectionTitle: {
    fontSize: 56,
    lineHeight: 0.96,
    letterSpacing: -1.8,
    fontWeight: 900,
    textAlign: "center",
  },
  projectFilterRoot: {
    position: "relative",
    display: "grid",
    gap: 18,
  },
  projectFilterBar: {
    maxWidth: 1160,
    padding: "0 24px",
    margin: "0 auto",
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  projectFilterLabel: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 38,
    padding: "9px 14px",
    borderRadius: 999,
    border: `1px solid rgba(143, 168, 203, 0.24)`,
    background: "rgba(143, 168, 203, 0.06)",
    color: stylesVars.text,
    fontSize: 13,
    fontWeight: 800,
    cursor: "pointer",
    transition: "transform 180ms ease, border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease",
    userSelect: "none",
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
  aboutContent: {
    display: "grid",
    gap: 16,
  },
  aboutMetaRow: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) auto",
    columnGap: 16,
    alignItems: "center",
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
    aspectRatio: "16 / 9",
    overflow: "hidden",
    borderRadius: 16,
    border: `1px solid rgba(143, 168, 203, 0.18)`,
    background: "#0d141d",
  },
  projectImageWrapCompact: {
    width: "100%",
    aspectRatio: "16 / 9",
    overflow: "hidden",
    borderRadius: 16,
    border: `1px solid rgba(143, 168, 203, 0.18)`,
    background: "#0d141d",
  },
  projectImage: {
    display: "block",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
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
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: 0.2,
    color: stylesVars.text,
    padding: "6px 12px",
    borderRadius: 999,
    border: `1px solid rgba(143, 168, 203, 0.32)`,
    background: "linear-gradient(180deg, rgba(143, 168, 203, 0.2), rgba(111, 135, 168, 0.12))",
    boxShadow: "0 8px 18px rgba(8, 14, 22, 0.22)",
  },
  statusPill: {
    fontSize: 12,
    fontWeight: 800,
    color: stylesVars.textMuted,
    padding: "6px 10px",
    borderRadius: 999,
    border: `1px solid rgba(143, 168, 203, 0.2)`,
    background: "rgba(143, 168, 203, 0.06)",
  },
  demoBadge: {
    fontSize: 12,
    fontWeight: 900,
    color: "#0f1722",
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(237, 244, 255, 0.32)",
    background: stylesVars.accentStrong,
    boxShadow: "0 8px 18px rgba(8, 14, 22, 0.22)",
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
  projectActionRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
    marginTop: 14,
  },
  projectActionLink: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
    padding: "10px 14px",
    borderRadius: 12,
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 900,
    lineHeight: 1.1,
    textAlign: "center",
    transition: "transform 180ms ease, border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease",
    maxWidth: "100%",
  },
  demoButton: {
    background: stylesVars.accentStrong,
    color: "#0f1722",
    border: "1px solid rgba(237, 244, 255, 0.3)",
    boxShadow: "0 10px 24px rgba(20, 30, 44, 0.24)",
  },
  detailButton: {
    background: "rgba(143, 168, 203, 0.08)",
    color: stylesVars.text,
    border: `1px solid rgba(143, 168, 203, 0.24)`,
  },
  secondaryButton: {
    background: "rgba(143, 168, 203, 0.06)",
    color: stylesVars.text,
    border: `1px solid rgba(143, 168, 203, 0.22)`,
  },

  link: {
    color: stylesVars.accent,
    textDecoration: "none",
    fontWeight: 800,
    overflowWrap: "anywhere",
  },
  downloadBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 16px",
    borderRadius: 12,
    textDecoration: "none",
    background: stylesVars.accentStrong,
    color: "#0f1722",
    fontSize: 14,
    fontWeight: 800,
    boxShadow: "0 10px 24px rgba(20, 30, 44, 0.24)",
  },

  ul: { margin: "10px 0 0", paddingLeft: 16, color: stylesVars.textMuted, lineHeight: 1.7, fontSize: 14 },

  footer: {
    borderTop: `1px solid ${stylesVars.cardBorder}`,
    padding: "26px 0",
    marginTop: 20,
    background: "rgba(7, 12, 18, 0.65)",
  },
  footerContent: {
    maxWidth: 1160,
    padding: "0 24px",
    margin: "0 auto",
    color: stylesVars.textMuted,
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
    color: stylesVars.textMuted,
    textDecoration: "none",
    fontWeight: 700,
  },
};
