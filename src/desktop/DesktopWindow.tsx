import { Maximize2, Minus, X } from "lucide-react";
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import { windowTitles } from "./desktopData";
import type { ResizeDirection, WindowState } from "./types";

const resizeDirections: ResizeDirection[] = [
  "n",
  "s",
  "e",
  "w",
  "ne",
  "nw",
  "se",
  "sw",
];

type DesktopWindowProps = {
  windowState: WindowState;
  children: ReactNode;
  onClose: () => void;
  onFocus: () => void;
  onMoveStart: (event: ReactPointerEvent<HTMLElement>) => void;
  onResizeStart: (
    direction: ResizeDirection,
    event: ReactPointerEvent<HTMLButtonElement>
  ) => void;
  onZoom: () => void;
};

export default function DesktopWindow({
  windowState,
  children,
  onClose,
  onFocus,
  onMoveStart,
  onResizeStart,
  onZoom,
}: DesktopWindowProps) {
  const style = {
    "--window-x": `${windowState.x}px`,
    "--window-y": `${windowState.y}px`,
    "--window-width": `${windowState.width}px`,
    "--window-height": `${windowState.height}px`,
    zIndex: windowState.zIndex,
  } as CSSProperties;

  return (
    <article
      className={`window ${windowState.id}-window`}
      style={style}
      aria-label={windowTitles[windowState.id]}
      onPointerDown={onFocus}
    >
      <header className="window-titlebar" onPointerDown={onMoveStart}>
        <div className="traffic-lights" onPointerDown={(event) => event.stopPropagation()}>
          <button
            className="traffic-light close"
            type="button"
            aria-label="Close"
            title="Close"
            onClick={onClose}
          >
            <X size={10} strokeWidth={3} aria-hidden="true" />
          </button>
          <button
            className="traffic-light minimize"
            type="button"
            aria-label="Minimize"
            title="Minimize"
            onClick={onClose}
          >
            <Minus size={10} strokeWidth={3} aria-hidden="true" />
          </button>
          <button
            className="traffic-light zoom"
            type="button"
            aria-label="Zoom"
            title="Zoom"
            onClick={onZoom}
          >
            <Maximize2 size={8} strokeWidth={3} aria-hidden="true" />
          </button>
        </div>
        <strong>{windowTitles[windowState.id]}</strong>
      </header>
      <div className="window-body">{children}</div>
      {resizeDirections.map((direction) => (
        <button
          className={`resize-handle resize-${direction}`}
          key={direction}
          type="button"
          aria-label={`Resize window ${direction}`}
          title="Resize"
          onPointerDown={(event) => onResizeStart(direction, event)}
        />
      ))}
    </article>
  );
}
