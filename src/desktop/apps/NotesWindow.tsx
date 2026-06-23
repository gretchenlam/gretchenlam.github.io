import { useState } from "react";

const notePages = [0, 1, 2];

export default function NotesWindow() {
  const [selectedPage, setSelectedPage] = useState(0);

  return (
    <div className="notes-window-body">
      <aside className="notes-sidebar" aria-label="Notes pages">
        {notePages.map((page) => (
          <button
            className={`note-page-button ${selectedPage === page ? "selected" : ""}`}
            key={page}
            type="button"
            aria-label={`Note ${page + 1}`}
            onClick={() => setSelectedPage(page)}
          >
            <span />
            <span />
          </button>
        ))}
      </aside>
      <section className="note-editor" aria-label={`Note page ${selectedPage + 1}`}>
        <div className="note-paper" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
    </div>
  );
}
