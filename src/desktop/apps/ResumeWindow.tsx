import { memo, useEffect, useRef, useState } from "react";
import { resumePages } from "../desktopData";
import { clamp, getAssetUrl } from "../desktopUtils";

function ResumeWindow() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(58);

  useEffect(() => {
    const viewer = viewerRef.current;

    if (!viewer) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) {
        return;
      }

      event.preventDefault();
      setZoom((current) =>
        clamp(current + (event.deltaY < 0 ? 8 : -8), 46, 170)
      );
    };

    viewer.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      viewer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      className="preview-surface"
      aria-label="Resume PDF preview"
      ref={viewerRef}
      tabIndex={0}
    >
      <div className="resume-scroll">
        {resumePages.map((page) => (
          <img
            className="resume-page-image"
            src={getAssetUrl(page)}
            alt="Resume page"
            key={page}
            style={{ width: `${zoom}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(ResumeWindow);
