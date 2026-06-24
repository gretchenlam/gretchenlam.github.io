import type {
  DesktopFileState,
  DockApp,
  StickyWindowId,
  WindowId,
  WindowState,
} from "./types";

export { photoSections } from "./photoLibrary.generated";

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
    isOpen: true,
    x: 184,
    y: 286,
    width: 420,
    height: 268,
    zIndex: 10,
  },
};

export const windowTitles: Record<WindowId, string> = {
  resume: "resume.pdf",
  photos: "Photos",
  mail: "Mail",
  notes: "Notes",
  about: "About Me",
  stickyIdeas: "hello, world!",
};

export const activeAppLabels: Record<WindowId | "finder", string> = {
  finder: "Finder",
  resume: "Preview",
  photos: "Photos",
  mail: "Mail",
  notes: "Notes",
  about: "About Me",
  stickyIdeas: "Stickies",
};

export const resumePages = ["files/resume-page-1.png"];

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
  profilePic: "img/profile-pic.jpeg",
  rows: [
    ["Education", "UC Santa Barbara"],
    ["Field of Study", "B.S. in Computer Science"],
    ["Interests", "AI/ML, Frontend Development, Game Development"],
    ["Hobbies", "Traveling, Gaming, Gymming, Crocheting, Latte Art, Escape Rooms"],
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
    title: "hello, world!",
    body: "welcome to my portfolio desktop! feel free to explore the files, apps, and notes to learn more about me and my work :)",
  },
];

export const noteGroups = [
  {
    label: "2025",
    notes: [
      {
        id: "closet-tracker",
        title: "Closet Tracker",
        date: "Jun 23, 2025",
        preview: "Mobile wardrobe organizer with image upload and outfit planning.",
        body:
          "A React Native and Firebase app for cataloging clothing, organizing categories, and turning a messy closet into searchable data.",
        imageSrc: "img/closettracker.png",
        repoUrl: "https://github.com/ucsb-cs148-w25/pj12-closettracker",
      },
      {
        id: "vr-cooking",
        title: "VR Cooking Simulation",
        date: "Mar 14, 2025",
        preview: "A Unity cooking flow with interactive prompts and recipes.",
        body:
          "A VR prototype focused on learning through tactile steps: grab, prep, cook, and plate.",
        imageSrc: "img/cooking.png",
        repoUrl: "https://github.com/gretchenlam/unity-vr-cooking",
      },
      {
        id: "facial-frenzy",
        title: "Facial Frenzy",
        date: "Feb 7, 2025",
        preview: "Computer vision game built around expression recognition.",
        body:
          "A Python-based game that turns facial recognition into a fast feedback loop.",
        imageSrc: "img/facialfrenzy.png",
        repoUrl: "https://github.com/gretchenlam/Facial-Frenzy",
      },
    ],
  },
];
