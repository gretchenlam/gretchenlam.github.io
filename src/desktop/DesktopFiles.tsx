import { FileText } from "lucide-react";
import type {
  DesktopFileId,
  DesktopFileState,
  WindowId,
} from "./types";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

type DesktopFilesProps = {
  files: DesktopFileState[];
  selectedFile: DesktopFileId | null;
  onOpen: (id: WindowId) => void;
  onSelect: (id: DesktopFileId) => void;
  onMoveStart: (
    id: DesktopFileId,
    event: ReactPointerEvent<HTMLButtonElement>
  ) => void;
};

export default function DesktopFiles({
  files,
  selectedFile,
  onOpen,
  onSelect,
  onMoveStart,
}: DesktopFilesProps) {
  return (
    <section className="desktop-files" aria-label="Desktop files">
      {files.map((file) => (
        <button
          className={`desktop-file ${selectedFile === file.id ? "selected" : ""}`}
          key={file.id}
          style={
            {
              "--desktop-x": `${file.x}px`,
              "--desktop-y": `${file.y}px`,
            } as CSSProperties
          }
          type="button"
          aria-label={`Open ${file.label}`}
          onPointerDown={(event) => onMoveStart(file.id, event)}
          onClick={() => onSelect(file.id)}
          onDoubleClick={() => onOpen(file.id)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              onOpen(file.id);
            }
          }}
        >
          <span className="pdf-icon" aria-hidden="true">
            <FileText size={34} strokeWidth={1.7} />
          </span>
          <span className="desktop-file-label">{file.label}</span>
        </button>
      ))}
    </section>
  );
}
