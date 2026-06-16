// ============================================================================
// Canonieke organisatie-schema (single source of truth)
// ============================================================================
// Eén LocalBusiness/ProfessionalService-definitie voor de hele site. Globaal
// uitgezonden in App.vue; alle andere schema's (WebSite, WebPage, Service, ...)
// verwijzen ernaar via { '@id': ORG_ID } — nooit een tweede org-blok definiëren.
//
// NAP wijzigen? Doe het hier. Houd dit gelijk aan Google Business Profile,
// footer, contactpagina en de Belgische directories (Gouden Gids, Infobel, ...).

export const SITE_URL = 'https://jukecoding.be'
export const ORG_ID = `${SITE_URL}/#organization`

/** Verwijzing naar de canonieke organisatie, voor gebruik in andere schema's. */
export const orgRef = { '@id': ORG_ID }

export const organizationSchema = {
  '@context': 'https://schema.org',
  // ProfessionalService = meest specifieke schema.org-subtype voor een
  // web-/AI-bureau (er bestaat geen WebDesignCompany-type).
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: 'Juke',
  alternateName: 'Juke Coding',
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/favicon-512x512.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "SaaS-platformen, AI-oplossingen en websites voor Belgische KMO's. Development studio in Hasselt (Limburg) — digitale oplossingen die tijd besparen en meer leads opleveren.",
  // Service-area business: geen streetAddress, adres verborgen. Enkel plaats/regio.
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hasselt',
    addressRegion: 'Limburg',
    postalCode: '3500',
    addressCountry: 'BE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 50.9307,
    longitude: 5.3378,
  },
  telephone: '+32479131715',
  email: 'contact@jukecoding.be',
  currenciesAccepted: 'EUR',
  priceRange: '€€',
  // vatID: 'BE0xxx.xxx.xxx', // TODO: toevoegen zodra het ondernemingsnummer er is
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  // Eerlijke service-area (Limburg-kern + Vlaanderen). Houd dit gelijk aan de
  // service-area in Google Business Profile — niet oprekken naar verre steden.
  areaServed: [
    { '@type': 'City', name: 'Hasselt' },
    { '@type': 'City', name: 'Genk' },
    { '@type': 'City', name: 'Sint-Truiden' },
    { '@type': 'City', name: 'Tongeren' },
    { '@type': 'AdministrativeArea', name: 'Limburg' },
    { '@type': 'AdministrativeArea', name: 'Vlaanderen' },
  ],
  knowsAbout: [
    'SaaS Development',
    'AI Development',
    'AI Automatisering',
    'Chatbots',
    'Workflow Automatisatie',
    'Webdesign',
    'Web Development',
    'SEO',
  ],
  sameAs: [
    'https://www.linkedin.com/company/jukecoding',
    'https://www.instagram.com/jukecoding',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'SaaS, AI & Webdesign diensten',
    itemListElement: [
      {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        itemOffered: {
          '@type': 'Service',
          name: 'SaaS Development',
          description: 'Custom SaaS-platformen, dashboards en portalen',
        },
      },
      {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        itemOffered: {
          '@type': 'Service',
          name: 'AI-projecten',
          description: 'AI-automatisering, chatbots en slimme workflows op maat',
        },
      },
      {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        itemOffered: {
          '@type': 'Service',
          name: 'Webdesign',
          description: "Professionele websites op maat voor KMO's en zelfstandigen",
        },
      },
    ],
  },
}
