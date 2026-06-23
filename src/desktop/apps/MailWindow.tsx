import { Mail } from "lucide-react";
import { mailContact } from "../desktopData";
import { getAssetUrl } from "../desktopUtils";

export default function MailWindow() {
  return (
    <div className="mail-window-body">
      <section className="contact-card" aria-label="Contact card">
        <img src={getAssetUrl(mailContact.headshot)} alt="" />
        <div className="contact-copy">
          <p>Contact Card</p>
          <h2>{mailContact.name}</h2>
          <a className="email-link" href={`mailto:${mailContact.email}`}>
            <Mail size={16} strokeWidth={2.1} aria-hidden="true" />
            {mailContact.email}
          </a>
        </div>
        <div className="contact-links">
          {mailContact.links.map((link) => (
            <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
              <span>{link.label}</span>
              <strong>{link.display}</strong>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
