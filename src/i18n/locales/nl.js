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
      eyebrow: 'SaaS · AI · Digitalisering',
      titleLead: 'Wij bouwen de software die',
      titleHighlight: 'je bedrijf laat schalen.',
      subtitle:
        'Juke ontwerpt en bouwt apps, SaaS-platformen en AI-automatiseringen die processen versnellen en werk uit handen nemen, van eerste idee tot live product.',
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
      // Labels for the decorative business-operations dashboard mock.
      demo: {
        title: 'Dashboard',
        subtitle: 'Verbeter en stroomlijn je bedrijfsvoering.',
        navDashboard: 'Dashboard',
        grpAnalytics: 'Analyse',
        navPerformance: 'Prestaties',
        navOverview: 'Overzicht',
        grpSupport: 'Support',
        navCustomers: 'Klanten',
        navBudgets: 'Budgetten',
        grpAccount: 'Account',
        navSettings: 'Instellingen',
        navGoals: 'Doelen',
        s1: 'Omzet vandaag',
        s2: 'Bestellingen',
        s3: 'Totale omzet',
        reports: 'Verkooprapporten',
        trend: 'Verkooptrend over tijd',
        transactions: 'Transacties',
        seeAll: 'Alles tonen',
        completed: 'Voltooid',
        pending: 'In behandeling',
      },
    },
  },

  // Footer (seeded for when you wire the footer to t())
  footer: {
    tagline: 'Software op maat, van idee tot schaal.',
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
