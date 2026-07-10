export const profile = {
  name: "Arnold Mubuanga Yate",
  shortName: "AMY",
  title: "Software Engineer & Digital Product Builder",
  headline: "Applications métier, plateformes web et produits digitaux à forte valeur d'usage.",
  availability: "Disponible pour échanges et collaborations",
  location: "Basé entre la France et la Belgique",
  email: "arnold@mubuanga.com",
  phone: "+33698827193",
  instagram: "harnold_mub",
  linkedin: "https://www.linkedin.com/in/arnold-mubuanga-yate-149b7b151",
  github: "#",
  summary:
    "Depuis plus de 6 ans, j'accompagne organisations, entreprises et porteurs de projets dans la conception de solutions numériques performantes: applications web, plateformes métiers, systèmes d'information, événements digitaux et outils SaaS.",
  homeIntro:
    "Je conçois des solutions numériques simples, robustes et utiles, avec une attention forte portée à l'usage, à la structure et à l'impact concret.",
  resumeIntro:
    "Ingénieur développement, chef de projet informatique et entrepreneur digital, je relie engineering, pilotage et vision produit pour faire émerger des solutions numériques durables.",
  yearsExperience: "6+",
} as const;

export const trustedCompanies = [
  "Ville de Lille",
  "Dassault Systèmes",
  "Capgemini",
  "Decathlon",
  "Hewani",
  "Structures en transformation",
] as const;

export const expertiseAreas = [
  {
    title: "Moteurs de recherche",
    description:
      "Conception d'expériences de recherche, navigation, pertinence et restitution d'information dans des environnements métier complexes.",
  },
  {
    title: "Plateformes data & intelligence",
    description:
      "Assemblage de produits qui fédèrent des flux, des sources et des usages variés autour d'une interface cohérente.",
  },
  {
    title: "Architecture applicative",
    description:
      "Structuration d'applications web robustes, maintenables et orientées produit, du front jusqu'aux services métiers.",
  },
  {
    title: "Delivery & accompagnement",
    description:
      "Travail transverse avec produit, design et équipes techniques pour livrer de façon fiable sur des sujets à forte visibilité.",
  },
] as const;

export const selectedReferences = [
  {
    company: "Ville de Lille",
    mission: "Chef de projet informatique",
    impact:
      "Pilotage de projets informatiques dans un environnement public où la coordination, la fiabilité et la lisibilité des livrables sont essentielles.",
  },
  {
    company: "Dassault Systèmes",
    mission: "3DSearch / 3DEXPERIENCE Platform",
    impact:
      "Travail sur une expérience de recherche transverse au sein d'un écosystème industriel mondial.",
  },
  {
    company: "Capgemini",
    mission: "Mission client retail",
    impact:
      "Intervention sur des sujets de delivery et de plateforme dans un contexte grand compte.",
  },
  {
    company: "Decathlon",
    mission: "Plateforme digitale",
    impact:
      "Contribution à des usages produit où la fluidité et la performance conditionnent l'adoption.",
  },
  {
    company: "Hewani",
    mission: "Lead développeur",
    impact:
      "Pilotage de projets web et accompagnement de structures dans leur transition numérique.",
  },
] as const;

export const services = [
  {
    icon: "Zap",
    title: "Conseil & cadrage",
    description:
      "Clarification du besoin, priorisation, architecture de la réponse et trajectoire de livraison.",
  },
  {
    icon: "Layers",
    title: "Pilotage de projet IT",
    description:
      "Coordination des parties prenantes, suivi d'avancement, qualité de delivery et sécurisation des décisions.",
  },
  {
    icon: "Globe",
    title: "Produits & plateformes web",
    description:
      "Sites premium, outils métier et plateformes sur mesure conçus pour durer et servir l'usage réel.",
  },
  {
    icon: "Users",
    title: "Transformation & accompagnement",
    description:
      "Interface entre métier, technique et produit pour faire avancer les projets sensibles sans friction inutile.",
  },
] as const;

export const projects = [
  {
    slug: "salon-congo-paris",
    name: "Congo à Paris",
    url: "https://salon.congonaparis.fr/",
    screenshot: "/images/projets/congonaparis/congo-paris-desktop.png",
    screenshotMobile: "/images/projets/congonaparis/congo-paris-mobile.png",
    category: "Événementiel",
    description:
      "Plateforme de présentation pour un rendez-vous de la diaspora congolaise à Paris, avec programme, partenaires et réservation.",
    tags: ["Next.js", "Événement", "Direction artistique"],
    featured: true,
  },
  {
    slug: "mboka-hub",
    name: "Mboka Hub",
    url: "https://mbokahub.com/",
    screenshot: "/screenshots/mbokahub_com.png",
    screenshotMobile: "/screenshots/mbokahub_com_mobile.png",
    category: "Plateforme",
    description:
      "Hub communautaire et digital pour la diaspora congolaise — networking, projets et opportunités.",
    tags: ["React", "Node.js", "Community"],
    featured: true,
  },
  {
    slug: "tselem-rdc",
    name: "Tselem RDC",
    url: "https://tselemrdc.com/",
    screenshot: "/screenshots/tselemrdc_com.png",
    screenshotMobile: "/screenshots/tselemrdc_com_mobile.png",
    category: "Institutionnel",
    description:
      "Site institutionnel pour une ONG engagée pour les droits et le développement en République Démocratique du Congo.",
    tags: ["Next.js", "CMS", "ONG"],
    featured: false,
  },
  {
    slug: "e-visa",
    name: "E-Visa",
    url: "https://e-visa.mubuanga.com/",
    screenshot: "/screenshots/e-visa_mubuanga_com.png",
    screenshotMobile: "/screenshots/e-visa_mubuanga_com_mobile.png",
    category: "Application",
    description:
      "Application de traitement de demandes de visa en ligne — interface sécurisée et fluide pour les usagers.",
    tags: ["React", "TypeScript", "Formulaires"],
    featured: true,
  },
  {
    slug: "bloc-leopards",
    name: "Bloc Léopards",
    url: "https://blocleopards.mubuanga.com/",
    screenshot: "/screenshots/blocleopards_mubuanga_com.png",
    screenshotMobile: "/screenshots/blocleopards_mubuanga_com_mobile.png",
    category: "Communauté",
    description:
      "Plateforme dédiée aux supporters de l'équipe nationale de football de la RDC, Les Léopards.",
    tags: ["Next.js", "Sport", "Communauté"],
    featured: false,
  },
  {
    slug: "momento-wedding",
    name: "Momento Wedding",
    url: "https://momento.wedding/",
    screenshot: "/screenshots/momento_wedding.png",
    screenshotMobile: "/screenshots/momento_wedding_mobile.png",
    category: "Événementiel",
    description:
      "Agence événementielle spécialisée en mariages — vitrine premium avec galerie et demandes de contact.",
    tags: ["Next.js", "Design", "Événementiel"],
    featured: true,
  },
  {
    slug: "u-moja",
    name: "U-Moja",
    url: "https://u-moja.org/",
    screenshot: "/screenshots/u-moja_org.png",
    screenshotMobile: "/screenshots/u-moja_org_mobile.png",
    category: "Associatif",
    description:
      "Site associatif pour une organisation de solidarité africaine — projets, actualités et engagement.",
    tags: ["React", "CMS", "Association"],
    featured: false,
  },
  {
    slug: "dgm",
    name: "DGM",
    url: "https://dgm.mubuanga.com/",
    screenshot: "/screenshots/dgm_mubuanga_com.png",
    screenshotMobile: "/screenshots/dgm_mubuanga_com_mobile.png",
    category: "Application",
    description:
      "Application web pour la Direction Générale de Migration — gestion administrative et procédures en ligne.",
    tags: ["React", "TypeScript", "Gouvernance"],
    featured: false,
  },
  {
    slug: "fondation-noah-sadiki",
    name: "Fondation Noah Sadiki",
    url: "https://fondationnoahsadiki.org/",
    screenshot: "/screenshots/fondationnoahsadiki_org.png",
    screenshotMobile: "/screenshots/fondationnoahsadiki_org_mobile.png",
    category: "Institutionnel",
    description:
      "Site institutionnel d'une fondation caritative — collecte de dons, projets humanitaires et galerie d'actions.",
    tags: ["Next.js", "Fondation", "Dons"],
    featured: false,
  },
  {
    slug: "cozy-interieur",
    name: "Cozy Intérieur",
    url: "https://cozyinterieur.com/",
    screenshot: "/screenshots/cozyinterieur_com.png",
    screenshotMobile: "/screenshots/cozyinterieur_com_mobile.png",
    category: "Site vitrine",
    description:
      "Site vitrine pour une agence de décoration intérieure — galerie de réalisations, services et devis en ligne.",
    tags: ["Next.js", "Design", "Décoration"],
    featured: false,
  },
  {
    slug: "malkya",
    name: "Malkya",
    url: "https://malkya.co/",
    screenshot: "/screenshots/malkya_co.png",
    screenshotMobile: "/screenshots/malkya_co_mobile.png",
    category: "E-commerce",
    description:
      "Plateforme e-commerce et lifestyle pour une marque africaine contemporaine — catalogue et expérience d'achat.",
    tags: ["Next.js", "E-commerce", "Lifestyle"],
    featured: false,
  },
] as const;

export type Project = (typeof projects)[number];

export const experiences = [
  {
    period: "Depuis novembre 2024",
    company: "Ville de Lille",
    role: "Ingénieur Développement / Chef de Projet Informatique",
    summary:
      "Pilotage et développement d'applications destinées aux services municipaux et aux associations lilloises.",
    details: [
      "Développement d'applications métiers pour les services municipaux.",
      "Pilotage technique et fonctionnel de projets numériques.",
      "Conception d'API et d'interfaces web modernes.",
      "Accompagnement des utilisateurs et des équipes métier.",
    ],
    stack: ["PHP", "Symfony", "API", "Angular", "Pilotage", "Collectivité"],
  },
  {
    period: "2021 — 2024",
    company: "Dassault Systèmes",
    role: "Software Engineering Specialist",
    summary:
      "Développement de fonctionnalités stratégiques de la plateforme 3DSearch au sein de l'équipe R&D de NETVIBES.",
    details: [
      "Développement de fonctionnalités de recherche avancée.",
      "Amélioration des performances et de l'expérience utilisateur.",
      "Participation à des projets internationaux à forte volumétrie.",
      "Travail en environnement Agile et R&D.",
    ],
    stack: ["JavaScript", "TypeScript", "Recherche", "UX", "Agile", "R&D"],
  },
  {
    period: "2018 — 2020",
    company: "Dassault Systèmes",
    role: "Apprenti Développeur Front-End",
    summary:
      "Développement d'interfaces utilisateurs et participation à l'évolution de la plateforme 3DSearch.",
    details: [
      "Développement d'interfaces utilisateurs.",
      "Participation à l'évolution de la plateforme 3DSearch.",
      "Collaboration avec les équipes produit et design.",
    ],
    stack: ["Front-End", "JavaScript", "Produit", "Design", "3DSearch"],
  },
] as const;

export const skillGroups = [
  {
    name: "Développement Web & Applications Métier",
    items: [
      "PHP 8",
      "Symfony",
      "API Platform",
      "Angular",
      "TypeScript",
      "JavaScript",
      "MySQL",
      "Docker",
      "GitLab CI/CD",
      "Architecture logicielle",
      "Conception d'API REST",
      "Authentification JWT & LDAP",
    ],
  },
  {
    name: "Gestion de Projet",
    items: [
      "Analyse des besoins",
      "Conception fonctionnelle",
      "Pilotage de projets",
      "Méthodes Agile",
      "Coordination des équipes",
      "Documentation technique",
      "Accompagnement utilisateurs",
    ],
  },
  {
    name: "Produits Digitaux & SaaS",
    items: [
      "Conception produit",
      "UX/UI",
      "Automatisation des processus",
      "Plateformes événementielles",
      "Outils de gestion",
      "Solutions métier sur mesure",
    ],
  },
] as const;

export const education = [
  {
    school: "Ingénierie informatique",
    degree: "Parcours orienté développement logiciel et produits digitaux",
    period: "2015 — 2018",
  },
] as const;

export const languages = [
  { name: "Français", level: "Natif" },
  { name: "Anglais", level: "Professionnel" },
  { name: "Lingala", level: "Natif" },
] as const;

export const interests = [
  "Technologie",
  "Innovation",
  "Projets à impact africain et international",
  "Produits digitaux",
  "Communautés",
] as const;

export const dassaultMission = {
  company: "Dassault Systèmes",
  role: "Software Engineering Specialist",
  team: "3DSearch · NETVIBES",
  period: "2021 — 2024",
  context:
    "Participation au développement de fonctionnalités stratégiques de la plateforme de recherche 3DSearch utilisée à l'échelle internationale.",
  description:
    "Au sein de l'équipe R&D de NETVIBES, j'ai contribué à l'évolution de la plateforme 3DSearch, avec un travail portant sur la recherche avancée, la performance, l'expérience utilisateur et les usages à forte volumétrie dans un environnement international.",
  brands: ["CATIA", "SOLIDWORKS", "SIMULIA", "DELMIA", "ENOVIA", "BIOVIA", "MEDIDATA"],
  highlights: [
    "Développement de fonctionnalités de recherche avancée.",
    "Amélioration des performances et de l'expérience utilisateur.",
    "Participation à des projets internationaux à forte volumétrie.",
    "Travail en environnement Agile et R&D.",
  ],
  stack: ["JavaScript", "TypeScript", "Front-end", "Recherche avancée", "Agile", "R&D"],
} as const;

export const lilleMission = {
  company: "Ville de Lille",
  role: "Ingénieur Développement / Chef de Projet Informatique",
  period: "Depuis novembre 2024",
  summary:
    "Aujourd'hui, je pilote et développe des applications destinées aux services municipaux et aux associations lilloises, avec une double approche technique et fonctionnelle.",
  highlights: [
    "Développement d'applications métiers pour les services municipaux.",
    "Pilotage technique et fonctionnel de projets numériques.",
    "Conception d'API et d'interfaces web modernes.",
    "Accompagnement des utilisateurs et des équipes métier.",
  ],
  tags: ["Collectivité", "Applications métiers", "API", "Pilotage", "Accompagnement"],
} as const;

export const aboutParagraphs = [
  "Je suis Arnold Mubuanga Yate (AMY), ingénieur développement, chef de projet informatique et entrepreneur digital.",
  "Depuis plus de 6 ans, j'accompagne des organisations, entreprises et porteurs de projets dans la conception de solutions numériques performantes : applications web, plateformes métiers, systèmes d'information, événements digitaux et outils SaaS.",
  "Aujourd'hui, j'occupe le poste d'Ingénieur Développement / Chef de Projet Informatique à la Ville de Lille, où je pilote et développe des applications destinées aux services municipaux et aux associations lilloises.",
  "Auparavant, j'ai travaillé chez Dassault Systèmes au sein de l'équipe R&D de NETVIBES, où j'ai participé au développement de fonctionnalités stratégiques de la plateforme de recherche 3DSearch utilisée à l'échelle internationale.",
] as const;

export const cvMetrics = [
  { value: "6+", label: "années d'expérience" },
  { value: "50+", label: "projets réalisés ou accompagnés" },
  { value: "Full Stack", label: "expertise technique" },
  { value: "France · Belgique", label: "base de travail" },
] as const;

export const entrepreneurialProjects = [
  {
    name: "U-MOJA.org",
    url: "https://u-moja.org/",
    summary: "Plateforme de collecte de fonds participative pour les projets sociaux en RDC.",
    items: ["Collecte", "Projets sociaux", "Impact", "Association", "Plateforme"],
  },
  {
    name: "Momento Wedding",
    url: "https://momento.wedding/",
    summary: "Photographie et films de mariage haut de gamme, entre Kinshasa, Paris et destinations internationales.",
    items: ["Mariage", "Photographie", "Film", "Image premium", "Direction artistique"],
  },
  {
    name: "Cozy Interieur",
    url: "https://cozyinterieur.com/",
    summary: "Studio de design d'intérieur sur-mesure avec une approche sensible de l'espace et de l'esthétique.",
    items: ["Design intérieur", "Sur-mesure", "Studio", "Décoration", "Identité visuelle"],
  },
  {
    name: "TSELEM Studio",
    url: "https://tselem.studio/",
    summary: "Maison de l'image à Kinshasa, dédiée à la photographie, à la vidéo et à la direction artistique premium.",
    items: ["Portrait", "Mariage", "Maternité", "Branding personnel", "Vidéo"],
  },
] as const;

export const visionParagraphs = [
  "Je crois que la technologie doit résoudre des problèmes réels.",
  "Mon objectif est de concevoir des solutions simples, durables et évolutives qui créent de la valeur pour les utilisateurs, les entreprises et les communautés.",
  "Que ce soit dans le développement logiciel, la gestion de projet ou l'entrepreneuriat, je recherche toujours l'équilibre entre innovation, efficacité et impact concret.",
] as const;
