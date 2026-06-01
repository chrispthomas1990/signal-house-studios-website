import { Outlet } from "react-router-dom";
import { CookieConsentBanner } from "../CookieConsentBanner/CookieConsentBanner";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export function Layout() {
  return (
    <>
      <Header />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
      <CookieConsentBanner />
    </>
  );
}
