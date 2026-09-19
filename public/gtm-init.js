// Google Consent Mode v2 defaults + Google Tag Manager bootstrap.
//
// Extern bestand in plaats van Google's inline snippet: de CSP in netlify.toml
// staat voor script-src geen 'unsafe-inline' toe, dus inline blokken worden door
// de browser geblokkeerd. Vanaf hier valt het onder 'self'.
//
// Synchroon geladen (geen async/defer) als eerste script in <head>, zodat de
// consent-defaults in de dataLayer staan vóór GTM start.
// window.gtag wordt hier bewust NIET gezet — useAnalytics.js en main.js gebruiken
// het bestaan daarvan als check of GA4 zelf geladen is.
;(function (w, d) {
  w.dataLayer = w.dataLayer || []
  function gtag() {
    w.dataLayer.push(arguments)
  }

  // Alles standaard geweigerd; security_storage is strikt noodzakelijk. De
  // 'update' volgt uit src/composables/useCookieConsent.js zodra de bezoeker kiest.
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

  // Google Tag Manager (GTM-W7D44H6H)
  w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
  var j = d.createElement('script')
  j.async = true
  j.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-W7D44H6H'
  var f = d.getElementsByTagName('script')[0]
  if (f && f.parentNode) f.parentNode.insertBefore(j, f)
  else d.head.appendChild(j)
})(window, document)
