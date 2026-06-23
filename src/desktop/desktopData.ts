import type {
  DesktopFileState,
  DockApp,
  StickyWindowId,
  WindowId,
  WindowState,
} from "./types";

export const MIN_WINDOW_WIDTH = 320;
export const MIN_WINDOW_HEIGHT = 240;

export const defaultDesktopFiles: DesktopFileState[] = [
  {
    id: "resume",
    label: "resume.pdf",
    previewSrc: "img/resume-thumbnail.png",
    x: 72,
    y: 82,
  },
];

export const dockApps: DockApp[] = [
  { id: "photos", label: "Photos", iconSrc: "img/apple-photos-icon.webp" },
  { id: "mail", label: "Mail", iconSrc: "img/apple-mail-icon.webp" },
  { id: "notes", label: "Notes", iconSrc: "img/apple-notes-icon.webp" },
  { id: "stickies", label: "Stickies", iconSrc: "img/apple-stickies-icon.svg" },
];

export const stickyWindowIds: StickyWindowId[] = [
  "stickyIdeas",
  "stickyPhotos",
  "stickyAbout",
];

export const initialWindows: Record<WindowId, WindowState> = {
  resume: {
    id: "resume",
    isOpen: false,
    x: 124,
    y: 72,
    width: 760,
    height: 680,
    zIndex: 10,
  },
  photos: {
    id: "photos",
    isOpen: false,
    x: 150,
    y: 76,
    width: 780,
    height: 520,
    zIndex: 10,
  },
  mail: {
    id: "mail",
    isOpen: false,
    x: 350,
    y: 116,
    width: 430,
    height: 520,
    zIndex: 10,
  },
  notes: {
    id: "notes",
    isOpen: false,
    x: 262,
    y: 92,
    width: 760,
    height: 560,
    zIndex: 10,
  },
  about: {
    id: "about",
    isOpen: false,
    x: 380,
    y: 96,
    width: 500,
    height: 620,
    zIndex: 10,
  },
  stickyIdeas: {
    id: "stickyIdeas",
    isOpen: false,
    x: 184,
    y: 286,
    width: 420,
    height: 268,
    zIndex: 10,
  },
  stickyPhotos: {
    id: "stickyPhotos",
    isOpen: false,
    x: 646,
    y: 168,
    width: 360,
    height: 244,
    zIndex: 10,
  },
  stickyAbout: {
    id: "stickyAbout",
    isOpen: false,
    x: 510,
    y: 476,
    width: 390,
    height: 236,
    zIndex: 10,
  },
};

export const windowTitles: Record<WindowId, string> = {
  resume: "resume.pdf",
  photos: "Photos",
  mail: "Mail",
  notes: "Notes",
  about: "About Me",
  stickyIdeas: "Portfolio polish",
  stickyPhotos: "Photos",
  stickyAbout: "About Me",
};

export const activeAppLabels: Record<WindowId | "finder", string> = {
  finder: "Finder",
  resume: "Preview",
  photos: "Photos",
  mail: "Mail",
  notes: "Notes",
  about: "About Me",
  stickyIdeas: "Stickies",
  stickyPhotos: "Stickies",
  stickyAbout: "Stickies",
};

export const resumePages = ["files/resume-page-1.png"];

const photoItems = {
  headshot: {
    src: "img/photos/headshot.jpg",
    alt: "Portrait",
  },
  tahoe: {
    src: "img/photos/tahoe-day.jpg",
    alt: "Lake Tahoe",
  },
  closet: {
    src: "img/closettracker.png",
    alt: "Closet Tracker project",
  },
  cooking: {
    src: "img/cooking.png",
    alt: "VR Cooking project",
  },
  facialFrenzy: {
    src: "img/facialfrenzy.png",
    alt: "Facial Frenzy project",
  },
};

export const photoSections = [
  {
    id: "recents",
    title: "Recents",
    sidebarLabel: "Recents",
    photos: [
      photoItems.headshot,
      photoItems.tahoe,
      photoItems.closet,
      photoItems.cooking,
      photoItems.facialFrenzy,
    ],
  },
  {
    id: "hobbies",
    title: "Hobbies",
    sidebarLabel: "Hobbies",
    photos: [photoItems.headshot, photoItems.cooking],
  },
  {
    id: "travel",
    title: "Travel",
    sidebarLabel: "Travel",
    photos: [photoItems.tahoe],
  },
  {
    id: "projects",
    title: "Projects",
    sidebarLabel: "Projects",
    photos: [photoItems.closet, photoItems.cooking, photoItems.facialFrenzy],
  },
];

export const mailContact = {
  name: "Gretchen Lam",
  email: "gretchenlam03@gmail.com",
  headshot: "img/headshot.jpg",
  links: [
    {
      label: "GitHub",
      href: "https://github.com/gretchenlam",
      display: "github.com/gretchenlam",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/gretchen-lam",
      display: "linkedin.com/in/gretchen-lam",
    },
    {
      label: "Instagram",
      href: "https://instagram.com/gurchout",
      display: "@gurchout",
    },
  ],
};

export const aboutMe = {
  name: "Gretchen Lam",
  headshot: "img/headshot.jpg",
  rows: [
    ["Education", "UC Santa Barbara, BS Computer Science"],
    ["Career", "Software Engineer"],
    ["Interests", "AI/ML, Frontend Development, Game Development"],
    ["Focus", "Creative tools, computer vision, thoughtful interfaces"],
    ["Currently", "Building a macOS-inspired portfolio desktop"],
  ],
};

type StickyNote = {
  id: StickyWindowId;
  color: "yellow" | "pink" | "blue";
  title: string;
  body: string;
};

export const stickies: StickyNote[] = [
  {
    id: "stickyIdeas",
    color: "yellow",
    title: "Portfolio polish",
    body: "Make the desktop feel playful, but keep every interaction useful.",
  },
  {
    id: "stickyPhotos",
    color: "pink",
    title: "Photos",
    body: "Add coffee, travel, projects, and tiny behind-the-scenes moments.",
  },
  {
    id: "stickyAbout",
    color: "blue",
    title: "About Me",
    body: "Maybe this should feel like About This Mac, but warmer.",
  },
];

export const noteGroups = [
  {
    label: "2026",
    notes: [
      {
        id: "closet-tracker",
        title: "Closet Tracker",
        date: "Jun 23, 2026",
        preview: "Mobile wardrobe organizer with image upload and outfit planning.",
        body:
          "A React Native and Firebase app for cataloging clothing, organizing categories, and turning a messy closet into searchable data. This note can grow into a project case study with screenshots, links, and implementation details.",
        imageSrc: "img/closettracker.png",
      },
      {
        id: "portfolio-desktop",
        title: "Portfolio Desktop",
        date: "Jun 22, 2026",
        preview: "A personal website disguised as a small macOS workspace.",
        body:
          "The goal is to make the portfolio feel discoverable instead of linear. Files, apps, notes, and photos can each reveal a different side of the work while keeping the home screen calm.",
        imageSrc: "img/photos/tahoe-day.jpg",
      },
    ],
  },
  {
    label: "2025",
    notes: [
      {
        id: "vr-cooking",
        title: "VR Cooking Simulation",
        date: "Mar 14, 2025",
        preview: "A Unity cooking flow with interactive prompts and recipes.",
        body:
          "A VR prototype focused on learning through tactile steps: grab, prep, cook, and plate. The project is a good place to talk about interaction design, tutorial pacing, and playful feedback loops.",
        imageSrc: "img/cooking.png",
      },
      {
        id: "facial-frenzy",
        title: "Facial Frenzy",
        date: "Feb 7, 2025",
        preview: "Computer vision game built around expression recognition.",
        body:
          "A Python-based game that turns facial recognition into a fast feedback loop. This note can become a case study on model integration, realtime constraints, and designing around imperfect signals.",
        imageSrc: "img/facialfrenzy.png",
      },
    ],
  },
];
