import { X } from "lucide-react";
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
} from "react";
import type { ResizeDirection, WindowState } from "../types";

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

type StickyWidgetProps = {
  sticky: {
    color: "yellow" | "pink" | "blue";
    title: string;
    body: string;
  };
  windowState: WindowState;
  onClose: () => void;
  onFocus: () => void;
  onMoveStart: (event: ReactPointerEvent<HTMLElement>) => void;
  onResizeStart: (
    direction: ResizeDirection,
    event: ReactPointerEvent<HTMLButtonElement>
  ) => void;
};

export default function StickyWidget({
  sticky,
  windowState,
  onClose,
  onFocus,
  onMoveStart,
  onResizeStart,
}: StickyWidgetProps) {
  const style = {
    "--window-x": `${windowState.x}px`,
    "--window-y": `${windowState.y}px`,
    "--window-width": `${windowState.width}px`,
    "--window-height": `${windowState.height}px`,
    zIndex: windowState.zIndex,
  } as CSSProperties;

  return (
    <article
      className={`sticky-widget ${sticky.color}`}
      style={style}
      aria-label={sticky.title}
      onPointerDown={onFocus}
    >
      <header className="sticky-widget-titlebar" onPointerDown={onMoveStart}>
        <button
          className="sticky-close"
          type="button"
          aria-label={`Close ${sticky.title}`}
          title="Close"
          onClick={onClose}
          onPointerDown={(event) => event.stopPropagation()}
        >
          <X size={8} strokeWidth={3} aria-hidden="true" />
        </button>
      </header>
      <div className="sticky-widget-content">
        <h2>{sticky.title}</h2>
        <p>{sticky.body}</p>
      </div>
      {resizeDirections.map((direction) => (
        <button
          className={`resize-handle resize-${direction}`}
          key={direction}
          type="button"
          aria-label={`Resize sticky ${direction}`}
          title="Resize"
          onPointerDown={(event) => onResizeStart(direction, event)}
        />
      ))}
    </article>
  );
}
