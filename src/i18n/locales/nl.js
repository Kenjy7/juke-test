// Source of truth — Belgian Dutch (nl-BE).
// Keys are hierarchical and namespaced (e.g. nav.ai, cta.startProject) so they
// stay descriptive and survive refactors. Use placeholders ({count}) for
// interpolation — never concatenate translated fragments.
export default {
  // Accessibility / chrome
  a11y: {
    skipToContent: 'Naar hoofdinhoud',
    menu: 'Menu',
    mainMenu: 'Hoofdmenu',
    // {lang} is the human name of the target language, e.g. "Engels"
    switchLanguage: 'Schakel over naar {lang}',
  },

  // Language switcher
  locale: {
    nl: 'Nederlands',
    en: 'Engels',
    // Short labels shown in the toggle
    nlShort: 'NL',
    enShort: 'EN',
  },

  // Primary navigation
  nav: {
    ai: 'AI & automatisering',
    saas: 'SaaS & apps',
    webdesign: 'Webdesign',
    vibemind: 'Vibemind',
    beheerly: 'Beheerly',
    blog: 'Blog',
    contact: 'Contact',
  },

  // Calls to action
  cta: {
    startProject: 'Start je project',
  },

  // Home page
  home: {
    hero: {
      eyebrow: 'Digitalisering · AI · SaaS',
      titleLead: 'Wij bouwen de software die',
      titleHighlight: 'je bedrijf laat schalen.',
      subtitle:
        'JukeCoding ontwerpt en bouwt apps, SaaS-platformen en AI-automatiseringen die processen versnellen en werk uit handen nemen — van eerste idee tot live product.',
      ctaSecondary: 'Ontdek wat we doen',
      kpis: {
        users: 'Actieve gebruikers',
        processed: 'Verwerkt / dag',
        saved: 'Handwerk bespaard',
      },
      caps: {
        ai: 'AI & automatisering',
        saas: 'SaaS & apps',
        digital: 'Digitalisering',
        web: 'Webdesign',
      },
    },
  },

  // Footer (seeded for when you wire the footer to t())
  footer: {
    tagline: 'Development studio voor AI, SaaS en web.',
    headings: {
      services: 'Diensten',
      products: 'Producten',
      company: 'Bedrijf',
      contact: 'Contact',
    },
    links: {
      aiProjects: 'AI-projecten',
      saas: 'SaaS Development',
      webdesign: 'Webdesign',
      seoScan: 'Gratis SEO Scan',
      approach: 'Aanpak',
      blog: 'Blog',
      quote: 'Offerte aanvragen',
      contact: 'Neem contact op',
    },
  },
}
