export type ProjectCategory = "games" | "software";

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
  links?: { label: string; href: string }[];
  highlights?: string[];
};

function publicGameImage(fileName: string) {
  return `/${encodeURIComponent(fileName)}.jpg`;
}

export const PROJECTS: Project[] = [
  {
    slug: "vacation-invasion",
    category: "games",
    title: "Vacation Invasion",
    period: "Uni-Projekt",
    heroImage: publicGameImage("Vacation Invasion"),
    short: "3D-Multiplayer-Hide-and-Seek / Prop Hunt auf einer südlichen Ferieninsel.",
    description: [
      "Vacation Invasion ist ein 3D-Multiplayer-Hide-and-Seek beziehungsweise Prop-Hunt auf einer idyllischen südlichen Ferieninsel.",
      "Massentourismus sorgt für Probleme bei den Einheimischen, die deshalb die Tourist:innen von der Insel vertreiben wollen.",
      "Spieler:innen schlüpfen entweder in die Rolle der Einheimischen und jagen die Versteckten, oder sie verstecken sich selbst als Objekte auf der Insel.",
      "Das Projekt verbindet asymmetrisches Multiplayer-Gameplay mit humorvoller Prämisse, klaren Rollen und einem starken Party-Game-Ansatz.",
    ],
    tags: ["Game", "Unreal", "C++", "Blueprints", "Multiplayer"],
    techIcons: ["unreal"],
    links: [{ label: "Trailer", href: "https://www.youtube.com/watch?v=ZfP31Po8edI" }],
  },
  {
    slug: "grow-gently",
    category: "games",
    title: "Grow Gently",
    heroImage: publicGameImage("Grow Gently"),
    short: "Cozy 3D-Gardening-Produktivitätstool, das Fokuszeit mit emotionalem Fortschritt verbindet.",
    description: [
      "Grow Gently verbindet einen Fokustimer mit emotionaler Belohnung und richtet sich an Menschen, die Produktivität mit einer freundlicheren, weicheren Erfahrung verbinden möchten.",
      "Du pflanzt, ziehst Begleiter groß und kümmerst dich um deinen Garten, während du im echten Leben konzentriert arbeitest.",
      "Nach einer Fokus-Session kehrst du zurück und siehst, wie dein Garten mit dir wächst. Dadurch wird Produktivität als ruhiger, motivierender Kreislauf inszeniert.",
      "Das Projekt verbindet Cozy-Game-Ästhetik mit realem Nutzen und übersetzt Selbstorganisation in eine 3D-Spielwelt.",
    ],
    tags: ["Game", "Cozy", "3D", "Productivity"],
    techIcons: ["unreal"],
    links: [{ label: "Trailer", href: "https://www.youtube.com/watch?v=ZXsQZYzn8Zs" }],
  },
  {
    slug: "island-journey",
    category: "games",
    title: "Island Journey",
    heroImage: publicGameImage("Island Journey"),
    short: "Atmosphärisches 3D-Puzzle-Abenteuer mit Rotation, Rätseln und vierseitiger Weltstruktur.",
    description: [
      "Island Journey ist ein Puzzle-Abenteuer in einer atmosphärischen 3D-Welt, in der Rotation und Perspektive den Schlüssel zum Fortschritt bilden.",
      "Du steuerst einen Charakter durch eine vierseitige Dimension, bei der immer nur eine Seite gleichzeitig sichtbar ist. Jede Drehung offenbart neue Hinweise, Herausforderungen und tierische Begleiter.",
      "Die Welt besteht aus rotierbaren Plattformen, die über farblich zugeordnete Hebel in die richtige Position gebracht werden müssen.",
      "Dabei wird dein Gedächtnis gefordert, weil du Informationen von den anderen Seiten behalten musst, um die Rätsel erfolgreich zu lösen.",
      "Beruhigende Musik und eine starke Atmosphäre tragen die Erfahrung und machen das Spiel zu einem Puzzle-Projekt mit klarer Stimmung und Identität.",
    ],
    tags: ["Game", "3D", "Puzzle", "Atmospheric"],
    techIcons: ["unreal"],
    links: [{ label: "Trailer", href: "https://www.youtube.com/watch?v=w4ZLKdRwZGw" }],
  },
  {
    slug: "grimcute",
    category: "games",
    title: "GrimCute",
    heroImage: publicGameImage("GrimCute"),
    short: "Stylized game project with trailer showcase.",
    description: [
      "GrimCute ist eines deiner Game-Projekte und wird aktuell über den Trailer vorgestellt.",
      "Diese Projektseite kann später noch mit Details zu Gameplay, Rolle, Tech-Stack und Produktionskontext erweitert werden.",
    ],
    tags: ["Junior Dev", "Wave Spawning", "Learning C#"],
    techIcons: ["unity"],
    links: [{ label: "Trailer", href: "https://www.youtube.com/watch?v=3db3ryLB7ys" }],
  },
  {
    slug: "tiefwurz",
    category: "games",
    title: "Tiefwurtz",
    heroImage: publicGameImage("Tiefwurtz"),
    short: "Dunkles Action-Erlebnis rund um Licht, Kampf und Ressourcenmanagement.",
    description: [
      "In Tiefwurtz kämpfst du dich durch eine unterirdische Dunkelwelt, die nur von der Lumen Essenz erleuchtet wird.",
      "Diese Ressource erhältst du durch Glühwürmchen und das Besiegen von Gegnern. Sie spendet nicht nur Licht, sondern repräsentiert zugleich deine Lebenspunkte.",
      "Das Management der Lumen Essenz steht dadurch im Mittelpunkt des Spiels und bestimmt, wie sicher und aggressiv du dich durch die Welt bewegen kannst.",
    ],
    tags: ["Game", "Action", "Resource Management", "Atmospheric"],
    techIcons: ["unity"],
  },
  {
    slug: "honorar-rechner",
    category: "software",
    title: "Honorar Rechner",
    period: "Steuerkanzlei",
    short: "Tool zur schnellen und genauen Honorarkalkulation für Unternehmen und private Mandanten.",
    description: [
      "Der Honorar Rechner wurde für eine Steuerkanzlei entwickelt, um mit wenigen Eingaben sehr schnell ein präzises Honorar zu berechnen.",
      "Das Tool deckt sowohl Unternehmen als auch private Mandanten ab und reduziert manuellen Aufwand bei der Angebotserstellung und Einschätzung.",
      "Technisch basiert das Projekt auf C#, WDF, Excel-Anbindung und Datenbanklogik.",
    ],
    tags: ["Software", "C#", "WDF", "Excel", "Datenbanken"],
    techIcons: ["csharp", "dotnet", "excel", "database"],
    highlights: [
      "Schnelle Kalkulation mit wenig Eingabedaten",
      "Unterstützung für Unternehmen und Privatmandate",
      "Praktischer Einsatz im Kanzleialltag",
    ],
  },
  {
    slug: "neumandats-abgaenge-uebersicht",
    category: "software",
    title: "Neumandats- und Abgänge-Übersicht",
    period: "Steuerkanzlei",
    short: "Auswertungstool für Honorare von Neumandaten und Abgängen in frei wählbaren Zeitfenstern.",
    description: [
      "Dieses Tool wurde für eine Steuerkanzlei entwickelt, um Neumandate und Abgänge übersichtlich auszuwerten.",
      "Es ermöglicht, Honorare für bestimmte Zeitfenster oder für ein komplettes Jahr gesammelt anzuzeigen.",
      "Dadurch lassen sich Entwicklungen, Veränderungen und relevante Kennzahlen deutlich schneller nachvollziehen.",
      "Technisch basiert das Projekt auf WDF, C# und Datenbanken.",
    ],
    tags: ["Software", "C#", "WDF", "Datenbanken", "Reporting"],
    techIcons: ["csharp", "dotnet", "database"],
    highlights: [
      "Zeitfensterbasierte Auswertung",
      "Jahresübersichten für Honorare",
      "Bessere Transparenz für Kanzlei-Workflows",
    ],
  },
  {
    slug: "lager-sortier-tool",
    category: "software",
    title: "Lager- und Sortier-Tool",
    period: "Metzgerei",
    short: "System zur strukturierten Lagerung, Verfolgung und schnellen Ausgabe von Bestellungen.",
    description: [
      "Für ein Einzelhandelsgeschäft beziehungsweise eine Metzgerei wurde ein Lager- und Sortier-Tool entwickelt, mit dem Bestellungen erfasst und organisiert gelagert werden können.",
      "Beim Abholen einer Bestellung zeigt das System genau an, wo sich die Ware befindet, damit sie schnell gefunden und ausgegeben werden kann.",
      "Zusätzlich unterstützt eine namensbasierte Suchlogik die schnellere und treffsichere Zuordnung der Bestellungen.",
      "Technisch wurde das Projekt mit C#, WinForms, Excel und Datenbanken umgesetzt.",
    ],
    tags: ["Software", "C#", "WinForms", "Excel", "Datenbanken"],
    techIcons: ["csharp", "windows", "excel", "database"],
    highlights: [
      "Strukturierte Lager- und Bestellorganisation",
      "Schnelle Ausgabe an Kundschaft",
      "Namenssuche für bessere Auffindbarkeit",
    ],
  },
  {
    slug: "zeiterfassung-webapp",
    category: "software",
    title: "Zeiterfassung WebApp",
    period: "Metzgerei",
    short: "Webbasierte Zeiterfassung mit Login, Einstempeln und Excel-Export für Admins.",
    description: [
      "Diese WebApp wurde als Zeiterfassungslösung entwickelt, damit Mitarbeitende sich anmelden und ihre Arbeitszeit unkompliziert einstempeln können.",
      "Administrierende können alle relevanten Daten zentral einsehen und strukturiert als Excel-Datei exportieren.",
      "Das Projekt wurde mit C#, Datenbanken, Render, GitHub-Deployment und einer eigenen URL umgesetzt.",
    ],
    tags: ["Software", "WebApp", "C#", "Datenbanken", "Render"],
    techIcons: ["csharp", "database", "render", "github"],
    highlights: [
      "Login und Einstempeln für Mitarbeitende",
      "Admin-Übersicht mit Excel-Export",
      "Deployment über Render und GitHub",
    ],
  },
  {
    slug: "ticket-system-power-automate",
    category: "software",
    title: "Ticket-System mit Power Automate",
    period: "Steuerkanzlei",
    short: "Internes Ticket-System auf Basis von Microsoft Power Automate, Forms und Planner.",
    description: [
      "Für die Kanzlei wurde ein Ticket-System mit Microsoft Power Automate umgesetzt und mit Microsoft Forms sowie Microsoft Planner integriert.",
      "Dadurch lassen sich Anfragen strukturiert erfassen, automatisiert weiterleiten und in bestehende Microsoft-Workflows einbinden.",
      "Das Projekt zeigt den Einsatz von Low-Code-Automatisierung zur Verbesserung interner Prozesse.",
    ],
    tags: ["Software", "Power Automate", "Microsoft Forms", "Microsoft Planner"],
    techIcons: ["microsoft", "power-automate", "forms", "planner"],
    highlights: [
      "Automatisierte Ticket-Erstellung",
      "Integration in bestehende Microsoft-Tools",
      "Verbesserung interner Prozessabläufe",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export const GAME_PROJECTS = PROJECTS.filter((project) => project.category === "games");
export const SOFTWARE_PROJECTS = PROJECTS.filter(
  (project) => project.category === "software",
);
