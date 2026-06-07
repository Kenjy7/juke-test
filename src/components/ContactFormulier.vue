<!-- src/components/ContactComponent.vue -->
<template>
  <section class="contact-section" id="contact">
    <div class="container">
      <div class="contact-header">
        <h2><span>Stuur ons een bericht</span></h2>
        <p>
          Heb je vragen over AI, SaaS of webdesign?
          Laat van je horen.
        </p>
      </div>

      <!-- Success/Error Modal -->
      <transition name="modal-fade">
        <div v-if="showModal" class="modal-overlay" @click="closeModal">
          <div class="modal-content" @click.stop :class="{ error: modalType === 'error' }">
            <div class="modal-icon">
              <svg
                  v-if="modalType === 'success'"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
              >
                <circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="3" />
                <path
                    d="M14 24L20 30L34 16"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
              </svg>

              <svg v-else width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="currentColor" stroke-width="3" />
                <path
                    d="M16 16L32 32M32 16L16 32"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                />
              </svg>
            </div>

            <h3>{{ modalTitle }}</h3>
            <p>{{ modalMessage }}</p>

            <button @click="closeModal" class="modal-btn">Sluiten</button>
          </div>
        </div>
      </transition>

      <div class="contact-wrapper">
        <!-- Contact Info -->
        <div class="contact-info">
          <div class="info-card">
            <div class="info-item">
              <div class="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                  />
                  <path
                      d="M22 6L12 13L2 6"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="info-content">
                <span class="info-label">E-mail</span>
                <a href="mailto:contact@jukecoding.be" class="info-value">contact@jukecoding.be</a>
              </div>
            </div>

            <div class="info-item">
              <div class="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                      d="M22 16.92V19.92C22 20.4696 21.7893 20.9969 21.4142 21.3871C21.0391 21.7773 20.5304 21.9992 20 22C16.7428 21.7634 13.5869 20.7269 10.8 19C8.20183 17.425 5.97223 15.3041 4.25 12.75C2.49998 9.91504 1.45726 6.69859 1.22 3.38C1.21998 2.84954 1.42983 2.33853 1.80837 1.95547C2.18691 1.57241 2.70511 1.34632 3.25 1.34H6.25C7.02697 1.33292 7.76838 1.61918 8.31943 2.13837C8.87048 2.65756 9.18673 3.36681 9.2 4.12C9.22509 5.62818 9.47656 7.12316 9.94 8.56C10.1556 9.22443 10.1709 9.94039 9.98402 10.6129C9.79716 11.2854 9.40593 11.8822 8.86 12.32L7.58 13.57C9.09076 16.2356 11.3644 18.4648 14.08 19.94L15.33 18.68C15.7777 18.1457 16.3852 17.7619 17.0707 17.5793C17.7561 17.3967 18.4847 17.4242 19.155 17.658C20.6063 18.1147 22.1158 18.3617 23.638 18.387C24.4053 18.4006 25.1252 18.7231 25.6513 19.2849C26.1775 19.8467 26.4658 20.6005 26.458 21.379V21.379Z"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="info-content">
                <span class="info-label">Telefoon</span>
                <a href="tel:+32479131715" class="info-value">(+32) 0479 13 17 15</a>
              </div>
            </div>
          </div>

          <div class="social-links">
            <h4>Vind ons op</h4>
            <div class="social-icons">
              <a href="https://www.linkedin.com/company/jukecoding" class="social-icon" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>

              <a href="https://www.instagram.com/jukecoding/" class="social-icon" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke-width="2" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke-width="2" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke-width="2" stroke-linecap="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form">
          <!-- Pakket notificatie -->
          <div v-if="selectedPackage" class="package-notification">
            <div class="notification-content">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                    d="M16.6663 5L7.49967 14.1667L3.33301 10"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
              </svg>
              <span>Je hebt <strong>{{ selectedPackage }}</strong> geselecteerd</span>
            </div>
            <button @click="clearPackage" class="clear-btn" type="button" aria-label="Verwijder pakket">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <div v-if="isLoading" class="loading-overlay">
            <div class="loader"></div>
          </div>

          <form @submit.prevent="sendEmail">
            <!-- Service Selection -->
            <div class="form-group">
              <label>Waar ben je in geïnteresseerd? <span class="required">*</span></label>
              <div class="service-options">
                <label class="service-option" :class="{ active: formData.service === 'webdesign' }">
                  <input type="radio" name="service" value="webdesign" v-model="formData.service" required />
                  <div class="option-content">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    <span>Webdesign</span>
                  </div>
                </label>

                <label class="service-option" :class="{ active: formData.service === 'ai-automatisation' }">
                  <input
                      type="radio"
                      name="service"
                      value="ai-automatisation"
                      v-model="formData.service"
                      required
                  />
                  <div class="option-content">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path
                          d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                      />
                      <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                      <polyline points="7.5 19.79 7.5 14.6 3 12" />
                      <polyline points="21 12 16.5 14.6 16.5 19.79" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                    <span>AI Automatisation</span>
                  </div>
                </label>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="name">Voornaam <span class="required">*</span></label>
                <input type="text" id="name" v-model="formData.name" required placeholder="John" />
              </div>

              <div class="form-group">
                <label for="lastname">Achternaam <span class="required">*</span></label>
                <input type="text" id="lastname" v-model="formData.lastname" required placeholder="Doe" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">E-mailadres <span class="required">*</span></label>
                <input type="email" id="email" v-model="formData.email" required placeholder="john@example.com" />
              </div>

              <div class="form-group">
                <label for="phone">Telefoonnummer <span class="required">*</span></label>
                <input type="tel" id="phone" v-model="formData.phone" placeholder="+32 470 12 34 56" />
              </div>
            </div>

            <div class="form-group">
              <label for="subject">Onderwerp</label>
              <input
                  type="text"
                  id="subject"
                  v-model="formData.subject"
                  placeholder="Waar kan ik je mee helpen?"
                  :readonly="!!selectedPackage"
              />
            </div>

            <div class="form-group" id="bericht">
              <label for="message">Bericht</label>
              <textarea id="message" v-model="formData.message" placeholder="Vertel ons over je project..." rows="5" />
            </div>

            <button type="submit" class="submit-btn" :disabled="isLoading">
              <span>{{ isLoading ? "Versturen..." : "Verstuur bericht" }}</span>
              <svg v-if="!isLoading" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                    d="M18.3346 1.66669L9.16797 10.8334M18.3346 1.66669L12.5013 18.3334L9.16797 10.8334M18.3346 1.66669L1.66797 7.50002L9.16797 10.8334"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
              </svg>
            </button>

            <div class="form-backlinks" aria-label="Gerelateerde pagina’s">
              <span class="form-backlinks-label">Ook interessant:</span>

              <div class="form-backlinks-links">
                <RouterLink to="/offerte-aanvraag" class="form-link secondary">
                  Offerte-aanvraag
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                  </svg>
                </RouterLink>

                <RouterLink to="/webdesign" class="form-link">
                  Webdesign op maat
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                  </svg>
                </RouterLink>

                <RouterLink to="/ai-automatisatie" class="form-link secondary">
                  AI Automatisatie
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                  </svg>
                </RouterLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import emailjs from "@emailjs/browser";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "ContactComponent",
  setup() {
    const route = useRoute();
    const selectedPackage = ref(null);

    const formData = ref({
      service: "",
      name: "",
      lastname: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    const isLoading = ref(false);

    // modal state (FIX: netjes binnen setup)
    const showModal = ref(false);
    const modalType = ref("success");
    const modalTitle = ref("");
    const modalMessage = ref("");

    const closeModal = () => {
      showModal.value = false;
    };

    const checkForPackage = () => {
      const packageFromUrl = route.query.pakket;
      if (packageFromUrl) {
        selectedPackage.value = packageFromUrl;
        formData.value.subject = `Interesse in ${packageFromUrl}`;
        formData.value.service = "webdesign";
      }
    };

    watch(
        () => route.query.pakket,
        (newPackage) => {
          if (newPackage) {
            selectedPackage.value = newPackage;
            formData.value.subject = `Interesse in ${newPackage}`;
            formData.value.service = "webdesign";
          }
        }
    );

    const clearPackage = () => {
      selectedPackage.value = null;
      formData.value.subject = "";
    };

    const validateForm = () => {
      if (!formData.value.service) {
        alert("Gelieve een dienst te selecteren.");
        return false;
      }
      if (!formData.value.email || !formData.value.name || !formData.value.lastname) {
        alert("Gelieve minstens je naam en e-mailadres in te vullen.");
        return false;
      }
      return true;
    };

    const resetForm = () => {
      formData.value = {
        service: "",
        name: "",
        lastname: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      };
    };

    const sendEmail = async () => {
      isLoading.value = true;

      try {
        if (!validateForm()) {
          isLoading.value = false;
          return;
        }

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        const templateParams = { ...formData.value };

        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);

        if (response.status === 200) {
          modalType.value = "success";
          modalTitle.value = "Bericht verzonden!";
          modalMessage.value = "Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.";
          showModal.value = true;
          resetForm();
          selectedPackage.value = null;
        }
      } catch (error) {
        console.error("EmailJS error:", error);
        modalType.value = "error";
        modalTitle.value = "Oeps, er ging iets mis";
        modalMessage.value =
            "Het verzenden is mislukt. Probeer het later opnieuw of neem direct contact op via email.";
        showModal.value = true;
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      checkForPackage();
    });

    return {
      formData,
      isLoading,
      selectedPackage,
      sendEmail,
      clearPackage,

      showModal,
      modalType,
      modalTitle,
      modalMessage,
      closeModal,
    };
  },
};
</script>

<style scoped lang="scss">
/* ========= Contact Section ========= */
.contact-section {
  position: relative;
  background: transparent;
  overflow: hidden;
  padding: var(--space-8) var(--space-8) var(--space-16);
}

.container {
  position: relative;
  max-width: var(--max-width);
  margin: 0 auto;
  z-index: 1;
  min-width: 0;
}

.contact-header {
  text-align: center;
  margin-bottom: var(--space-16);
}

.contact-header h2 {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  margin-bottom: var(--space-4);
  letter-spacing: var(--tracking-tight);
}

.contact-header p {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
}

.contact-wrapper {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: var(--space-8);
  align-items: start;
  min-width: 0;
}

/* ========= Package Notification ========= */
.package-notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  border-radius: var(--radius-md);
  padding: var(--space-4) var(--space-6);
  margin-bottom: var(--space-6);

  .notification-content {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    color: var(--color-text-primary);
    font-size: var(--text-small);

    svg { flex-shrink: 0; color: var(--color-primary); }
    strong { color: var(--color-primary); font-weight: var(--weight-bold); }
  }

  .clear-btn {
    background: var(--color-bg-surface);
    border: none;
    border-radius: var(--radius-sm);
    padding: var(--space-2);
    cursor: pointer;
    color: var(--color-text-secondary);
    transition: all var(--duration-fast) var(--ease-smooth);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover { background: var(--color-bg-card-inner); color: var(--color-text-primary); }
  }
}

/* ========= Contact Info ========= */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.info-card {
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  box-shadow: var(--shadow-inner-highlight);
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
}

.icon-wrapper {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  transition: all var(--duration-base) var(--ease-spring);

  &:hover {
    background: var(--color-primary);
    color: var(--color-bg-primary);
    transform: scale(1.05);
    box-shadow: var(--shadow-glow-primary);
  }
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.info-label {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  font-weight: var(--weight-medium);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

.info-value {
  font-size: var(--text-body);
  color: var(--color-text-primary);
  font-weight: var(--weight-semibold);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-smooth);

  &:hover { color: var(--color-primary); }
}

#bericht label { padding-top: var(--space-6); }

.social-links {
  h4 {
    font-family: var(--font-display);
    font-size: var(--text-h3);
    font-weight: var(--weight-semibold);
    color: var(--color-text-primary);
    margin-bottom: var(--space-4);
  }
}

.social-icons {
  display: flex;
  gap: var(--space-3);
}

.social-icon {
  width: 44px;
  height: 44px;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  transition: all var(--duration-base) var(--ease-spring);

  &:hover {
    background: var(--color-primary-subtle);
    border-color: var(--color-primary-border);
    color: var(--color-primary);
    transform: translateY(-2px);
  }
}

/* ========= Contact Form (Double-Bezel) ========= */
.contact-form {
  position: relative;
  background: var(--color-bg-card-outer);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 6px;
  min-width: 0;

  > form,
  > .package-notification,
  > .loading-overlay {
    position: relative;
  }

  > form {
    background: var(--color-bg-card-inner);
    border-radius: calc(var(--radius-2xl) - 6px);
    box-shadow: var(--shadow-inner-highlight);
    padding: var(--space-12);
  }
}

.loading-overlay {
  position: absolute;
  inset: 0;
  background: rgba(5, 5, 8, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  border-radius: var(--radius-2xl);
}

.loader {
  border: 3px solid var(--color-border);
  border-top: 3px solid var(--color-primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ========= Service Selection ========= */
.service-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
  padding-bottom: var(--space-8);
}

.service-option {
  cursor: pointer;
  position: relative;

  input[type="radio"] {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .option-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-6) var(--space-4);
    background: var(--color-bg-surface);
    border: 1.5px solid var(--color-border);
    border-radius: var(--radius-lg);
    transition: all var(--duration-base) var(--ease-spring);
    text-align: center;

    svg {
      width: 28px;
      height: 28px;
      color: var(--color-text-tertiary);
      transition: all var(--duration-base) var(--ease-spring);
    }

    span {
      font-size: var(--text-small);
      font-weight: var(--weight-semibold);
      color: var(--color-text-secondary);
      transition: color var(--duration-fast) var(--ease-smooth);
    }
  }

  &:hover .option-content {
    border-color: var(--color-border-hover);
  }

  &.active .option-content {
    border-color: var(--color-border-active);
    background: var(--color-primary-subtle);

    svg { color: var(--color-primary); }
    span { color: var(--color-text-primary); }
  }
}

/* ========= Form Fields ========= */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  margin-bottom: var(--space-6);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);

  label {
    font-size: var(--text-small);
    font-weight: var(--weight-semibold);
    color: var(--color-text-primary);

    .required { color: var(--color-accent); }
  }

  input,
  textarea {
    padding: 0.875rem 1rem;
    background: var(--color-bg-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    color: var(--color-text-primary);
    font-size: var(--text-body);
    font-family: var(--font-sans);
    transition: all var(--duration-base) var(--ease-spring);

    &::placeholder { color: var(--color-text-tertiary); }

    &:focus {
      outline: none;
      border-color: var(--color-border-active);
      box-shadow: 0 0 0 3px var(--color-primary-subtle);
    }

    &:read-only {
      background: var(--color-primary-subtle);
      border-color: var(--color-primary-border);
      cursor: not-allowed;
    }
  }

  textarea {
    resize: vertical;
    min-height: 140px;
  }
}

/* ========= Submit Button (PROMINENT) ========= */
.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  width: 100%;
  padding: 1.125rem 2.5rem;
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  font-weight: var(--weight-bold);
  font-size: var(--text-body-lg);
  font-family: var(--font-sans);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--duration-slow) var(--ease-spring);
  margin-top: var(--space-8);
  box-shadow: var(--shadow-glow-accent);
  letter-spacing: -0.01em;

  svg {
    transition: transform var(--duration-base) var(--ease-spring);
  }

  &:hover:not(:disabled) {
    background: var(--color-accent-hover);
    transform: translateY(-2px);
    box-shadow: 0 0 50px var(--color-accent-glow);

    svg { transform: translateX(4px); }
  }

  &:active:not(:disabled) { transform: scale(0.98); }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
}

/* ========= Backlinks ========= */
.form-backlinks {
  margin-top: var(--space-8);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
  display: grid;
  gap: var(--space-3);
}

.form-backlinks-label {
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

.form-backlinks-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  min-width: 0;
}

.form-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  text-decoration: none;
  font-weight: var(--weight-medium);
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  border: 1px solid var(--color-border);
  transition: all var(--duration-base) var(--ease-spring);

  svg {
    opacity: 0.5;
    transition: transform var(--duration-fast) var(--ease-spring);
    flex-shrink: 0;
  }

  &:hover {
    border-color: var(--color-border-hover);
    color: var(--color-text-primary);
    svg { transform: translateX(2px); opacity: 1; }
  }
}

.form-link.secondary {
  color: var(--color-text-tertiary);
}

/* ========= Responsive ========= */
@media (max-width: 900px) {
  .contact-section { padding: var(--space-8) var(--space-6) var(--space-12); }
  .contact-wrapper { grid-template-columns: 1fr; gap: var(--space-8); }
  .contact-header { margin-bottom: var(--space-12); }
  .form-row { grid-template-columns: 1fr; }
  .service-options { grid-template-columns: 1fr; }
}

@media (max-width: 600px) {
  .contact-section { padding: var(--space-4) var(--space-4) var(--space-8); }

  .contact-form > form { padding: var(--space-8) var(--space-6); }

  .form-backlinks-links {
    flex-direction: column;
    .form-link { width: 100%; justify-content: center; }
  }

  .package-notification {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-4);
    .clear-btn { align-self: flex-end; }
  }

  .modal-content {
    padding: var(--space-8) var(--space-6);
    margin: var(--space-4);
  }
}

/* ========= Modal ========= */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity var(--duration-base) var(--ease-out-expo);
}

.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-4);
}

.modal-content {
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-12);
  max-width: 420px;
  width: 100%;
  text-align: center;
  animation: modalSlideUp var(--duration-slow) var(--ease-out-expo);
  box-shadow: var(--shadow-elevated);

  &.error .modal-icon {
    color: var(--color-error);
    background: rgba(239, 68, 68, 0.08);
  }
}

@keyframes modalSlideUp {
  from { opacity: 0; transform: translateY(20px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.modal-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto var(--space-6);
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
}

.modal-content h3 {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.modal-content p {
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-8);
}

.modal-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2.5rem;
  background: var(--color-text-primary);
  color: var(--color-bg-primary);
  font-weight: var(--weight-semibold);
  font-size: var(--text-body);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--duration-base) var(--ease-spring);

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-elevated);
  }

  &:active { transform: scale(0.97); }
}
</style>
