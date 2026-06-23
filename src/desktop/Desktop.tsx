import { BatteryMedium, Search, Wifi } from "lucide-react";
import { useState } from "react";
import { activeAppLabels, dockApps, stickies } from "./desktopData";
import { getAssetUrl, getMenuDateTimeLabel } from "./desktopUtils";
import DesktopFiles from "./DesktopFiles";
import DesktopWindow from "./DesktopWindow";
import Dock from "./Dock";
import AboutMeWindow from "./apps/AboutMeWindow";
import MailWindow from "./apps/MailWindow";
import NotesWindow from "./apps/NotesWindow";
import PhotosWindow from "./apps/PhotosWindow";
import ResumeWindow from "./apps/ResumeWindow";
import StickyWidget from "./apps/StickyWidget";
import { useDesktopState } from "./useDesktopState";
import "./Desktop.css";

export default function Desktop() {
  const desktop = useDesktopState();
  const [systemMenuOpen, setSystemMenuOpen] = useState(false);

  return (
    <main
      className="desktop-shell"
      aria-label="macOS style portfolio desktop"
      onPointerDown={() => {
        desktop.setSelectedDesktopFile(null);
        setSystemMenuOpen(false);
      }}
    >
      <div
        className="wallpaper"
        style={{
          backgroundImage: `url(${getAssetUrl("img/26-Tahoe-Day.jpg")})`,
        }}
        aria-hidden="true"
      />

      <header className="menu-bar" aria-label="Menu bar">
        <div className="menu-left">
          <button
            className="system-mark"
            type="button"
            aria-label="Gretchen menu"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => setSystemMenuOpen((current) => !current)}
          >
            👩🏻‍💻
          </button>
          {systemMenuOpen && (
            <div
              className="system-menu"
              role="menu"
              onPointerDown={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  desktop.openWindow("about");
                  setSystemMenuOpen(false);
                }}
              >
                About Me
              </button>
            </div>
          )}
          <strong>{activeAppLabels[desktop.activeWindowId]}</strong>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Window</span>
        </div>
        <div className="menu-right" aria-label="System status">
          <Search size={15} strokeWidth={2.2} aria-hidden="true" />
          <Wifi size={16} strokeWidth={2.2} aria-hidden="true" />
          <BatteryMedium size={18} strokeWidth={2.2} aria-hidden="true" />
          <time>{getMenuDateTimeLabel()}</time>
        </div>
      </header>

      <DesktopFiles
        files={desktop.desktopFiles}
        selectedFile={desktop.selectedDesktopFile}
        onOpen={desktop.openWindow}
        onSelect={desktop.setSelectedDesktopFile}
        onMoveStart={desktop.startFileMove}
      />

      {desktop.openWindows.map((windowState) => {
        const sticky = stickies.find((item) => item.id === windowState.id);

        if (sticky) {
          return (
            <StickyWidget
              key={windowState.id}
              sticky={sticky}
              windowState={windowState}
              onClose={() => desktop.closeWindow(windowState.id)}
              onFocus={() => desktop.focusWindow(windowState.id)}
              onMoveStart={(event) => desktop.startWindowMove(windowState.id, event)}
              onResizeStart={(direction, event) =>
                desktop.startWindowResize(windowState.id, direction, event)
              }
            />
          );
        }

        return (
          <DesktopWindow
            key={windowState.id}
            windowState={windowState}
            onClose={() => desktop.closeWindow(windowState.id)}
            onFocus={() => desktop.focusWindow(windowState.id)}
            onMoveStart={(event) => desktop.startWindowMove(windowState.id, event)}
            onResizeStart={(direction, event) =>
              desktop.startWindowResize(windowState.id, direction, event)
            }
            onZoom={() => desktop.toggleZoomWindow(windowState.id)}
          >
            {windowState.id === "photos" ? (
              <PhotosWindow />
            ) : windowState.id === "mail" ? (
              <MailWindow />
            ) : windowState.id === "notes" ? (
              <NotesWindow />
            ) : windowState.id === "about" ? (
              <AboutMeWindow />
            ) : (
              <ResumeWindow />
            )}
          </DesktopWindow>
        );
      })}

      <Dock apps={dockApps} windows={desktop.openWindows} onOpen={desktop.openDockApp} />
    </main>
  );
}
