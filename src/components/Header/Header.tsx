import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/shs-gold-logo.svg";
import monogram from "../../assets/shs-gold-monogram.svg";
import { mainNavigation } from "../../content/navigation";
import { siteInfo } from "../../content/siteInfo";
import "./Header.css";

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-logo ${compact ? "brand-logo--compact" : ""}`}>
      <img
        src={compact ? monogram : logo}
        alt=""
        className={compact ? "brand-logo__monogram" : "brand-logo__full"}
        aria-hidden="true"
      />
    </span>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className={`site-header ${isMenuOpen ? "site-header--menu-open" : ""}`}>
      <div className="site-header__inner">
        <NavLink to="/" className="site-logo" onClick={closeMenu}>
          <Logo />
          <Logo compact />
          <span className="visually-hidden">{siteInfo.name}</span>
        </NavLink>

        <nav className="site-nav site-nav--desktop" aria-label="Main navigation">
          {mainNavigation.map((item) => (
            <div key={item.href} className="site-nav__item">
              <NavLink to={item.href}>{item.label}</NavLink>
            </div>
          ))}

          <NavLink to="/contact" className="site-nav__cta">
            Let’s Talk
          </NavLink>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        className={`site-nav-mobile ${isMenuOpen ? "is-open" : ""}`}
        aria-label="Mobile navigation"
      >
        {mainNavigation.map((item) => (
          <div key={item.href} className="site-nav-mobile__item">
            <NavLink to={item.href} onClick={closeMenu}>
              {item.label}
            </NavLink>
          </div>
        ))}

        <NavLink to="/contact" className="site-nav__cta" onClick={closeMenu}>
          Let’s Talk
        </NavLink>
      </nav>
    </header>
  );
}
