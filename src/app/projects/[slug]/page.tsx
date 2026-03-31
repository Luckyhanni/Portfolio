import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { IconType } from "react-icons";
import { DiVisualstudio } from "react-icons/di";
import {
  FaDatabase,
  FaFileExcel,
  FaMicrosoft,
  FaWindows,
} from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io5";
import {
  SiBlender,
  SiCplusplus,
  SiDotnet,
  SiGit,
  SiRender,
  SiUnity,
  SiUnrealengine,
} from "react-icons/si";
import { TbBrandCSharp, TbBrandVscode } from "react-icons/tb";
import {
  getProject,
  PROJECTS,
  type Project,
  type ProjectDetailSection,
  type ProjectMedia,
} from "../../../data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const embedPlacement = project.detailVideo?.placement ?? "bottom";
  const hasLinks = Boolean(project.links?.length);
  const hasEmbed = Boolean(project.detailVideo?.embedUrl);
  const hasVideoDescription = Boolean(project.detailVideo?.description.trim());
  const hasTechContent = Boolean(project.techIcons?.length || project.links?.length);

  return (
    <main style={styles.page}>
      <Header />

      <section style={styles.section}>
        <div style={styles.container}>
          <Link href="/#projects" style={styles.backBtn}>← Zurück zu den Projekten</Link>

          {hasEmbed && project.detailVideo && embedPlacement === "top" ? (
            <ProjectEmbedSection project={project} />
          ) : null}

          <div style={styles.heroCard}>
            <ProjectVisual
              media={{
                src: project.heroImage ?? project.logoImage ?? "/window.svg",
                alt: `${project.title} Banner`,
                width: 1600,
                height: 900,
                fit: project.heroImage ? "cover" : "contain",
              }}
              priority
              style={styles.heroVisual}
              frameStyle={styles.heroVisualWrap}
            />

            <div style={styles.heroBody}>
              <div style={styles.eyebrowRow}>
                <span style={styles.categoryPill}>
                  {project.category === "games" ? "Spielprototyp" : "Softwareprojekt"}
                </span>
                {project.period ? <span style={styles.periodPill}>{project.period}</span> : null}
              </div>

              <h1 style={styles.h1}>{project.title}</h1>
              <p style={styles.lead}>{project.short}</p>

              <div style={styles.tagRow}>
                {project.tags.map((tag) => (
                  <span key={tag} style={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={styles.topGrid}>
            <article style={styles.card}>
              <div style={styles.sectionHeadingRow}>
                <span style={styles.sectionIndex}>01</span>
                <h2 style={styles.h2}>Überblick</h2>
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                {project.description.map((paragraph) => (
                  <p key={paragraph} style={styles.p}>{paragraph}</p>
                ))}
              </div>

              {project.highlights?.length ? (
                <div style={styles.highlightBlock}>
                  <h3 style={styles.h3}>Highlights</h3>
                  <ul style={styles.ul}>
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>

            {hasTechContent ? (
              <aside style={styles.sideCard}>
                <div style={styles.sectionHeadingRow}>
                  <span style={styles.sectionIndex}>02</span>
                  <h2 style={styles.h2}>Eingesetzte Technologien</h2>
                </div>

                {project.techIcons?.length ? (
                  <div style={hasLinks ? styles.skillGrid : styles.skillGridRelaxed}>
                    {project.techIcons.map((tech) => (
                      <TechBadge key={tech} tech={tech} />
                    ))}
                  </div>
                ) : null}

                {project.links?.length ? (
                  <div style={styles.linksBlock}>
                    <h3 style={styles.h3}>Links</h3>
                    <div style={styles.linkRow}>
                      {project.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          style={styles.primaryBtn}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </aside>
            ) : null}
          </div>

          <div style={styles.sectionStack}>
            {project.detailSections?.map((detailSection, index) => (
              <DetailSection
                key={`${project.slug}-${detailSection.title}`}
                section={detailSection}
                index={index}
              />
            ))}
          </div>

          {hasEmbed && project.detailVideo && embedPlacement !== "top" ? (
            <ProjectEmbedSection project={project} />
          ) : null}
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <span>© {new Date().getFullYear()} Johannes Blank</span>
          <div style={styles.footerLinks}>
            <Link href="/impressum" style={styles.footerLink}>Impressum</Link>
            <Link href="/datenschutz" style={styles.footerLink}>Datenschutz</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ProjectEmbedSection({ project }: { project: Project }) {
  return (
    <section style={styles.videoSection}>
      <div style={styles.sectionHeadingRow}>
        <span style={styles.sectionIndex}>
          {`${(project.detailSections?.length ?? 0) + 3}`.padStart(2, "0")}
        </span>
        <h2 style={styles.h2}>{project.detailVideo?.title}</h2>
      </div>

      <div style={styles.videoCard}>
        {project.detailVideo?.embedUrl ? (
          <div
            style={{
              ...styles.videoFrame,
              ...(project.detailVideo.embedAspectRatio
                ? { aspectRatio: project.detailVideo.embedAspectRatio }
                : null),
            }}
          >
            <iframe
              src={project.detailVideo.embedUrl}
              title={`${project.title} Embed`}
              style={styles.videoEmbed}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : null}

        {project.detailVideo?.description.trim() ? (
          <p style={styles.videoDescription}>{project.detailVideo.description}</p>
        ) : null}
      </div>
    </section>
  );
}

function Header() {
  return (
    <header style={styles.header}>
      <div style={{ ...styles.container, height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={styles.brand}>JOHANNES BLANK</Link>

        <nav style={{ display: "flex", gap: 18, fontSize: 14 }}>
          <Link href="/#projects" style={styles.navLink}>PORTFOLIO</Link>
          <Link href="/#about" style={styles.navLink}>ÜBER MICH</Link>
        </nav>
      </div>
    </header>
  );
}

function DetailSection({
  section,
  index,
}: {
  section: ProjectDetailSection;
  index: number;
}) {
  const mediaLeft = index % 2 === 1;
  const isPortraitMedia =
    typeof section.media.width === "number" &&
    typeof section.media.height === "number" &&
    section.media.height > section.media.width;

  return (
    <article style={styles.detailCard}>
      <div
        style={{
          ...styles.detailTextColumn,
          order: mediaLeft ? 2 : 1,
        }}
      >
        <div style={styles.sectionHeadingRow}>
          <span style={styles.sectionIndex}>{`${index + 3}`.padStart(2, "0")}</span>
          <h2 style={styles.h2}>{section.title}</h2>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {section.body.map((paragraph) => (
            <p key={paragraph} style={styles.p}>{paragraph}</p>
          ))}
        </div>
      </div>

      <ProjectVisual
        media={section.media}
        style={isPortraitMedia ? styles.detailVisualPortrait : styles.detailVisual}
        frameStyle={{
          ...styles.detailVisualWrap,
          ...(isPortraitMedia ? styles.detailVisualWrapPortrait : null),
          order: mediaLeft ? 1 : 2,
        }}
      />
    </article>
  );
}

function ProjectVisual({
  media,
  priority = false,
  style,
  frameStyle,
}: {
  media: ProjectMedia;
  priority?: boolean;
  style?: React.CSSProperties;
  frameStyle?: React.CSSProperties;
}) {
  const isGif = media.type === "gif" || media.src.toLowerCase().endsWith(".gif");

  return (
    <div style={frameStyle}>
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width ?? 1600}
        height={media.height ?? 900}
        priority={priority}
        unoptimized={isGif}
        style={{
          ...style,
          objectFit: media.fit ?? "cover",
        }}
      />
    </div>
  );
}

function TechBadge({ tech }: { tech: string }) {
  const config = techIconMap[tech];

  if (!config) {
    return (
      <div style={styles.techBadgeFallback}>
        <span style={styles.techBadgeFallbackText}>{tech}</span>
      </div>
    );
  }

  const Icon = config.icon;

  return (
    <div title={config.label} aria-label={config.label} style={styles.techBadge}>
      <div style={styles.techBadgeIconWrap}>
        <Icon size={28} color={config.color} aria-hidden="true" />
      </div>
      <span style={styles.techBadgeLabel}>{config.label}</span>
    </div>
  );
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
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

const techIconMap: Record<string, { icon: IconType; color: string; label: string }> = {
  csharp: { icon: TbBrandCSharp, color: "#9b4f96", label: "C#" },
  dotnet: { icon: SiDotnet, color: "#7c65d1", label: ".NET" },
  unity: { icon: SiUnity, color: "#d9e0ec", label: "Unity" },
  unreal: { icon: SiUnrealengine, color: "#f3f7ff", label: "Unreal Engine" },
  excel: { icon: FaFileExcel, color: "#2f8f56", label: "Excel" },
  database: { icon: FaDatabase, color: "#7bb7ff", label: "Datenbank" },
  windows: { icon: FaWindows, color: "#4aa2ff", label: "WinForms" },
  render: { icon: SiRender, color: "#9ea9ff", label: "Render" },
  github: { icon: IoLogoGithub, color: "#edf4ff", label: "GitHub" },
  git: { icon: SiGit, color: "#f05033", label: "Git" },
  microsoft: { icon: FaMicrosoft, color: "#5aa6ff", label: "Microsoft" },
  blender: { icon: SiBlender, color: "#ff8a00", label: "Blender" },
  vscode: { icon: TbBrandVscode, color: "#2f8fff", label: "Visual Studio Code" },
  visualstudio: { icon: DiVisualstudio, color: "#9b6dff", label: "Visual Studio" },
  cplusplus: { icon: SiCplusplus, color: "#4f90d9", label: "C++" },
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
    background: stylesVars.pageBg,
    color: stylesVars.text,
    minHeight: "100vh",
  },
  container: { maxWidth: 1160, padding: "0 24px", margin: "0 auto" },
  section: {
    padding: "34px 0 80px",
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

  backBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    color: stylesVars.text,
    fontWeight: 800,
    marginBottom: 18,
  },

  heroCard: {
    display: "grid",
    gap: 14,
    border: `1px solid ${stylesVars.cardBorder}`,
    borderRadius: 24,
    padding: 16,
    background: stylesVars.cardBg,
    boxShadow: "0 20px 44px rgba(0, 0, 0, 0.22)",
  },
  heroVisualWrap: {
    aspectRatio: "18 / 4",
    borderRadius: 20,
    overflow: "hidden",
    border: `1px solid rgba(143, 168, 203, 0.18)`,
    background: "#0d141d",
  },
  heroVisual: {
    width: "100%",
    height: "115%",
    minHeight: "100%",
    display: "block",
    objectPosition: "center center",
  },
  heroBody: {
    display: "grid",
    gap: 14,
    padding: "4px 2px 2px",
  },
  eyebrowRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
  },
  categoryPill: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    padding: "6px 10px",
    background: "rgba(143, 168, 203, 0.14)",
    border: `1px solid rgba(143, 168, 203, 0.24)`,
    fontSize: 12,
    fontWeight: 700,
    color: stylesVars.text,
  },
  periodPill: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    padding: "6px 10px",
    background: "rgba(143, 168, 203, 0.06)",
    border: `1px solid rgba(143, 168, 203, 0.18)`,
    fontSize: 12,
    fontWeight: 700,
    color: stylesVars.textMuted,
  },
  h1: {
    margin: 0,
    fontSize: 42,
    lineHeight: 1.02,
    letterSpacing: -1,
  },
  h2: {
    margin: 0,
    fontSize: 28,
    lineHeight: 1.05,
    letterSpacing: -0.5,
  },
  h3: {
    margin: 0,
    fontSize: 17,
    fontWeight: 800,
  },
  lead: {
    margin: 0,
    fontSize: 18,
    lineHeight: 1.65,
    color: stylesVars.textMuted,
    maxWidth: 820,
  },

  tagRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  tag: {
    fontSize: 12,
    padding: "7px 11px",
    borderRadius: 999,
    background: "rgba(111, 135, 168, 0.14)",
    border: `1px solid rgba(143, 168, 203, 0.24)`,
    color: stylesVars.text,
  },

  topGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 18,
    marginTop: 20,
  },
  card: {
    flex: "1 1 540px",
    border: `1px solid ${stylesVars.cardBorder}`,
    borderRadius: 22,
    padding: 22,
    background: stylesVars.cardBg,
    display: "grid",
    gap: 16,
  },
  sideCard: {
    flex: "1 1 360px",
    border: `1px solid ${stylesVars.cardBorder}`,
    borderRadius: 22,
    padding: 22,
    background: "linear-gradient(180deg, rgba(16, 23, 32, 0.98), rgba(13, 20, 29, 0.92))",
    display: "grid",
    gap: 18,
    alignContent: "start",
  },
  highlightBlock: {
    display: "grid",
    gap: 10,
    paddingTop: 4,
  },
  p: {
    margin: 0,
    color: stylesVars.textMuted,
    lineHeight: 1.75,
    fontSize: 15,
  },
  ul: {
    margin: 0,
    paddingLeft: 18,
    color: stylesVars.textMuted,
    lineHeight: 1.8,
    fontSize: 15,
  },
  sectionHeadingRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  sectionIndex: {
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 0.5,
    color: stylesVars.accentStrong,
  },

  skillGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(72px, 1fr))",
    gap: 8,
  },
  skillGridRelaxed: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(88px, 96px))",
    gap: 10,
    justifyContent: "start",
  },
  techBadge: {
    display: "grid",
    justifyItems: "center",
    gap: 8,
    textAlign: "center",
    padding: "12px 6px",
    borderRadius: 16,
    border: `1px solid rgba(143, 168, 203, 0.18)`,
    background: "rgba(143, 168, 203, 0.06)",
  },
  techBadgeIconWrap: {
    width: 48,
    height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    background: "rgba(13, 20, 29, 0.92)",
    border: `1px solid rgba(143, 168, 203, 0.16)`,
  },
  techBadgeLabel: {
    fontSize: 11,
    lineHeight: 1.25,
    fontWeight: 700,
    color: stylesVars.text,
    overflowWrap: "anywhere",
  },
  techBadgeFallback: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    padding: "10px 8px",
    borderRadius: 14,
    border: `1px solid rgba(143, 168, 203, 0.18)`,
    background: "rgba(143, 168, 203, 0.06)",
  },
  techBadgeFallbackText: {
    fontSize: 11,
    fontWeight: 700,
    color: stylesVars.text,
    overflowWrap: "anywhere",
  },

  linksBlock: {
    display: "grid",
    gap: 10,
  },
  linkRow: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
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

  sectionStack: {
    display: "grid",
    gap: 18,
    marginTop: 18,
  },
  detailCard: {
    display: "flex",
    gap: 18,
    flexWrap: "wrap",
    alignItems: "flex-start",
    border: `1px solid ${stylesVars.cardBorder}`,
    borderRadius: 22,
    padding: 18,
    background: stylesVars.cardBg,
  },
  detailTextColumn: {
    flex: "1 1 360px",
    minWidth: 280,
    display: "grid",
    gap: 14,
    alignContent: "start",
  },
  detailVisualWrap: {
    flex: "1 1 320px",
    minWidth: 280,
    borderRadius: 18,
    overflow: "hidden",
    border: `1px solid rgba(143, 168, 203, 0.18)`,
    background: "#0d141d",
    display: "flex",
  },
  detailVisualWrapPortrait: {
    flex: "0 0 240px",
    width: "min(100%, 240px)",
    minWidth: 200,
    maxWidth: 240,
    padding: 8,
    justifyContent: "center",
    marginInline: "auto",
  },
  detailVisual: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  detailVisualPortrait: {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "contain",
  },

  videoSection: {
    marginTop: 18,
    display: "grid",
    gap: 14,
  },
  videoCard: {
    border: `1px solid ${stylesVars.cardBorder}`,
    borderRadius: 22,
    padding: 18,
    background: stylesVars.cardBg,
    display: "grid",
    gap: 14,
  },
  videoFrame: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: 18,
    overflow: "hidden",
    border: `1px solid rgba(143, 168, 203, 0.18)`,
    background: "#081018",
  },
  videoEmbed: {
    border: 0,
    width: "100%",
    height: "100%",
  },
  videoDescription: {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.75,
    color: stylesVars.textMuted,
  },

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
