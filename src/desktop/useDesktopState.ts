import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  defaultDesktopFiles,
  initialWindows,
  MIN_WINDOW_HEIGHT,
  MIN_WINDOW_WIDTH,
  stickyWindowIds,
} from "./desktopData";
import { clamp } from "./desktopUtils";
import type {
  DesktopFileId,
  DockAppId,
  InteractionSession,
  ResizeDirection,
  StickyWindowId,
  WindowId,
} from "./types";

const isStickyWindow = (id: WindowId) =>
  stickyWindowIds.includes(id as StickyWindowId);

const getMinWindowWidth = (id: WindowId) =>
  isStickyWindow(id) ? 220 : MIN_WINDOW_WIDTH;

const getMinWindowHeight = (id: WindowId) =>
  isStickyWindow(id) ? 170 : MIN_WINDOW_HEIGHT;

export function useDesktopState() {
  const [windows, setWindows] = useState(initialWindows);
  const [desktopFiles, setDesktopFiles] = useState(defaultDesktopFiles);
  const [selectedDesktopFile, setSelectedDesktopFile] =
    useState<DesktopFileId | null>(null);
  const topZRef = useRef(20);
  const interactionRef = useRef<InteractionSession | null>(null);

  const getNextZ = useCallback(() => {
    topZRef.current += 1;
    return topZRef.current;
  }, []);

  const openWindows = useMemo(
    () => Object.values(windows).filter((windowState) => windowState.isOpen),
    [windows]
  );

  const activeWindowId = useMemo(() => {
    const topWindow = [...openWindows].sort((a, b) => b.zIndex - a.zIndex)[0];
    return topWindow?.id ?? "finder";
  }, [openWindows]);

  const openWindow = useCallback(
    (id: WindowId) => {
      const nextZ = getNextZ();
      setWindows((current) => ({
        ...current,
        [id]: {
          ...current[id],
          isOpen: true,
          zIndex: nextZ,
        },
      }));
    },
    [getNextZ]
  );

  const openDockApp = useCallback(
    (id: DockAppId) => {
      if (id !== "stickies") {
        openWindow(id);
        return;
      }

      setWindows((current) => {
        const nextWindows = { ...current };

        stickyWindowIds.forEach((stickyId) => {
          nextWindows[stickyId] = {
            ...nextWindows[stickyId],
            isOpen: true,
            zIndex: getNextZ(),
          };
        });

        return nextWindows;
      });
    },
    [getNextZ, openWindow]
  );

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        isOpen: false,
      },
    }));
  }, []);

  const focusWindow = useCallback(
    (id: WindowId) => {
      const nextZ = getNextZ();

      setWindows((current) => {
        if (!current[id].isOpen) {
          return current;
        }

        return {
          ...current,
          [id]: {
            ...current[id],
            zIndex: nextZ,
          },
        };
      });
    },
    [getNextZ]
  );

  const toggleZoomWindow = useCallback(
    (id: WindowId) => {
      const nextZ = getNextZ();

      setWindows((current) => {
        const targetWindow = current[id];

        if (targetWindow.restore) {
          return {
            ...current,
            [id]: {
              ...targetWindow,
              ...targetWindow.restore,
              restore: null,
              zIndex: nextZ,
            },
          };
        }

        return {
          ...current,
          [id]: {
            ...targetWindow,
            x: 18,
            y: 42,
            width: Math.max(getMinWindowWidth(id), window.innerWidth - 36),
            height: Math.max(getMinWindowHeight(id), window.innerHeight - 126),
            restore: {
              x: targetWindow.x,
              y: targetWindow.y,
              width: targetWindow.width,
              height: targetWindow.height,
            },
            zIndex: nextZ,
          },
        };
      });
    },
    [getNextZ]
  );

  const startWindowMove = useCallback(
    (id: WindowId, event: ReactPointerEvent<HTMLElement>) => {
      if (event.button !== 0) {
        return;
      }

      event.currentTarget.setPointerCapture(event.pointerId);
      focusWindow(id);
      const windowElement = event.currentTarget.closest<HTMLElement>(
        ".window, .sticky-widget"
      );

      windowElement?.classList.add("is-moving");

      interactionRef.current = {
        mode: "window-move",
        id,
        pointerX: event.clientX,
        pointerY: event.clientY,
        startX: windows[id].x,
        startY: windows[id].y,
        width: windows[id].width,
        height: windows[id].height,
        latestX: windows[id].x,
        latestY: windows[id].y,
        element: windowElement,
      };
    },
    [focusWindow, windows]
  );

  const startWindowResize = useCallback(
    (
      id: WindowId,
      direction: ResizeDirection,
      event: ReactPointerEvent<HTMLButtonElement>
    ) => {
      if (event.button !== 0) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.currentTarget.setPointerCapture(event.pointerId);
      focusWindow(id);

      interactionRef.current = {
        mode: "window-resize",
        id,
        direction,
        pointerX: event.clientX,
        pointerY: event.clientY,
        startX: windows[id].x,
        startY: windows[id].y,
        startWidth: windows[id].width,
        startHeight: windows[id].height,
      };
    },
    [focusWindow, windows]
  );

  const startFileMove = useCallback(
    (id: DesktopFileId, event: ReactPointerEvent<HTMLButtonElement>) => {
      if (event.button !== 0) {
        return;
      }

      const targetFile = desktopFiles.find((file) => file.id === id);

      if (!targetFile) {
        return;
      }

      event.stopPropagation();
      event.currentTarget.setPointerCapture(event.pointerId);
      setSelectedDesktopFile(id);

      interactionRef.current = {
        mode: "file-move",
        id,
        pointerX: event.clientX,
        pointerY: event.clientY,
        startX: targetFile.x,
        startY: targetFile.y,
      };
    },
    [desktopFiles]
  );

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const session = interactionRef.current;

      if (!session) {
        return;
      }

      if (session.mode === "file-move") {
        setDesktopFiles((current) =>
          current.map((file) => {
            if (file.id !== session.id) {
              return file;
            }

            const nextX = clamp(
              session.startX + event.clientX - session.pointerX,
              8,
              Math.max(8, window.innerWidth - 116)
            );
            const nextY = clamp(
              session.startY + event.clientY - session.pointerY,
              36,
              Math.max(36, window.innerHeight - 188)
            );

            return {
              ...file,
              x: nextX,
              y: nextY,
            };
          })
        );
        return;
      }

      if (session.mode === "window-move" && session.element) {
        const maxX = Math.max(8, window.innerWidth - 180);
        const maxY = Math.max(36, window.innerHeight - 116);
        const nextX = clamp(
          session.startX + event.clientX - session.pointerX,
          8 - session.width * 0.58,
          maxX
        );
        const nextY = clamp(
          session.startY + event.clientY - session.pointerY,
          34,
          maxY
        );

        session.latestX = nextX;
        session.latestY = nextY;
        session.element.style.setProperty("--window-x", `${nextX}px`);
        session.element.style.setProperty("--window-y", `${nextY}px`);
        return;
      }

      setWindows((current) => {
        const targetWindow = current[session.id];

        if (session.mode === "window-move") {
          const maxX = Math.max(8, window.innerWidth - 180);
          const maxY = Math.max(36, window.innerHeight - 116);
          const nextX = clamp(
            session.startX + event.clientX - session.pointerX,
            8 - session.width * 0.58,
            maxX
          );
          const nextY = clamp(
            session.startY + event.clientY - session.pointerY,
            34,
            maxY
          );

          session.latestX = nextX;
          session.latestY = nextY;

          return {
            ...current,
            [session.id]: {
              ...targetWindow,
              x: nextX,
              y: nextY,
              restore: null,
            },
          };
        }

        const deltaX = event.clientX - session.pointerX;
        const deltaY = event.clientY - session.pointerY;
        const right = session.startX + session.startWidth;
        const bottom = session.startY + session.startHeight;
        const minWidth = getMinWindowWidth(session.id);
        const minHeight = getMinWindowHeight(session.id);
        let x = session.startX;
        let y = session.startY;
        let width = session.startWidth;
        let height = session.startHeight;

        if (session.direction.includes("e")) {
          width = clamp(
            session.startWidth + deltaX,
            minWidth,
            Math.max(minWidth, window.innerWidth - session.startX - 12)
          );
        }

        if (session.direction.includes("s")) {
          height = clamp(
            session.startHeight + deltaY,
            minHeight,
            Math.max(minHeight, window.innerHeight - session.startY - 86)
          );
        }

        if (session.direction.includes("w")) {
          width = clamp(
            session.startWidth - deltaX,
            minWidth,
            Math.max(minWidth, right - 8)
          );
          x = right - width;
        }

        if (session.direction.includes("n")) {
          height = clamp(
            session.startHeight - deltaY,
            minHeight,
            Math.max(minHeight, bottom - 34)
          );
          y = bottom - height;
        }

        return {
          ...current,
          [session.id]: {
            ...targetWindow,
            x,
            y,
            width,
            height,
            restore: null,
          },
        };
      });
    };

    const stopInteraction = () => {
      const session = interactionRef.current;

      if (session?.mode === "window-move") {
        session.element?.classList.remove("is-moving");

        setWindows((current) => {
          const targetWindow = current[session.id];

          return {
            ...current,
            [session.id]: {
              ...targetWindow,
              x: session.latestX,
              y: session.latestY,
              restore: null,
            },
          };
        });
      }

      interactionRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopInteraction);
    window.addEventListener("pointercancel", stopInteraction);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopInteraction);
      window.removeEventListener("pointercancel", stopInteraction);
    };
  }, []);

  return {
    activeWindowId,
    closeWindow,
    desktopFiles,
    focusWindow,
    openDockApp,
    openWindow,
    openWindows,
    selectedDesktopFile,
    setSelectedDesktopFile,
    startFileMove,
    startWindowMove,
    startWindowResize,
    toggleZoomWindow,
  };
}
