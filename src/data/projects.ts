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
  embedAspectRatio?: string;
  placement?: "top" | "bottom";
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
        `Dieser Abschnitt ist bewusst als Platzhalter angelegt: Hier kannst du spaeter erklaeren, was Spieler konkret tun, wie sich eine Runde aufbaut und wodurch sich das Projekt von anderen Game Prototypes abhebt.`,
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
        `${project.title} löst ein konkretes Problem im Arbeitsalltag und übersetzt einen manuellen Ablauf in einen klaren digitalen Prozess.`,
        `Hier geht es vor allem um Zielgruppe, Ausgangslage und den praktischen Nutzen im Einsatz.`,
      ],
      media: mediaPool[0],
      mediaSide: "right",
    },
    {
      title: "Workflow und Interface",
      body: [
        `Dieser Abschnitt zeigt den Eingabefluss, wichtige Ansichten und die eigentliche Bedienlogik des Tools.`,
        `So wird schnell verständlich, wie Nutzende mit der Anwendung arbeiten.`,
      ],
      media: mediaPool[1] ?? mediaPool[0],
      mediaSide: "left",
    },
    {
      title: "Ergebnis und Mehrwert",
      body: [
        `Hier stehen die wichtigsten Effekte: Zeitersparnis, weniger Fehler und bessere Übersicht.`,
        `So wird aus dem Projekt eine kurze, greifbare Case Study.`,
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

function buildDefaultVideo(project: Project): ProjectVideo | undefined {
  if (project.category !== "games") {
    return undefined;
  }

  const youtubeLink = project.links?.find((link) =>
    link.href.includes("youtube.com") || link.href.includes("youtu.be"),
  );

  return {
    title: "YouTube Video",
    description:
      "Hier kannst du später Gameplay, Trailer oder eine kurze Demo einbetten.",
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
    period: "Uni-Projekt",
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
          publicGameImage("Grow Gently"),
          "Grow Gently Shop und Money System",
        ),
        mediaSide: "right",
      },
    ],
  },
  {
    slug: "cd-go-home",
    category: "games",
    title: "CD Go Home",
    period: "Uni-Projekt",
    heroImage: "/CD-Banner.png",
    logoImage: "/CD_Logo.png",
    short: "Game-Physics-Prototyp im Stil von Cut the Rope mit spielbarer Unity-WebGL-Version im Browser.",
    description: [
      "CD Go Home ist das Ergebnis einer Game-Physics-Abgabe und als kompakter Cut-the-Rope-Clone konzipiert. Der Prototyp fokussiert sich vor allem auf Seil-Physik, physikbasierte Interaktionen und einen klaren Puzzle-Loop, der aus wenigen, aber gut kombinierbaren Systemen entsteht.",
      "Technisch lag der Schwerpunkt darauf, die Unity-Physik nicht nur fuer einzelne Objekte zu verwenden, sondern zum Kern des Level-Designs zu machen. Dadurch wurde das Projekt zu einer kleinen, aber sehr systemischen Prototype-Arbeit mit starkem Fokus auf emergentes Verhalten.",
    ],
    tags: ["Unity", "C#", "Game Physics", "Playable", "Lead Developer"],
    techIcons: ["unity", "csharp", "visualstudio", "git"],
    links: [{ label: "Play on itch.io", href: "https://luckyhanni.itch.io/cd-go-home" }],
    detailSections: [
      {
        title: "Segmented Rope System & Cut Interaction",
        body: [
          "Das zentrale System des Prototyps ist ein Seil, das aus mehreren verbundenen Joint-Segmenten aufgebaut ist. Diese segmentierte Struktur war wichtig, weil sie nicht nur statische Verbindungspunkte simuliert, sondern glaubwuerdige Spannung, Schwingung und dynamisches Verhalten ermoeglicht, wie man es fuer einen Cut-the-Rope-Ansatz braucht.",
          "Ueber Maus-Input kann ein einzelnes Segment gezielt durchschnitten und damit effektiv aus der Joint-Kette entfernt werden. Genau dieser Ansatz war fuer mich sinnvoll, weil er eine sehr direkte Interaktion mit einem physikbasierten Constraint-System erlaubt: Statt ein Seil nur visuell zu toggeln, entsteht ein nachvollziehbarer Bruch innerhalb der Struktur, der sofort neue Bewegungsvektoren und Reaktionen im gesamten System ausloest.",
        ],
        media: createProjectMedia(
          "/CD-Seil.gif",
          "CD Go Home Seil System",
        ),
        mediaSide: "right",
      },
      {
        title: "Physics-Driven Gameplay in Unity",
        body: [
          "Fuer die zugrunde liegenden Interaktionen habe ich die Unity Physics Engine gezielt als spieltragendes Fundament genutzt. Rigidbodies, Collider, Gravitation und kollisionsbasierte Reaktionen wurden nicht nur technisch eingebunden, sondern direkt in das Puzzle-Design uebersetzt, sodass Bewegung und Loesung aus denselben physikalischen Regeln entstehen.",
          "Dadurch konnten Level gebaut werden, die mit Fallverhalten, Impulsuebertragung, Pendelbewegung und Objektinteraktion spielen, statt geskriptete Einzelloesungen vorzugeben. Genau das macht den Prototyp spannend: Die Physik ist nicht nur Effekt, sondern die eigentliche Gameplay-Logik, auf der die Level aufbauen.",
        ],
        media: createProjectMedia(
          "/CD-Physik.gif",
          "CD Go Home Physics Gameplay",
        ),
        mediaSide: "left",
      },
      {
        title: "Mechanic Complexity & Combinatorial Level Design",
        body: [
          "Besonders interessant wurde das System durch die Kombination mehrerer Mechaniken. Seile, Balloons, Ventilatoren und Rope-Spawner eroeffnen gemeinsam deutlich mehr Moeglichkeiten als jede Komponente fuer sich allein und vergroessern den Design-Space fuer neue Puzzle-Situationen.",
          "Gerade diese Kombination sorgt fuer die eigentliche Komplexitaet des Projekts: Durch systemische Wechselwirkungen lassen sich mit wenigen Bausteinen sehr unterschiedliche Level aufbauen. So entsteht aus einem kleinen Physics-Prototyp ein flexibel erweiterbares Puzzle-Framework mit klarer mechanischer Tiefe.",
        ],
        media: {
          src: "/CD-Complexity.gif",
          alt: "CD Go Home Mechanic Complexity",
          type: "gif",
          width: 1600,
          height: 900,
          fit: "cover",
        },
        mediaSide: "right",
      },
    ],
    detailVideo: {
      title: "Play CD Go Home",
      description:
        "Die Unity-WebGL-Version wird direkt aus dem Portfolio geladen, damit das Spiel ohne itch.io und ohne zusaetzliche Weiterleitung direkt im Browser spielbar ist.",
      embedUrl: "/games/cd-go-home/index.html",
      embedAspectRatio: "960 / 600",
      placement: "top",
    },
  },
  {
    slug: "island-journey",
    category: "games",
    title: "Island Journey",
    period: "Uni-Projekt",
    heroImage: publicGameImage("Island Journey"),
    logoImage: "/Island%20Journey%20Logo.png",
    short: "Atmosphaerisches 3D-Puzzle-Abenteuer mit Rotation, Raetseln und vierseitiger Weltstruktur.",
    description: [
      "Island Journey ist ein Puzzle-Abenteuer in einer atmosphaerischen 3D-Welt, in der Rotation und Perspektive den Schluessel zum Fortschritt bilden.",
      "Du steuerst einen Charakter durch eine vierseitige Dimension, bei der immer nur eine Seite gleichzeitig sichtbar ist. Jede Drehung offenbart neue Hinweise, Herausforderungen und tierische Begleiter.",
      "Die Welt besteht aus rotierbaren Plattformen, die ueber farblich zugeordnete Hebel in die richtige Position gebracht werden muessen.",
      "Dabei wird dein Gedaechtnis gefordert, weil du Informationen von den anderen Seiten behalten musst, um die Raetsel erfolgreich zu loesen.",
      "Wir waren ein sehr kleines Team aus vier Personen, und ich habe das Projekt als Solo- und Lead-Programmer technisch umgesetzt. Mein Fokus lag dabei auf Character Control, Kamera-Logik, Shadern sowie der technischen Umsetzung von UI- und Gameplay-Systemen.",
    ],
    tags: ["Unreal", "Lead Developer", "Gameplay", "Puzzle", "Atmospheric"],
    techIcons: ["unity", "csharp", "visualstudio", "git"],
    links: [{ label: "Trailer", href: "https://www.youtube.com/watch?v=w4ZLKdRwZGw" }],
    detailSections: [
      {
        title: "Character Animation, Movement & Player Input",
        body: [
          "Ein zentraler Teil meiner Arbeit war die technische Verbindung von Player Input, Character Movement und Animation. Obwohl das Bewegungsset bewusst kompakt gehalten war, mussten Idle-, Lauf- und Interaktionsanimationen sauber an den Bewegungszustand des Characters gekoppelt werden, damit Steuerung und visuelles Feedback praezise zusammenarbeiten.",
          "Gerade bei Interaktionen wie dem Betaetigen von Schaltern war wichtig, dass Input-Verarbeitung, Character-Orientierung und Animation State Transitions konsistent ineinandergreifen. So entsteht trotz einfacher Animationen ein kontrolliertes und lesbares Character-Feeling mit klarer Responsiveness.",
        ],
        media: createProjectMedia(
          "/IslandJouneyAnimtions.gif",
          "Island Journey Character Animation und Player Input",
        ),
        mediaSide: "right",
      },
      {
        title: "Stylized Low-Poly Water Shader",
        body: [
          "Fuer die Umgebung habe ich einen einfachen, stilisierten Water Shader umgesetzt, der sich visuell in den Low-Poly-Look des Projekts einfuegt. Ziel war kein physikalisch komplexes Wassersystem, sondern ein kontrolliertes Material-Setup mit klarer Formensprache und einer sauberen stylized surface animation.",
          "Durch animierte Shader-Parameter und ein bewusst reduziertes Materialverhalten bekommt das Wasser trotzdem ausreichend Bewegung und Tiefe, ohne die ruhige Gesamtwirkung der Szene zu verlieren. So traegt der Shader technisch wie visuell zur Atmosphaere bei, ohne den Artstyle zu ueberladen.",
        ],
        media: createProjectMedia(
          "/IslandJouneyWaterShader.gif",
          "Island Journey Water Shader",
        ),
        mediaSide: "left",
      },
      {
        title: "Camera Rotation & Corner Transition",
        body: [
          "Eine der wichtigsten technischen Aufgaben war die Kamera-Logik beim Laufen ueber die Ecken der Welt. Sobald der Character eine Kante ueberschreitet, muss sich die Kamera mitdrehen, damit Raumorientierung, Perspektive und Kontrolle fuer Spieler:innen erhalten bleiben.",
          "Dafuer habe ich eine weiche Rotations- und Uebergangslogik umgesetzt, bei der sich die Kamera nicht abrupt umstellt, sondern ueber eine smooth interpolated transition in die neue Ausrichtung blendet. Dadurch fuehlt sich der Perspektivwechsel kontrolliert und hochwertig an, obwohl im Hintergrund ein klarer technischer State Change stattfindet.",
        ],
        media: createProjectMedia(
          "/IslandJouneyKameraMovement.gif",
          "Island Journey Kamera Movement",
        ),
        mediaSide: "right",
      },
      {
        title: "Main Menu, UI Animation & Level Thumbnail",
        body: [
          "Auch das Main Menu wurde von mir technisch mit aufgebaut und sollte nicht nur funktional sein, sondern das Projekt bereits vor Spielstart hochwertig praesentieren. Deshalb lag der Fokus auf einer sauberen Menu-Struktur, klaren UI-Transitions und einer insgesamt stimmigen Presentation Layer.",
          "Besonders stark wirkt dabei die Kombination aus Animationen und Level Thumbnail, weil sie dem Menu sofort mehr Charakter und Orientierung gibt. Dadurch entsteht kein rein statischer Startscreen, sondern ein deutlich runderer Einstieg mit besserer Lesbarkeit, Preview-Funktion und visuellem Wiedererkennungswert.",
        ],
        media: createProjectMedia(
          "/IslandJouneyMen%C3%BC.gif",
          "Island Journey Main Menu",
        ),
        mediaSide: "left",
      },
    ],
  },
  {
    slug: "honorar-rechner",
    category: "software",
    title: "Honorar Rechner",
    period: "Steuerkanzlei",
    heroImage: "/Honorarrechner banner.png",
    logoImage: "/Honorar%20Rechner%20Logo.png",
    short: "Tool zur schnellen Honorarkalkulation für Unternehmen und Privatmandanten.",
    description: [
      "Der Honorar Rechner berechnet mit nur vier Eingabewerten sehr schnell ein passendes Honorar.",
      "Ein Vorgang, der früher oft 15 Minuten gedauert hat, ist damit in etwa 2 Minuten erledigt.",
      "Änderungen an Sätzen und Beträgen können zentral über Excel gepflegt werden.",
    ],
    tags: ["C#", "WDF", "Excel", "Datenbanken"],
    techIcons: ["csharp", "dotnet", "excel", "database"],
    highlights: [
      "Schnelle Kalkulation mit wenig Eingabedaten",
      "Unterstützung für Unternehmen und Privatmandate",
      "Praktischer Einsatz im Kanzleialltag",
    ],
    detailSections: [
      {
        title: "Mandantenwahl & Einstieg in den Rechenworkflow",
        body: [
          "Auf der Startseite wird direkt zwischen Unternehmen und Privatmandanten gewählt.",
          "So sehen Nutzende sofort nur die Leistungen, die fachlich wirklich zu ihrem Fall passen.",
        ],
        media: createProjectMedia(
          "/Honorar Rechner Home.png",
          "Honorar Rechner Startseite",
        ),
        mediaSide: "right",
      },
      {
        title: "Minimale Eingabedaten, maximale Rechenwirkung",
        body: [
          "Für die Berechnung reichen vier zentrale Eingabewerte.",
          "Im Hintergrund verarbeitet das Tool daraus automatisch die nötige Mathematik und spart so viel manuelle Rechenarbeit.",
        ],
        media: createProjectMedia(
          "/Honorarrechner Daten.png",
          "Honorar Rechner Eingabedaten",
        ),
        mediaSide: "left",
      },
      {
        title: "Leistungsauswahl, Kalkulationslogik & Excel-Wartbarkeit",
        body: [
          "Die gewünschten Leistungen lassen sich danach direkt auswählen und sofort berechnen.",
          "Wenn sich Sätze oder Beträge ändern, kann alles zentral in Excel angepasst werden, ohne den Code anzufassen.",
        ],
        media: createProjectMedia(
          "/Honorarrechner leistungen.png",
          "Honorar Rechner Leistungen",
        ),
        mediaSide: "right",
      },
    ],
  },
  {
    slug: "neumandats-abgaenge-uebersicht",
    category: "software",
    title: "FeePro",
    period: "Steuerkanzlei",
    heroImage: "/FeePro Banner.png",
    logoImage: "/Mandats%C3%9Cbersicht%20Logo.png",
    short: "Tool zum Eintragen und Auswerten von Neumandaten, Abgangsmandaten und ihren Honoraren.",
    description: [
      "FeePro erfasst Neumandate, Abgangsmandate und die zugehörigen Honorare in einer zentralen Datenbasis.",
      "Die Daten können anschließend gezielt ausgewertet werden, zum Beispiel für einen bestimmten Monat oder für das gesamte Jahr.",
      "So verbindet das Tool Datenerfassung, Datenpflege und Reporting in einem kompakten Kanzlei-Workflow.",
    ],
    tags: ["C#", "WDF", "Datenbanken", "Reporting"],
    techIcons: ["csharp", "dotnet", "database"],
    highlights: [
      "Zeitfensterbasierte Auswertung",
      "Jahresübersichten für Honorare",
      "Bessere Transparenz für Kanzlei-Workflows",
    ],
    detailSections: [
      {
        title: "Home & Workflow-Einstieg",
        body: [
          "Die Startseite bündelt die wichtigsten Bereiche und dient als klarer Einstieg in den Workflow.",
          "So wird Datenerfassung und Auswertung direkt aus einer zentralen Oberfläche erreichbar.",
        ],
        media: createProjectMedia(
          "/FeePro Home.png",
          "FeePro Startseite",
        ),
        mediaSide: "right",
      },
      {
        title: "Mandate & Honorare eintragen",
        body: [
          "Neumandate und Abgangsmandate können strukturiert inklusive Honorarwerten erfasst werden.",
          "Dadurch entsteht eine saubere Datengrundlage für spätere Auswertungen und Kennzahlen.",
        ],
        media: createProjectMedia(
          "/FeePro Eintragen.png",
          "FeePro Eintragen",
        ),
        mediaSide: "left",
      },
      {
        title: "Datenbankpflege & Bestandsdaten",
        body: [
          "Bestehende Einträge lassen sich direkt in der Datenbankansicht prüfen und bearbeiten.",
          "Das macht den Datenbestand wartbar und hält die fachliche Grundlage für Reports aktuell.",
        ],
        media: createProjectMedia(
          "/FeePro Datenbank.png",
          "FeePro Datenbank",
        ),
        mediaSide: "right",
      },
      {
        title: "Monats- und Jahresauswertung",
        body: [
          "Die Auswertung kann für einzelne Monate oder für das gesamte Jahr erfolgen.",
          "So werden Honorarentwicklungen, Zu- und Abgänge sowie relevante Kennzahlen schnell sichtbar.",
        ],
        media: createProjectMedia(
          "/FeePro Auswertung.png",
          "FeePro Auswertung",
        ),
        mediaSide: "left",
      },
    ],
  },
  {
    slug: "lager-sortier-tool",
    category: "software",
    title: "Sorty",
    period: "Metzgerei",
    heroImage: "/Sorty banner.png",
    logoImage: "/Sorty%20Logo.png",
    short: "Lokale WebApp zur Annahme, Sortierung und Ausgabe von Weihnachtsbestellungen in einer Metzgerei.",
    description: [
      "Sorty wurde für eine Metzgerei gebaut, die an Weihnachten sehr viele Bestellungen annehmen, lagern und wieder ausgeben muss.",
      "Bestellungen werden erfasst, in Datenbanken gespeichert, beim Abholen wiedergefunden und intern weitergeleitet.",
    ],
    tags: ["WebApp", "C#", "Datenbanken", "Discord"],
    techIcons: ["csharp", "database", "github", "render", "vscode"],
    highlights: [
      "Strukturierte Lager- und Bestellorganisation",
      "Schnelle Ausgabe an Kundschaft",
      "Namenssuche für bessere Auffindbarkeit",
    ],
    detailSections: [
      {
        title: "Home & Dashboard",
        body: [
          "Die Startseite bündelt die wichtigsten Bereiche in einem klaren Dashboard.",
          "So kommt man ohne Umwege in Annahme, Abholung, Bestellübersicht oder Einstellungen.",
        ],
        media: createProjectMedia(
          "/Sorty Home.png",
          "Sorty Home",
        ),
        mediaSide: "right",
      },
      {
        title: "Bestellungen annehmen",
        body: [
          "Neue Bestellungen können strukturiert erfasst und direkt in der Datenbank gespeichert werden.",
          "Dadurch entsteht eine saubere Datengrundlage für Lagerung, Ausgabe und spätere Änderungen.",
        ],
        media: createProjectMedia(
          "/Sorty Annahme.png",
          "Sorty Annahme",
        ),
        mediaSide: "left",
      },
      {
        title: "Läufer & Abholung",
        body: [
          "Im Abholbereich kann eine Bestellung schnell gesucht und direkt ausgewählt werden.",
          "Sobald sie bestätigt wird, erhalten die Läufer alle relevanten Informationen für die Ausgabe.",
        ],
        media: createProjectMedia(
          "/Sorty Abholen.png",
          "Sorty Abholung",
        ),
        mediaSide: "right",
      },
      {
        title: "Alle Bestellungen",
        body: [
          "In der Gesamtübersicht lassen sich alle Bestellungen prüfen und bei Bedarf korrigieren.",
          "So bleibt der Datenbestand auch bei hohem Bestellvolumen konsistent und kontrollierbar.",
        ],
        media: createProjectMedia(
          "/Sorty Alle Bestellungen.png",
          "Sorty Alle Bestellungen",
        ),
        mediaSide: "left",
      },
      {
        title: "Settings & Lagerlogik",
        body: [
          "In den Einstellungen können Lagerstruktur und wichtige Daten zentral gepflegt werden.",
          "Dadurch bleibt der Workflow anpassbar, ohne die eigentliche Anwendung umbauen zu müssen.",
        ],
        media: createProjectMedia(
          "/Sorty Settings.png",
          "Sorty Settings",
        ),
        mediaSide: "right",
      },
      {
        title: "Discord-Benachrichtigung & Namenssuche",
        body: [
          "Bei der Ausgabe sendet das System automatisch eine Discord-Nachricht mit Bestellung, Lagerort und Preis.",
          "Für die Suche kommen mehrere Algorithmen zum Einsatz, damit Namen schnell, tolerant und zielgenau gefunden werden.",
        ],
        media: createProjectMedia(
          "/Sorty Discord Nachricht.png",
          "Sorty Discord Nachricht",
        ),
        mediaSide: "left",
      },
    ],
  },
  {
    slug: "timely",
    category: "software",
    title: "Timely",
    period: "Metzgerei",
    heroImage: "/Timely Banner.png",
    logoImage: "/Timely%20Logo.png",
    short: "Digitale Zeiterfassung fuer den modernen Einzelhandel mit Login, Check-in, Pausen und Admin-Export.",
    description: [
      "Timely ist eine Webanwendung fuer eine Metzgerei, mit der Mitarbeitende ihre Arbeitszeit digital erfassen koennen, statt sich auf handschriftliche oder uneinheitliche Prozesse zu verlassen.",
      "Nach dem Login ueber Namensauswahl und vierstellige PIN koennen sie sich einchecken, auschecken und auch Pausen sauber dokumentieren. Eigene Eintraege und die bisherige Historie bleiben dabei direkt einsehbar.",
      "Admins koennen Mitarbeitende und PINs verwalten, alle Zeiten zentral pruefen und die Daten anschliessend fuer Auswertung oder Abrechnung exportieren.",
    ],
    tags: ["WebApp", "C#", ".NET", "Datenbanken", "Zeiterfassung"],
    techIcons: ["csharp", "dotnet", "database", "excel", "render", "github"],
    highlights: [
      "Login ueber Namensauswahl und vierstellige PIN",
      "Einchecken, Auschecken und Pausen direkt im Dashboard",
      "Admin-Export sowie Verwaltung von Mitarbeitenden und PINs",
    ],
    detailSections: [
      {
        title: "Login mit Namensauswahl und PIN",
        body: [
          "Der Einstieg in Timely ist bewusst einfach gehalten: Mitarbeitende waehlen zuerst ihren Namen aus und geben danach eine vierstellige PIN ein. Dadurch bleibt der Login im Arbeitsalltag schnell, ohne auf eine klare Zuordnung der Zeiten zu verzichten.",
          "Gerade fuer den Einsatz im Einzelhandel war wichtig, dass der Ablauf auch unter Zeitdruck direkt verstaendlich bleibt. So entsteht ein unkomplizierter Zugang, der weniger Huerden hat als klassische Account-Systeme und trotzdem sauber administrierbar ist.",
        ],
        media: createProjectMedia(
          "/timely Login.png",
          "Timely Login mit Namensauswahl und PIN",
        ),
        mediaSide: "right",
      },
      {
        title: "Dashboard fuer Check-in, Check-out und Pausen",
        body: [
          "Im Home-Dashboard koennen Mitarbeitende ihre Schicht mit wenigen Klicks starten und beenden. Auch Pausen lassen sich direkt erfassen, sodass der komplette Tagesablauf in derselben Oberflaeche dokumentiert wird.",
          "Neben den Aktionen selbst ist auch die persoenliche Historie wichtig: Mitarbeitende sehen ihre bisherigen Eintraege und behalten dadurch sofort den Ueberblick ueber bereits gebuchte Zeiten. Das macht die Anwendung nicht nur funktional, sondern auch transparent im Alltag.",
        ],
        media: createProjectMedia(
          "/Timely Dashboard Home.png",
          "Timely Dashboard mit Zeiterfassung",
        ),
        mediaSide: "left",
      },
      {
        title: "Admin-Export und Mitarbeiterverwaltung",
        body: [
          "Fuer Admins stellt Timely die erfassten Daten zentral bereit und ermoeglicht den Export fuer weitere Verarbeitung, Abrechnung oder interne Auswertung. Dadurch wird aus der einfachen Zeiterfassung ein kompletter digitaler Workflow bis hin zur Weitergabe der Daten.",
          "Zusatzlich lassen sich Mitarbeitende, Rollen und PINs verwalten, sodass organisatorische Aenderungen nicht ausserhalb des Systems gepflegt werden muessen. Das reduziert manuellen Aufwand und haelt den Prozess auch bei mehreren Mitarbeitenden sauber wartbar.",
        ],
        media: createProjectMedia(
          "/Timely Export.png",
          "Timely Admin Export und Verwaltung",
        ),
        mediaSide: "right",
      },
    ],
  },
];

export const PROJECTS: Project[] = baseProjects.map(enrichProject);

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export const GAME_PROJECTS = PROJECTS.filter((project) => project.category === "games");

const SOFTWARE_PROJECT_ORDER = [
  "lager-sortier-tool",
  "timely",
  "honorar-rechner",
  "neumandats-abgaenge-uebersicht",
] as const;

export const SOFTWARE_PROJECTS = PROJECTS.filter(
  (project) => project.category === "software",
).sort(
  (a, b) =>
    SOFTWARE_PROJECT_ORDER.indexOf(a.slug as (typeof SOFTWARE_PROJECT_ORDER)[number]) -
    SOFTWARE_PROJECT_ORDER.indexOf(b.slug as (typeof SOFTWARE_PROJECT_ORDER)[number]),
);
