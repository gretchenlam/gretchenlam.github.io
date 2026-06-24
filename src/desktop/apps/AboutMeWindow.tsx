import { aboutMe } from "../desktopData";
import { getAssetUrl } from "../desktopUtils";

export default function AboutMeWindow() {
  return (
    <section className="about-window-body" aria-label="About Me">
      <img src={getAssetUrl(aboutMe.profilePic)} alt="" />
      <h2>{aboutMe.name}</h2>
      <p>Software Engineer</p>
      <dl>
        {aboutMe.rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
