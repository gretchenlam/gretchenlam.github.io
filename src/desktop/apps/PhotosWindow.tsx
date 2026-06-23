import { Image } from "lucide-react";

export default function PhotosWindow() {
  return (
    <div className="photos-window-body">
      <div className="photos-sidebar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <section className="photos-content" aria-label="Photo library">
        <div className="photos-toolbar" aria-hidden="true" />
        <div className="empty-photo-library" aria-hidden="true">
          <Image size={56} strokeWidth={1.35} />
        </div>
      </section>
    </div>
  );
}
