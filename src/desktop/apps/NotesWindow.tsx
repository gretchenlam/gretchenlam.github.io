import { useState } from "react";
import { noteGroups } from "../desktopData";
import { getAssetUrl } from "../desktopUtils";

const flattenedNotes = noteGroups.flatMap((group) => group.notes);

export default function NotesWindow() {
  const [selectedNoteId, setSelectedNoteId] = useState(flattenedNotes[0].id);
  const activeNote =
    flattenedNotes.find((note) => note.id === selectedNoteId) ?? flattenedNotes[0];

  return (
    <div className="notes-window-body">
      <div className="notes-main">
        <aside className="notes-sidebar" aria-label="Notes pages">
          {noteGroups.map((group) => (
            <section className="note-date-group" key={group.label}>
              <h3>{group.label}</h3>
              {group.notes.map((note) => (
                <button
                  className={`note-page-button ${
                    activeNote.id === note.id ? "selected" : ""
                  }`}
                  key={note.id}
                  type="button"
                  aria-label={note.title}
                  onClick={() => setSelectedNoteId(note.id)}
                >
                  <strong>{note.title}</strong>
                  <span>
                    {note.date} {note.preview}
                  </span>
                </button>
              ))}
            </section>
          ))}
        </aside>
        <section className="note-editor" aria-label={activeNote.title}>
          <article className="note-paper">
            <time>{activeNote.date}</time>
            <h2>{activeNote.title}</h2>
            <p>{activeNote.body}</p>
            {activeNote.imageSrc && activeNote.repoUrl && (
              <a
                className="note-image-link"
                href={activeNote.repoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${activeNote.title} repository`}
              >
                <img src={getAssetUrl(activeNote.imageSrc)} alt="" />
              </a>
            )}
            {activeNote.imageSrc && !activeNote.repoUrl && (
              <img src={getAssetUrl(activeNote.imageSrc)} alt="" />
            )}
          </article>
        </section>
      </div>
    </div>
  );
}
