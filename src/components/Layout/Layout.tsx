import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CookieConsentBanner } from "../CookieConsentBanner/CookieConsentBanner";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

function RouteContent() {
  const { pathname } = useLocation();
  const previousPathRef = useRef(pathname);

  useEffect(() => {
    if (previousPathRef.current === pathname) return;

    previousPathRef.current = pathname;
    const frameId = window.requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLElement>("#main-content h1");

      if (!heading) return;

      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
      heading.addEventListener("blur", () => heading.removeAttribute("tabindex"), { once: true });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname]);

  return <Outlet />;
}

export function Layout() {
  return (
    <>
      <a className="button skip-link" href="#main-content">
        <span className="button__label">Skip to content</span>
      </a>
      <Header />
      <main className="site-main" id="main-content" tabIndex={-1}>
        <RouteContent />
      </main>
      <Footer />
      <CookieConsentBanner />
    </>
  );
}
