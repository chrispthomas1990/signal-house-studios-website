import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/brand/shs-gold-logo.svg";
import monogram from "../../assets/brand/shs-gold-monogram.svg";
import { mainNavigation } from "../../content/navigation";
import { siteInfo } from "../../content/siteInfo";
import { BlackBenchLogo } from "../BlackBenchLogo/BlackBenchLogo";
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
  const mobileNavRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const wasMenuOpenRef = useRef(false);

  useEffect(() => {
    if (isMenuOpen) {
      mobileNavRef.current?.removeAttribute("inert");
      wasMenuOpenRef.current = true;

      const frameId = window.requestAnimationFrame(() => {
        mobileNavRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      });
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsMenuOpen(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.cancelAnimationFrame(frameId);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }

    mobileNavRef.current?.setAttribute("inert", "");

    if (wasMenuOpenRef.current) {
      menuToggleRef.current?.focus();
      wasMenuOpenRef.current = false;
    }
  }, [isMenuOpen]);

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
              <NavLink to={item.href} aria-label={item.label}>
                {item.label}
              </NavLink>
            </div>
          ))}

          <NavLink to="/contact" className="button site-nav__cta">
            Let’s Talk
          </NavLink>

          <div className="site-nav__item">
            <NavLink to="/black-bench" aria-label="Black Bench" className="black-bench-link">
              <BlackBenchLogo className="black-bench-logo" />
            </NavLink>
          </div>
        </nav>

        <button
          ref={menuToggleRef}
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        ref={mobileNavRef}
        id="mobile-navigation"
        className={`site-nav-mobile ${isMenuOpen ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
      >
        {mainNavigation.map((item) => (
          <div key={item.href} className="site-nav-mobile__item">
            <NavLink to={item.href} aria-label={item.label} onClick={closeMenu}>
              {item.label}
            </NavLink>
          </div>
        ))}

        <NavLink to="/contact" className="button site-nav__cta" onClick={closeMenu}>
          Let’s Talk
        </NavLink>

        <div className="site-nav-mobile__item">
          <NavLink
            to="/black-bench"
            aria-label="Black Bench"
            className="black-bench-link"
            onClick={closeMenu}
          >
            <BlackBenchLogo className="black-bench-logo" />
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
