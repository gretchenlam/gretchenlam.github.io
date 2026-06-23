export type WindowId = "resume" | "about" | "photos" | "mail" | "notes";

export type DesktopFileId = Extract<WindowId, "resume" | "about">;

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
  x: number;
  y: number;
};

export type DockApp = {
  id: Extract<WindowId, "photos" | "mail" | "notes">;
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
    }
  | {
      mode: "file-move";
      id: DesktopFileId;
      pointerX: number;
      pointerY: number;
      startX: number;
      startY: number;
    };
