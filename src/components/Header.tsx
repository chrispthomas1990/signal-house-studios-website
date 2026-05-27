import { NavLink } from "react-router-dom";
import { navigation } from "../content/navigation";
import { siteInfo } from "../content/siteInfo";

export function Header() {
  return (
    <header className="site-header">
      <NavLink to="/" className="site-logo">
        {siteInfo.name}
      </NavLink>

      <nav className="site-nav" aria-label="Main navigation">
        {navigation
          .filter((item) => item.label !== "Home")
          .map((item) => (
            <NavLink key={item.href} to={item.href}>
              {item.label}
            </NavLink>
          ))}
      </nav>
    </header>
  );
}