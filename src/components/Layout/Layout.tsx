import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CookieConsentBanner } from "../CookieConsentBanner/CookieConsentBanner";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export function Layout() {
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

  return (
    <>
      <a className="button skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main className="site-main" id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <CookieConsentBanner />
    </>
  );
}
