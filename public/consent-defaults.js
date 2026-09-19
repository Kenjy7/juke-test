// Google Consent Mode v2 defaults.
//
// Extern bestand in plaats van een inline script: de CSP in netlify.toml staat
// voor script-src geen 'unsafe-inline' toe. Vanaf hier valt het onder 'self'.
//
// Synchroon geladen als eerste script in <head>, zodat de defaults in de
// dataLayer staan vóór gtag.js (GA4) ooit laadt. GA4 laadt pas na toestemming
// (useCookieConsent.js); de 'update' die daar gepusht wordt, bepaalt dan wat mag.
// Zo gebruikt GA4 bijvoorbeeld geen advertentiesignalen als alleen de
// analytics-categorie is aanvaard.
//
// window.gtag wordt hier bewust NIET gezet — useAnalytics.js en main.js gebruiken
// het bestaan daarvan als check of GA4 zelf geladen is.
;(function (w) {
  w.dataLayer = w.dataLayer || []
  function gtag() {
    w.dataLayer.push(arguments)
  }

  // Alles standaard geweigerd; security_storage is strikt noodzakelijk.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500,
  })
})(window)
