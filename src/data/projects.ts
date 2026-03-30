export type ProjectCategory = "games" | "software";

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectMedia = {
  src: string;
  alt: string;
  type?: "image" | "gif";
  width?: number;
  height?: number;
  fit?: "cover" | "contain";
};

export type ProjectDetailSection = {
  title: string;
  body: string[];
  media: ProjectMedia;
  mediaSide?: "left" | "right";
};

export type ProjectVideo = {
  title: string;
  description: string;
  embedUrl?: string;
};

export type Project = {
  slug: string;
  category: ProjectCategory;
  title: string;
  period?: string;
  short: string;
  description: string[];
  tags: string[];
  techIcons?: string[];
  heroImage?: string;
  logoImage?: string;
  links?: ProjectLink[];
  highlights?: string[];
  detailSections?: ProjectDetailSection[];
  detailVideo?: ProjectVideo;
};

function publicGameImage(fileName: string) {
  return `/${encodeURIComponent(fileName)}.jpg`;
}

function createProjectMedia(src: string, alt: string): ProjectMedia {
  const normalized = decodeURIComponent(src).toLowerCase();
  const isGif = normalized.endsWith(".gif");
  const isLogo = normalized.includes("logo");

  return {
    src,
    alt,
    type: isGif ? "gif" : "image",
    width: isLogo ? 1200 : 1600,
    height: 900,
    fit: isLogo ? "contain" : "cover",
  };
}

function getMediaPool(project: Project): ProjectMedia[] {
  const sources = [project.heroImage, project.logoImage].filter(
    (src): src is string => Boolean(src),
  );

  if (sources.length === 0) {
    return [
      createProjectMedia(
        "/window.svg",
        `${project.title} Platzhaltergrafik`,
      ),
    ];
  }

  return sources.map((src, index) =>
    createProjectMedia(src, `${project.title} Medienplatzhalter ${index + 1}`),
  );
}

function gamePlaceholderSections(project: Project): ProjectDetailSection[] {
  const mediaPool = getMediaPool(project);

  return [
    {
      title: "Core Gameplay",
      body: [
        `${project.title} stellt im Kern eine klare Gameplay-Fantasie in den Mittelpunkt und kann hier spaeter mit echten Informationen zu Loop, Rollen und Spielerfahrung befuellt werden.`,
        `Dieser Abschnitt ist bewusst als Platzhalter angelegt: Hier kannst du spaeter erklaeren, was Spieler konkret tun, wie sich eine Runde aufbaut und wodurch sich das Projekt von anderen Games abhebt.`,
      ],
      media: mediaPool[0],
      mediaSide: "right",
    },
    {
      title: "Visuals and Presentation",
      body: [
        `Hier kannst du spaeter auf Art Direction, Stimmung, Animationen, UI oder Sound eingehen. Gerade fuer GIFs eignet sich dieser Block gut, um Bewegung, Feedback oder Menues direkt zu zeigen.`,
        `Wenn du spaeter ein GIF hinzufuegst, musst du nur den Medienpfad und optional den Typ auf "gif" setzen, die Seite ist dafuer bereits vorbereitet.`,
      ],
      media: mediaPool[1] ?? mediaPool[0],
      mediaSide: "left",
    },
    {
      title: "Systems and Production",
      body: [
        `Dieser Bereich ist fuer technische oder produktionelle Schwerpunkte gedacht, zum Beispiel KI, Multiplayer, Save-Systeme, Tools, Performance oder Iterationsschritte waehrend der Entwicklung.`,
        `Du kannst hier spaeter auch deine Rolle, besondere Herausforderungen und Learnings beschreiben, damit die Seite nicht nur schoen aussieht, sondern auch deine Arbeitsweise zeigt.`,
      ],
      media: mediaPool[2] ?? mediaPool[0],
      mediaSide: "right",
    },
  ];
}

function softwarePlaceholderSections(project: Project): ProjectDetailSection[] {
  const mediaPool = getMediaPool(project);

  return [
    {
      title: "Ausgangslage und Ziel",
      body: [
        `Hier kannst du spaeter das konkrete Problem beschreiben, das ${project.title} loesen sollte, inklusive Ausgangssituation, Zielgruppe und Anforderungen aus dem echten Einsatz.`,
        `Das ist der richtige Platz fuer Kontext: Wer nutzt das Tool, welcher Prozess war vorher umstaendlich und warum war eine eigene Softwareloesung sinnvoll.`,
      ],
      media: mediaPool[0],
      mediaSide: "right",
    },
    {
      title: "Workflow und Interface",
      body: [
        `In diesem Abschnitt kannst du spaeter UI, Eingabefluss, Datenlogik oder Automatisierungen erklaeren. Falls du GIFs von Formularen, Dashboards oder Interaktionen zeigen willst, passt das hier gut rein.`,
        `Die Seite unterstuetzt bereits Bild- und GIF-Medien, damit du Bedienablaeufe spaeter anschaulich praesentieren kannst.`,
      ],
      media: mediaPool[1] ?? mediaPool[0],
      mediaSide: "left",
    },
    {
      title: "Ergebnis und Mehrwert",
      body: [
        `Hier kannst du spaeter messbare Verbesserungen, Qualitaetsgewinne oder praktische Auswirkungen beschreiben, zum Beispiel Zeitersparnis, weniger Fehler oder bessere Transparenz.`,
        `So wird aus der Projektseite nicht nur eine Galerie, sondern eine nachvollziehbare Case Study fuer deine Software-Arbeit.`,
      ],
      media: mediaPool[2] ?? mediaPool[0],
      mediaSide: "right",
    },
  ];
}

function toYouTubeEmbedUrl(url: string): string | undefined {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      const videoId = parsed.pathname.replace("/", "");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const watchId = parsed.searchParams.get("v");

      if (watchId) {
        return `https://www.youtube.com/embed/${watchId}`;
      }

      const pathSegments = parsed.pathname.split("/").filter(Boolean);
      const shortsIndex = pathSegments.indexOf("shorts");
      const embedIndex = pathSegments.indexOf("embed");

      if (shortsIndex >= 0 && pathSegments[shortsIndex + 1]) {
        return `https://www.youtube.com/embed/${pathSegments[shortsIndex + 1]}`;
      }

      if (embedIndex >= 0 && pathSegments[embedIndex + 1]) {
        return `https://www.youtube.com/embed/${pathSegments[embedIndex + 1]}`;
      }
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function buildDefaultVideo(project: Project): ProjectVideo {
  const youtubeLink = project.links?.find((link) =>
    link.href.includes("youtube.com") || link.href.includes("youtu.be"),
  );

  return {
    title: "YouTube Video",
    description:
      project.category === "games"
        ? "Hier kannst du spaeter Gameplay, Trailer oder Devlog-Videos einbetten. Falls noch kein Video existiert, bleibt dieser Bereich als Platzhalter fuer die finale Version bestehen."
        : "Hier kannst du spaeter eine kurze Produktdemo, einen Workflow-Mitschnitt oder ein Erklaervideo fuer das Tool einbetten.",
    embedUrl: youtubeLink ? toYouTubeEmbedUrl(youtubeLink.href) : undefined,
  };
}

function enrichProject(project: Project): Project {
  return {
    ...project,
    detailSections:
      project.detailSections ??
      (project.category === "games"
        ? gamePlaceholderSections(project)
        : softwarePlaceholderSections(project)),
    detailVideo: project.detailVideo ?? buildDefaultVideo(project),
  };
}

const baseProjects: Project[] = [
  {
    slug: "vacation-invasion",
    category: "games",
    title: "Vacation Invasion",
    period: "Uni-Projekt", 
    heroImage: publicGameImage("Vacation Invasion"),
    logoImage: "/Vacation%20Invasion%20Logo.png",
    short: "3D-Multiplayer-Hide-and-Seek / Prop Hunt auf einer südlichen Ferieninsel.",
    description: [
      "Vacation Invasion ist ein 3D-Multiplayer-Prop-Hunt auf einer südlichen Ferieninsel, bei dem sich Tourist:innen als Objekte tarnen und von den Einheimischen gejagt werden.",
      "Ich habe das Projekt als Solo- und Lead-Programmer technisch geleitet und mich dabei intensiv mit Multiplayer in Unreal beschäftigt: Client-Server-Logik, Sessions und Lobbies, Actor Replication, RepNotify, Ownership sowie Server- und NetMulticast-RPCs.",
    ],
    tags: ["Unreal", "C++", "Blueprints", "Multiplayer", "Lead Developer", ],
    techIcons: ["unreal", "cplusplus", "github", "vscode"],
    links: [{ label: "Trailer", href: "https://www.youtube.com/watch?v=ZfP31Po8edI" }],
    detailSections: [
      {
        title: "Multiplayer Lobby & Interaction",
        body: [
          "Ein großer Fokus lag auf dem Multiplayer-Fundament: Spieler:innen können gemeinsam einer Lobby beziehungsweise Session beitreten, korrekt gespawnt werden, sich gegenseitig sehen und direkt miteinander interagieren.",
          "Technisch habe ich mich dabei stark an Unreals server-authoritative Client-Server-Modell orientiert und mit Sessions, Lobbies, Actor Replication, Ownership sowie Server- und NetMulticast-RPCs gearbeitet, damit Join, Präsenz und Interaktionen für alle Clients konsistent bleiben.",
        ],
        media: createProjectMedia(
          "/Multiplayer.gif",
          "Vacation Invasion Multiplayer Szene",
        ),
        mediaSide: "right",
      },
      {
        title: "Abilites und Replication",
        body: [
          "Ein zentraler Teil des Projekts war es, die verschiedenen Abilities so umzusetzen, dass sie sich nicht nur lokal gut anfuehlen, sondern im Multiplayer auch technisch sauber fuer alle Spieler:innen funktionieren.",
          "Dafuer habe ich mit Actor Replication, RepNotify und RPCs gearbeitet, damit Aktivierungen, Zustandswechsel, Effekte, Animationen und Cooldowns auf allen Clients konsistent synchronisiert und nachvollziehbar bleiben.",
        ],
        media: createProjectMedia(
          "/HiderAbility.gif",
          "Vacation Invasion Abilities und Replication",
        ),
        mediaSide: "left",
      },
      {
        title: "Sauberer Code",
        body: [
          "Gerade in einem groesseren Unreal-Projekt ist sauberer und uebersichtlicher Code in C++ und Blueprints extrem wichtig, um Features schnell erweitern, Bugs gezielt finden und technische Abhaengigkeiten klar nachvollziehen zu koennen.",
          "Eine klare Struktur spart im Alltag enorm viel Zeit: Wenn Logik, Zustandswechsel und Verantwortlichkeiten sauber aufgebaut sind, kann man deutlich effektiver arbeiten, schneller iterieren und auch komplexere Systeme wesentlich sicherer weiterentwickeln.",
        ],
        media: {
          src: "/Blueprints.png",
          alt: "Vacation Invasion Blueprint Screenshot",
          type: "image",
          width: 1268,
          height: 1056,
          fit: "contain",
        },
        mediaSide: "right",
      },
      {
        title: "FMOD Integration",
        body: [
          "Neben Gameplay und Networking habe ich FMOD integriert, um Musik, Ambience und Soundeffekte sauber aus Spielcode und Blueprints heraus anzusteuern.",
          "Dadurch ließen sich Events, Parameter und Übergänge klar strukturieren und später gezielt an Spielsituationen wie Verfolgung, Spannung oder erfolgreiche Aktionen koppeln.",
        ],
        media: createProjectMedia(
          "/Fmod Logo.png",
          "Vacation Invasion FMOD Integration Platzhalter",
        ),
        mediaSide: "left",
      },
    ],
    detailVideo: {
      title: "Trailer",
      description: "",
      embedUrl: toYouTubeEmbedUrl("https://www.youtube.com/watch?v=ZfP31Po8edI"),
    },
  },
  {
    slug: "grow-gently",
    category: "games",
    title: "Grow Gently",
    heroImage: publicGameImage("Grow Gently"),
    logoImage: "/Grow%20Genrly%20Logo.png",
    short: "Cozy 3D-Gardening-Produktivitaetstool, das Fokuszeit mit emotionalem Fortschritt verbindet.",
    description: [
      "Grow Gently verbindet einen Fokustimer mit emotionaler Belohnung und richtet sich an Menschen, die Produktivitaet mit einer freundlicheren, weicheren Erfahrung verbinden moechten.",
      "Du pflanzt, ziehst Begleiter gross und kuemmerst dich um deinen Garten, waehrend du im echten Leben konzentriert arbeitest.",
      "Nach einer Fokus-Session kehrst du zurueck und siehst, wie dein Garten mit dir waechst. Dadurch wird Produktivitaet als ruhiger, motivierender Kreislauf inszeniert.",
      "Technisch lag mein Fokus auf Gameplay-Systemen in Unreal, darunter zustandsbasiertes Tierverhalten mit AI Controller, ein Anpflanz-Workflow sowie ein Shop- und Economy-System fuer den spielerischen Fortschritt.",
    ],
    tags: ["Unreal", "C++", "Blueprints", "Lead Developer", "Productivity", "AI"],
    techIcons: ["unreal", "github", "cplusplus", "blender"],
    links: [{ label: "Trailer", href: "https://www.youtube.com/watch?v=ZXsQZYzn8Zs" }],
    detailSections: [
      {
        title: "Animal AI & Reactive Follow Behavior",
        body: [
          "Ein technischer Schwerpunkt lag auf dem KI-Verhalten der Tiere. Jedes Tier besitzt einen eigenen AI Controller und navigiert ueber ein Navigation Mesh, auf dem in Intervallen neue Zielpositionen gesucht werden, um ein glaubwuerdiges Wander- und Idle-Verhalten im Garten zu erzeugen.",
          "Besonders interessant war die reaktive Verhaltenslogik rund um das Fuettern: Wird ein Tier von der Oma gefuettert, wechselt es in einen Follow State und folgt ihr als dynamischem Ziel, bis der Zustand erneut durch Fuetterung aktualisiert wird oder der Hunger-Loop wieder greift. Dadurch entsteht ein klar lesbarer Gameplay-Loop aus AI State Changes, Target Tracking und zustandsbasiertem NPC-Verhalten.",
        ],
        media: createProjectMedia(
          "/AnimalAI.gif",
          "Grow Gently Animal AI und Follow Behavior",
        ),
        mediaSide: "right",
      },
      {
        title: "Anpflanzsystem & Growth Loop",
        body: [
          "Das Anpflanzsystem bildet den Kern des spielerischen Fortschritts: Pflanzen werden gezielt im Garten platziert und in den bestehenden Gameplay-Loop eingebunden, sodass aus einer einfachen Interaktion ein nachvollziehbarer Aufbauprozess entsteht.",
          "Wichtig war dabei vor allem eine saubere Systemstruktur zwischen Platzierung, Zustand und Rueckmeldung, damit der Ablauf fuer Spieler:innen intuitiv bleibt und gleichzeitig technisch erweiterbar ist. So laesst sich der Gardening-Loop modular ausbauen, ohne dass das System unuebersichtlich wird.",
        ],
        media: createProjectMedia(
          "/Anpflanzen.gif",
          "Grow Gently Anpflanzsystem",
        ),
        mediaSide: "left",
      },
      {
        title: "Shop, Money & Purchase Flow",
        body: [
          "Ergaenzend dazu habe ich ein Shop- und Money-System aufgebaut, das den spielerischen Fortschritt an eine einfache Ingame-Oekonomie koppelt. Kauefe muessen dabei mit dem vorhandenen Budget abgeglichen werden, bevor neue Inhalte oder Optionen freigeschaltet werden.",
          "Gerade fuer Cozy- und Progression-Systeme ist dieser Economy-Loop wichtig, weil er Ziele, Belohnungen und Entscheidungen miteinander verbindet. Dadurch bekommt das Projekt neben dem entspannten Look auch eine klare Systemtiefe aus Ressourcenverwaltung, Kauflogik und dauerhaftem Fortschritt.",
        ],
        media: createProjectMedia(
          "/GGShop.png",
          "Grow Gently Shop und Money System",
        ),
        mediaSide: "right",
      },
    ],
  },
  {
    slug: "island-journey",
    category: "games",
    title: "Island Journey",
    heroImage: publicGameImage("Island Journey"),
    logoImage: "/Island%20Journey%20Logo.png",
    short: "Atmosphaerisches 3D-Puzzle-Abenteuer mit Rotation, Raetseln und vierseitiger Weltstruktur.",
    description: [
      "Island Journey ist ein Puzzle-Abenteuer in einer atmosphaerischen 3D-Welt, in der Rotation und Perspektive den Schluessel zum Fortschritt bilden.",
      "Du steuerst einen Charakter durch eine vierseitige Dimension, bei der immer nur eine Seite gleichzeitig sichtbar ist. Jede Drehung offenbart neue Hinweise, Herausforderungen und tierische Begleiter.",
      "Die Welt besteht aus rotierbaren Plattformen, die ueber farblich zugeordnete Hebel in die richtige Position gebracht werden muessen.",
      "Dabei wird dein Gedaechtnis gefordert, weil du Informationen von den anderen Seiten behalten musst, um die Raetsel erfolgreich zu loesen.",
      "Beruhigende Musik und eine starke Atmosphaere tragen die Erfahrung und machen das Spiel zu einem Puzzle-Projekt mit klarer Stimmung und Identitaet.",
    ],
    tags: ["Game", "3D", "Puzzle", "Atmospheric"],
    techIcons: ["unreal", "blender"],
    links: [{ label: "Trailer", href: "https://www.youtube.com/watch?v=w4ZLKdRwZGw" }],
  },
  {
    slug: "grimcute",
    category: "games",
    title: "GrimCute",
    heroImage: publicGameImage("GrimCute"),
    logoImage: "/GrimCuteLogo.png",
    short: "Stylized game project with trailer showcase.",
    description: [
      "GrimCute ist eines deiner Game-Projekte und wird aktuell ueber den Trailer vorgestellt.",
      "Diese Projektseite kann spaeter noch mit Details zu Gameplay, Rolle, Tech-Stack und Produktionskontext erweitert werden.",
    ],
    tags: ["Junior Dev", "Wave Spawning", "Learning C#"],
    techIcons: ["unity", "csharp"],
    links: [{ label: "Trailer", href: "https://www.youtube.com/watch?v=3db3ryLB7ys" }],
  },
  {
    slug: "tiefwurz",
    category: "games",
    title: "Tiefwurtz",
    heroImage: publicGameImage("Tiefwurtz"),
    logoImage: "/Tiefwurtz%20Logo.png",
    short: "Dunkles Action-Erlebnis rund um Licht, Kampf und Ressourcenmanagement.",
    description: [
      "In Tiefwurtz kaempfst du dich durch eine unterirdische Dunkelwelt, die nur von der Lumen Essenz erleuchtet wird.",
      "Diese Ressource erhaeltst du durch Gluehwuermchen und das Besiegen von Gegnern. Sie spendet nicht nur Licht, sondern repraesentiert zugleich deine Lebenspunkte.",
      "Das Management der Lumen Essenz steht dadurch im Mittelpunkt des Spiels und bestimmt, wie sicher und aggressiv du dich durch die Welt bewegen kannst.",
    ],
    tags: ["Game", "Action", "Resource Management", "Atmospheric"],
    techIcons: ["unity", "csharp"],
  },
  {
    slug: "honorar-rechner",
    category: "software",
    title: "Honorar Rechner",
    period: "Steuerkanzlei",
    logoImage: "/Honorar%20Rechner%20Logo.png",
    short: "Tool zur schnellen und genauen Honorarkalkulation fuer Unternehmen und private Mandanten.",
    description: [
      "Der Honorar Rechner wurde fuer eine Steuerkanzlei entwickelt, um mit wenigen Eingaben sehr schnell ein praezises Honorar zu berechnen.",
      "Das Tool deckt sowohl Unternehmen als auch private Mandanten ab und reduziert manuellen Aufwand bei der Angebotserstellung und Einschaetzung.",
      "Technisch basiert das Projekt auf C#, WDF, Excel-Anbindung und Datenbanklogik.",
    ],
    tags: ["Software", "C#", "WDF", "Excel", "Datenbanken"],
    techIcons: ["csharp", "dotnet", "excel", "database"],
    highlights: [
      "Schnelle Kalkulation mit wenig Eingabedaten",
      "Unterstuetzung fuer Unternehmen und Privatmandate",
      "Praktischer Einsatz im Kanzleialltag",
    ],
  },
  {
    slug: "neumandats-abgaenge-uebersicht",
    category: "software",
    title: "Neumandats- und Abgaenge-Uebersicht",
    period: "Steuerkanzlei",
    logoImage: "/Mandats%C3%9Cbersicht%20Logo.png",
    short: "Auswertungstool fuer Honorare von Neumandaten und Abgaengen in frei waehlbaren Zeitfenstern.",
    description: [
      "Dieses Tool wurde fuer eine Steuerkanzlei entwickelt, um Neumandate und Abgaenge uebersichtlich auszuwerten.",
      "Es ermoeglicht, Honorare fuer bestimmte Zeitfenster oder fuer ein komplettes Jahr gesammelt anzuzeigen.",
      "Dadurch lassen sich Entwicklungen, Veraenderungen und relevante Kennzahlen deutlich schneller nachvollziehen.",
      "Technisch basiert das Projekt auf WDF, C# und Datenbanken.",
    ],
    tags: ["Software", "C#", "WDF", "Datenbanken", "Reporting"],
    techIcons: ["csharp", "dotnet", "database"],
    highlights: [
      "Zeitfensterbasierte Auswertung",
      "Jahresuebersichten fuer Honorare",
      "Bessere Transparenz fuer Kanzlei-Workflows",
    ],
  },
  {
    slug: "lager-sortier-tool",
    category: "software",
    title: "Lager- und Sortier-Tool",
    period: "Metzgerei",
    logoImage: "/Sorty%20Logo.png",
    short: "System zur strukturierten Lagerung, Verfolgung und schnellen Ausgabe von Bestellungen.",
    description: [
      "Fuer ein Einzelhandelsgeschaeft beziehungsweise eine Metzgerei wurde ein Lager- und Sortier-Tool entwickelt, mit dem Bestellungen erfasst und organisiert gelagert werden koennen.",
      "Beim Abholen einer Bestellung zeigt das System genau an, wo sich die Ware befindet, damit sie schnell gefunden und ausgegeben werden kann.",
      "Zusaetzlich unterstuetzt eine namensbasierte Suchlogik die schnellere und treffsichere Zuordnung der Bestellungen.",
      "Technisch wurde das Projekt mit C#, WinForms, Excel und Datenbanken umgesetzt.",
    ],
    tags: ["Software", "C#", "WinForms", "Excel", "Datenbanken"],
    techIcons: ["csharp", "windows", "excel", "database"],
    highlights: [
      "Strukturierte Lager- und Bestellorganisation",
      "Schnelle Ausgabe an Kundschaft",
      "Namenssuche fuer bessere Auffindbarkeit",
    ],
  },
  {
    slug: "zeiterfassung-webapp",
    category: "software",
    title: "Zeiterfassung WebApp",
    period: "Metzgerei",
    logoImage: "/Timely%20Logo.png",
    short: "Webbasierte Zeiterfassung mit Login, Einstempeln und Excel-Export fuer Admins.",
    description: [
      "Diese WebApp wurde als Zeiterfassungsloesung entwickelt, damit Mitarbeitende sich anmelden und ihre Arbeitszeit unkompliziert einstempeln koennen.",
      "Administrierende koennen alle relevanten Daten zentral einsehen und strukturiert als Excel-Datei exportieren.",
      "Das Projekt wurde mit C#, Datenbanken, Render, GitHub-Deployment und einer eigenen URL umgesetzt.",
    ],
    tags: ["Software", "WebApp", "C#", "Datenbanken", "Render"],
    techIcons: ["csharp", "database", "render", "github"],
    highlights: [
      "Login und Einstempeln fuer Mitarbeitende",
      "Admin-Uebersicht mit Excel-Export",
      "Deployment ueber Render und GitHub",
    ],
  },
  {
    slug: "ticket-system-power-automate",
    category: "software",
    title: "Ticket-System mit Power Automate",
    period: "Steuerkanzlei",
    logoImage: "/Ticket%20System%20Logo.png",
    short: "Internes Ticket-System auf Basis von Microsoft Power Automate, Forms und Planner.",
    description: [
      "Fuer die Kanzlei wurde ein Ticket-System mit Microsoft Power Automate umgesetzt und mit Microsoft Forms sowie Microsoft Planner integriert.",
      "Dadurch lassen sich Anfragen strukturiert erfassen, automatisiert weiterleiten und in bestehende Microsoft-Workflows einbinden.",
      "Das Projekt zeigt den Einsatz von Low-Code-Automatisierung zur Verbesserung interner Prozesse.",
    ],
    tags: ["Software", "Power Automate", "Microsoft Forms", "Microsoft Planner"],
    techIcons: ["microsoft", "power-automate", "forms", "planner"],
    highlights: [
      "Automatisierte Ticket-Erstellung",
      "Integration in bestehende Microsoft-Tools",
      "Verbesserung interner Prozessablaeufe",
    ],
  },
];

export const PROJECTS: Project[] = baseProjects.map(enrichProject);

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export const GAME_PROJECTS = PROJECTS.filter((project) => project.category === "games");
export const SOFTWARE_PROJECTS = PROJECTS.filter(
  (project) => project.category === "software",
);
