import { BatteryMedium, Search, Wifi } from "lucide-react";
import { activeAppLabels, dockApps } from "./desktopData";
import { getAssetUrl, getMenuDateTimeLabel } from "./desktopUtils";
import DesktopFiles from "./DesktopFiles";
import DesktopWindow from "./DesktopWindow";
import Dock from "./Dock";
import BlankPdfWindow from "./apps/BlankPdfWindow";
import MailWindow from "./apps/MailWindow";
import NotesWindow from "./apps/NotesWindow";
import PhotosWindow from "./apps/PhotosWindow";
import { useDesktopState } from "./useDesktopState";
import "./Desktop.css";

export default function Desktop() {
  const desktop = useDesktopState();

  return (
    <main
      className="desktop-shell"
      aria-label="macOS style portfolio desktop"
      onPointerDown={() => desktop.setSelectedDesktopFile(null)}
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
          <span className="system-mark" role="img" aria-label="Gretchen">
            👩🏻‍💻
          </span>
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

      {desktop.openWindows.map((windowState) => (
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
          ) : (
            <BlankPdfWindow />
          )}
        </DesktopWindow>
      ))}

      <Dock apps={dockApps} windows={desktop.openWindows} onOpen={desktop.openWindow} />
    </main>
  );
}
