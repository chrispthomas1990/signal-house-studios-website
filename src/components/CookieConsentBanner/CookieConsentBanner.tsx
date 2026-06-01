import { useState } from "react";
import { Link } from "react-router-dom";
import "./CookieConsentBanner.css";

type CookieConsentStatus = "accepted" | "rejected";

const cookieConsentStorageKey = "signalHouseCookieConsent";

function getStoredConsent(): CookieConsentStatus | null {
  try {
    if (typeof window === "undefined") {
      return null;
    }

    const storedConsent = window.localStorage.getItem(cookieConsentStorageKey);

    return storedConsent === "accepted" || storedConsent === "rejected" ? storedConsent : null;
  } catch {
    return null;
  }
}

function storeConsent(status: CookieConsentStatus) {
  try {
    window.localStorage.setItem(cookieConsentStorageKey, status);
  } catch {
    // If storage is blocked, keep the UI usable for this session.
  }

  window.dispatchEvent(
    new CustomEvent("signalHouseCookieConsentChange", {
      detail: { status },
    }),
  );
}

export function CookieConsentBanner() {
  const [consentStatus, setConsentStatus] = useState<CookieConsentStatus | null>(getStoredConsent);

  const handleConsent = (status: CookieConsentStatus) => {
    storeConsent(status);
    setConsentStatus(status);
  };

  if (consentStatus !== null) {
    return null;
  }

  return (
    <aside className="cookie-consent" aria-label="Cookie consent">
      <div className="cookie-consent__content">
        <p>
          We use essential cookies to keep the site working. With your permission, we may also use
          analytics or third-party embeds to improve the site.
        </p>
        <Link to="/cookie-policy">Cookie Policy</Link>
      </div>

      <div className="cookie-consent__actions">
        <button type="button" onClick={() => handleConsent("rejected")}>
          Reject
        </button>
        <button
          className="cookie-consent__button--primary"
          type="button"
          onClick={() => handleConsent("accepted")}
        >
          Accept
        </button>
      </div>
    </aside>
  );
}
