import { NavLink } from "react-router-dom";
import emailIcon from "../assets/shs-gold-email.svg";
import facebookIcon from "../assets/shs-gold-facebook.svg";
import instagramIcon from "../assets/shs-gold-instagram.svg";
import locationIcon from "../assets/shs-gold-location.svg";
import monogram from "../assets/shs-gold-monogram.svg";
import phoneIcon from "../assets/shs-gold-phone.svg";
import tidalIcon from "../assets/shs-gold-tidal.svg";
import youtubeIcon from "../assets/shs-gold-youtube.svg";
import { footerNavigation } from "../content/navigation";
import { siteInfo } from "../content/siteInfo";

const socialIcons: Record<string, string> = {
  Facebook: facebookIcon,
  Instagram: instagramIcon,
  Tidal: tidalIcon,
  YouTube: youtubeIcon,
};

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__columns">
          <div className="site-footer__column">
            <h2>Sitemap</h2>

            <nav className="footer-nav" aria-label="Footer navigation">
              {footerNavigation.map((item) => (
                <NavLink key={item.href} to={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="site-footer__column">
            <h2>Get in Touch</h2>

            <div className="footer-contact">
              <div className="footer-contact__item">
                <img className="footer-contact__icon--location" src={locationIcon} alt="" aria-hidden="true" />
                <p>
                  {siteInfo.name}
                  <br />
                  {siteInfo.location}
                </p>
              </div>
              <div className="footer-contact__item">
                <img className="footer-contact__icon--phone" src={phoneIcon} alt="" aria-hidden="true" />
                <a href={`tel:${siteInfo.phoneHref}`}>{siteInfo.phone}</a>
              </div>
              <div className="footer-contact__item">
                <img className="footer-contact__icon--email" src={emailIcon} alt="" aria-hidden="true" />
                <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
              </div>
            </div>
          </div>

          <div className="site-footer__column">
            <h2>Connect</h2>
            <div className="footer-socials">
              {siteInfo.socialLinks.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                  <img
                    className={`social-icon ${
                      item.label === "Tidal"
                        ? "social-icon--tidal"
                        : item.label === "YouTube"
                          ? "social-icon--youtube"
                          : ""
                    }`}
                    src={socialIcons[item.label]}
                    alt=""
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="site-footer__brand">
          <img className="site-footer__monogram" src={monogram} alt="" aria-hidden="true" />
          <p className="site-footer__copyright">{siteInfo.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
