import { memo, useState } from "react";
import { photoSections } from "../desktopData";
import { getAssetUrl } from "../desktopUtils";

function PhotosWindow() {
  const [selectedSectionId, setSelectedSectionId] = useState(photoSections[0].id);
  const selectedSection =
    photoSections.find((section) => section.id === selectedSectionId) ??
    photoSections[0];

  return (
    <div className="photos-window-body">
      <div className="photos-sidebar" aria-label="Photos navigation">
        <strong>Library</strong>
        {photoSections.map((section) => (
          <button
            className={selectedSection.id === section.id ? "selected" : ""}
            type="button"
            key={section.id}
            onClick={() => setSelectedSectionId(section.id)}
          >
            {section.sidebarLabel}
          </button>
        ))}
      </div>
      <section className="photos-content" aria-label="Photo library">
        <div className="photos-toolbar">
          <strong>{selectedSection.title}</strong>
          <span>{selectedSection.photos.length} Photos</span>
        </div>
        <div className="photo-grid">
          {selectedSection.photos.map((photo) => (
            <img
              src={getAssetUrl(photo.src)}
              alt={photo.alt}
              key={photo.src}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default memo(PhotosWindow);
