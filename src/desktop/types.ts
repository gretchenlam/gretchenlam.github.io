export type StickyWindowId = "stickyIdeas";

export type WindowId =
  | "resume"
  | "photos"
  | "mail"
  | "notes"
  | "about"
  | StickyWindowId;

export type DockAppId = "photos" | "mail" | "notes" | "stickies";

export type DesktopFileId = Extract<WindowId, "resume">;

export type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export type WindowGeometry = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type WindowState = WindowGeometry & {
  id: WindowId;
  isOpen: boolean;
  zIndex: number;
  restore?: WindowGeometry | null;
};

export type DesktopFileState = {
  id: DesktopFileId;
  label: string;
  previewSrc?: string;
  x: number;
  y: number;
};

export type DockApp = {
  id: DockAppId;
  label: string;
  iconSrc: string;
};

export type InteractionSession =
  | {
      mode: "window-move";
      id: WindowId;
      pointerX: number;
      pointerY: number;
      startX: number;
      startY: number;
      width: number;
      height: number;
      latestX: number;
      latestY: number;
      element: HTMLElement | null;
    }
  | {
      mode: "window-resize";
      id: WindowId;
      direction: ResizeDirection;
      pointerX: number;
      pointerY: number;
      startX: number;
      startY: number;
      startWidth: number;
      startHeight: number;
      element: HTMLElement | null;
    }
  | {
      mode: "file-move";
      id: DesktopFileId;
      pointerX: number;
      pointerY: number;
      startX: number;
      startY: number;
    };
