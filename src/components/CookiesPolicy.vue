<template>
  <section class="cookies">
    <div class="cookies-container">
      <div class="header">
        <h1>Cookiebeleid</h1>
        <p class="subtitle">Transparantie over hoe wij cookies gebruiken</p>
        <p class="last-updated">Laatst bijgewerkt: December 2025</p>
      </div>

      <div class="intro">
        <p>
          Wij gebruiken cookies en vergelijkbare technologieën op onze website.
          Dit cookiebeleid legt uit wat cookies zijn, hoe we ze gebruiken, en hoe u uw voorkeuren kunt beheren.
        </p>
      </div>

      <div class="content">
        <section class="section">
          <h2>Wat zijn cookies?</h2>
          <p>
            Cookies zijn kleine tekstbestanden die op uw apparaat worden geplaatst wanneer u onze website bezoekt.
            Ze helpen ons om de website goed te laten functioneren, veiliger te maken, een betere gebruikerservaring
            te bieden en te begrijpen hoe de website presteert.
          </p>
        </section>

        <section class="section">
          <h2>Welke cookies gebruiken wij?</h2>

          <div class="cookie-type">
            <h3>Noodzakelijke cookies</h3>
            <p>
              Deze cookies zijn essentieel voor het functioneren van de website. Zonder deze cookies kunnen
              bepaalde delen van de website niet werken.
            </p>
            <p class="examples">Voorbeelden: Sessie-cookies, beveiligingscookies, cookie-voorkeuren</p>
          </div>

          <div class="cookie-type">
            <h3>Functionele cookies</h3>
            <p>
              Deze cookies onthouden uw voorkeuren en keuzes om uw ervaring te verbeteren.
            </p>
            <p class="examples">Voorbeelden: Taalvoorkeur, regio-instellingen, voorkeursinstellingen</p>
          </div>

          <div class="cookie-type">
            <h3>Analytische cookies</h3>
            <p>
              Deze cookies helpen ons begrijpen hoe bezoekers omgaan met de website door informatie
              anoniem te verzamelen en te rapporteren.
            </p>
            <p class="examples">Voorbeelden: Google Analytics, bezoekersstatistieken, pagina-interacties</p>
          </div>

          <div class="cookie-type">
            <h3>Marketing cookies</h3>
            <p>
              Deze cookies worden gebruikt om bezoekers te volgen op websites. De bedoeling is om advertenties
              te tonen die relevant en aantrekkelijk zijn voor de individuele gebruiker.
            </p>
            <p class="examples">Voorbeelden: Social media cookies, advertentiecookies, tracking pixels</p>
          </div>
        </section>

        <section class="section">
          <h2>Cookies beheren</h2>
          <p>
            U kunt uw cookie-instellingen op elk moment wijzigen via uw browserinstellingen. Houd er rekening
            mee dat het uitschakelen van bepaalde cookies de functionaliteit van onze website kan beïnvloeden.
            De meeste browsers accepteren cookies automatisch, maar u kunt uw browserinstellingen meestal aanpassen
            om cookies te weigeren als u dat wenst.
          </p>
        </section>

        <section class="section">
          <h2>Cookies van derde partijen</h2>
          <p>
            Sommige cookies worden geplaatst door diensten van derden die op onze pagina's verschijnen.
            Wij hebben geen controle over deze cookies. Raadpleeg de privacyverklaring van deze diensten
            voor meer informatie over hun cookies en hoe u deze kunt beheren.
          </p>

          <div class="third-parties">
            <div class="party">
              <span class="party-name">Google Analytics</span>
              <span class="party-purpose">Websiteanalyse en statistieken</span>
            </div>
            <div class="party">
              <span class="party-name">Google Fonts</span>
              <span class="party-purpose">Lettertype weergave</span>
            </div>
            <div class="party">
              <span class="party-name">Social Media Plugins</span>
              <span class="party-purpose">Social media integratie</span>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>Bewaartermijn</h2>
          <p>De bewaartermijn van cookies verschilt per type:</p>

          <div class="durations">
            <div class="duration-item">
              <span class="duration-type">Sessiecookies</span>
              <span class="duration-time">Worden verwijderd na het sluiten van uw browser</span>
            </div>
            <div class="duration-item">
              <span class="duration-type">Permanente cookies</span>
              <span class="duration-time">Blijven 1 maand tot 2 jaar bewaard</span>
            </div>
            <div class="duration-item">
              <span class="duration-type">Analytische cookies</span>
              <span class="duration-time">Worden na 26 maanden automatisch verwijderd</span>
            </div>
          </div>
        </section>

        <section class="section">
          <h2>Uw rechten</h2>
          <p>U heeft het recht om:</p>

          <ul class="rights-list">
            <li>Uw toestemming voor cookies in te trekken</li>
            <li>Cookies te verwijderen via uw browserinstellingen</li>
            <li>Bezwaar te maken tegen tracking</li>
            <li>Inzage te krijgen in verzamelde gegevens</li>
          </ul>
        </section>

        <section class="section">
          <h2>Wijzigingen in dit cookiebeleid</h2>
          <p>
            Dit cookiebeleid kan van tijd tot tijd worden bijgewerkt. We raden u aan deze pagina regelmatig
            te bekijken om op de hoogte te blijven van eventuele wijzigingen. Wijzigingen in dit cookiebeleid
            zijn van kracht vanaf het moment dat ze op deze pagina worden gepubliceerd.
          </p>
        </section>

        <section class="section contact-section">
          <h2>Vragen?</h2>
          <p>Heeft u vragen over ons cookiebeleid? Neem gerust contact met ons op:</p>

          <div class="contact-info">
            <a href="mailto:contact@jukecoding.be" class="contact-link">
              <span class="contact-label">Email:</span>
              <span class="contact-value">contact@jukecoding.be</span>
            </a>
            <a href="tel:+32123456789" class="contact-link">
              <span class="contact-label">Telefoon:</span>
              <span class="contact-value">+32 96 42 89 50</span>
            </a>
          </div>
        </section>
      </div>

      <router-link to="/" class="back-link">
        ← Terug naar home
      </router-link>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cookies {
  min-height: 100vh;
  background: transparent;
  padding: 2rem 1.5rem 4rem;
}

.cookies-container {
  max-width: 900px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 4rem;
}

h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 1.25rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
}

.last-updated {
  font-size: 0.875rem;
  color: var(--color-text-tertiary);
}

.intro {
  margin-bottom: 4rem;

  p {
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--color-text-secondary);
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.section {
  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 1.25rem;
    letter-spacing: -0.01em;
  }

  p {
    font-size: 1rem;
    line-height: 1.75;
    color: var(--color-text-secondary);
    margin-bottom: 1rem;
  }
}

.cookie-type {
  margin-top: 2rem;
  padding-left: 1.5rem;
  border-left: 2px solid var(--color-primary-glow);

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: 0.75rem;
  }

  p {
    margin-bottom: 0.5rem;
  }

  .examples {
    font-size: 0.875rem;
    color: var(--color-text-tertiary);
    font-style: italic;
  }
}

.third-parties {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.party {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;

  .party-name {
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .party-purpose {
    font-size: 0.875rem;
    color: var(--color-text-tertiary);
  }
}

.durations {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.duration-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .duration-type {
    font-weight: 600;
    color: var(--color-text-primary);
  }

  .duration-time {
    font-size: 0.9375rem;
    color: var(--color-text-secondary);
  }
}

.rights-list {
  margin-top: 1rem;
  padding-left: 1.5rem;
  list-style: none;

  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.75rem;
    font-size: 1rem;
    line-height: 1.75;
    color: var(--color-text-secondary);

    &:before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--color-primary);
      font-weight: bold;
    }
  }
}

.contact-section {
  margin-top: 2rem;
}

.contact-info {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: all 0.3s ease;

  .contact-label {
    font-size: 0.875rem;
    color: var(--color-text-tertiary);
    min-width: 80px;
  }

  .contact-value {
    color: var(--color-text-secondary);
    font-weight: 500;
  }

  &:hover .contact-value {
    color: var(--color-text-primary);
  }
}

.back-link {
  display: inline-block;
  margin-top: 4rem;
  padding: 0.75rem 1.5rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: var(--color-text-primary);
    border-color: var(--color-border-active);
    background: var(--color-primary-subtle);
    transform: translateX(-4px);
  }
}

@media (max-width: 768px) {
  .cookies {
    padding: 6rem 1.25rem 3rem;
  }

  .header {
    margin-bottom: 3rem;
  }

  h1 {
    font-size: 2.25rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .intro {
    margin-bottom: 3rem;

    p {
      font-size: 1rem;
    }
  }

  .content {
    gap: 2.5rem;
  }

  .section h2 {
    font-size: 1.5rem;
  }

  .cookie-type {
    padding-left: 1rem;

    h3 {
      font-size: 1.125rem;
    }
  }

  .party {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 1rem;
  }

  .back-link {
    margin-top: 3rem;
  }
}

@media (max-width: 480px) {
  .cookies {
    padding: 5rem 1rem 2.5rem;
  }

  h1 {
    font-size: 2rem;
  }
}
</style>