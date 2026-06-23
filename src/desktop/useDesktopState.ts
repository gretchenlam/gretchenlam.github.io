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
} from "./desktopData";
import { clamp } from "./desktopUtils";
import type {
  DesktopFileId,
  InteractionSession,
  ResizeDirection,
  WindowId,
} from "./types";

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
            width: Math.max(MIN_WINDOW_WIDTH, window.innerWidth - 36),
            height: Math.max(MIN_WINDOW_HEIGHT, window.innerHeight - 126),
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

      interactionRef.current = {
        mode: "window-move",
        id,
        pointerX: event.clientX,
        pointerY: event.clientY,
        startX: windows[id].x,
        startY: windows[id].y,
        width: windows[id].width,
        height: windows[id].height,
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
        let x = session.startX;
        let y = session.startY;
        let width = session.startWidth;
        let height = session.startHeight;

        if (session.direction.includes("e")) {
          width = clamp(
            session.startWidth + deltaX,
            MIN_WINDOW_WIDTH,
            Math.max(MIN_WINDOW_WIDTH, window.innerWidth - session.startX - 12)
          );
        }

        if (session.direction.includes("s")) {
          height = clamp(
            session.startHeight + deltaY,
            MIN_WINDOW_HEIGHT,
            Math.max(MIN_WINDOW_HEIGHT, window.innerHeight - session.startY - 86)
          );
        }

        if (session.direction.includes("w")) {
          width = clamp(
            session.startWidth - deltaX,
            MIN_WINDOW_WIDTH,
            Math.max(MIN_WINDOW_WIDTH, right - 8)
          );
          x = right - width;
        }

        if (session.direction.includes("n")) {
          height = clamp(
            session.startHeight - deltaY,
            MIN_WINDOW_HEIGHT,
            Math.max(MIN_WINDOW_HEIGHT, bottom - 34)
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
