import { NavLink } from "react-router-dom";
import monogram from "../../assets/brand/shs-gold-monogram.svg";
import emailIcon from "../../assets/icons/contact/shs-gold-email.svg";
import locationIcon from "../../assets/icons/contact/shs-gold-location.svg";
import phoneIcon from "../../assets/icons/contact/shs-gold-phone.svg";
import facebookIcon from "../../assets/icons/social/shs-gold-facebook.svg";
import instagramIcon from "../../assets/icons/social/shs-gold-instagram.svg";
import tidalIcon from "../../assets/icons/social/shs-gold-tidal.svg";
import youtubeIcon from "../../assets/icons/social/shs-gold-youtube.svg";
import { footerNavigation } from "../../content/navigation";
import { siteInfo } from "../../content/siteInfo";
import "./Footer.css";

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
                <img
                  className="footer-contact__icon--location"
                  src={locationIcon}
                  alt=""
                  aria-hidden="true"
                />
                <p>
                  {siteInfo.name}
                  <br />
                  {siteInfo.location}
                </p>
              </div>
              <div className="footer-contact__item">
                <img
                  className="footer-contact__icon--phone"
                  src={phoneIcon}
                  alt=""
                  aria-hidden="true"
                />
                <a href={`tel:${siteInfo.phoneHref}`}>{siteInfo.phone}</a>
              </div>
              <div className="footer-contact__item">
                <img
                  className="footer-contact__icon--email"
                  src={emailIcon}
                  alt=""
                  aria-hidden="true"
                />
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
          <NavLink to="/" className="site-footer__logo">
            <img className="site-footer__monogram" src={monogram} alt="" aria-hidden="true" />
            <span className="visually-hidden">{siteInfo.name}</span>
          </NavLink>
          <div className="site-footer__legal">
            <div className="site-footer__legal-links">
              <NavLink to="/privacy-policy">Privacy Policy</NavLink>
              <NavLink to="/cookie-policy">Cookie Policy</NavLink>
            </div>
            <p className="site-footer__copyright">{siteInfo.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
