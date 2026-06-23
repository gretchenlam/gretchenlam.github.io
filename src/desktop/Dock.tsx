import { getAssetUrl } from "./desktopUtils";
import type { DockApp, WindowId, WindowState } from "./types";

type DockProps = {
  apps: DockApp[];
  windows: WindowState[];
  onOpen: (id: WindowId) => void;
};

export default function Dock({ apps, windows, onOpen }: DockProps) {
  return (
    <nav className="dock" aria-label="Dock">
      {apps.map((app) => {
        const isOpen = windows.some(
          (windowState) => windowState.id === app.id && windowState.isOpen
        );

        return (
          <button
            className={`dock-item ${isOpen ? "open" : ""}`}
            key={app.id}
            type="button"
            aria-label={app.label}
            title={app.label}
            onClick={() => onOpen(app.id)}
          >
            <img src={getAssetUrl(app.iconSrc)} alt="" aria-hidden="true" />
          </button>
        );
      })}
    </nav>
  );
}
