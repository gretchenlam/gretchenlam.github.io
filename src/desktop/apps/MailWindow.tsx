import { CircleUserRound } from "lucide-react";

export default function MailWindow() {
  return (
    <div className="mail-window-body">
      <aside className="mail-sidebar" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </aside>
      <section className="contact-card" aria-label="Contact card">
        <div className="contact-avatar" aria-hidden="true">
          <CircleUserRound size={72} strokeWidth={1.2} />
        </div>
        <div className="contact-lines" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="contact-actions" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>
    </div>
  );
}
