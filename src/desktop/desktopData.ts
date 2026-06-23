import type { DesktopFileState, DockApp, WindowId, WindowState } from "./types";

export const MIN_WINDOW_WIDTH = 320;
export const MIN_WINDOW_HEIGHT = 240;

export const defaultDesktopFiles: DesktopFileState[] = [
  { id: "resume", label: "resume.pdf", x: 72, y: 82 },
  { id: "about", label: "about_me.pdf", x: 212, y: 232 },
];

export const dockApps: DockApp[] = [
  { id: "photos", label: "Photos", iconSrc: "img/apple-photos-icon.webp" },
  { id: "mail", label: "Mail", iconSrc: "img/apple-mail-icon.webp" },
  { id: "notes", label: "Notes", iconSrc: "img/apple-notes-icon.webp" },
];

export const initialWindows: Record<WindowId, WindowState> = {
  resume: {
    id: "resume",
    isOpen: false,
    x: 124,
    y: 72,
    width: 540,
    height: 660,
    zIndex: 10,
  },
  about: {
    id: "about",
    isOpen: false,
    x: 244,
    y: 116,
    width: 540,
    height: 660,
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
    x: 330,
    y: 110,
    width: 440,
    height: 560,
    zIndex: 10,
  },
  notes: {
    id: "notes",
    isOpen: false,
    x: 262,
    y: 92,
    width: 620,
    height: 520,
    zIndex: 10,
  },
};

export const windowTitles: Record<WindowId, string> = {
  resume: "resume.pdf",
  about: "about_me.pdf",
  photos: "Photos",
  mail: "Mail",
  notes: "Notes",
};

export const activeAppLabels: Record<WindowId | "finder", string> = {
  finder: "Finder",
  resume: "Preview",
  about: "Preview",
  photos: "Photos",
  mail: "Mail",
  notes: "Notes",
};
