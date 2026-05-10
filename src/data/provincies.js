export const provincieData = {
  antwerpen: {
    naam: 'Antwerpen',
    regio: 'Vlaanderen',
    lead:
      'Voor bedrijven in Antwerpen bouwen we snelle websites op maat met lokale SEO, duidelijke structuur en focus op meer aanvragen.',
    intro:
      'Van Antwerpen-stad tot Mechelen, Turnhout en de Kempen: we helpen zelfstandigen en KMO\'s aan een website die professioneel oogt en commercieel werkt.',
    focusCities: ['Antwerpen', 'Mechelen', 'Turnhout', 'Lier', 'Herentals'],
    keywords: [
      'webdesign antwerpen',
      'website laten maken antwerpen',
      'webdesign provincie antwerpen',
      'webdesign voor zelfstandigen antwerpen',
    ],
  },
  limburg: {
    naam: 'Limburg',
    regio: 'Vlaanderen',
    lead:
      'Voor bedrijven in Limburg bouwen we snelle websites op maat met lokale SEO, duidelijke structuur en focus op meer aanvragen.',
    intro:
      'Van Hasselt tot Genk, Beringen, Sint-Truiden en Maaseik: we helpen zelfstandigen en KMO\'s aan een website die professioneel oogt en commercieel werkt.',
    focusCities: ['Hasselt', 'Genk', 'Beringen', 'Sint-Truiden', 'Maaseik'],
    keywords: [
      'webdesign limburg',
      'website laten maken limburg',
      'webdesign hasselt',
      'webdesign voor zelfstandigen limburg',
    ],
  },
  'oost-vlaanderen': {
    naam: 'Oost-Vlaanderen',
    regio: 'Vlaanderen',
    lead:
      'Voor bedrijven in Oost-Vlaanderen bouwen we snelle websites op maat met lokale SEO, duidelijke structuur en focus op meer aanvragen.',
    intro:
      'Van Gent tot Aalst, Sint-Niklaas en Dendermonde: we helpen zelfstandigen en KMO\'s aan een website die professioneel oogt en commercieel werkt.',
    focusCities: ['Gent', 'Aalst', 'Sint-Niklaas', 'Dendermonde', 'Oudenaarde'],
    keywords: [
      'webdesign oost-vlaanderen',
      'website laten maken oost-vlaanderen',
      'webdesign gent',
      'lokaal webbureau oost-vlaanderen',
    ],
  },
  'west-vlaanderen': {
    naam: 'West-Vlaanderen',
    regio: 'Vlaanderen',
    lead:
      'Voor bedrijven in West-Vlaanderen bouwen we snelle websites op maat met lokale SEO, duidelijke structuur en focus op meer aanvragen.',
    intro:
      'Van Brugge tot Kortrijk, Oostende en Roeselare: we helpen zelfstandigen en KMO\'s aan een website die professioneel oogt en commercieel werkt.',
    focusCities: ['Brugge', 'Kortrijk', 'Oostende', 'Roeselare', 'Ieper'],
    keywords: [
      'webdesign west-vlaanderen',
      'website laten maken west-vlaanderen',
      'webdesign brugge',
      'webdesign kortrijk',
    ],
  },
  'vlaams-brabant': {
    naam: 'Vlaams-Brabant',
    regio: 'Vlaanderen',
    lead:
      'Voor bedrijven in Vlaams-Brabant bouwen we snelle websites op maat met lokale SEO, duidelijke structuur en focus op meer aanvragen.',
    intro:
      'Van Leuven tot Vilvoorde, Tienen en Halle: we helpen zelfstandigen en KMO\'s aan een website die professioneel oogt en commercieel werkt.',
    focusCities: ['Leuven', 'Vilvoorde', 'Tienen', 'Halle', 'Aarschot'],
    keywords: [
      'webdesign vlaams-brabant',
      'website laten maken vlaams-brabant',
      'webdesign leuven',
      'lokaal webbureau vlaams-brabant',
    ],
  },
}

export const provincieSlugs = Object.keys(provincieData)

export function maakProvincieFaqs(naam) {
  return [
    {
      question: `Wat kost een website laten maken in ${naam}?`,
      answer:
        `Voor veel zelfstandigen en KMO's starten websites vanaf EUR 600. De prijs hangt af van het aantal pagina's, functies en hoeveel lokale SEO je wil meenemen.`,
    },
    {
      question: `Is lokale SEO inbegrepen voor ${naam}?`,
      answer:
        `Ja. We voorzien een sterke basis met title tags, meta descriptions, structuur en copy die inspeelt op zoekopdrachten in ${naam}.`,
    },
    {
      question: `Werken jullie enkel op afstand in ${naam}?`,
      answer:
        `We werken flexibel. Veel trajecten verlopen online, maar we bouwen de website wel met jouw provincie, doelgroep en lokale zoekintentie als uitgangspunt.`,
    },
    {
      question: `Is webdesign voor zelfstandigen in ${naam} ook mogelijk?`,
      answer:
        `Zeker. We werken zowel voor zelfstandigen als voor groeiende KMO's die een snelle website willen die vertrouwen opbouwt en meer aanvragen oplevert.`,
    },
    {
      question: `Hoe snel kan mijn website live staan in ${naam}?`,
      answer:
        `Dat hangt af van de omvang van het project, maar veel trajecten kunnen binnen enkele weken live als content en feedback vlot volgen.`,
    },
  ]
}
