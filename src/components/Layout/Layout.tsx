import { Outlet } from "react-router-dom";
import { CookieConsentBanner } from "../CookieConsentBanner/CookieConsentBanner";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export function Layout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main className="site-main" id="main-content">
        <Outlet />
      </main>
      <Footer />
      <CookieConsentBanner />
    </>
  );
}
