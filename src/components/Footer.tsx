import { NavLink } from "react-router-dom";
import { navigation } from "../content/navigation";
import { siteInfo } from "../content/siteInfo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <h2>{siteInfo.name}</h2>
        <p>{siteInfo.location}</p>
      </div>

      <nav aria-label="Footer navigation">
        {navigation.map((item) => (
          <NavLink key={item.href} to={item.href}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div>
        <p>
          <a href={`tel:${siteInfo.phone}`}>{siteInfo.phone}</a>
        </p>
        <p>
          <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
        </p>
      </div>

      <p>{siteInfo.copyright}</p>
    </footer>
  );
}