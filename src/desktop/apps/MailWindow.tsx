import { Mail } from "lucide-react";
import { memo, type ComponentType } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { mailContact } from "../desktopData";
import { getAssetUrl } from "../desktopUtils";

const contactIcons: Record<string, ComponentType> = {
  GitHub: FaGithub as ComponentType,
  LinkedIn: FaLinkedin as ComponentType,
  Instagram: FaInstagram as ComponentType,
};

function MailWindow() {
  return (
    <div className="mail-window-body">
      <section className="contact-card" aria-label="Contact card">
        <img src={getAssetUrl(mailContact.headshot)} alt="" />
        <div className="contact-copy">
          <p>Let's connect!</p>
          <h2>{mailContact.name}</h2>
          <a className="email-link" href={`mailto:${mailContact.email}`}>
            <Mail size={16} strokeWidth={2.1} aria-hidden="true" />
            {mailContact.email}
          </a>
        </div>
        <div className="contact-links">
          {mailContact.links.map((link) => {
            const Icon = contactIcons[link.label as keyof typeof contactIcons];

            return (
              <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                {Icon && (
                  <span className="contact-link-icon" aria-hidden="true">
                    <Icon />
                  </span>
                )}
                <span>{link.label}</span>
                <strong>{link.display}</strong>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default memo(MailWindow);
