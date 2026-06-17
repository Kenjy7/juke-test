<!-- src/components/ContactComponent.vue -->
<template>
  <section class="contact-section" id="contact">
    <div class="container">
      <div class="contact-wrapper">
        <!-- Dark editorial panel -->
        <aside class="contact-aside band--dark">
          <div class="contact-aside__glow" aria-hidden="true"></div>

          <div class="contact-aside__head">
            <span class="eyebrow"
              ><span class="eyebrow__dot"></span>{{ t('contactFormulier.header.eyebrow') }}</span
            >
            <h2>{{ t('contactFormulier.header.title') }}</h2>
            <p>{{ t('contactFormulier.header.lead') }}</p>
          </div>

          <div class="contact-methods">
            <a href="mailto:contact@jukecoding.be" class="method">
              <span class="method__icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
              </span>
              <span class="method__text">
                <span class="method__label">{{ t('contactFormulier.info.emailLabel') }}</span>
                <span class="method__value">contact@jukecoding.be</span>
              </span>
            </a>

            <a href="tel:+32479131715" class="method">
              <span class="method__icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span class="method__text">
                <span class="method__label">{{ t('contactFormulier.info.phoneLabel') }}</span>
                <span class="method__value">+32 479 13 17 15</span>
              </span>
            </a>
          </div>

          <div class="contact-social">
            <span class="contact-social__label">{{ t('contactFormulier.social.title') }}</span>
            <div class="social-icons">
              <a
                href="https://www.linkedin.com/company/jukecoding"
                class="social-icon"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/jukecoding/"
                class="social-icon"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke-width="2" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke-width="2" />
                  <line
                    x1="17.5"
                    y1="6.5"
                    x2="17.51"
                    y2="6.5"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </aside>

        <!-- Contact Form -->
        <div class="contact-form">
          <transition name="form-swap" mode="out-in">
            <form v-if="!isSent" key="form" @submit.prevent="sendEmail">
            <!-- Honeypot: hidden from real users, bots fill it → submit is dropped -->
            <div
              aria-hidden="true"
              style="position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden"
            >
              <label
                >{{ t('contactFormulier.form.honeypotLabel') }}
                <input type="text" v-model="honeypot" tabindex="-1" autocomplete="off" />
              </label>
            </div>
            <!-- Service Selection -->
            <div class="form-group">
              <label
                >{{ t('contactFormulier.form.serviceLabel') }}
                <span class="required">*</span></label
              >
              <div class="service-options">
                <label class="service-option" :class="{ active: formData.service === 'saas' }">
                  <input
                    type="radio"
                    name="service"
                    value="saas"
                    v-model="formData.service"
                    @change="clearError('service')"
                  />
                  <div class="option-content">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18" />
                      <path d="M9 21V9" />
                    </svg>
                    <span>{{ t('contactFormulier.form.serviceSaas') }}</span>
                  </div>
                </label>

                <label
                  class="service-option"
                  :class="{ active: formData.service === 'ai-automatisation' }"
                >
                  <input
                    type="radio"
                    name="service"
                    value="ai-automatisation"
                    v-model="formData.service"
                    @change="clearError('service')"
                  />
                  <div class="option-content">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                      />
                      <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                      <polyline points="7.5 19.79 7.5 14.6 3 12" />
                      <polyline points="21 12 16.5 14.6 16.5 19.79" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                    <span>{{ t('contactFormulier.form.serviceAi') }}</span>
                  </div>
                </label>

                <label class="service-option" :class="{ active: formData.service === 'other' }">
                  <input
                    type="radio"
                    name="service"
                    value="other"
                    v-model="formData.service"
                    @change="clearError('service')"
                  />
                  <div class="option-content">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>{{ t('contactFormulier.form.serviceOther') }}</span>
                  </div>
                </label>
              </div>
              <span v-if="errors.service" class="field-error">{{ errors.service }}</span>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="name"
                  >{{ t('contactFormulier.form.firstNameLabel') }}
                  <span class="required">*</span></label
                >
                <input
                  type="text"
                  id="name"
                  v-model="formData.name"
                  :class="{ 'has-error': errors.name }"
                  @input="clearError('name')"
                  placeholder="John"
                />
                <span v-if="errors.name" class="field-error">{{ errors.name }}</span>
              </div>

              <div class="form-group">
                <label for="lastname"
                  >{{ t('contactFormulier.form.lastNameLabel') }}
                  <span class="required">*</span></label
                >
                <input
                  type="text"
                  id="lastname"
                  v-model="formData.lastname"
                  :class="{ 'has-error': errors.lastname }"
                  @input="clearError('lastname')"
                  placeholder="Doe"
                />
                <span v-if="errors.lastname" class="field-error">{{ errors.lastname }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email"
                  >{{ t('contactFormulier.form.emailLabel') }}
                  <span class="required">*</span></label
                >
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  :class="{ 'has-error': errors.email }"
                  @input="clearError('email')"
                  placeholder="john@example.com"
                />
                <span v-if="errors.email" class="field-error">{{ errors.email }}</span>
              </div>

              <div class="form-group">
                <label for="phone">{{ t('contactFormulier.form.phoneLabel') }}</label>
                <input
                  type="tel"
                  id="phone"
                  v-model="formData.phone"
                  placeholder="+32 470 12 34 56"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="subject">{{ t('contactFormulier.form.subjectLabel') }}</label>
              <input
                type="text"
                id="subject"
                v-model="formData.subject"
                :placeholder="t('contactFormulier.form.subjectPlaceholder')"
              />
            </div>

            <div class="form-group" id="bericht">
              <label for="message">{{ t('contactFormulier.form.messageLabel') }}</label>
              <textarea
                id="message"
                v-model="formData.message"
                :placeholder="t('contactFormulier.form.messagePlaceholder')"
                rows="5"
              />
            </div>

            <div v-if="submitError" class="form-banner" role="alert">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
                <path
                  d="M12 8v4m0 4h.01"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <span>{{ t('contactFormulier.modal.errorMessage') }}</span>
            </div>

            <button type="submit" class="btn btn--accent btn--lg submit-btn" :disabled="isLoading">
              <span>{{
                isLoading
                  ? t('contactFormulier.form.submitSending')
                  : t('contactFormulier.form.submit')
              }}</span>
              <svg
                v-if="!isLoading"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M18.3346 1.66669L9.16797 10.8334M18.3346 1.66669L12.5013 18.3334L9.16797 10.8334M18.3346 1.66669L1.66797 7.50002L9.16797 10.8334"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <p class="form-privacy">
              {{ t('contactFormulier.form.privacyBefore') }}
              <RouterLink to="/privacybeleid">{{ t('contactFormulier.form.privacyLink') }}</RouterLink
              >{{ t('contactFormulier.form.privacyAfter') }}
            </p>

            <div class="form-backlinks" :aria-label="t('contactFormulier.backlinks.aria')">
              <span class="form-backlinks-label">{{ t('contactFormulier.backlinks.label') }}</span>

              <div class="form-backlinks-links">
                <RouterLink to="/saas-development" class="form-link secondary">
                  {{ t('contactFormulier.backlinks.saas') }}
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
                  {{ t('contactFormulier.backlinks.ai') }}
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

            <div v-else key="sent" class="form-sent">
              <span class="form-sent__icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <h3>{{ t('contactFormulier.modal.successTitle') }}</h3>
              <p>{{ t('contactFormulier.modal.successMessage') }}</p>
              <button type="button" class="btn btn--secondary" @click="resetSent">
                {{ t('contactFormulier.form.sendAnother') }}
              </button>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import emailjs from '@emailjs/browser'
import { trackEvent } from '@/composables/useAnalytics'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default {
  name: 'ContactComponent',
  setup() {
    const { t } = useI18n()
    const route = useRoute()

    const formData = ref({
      service: '',
      name: '',
      lastname: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    })

    // Prefill from a product CTA, e.g. /contact?interesse=saas →
    // pre-select the matching service and drop a localised subject in.
    const prefillService = {
      saas: 'saas',
      ai: 'ai-automatisation',
      beheerly: 'other',
    }
    onMounted(() => {
      const interesse = route.query.interesse
      const service = prefillService[interesse]
      if (service) {
        formData.value.service = service
        formData.value.subject = t(`contactFormulier.prefill.${interesse}`)
      }
    })

    // Spam honeypot — must stay empty for a genuine human submission.
    const honeypot = ref('')

    const isLoading = ref(false)
    const errors = ref({})

    // Inline submit-result state (replaces the old modal).
    const isSent = ref(false)
    const submitError = ref(false)

    const resetSent = () => {
      isSent.value = false
    }

    // Clear a field's inline error as soon as the user edits it.
    const clearError = (field) => {
      if (errors.value[field]) {
        const next = { ...errors.value }
        delete next[field]
        errors.value = next
      }
    }

    const validateForm = () => {
      const next = {}
      if (!formData.value.service) next.service = t('contactFormulier.validation.service')
      if (!formData.value.name.trim()) next.name = t('contactFormulier.validation.name')
      if (!formData.value.lastname.trim()) next.lastname = t('contactFormulier.validation.lastname')
      if (!formData.value.email.trim()) next.email = t('contactFormulier.validation.email')
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email))
        next.email = t('contactFormulier.validation.emailInvalid')
      errors.value = next
      return Object.keys(next).length === 0
    }

    const resetForm = () => {
      formData.value = {
        service: '',
        name: '',
        lastname: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      }
      errors.value = {}
    }

    const sendEmail = async () => {
      // Bot filled the honeypot → silently pretend success, send nothing.
      if (honeypot.value) {
        isSent.value = true
        resetForm()
        return
      }

      // Validate before showing any loading state — invalid fields surface inline.
      if (!validateForm()) return

      submitError.value = false
      isLoading.value = true

      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

        const templateParams = { ...formData.value }

        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)

        if (response.status === 200) {
          // Conversion event (consent-gated, no PII) — read before resetForm() clears it
          trackEvent('lead_submitted', {
            source_form: 'contact',
            service: formData.value.service || 'onbekend',
          })
          isSent.value = true
          resetForm()
        } else {
          submitError.value = true
        }
      } catch (error) {
        console.error('EmailJS error:', error)
        submitError.value = true
      } finally {
        isLoading.value = false
      }
    }

    return {
      t,
      formData,
      honeypot,
      isLoading,
      errors,
      clearError,
      sendEmail,
      isSent,
      submitError,
      resetSent,
    }
  },
}
</script>

<style scoped lang="scss">
/* ========= Contact Section ========= */
.contact-section {
  position: relative;
  background: transparent;
  overflow: hidden;
  padding: var(--hero-pad-top) var(--space-8) var(--section-pad-y);
}

.container {
  position: relative;
  max-width: var(--max-width);
  margin: 0 auto;
  z-index: 1;
  min-width: 0;
}

.contact-aside__head .eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: var(--space-5);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--color-text-secondary);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}
.contact-aside__head .eyebrow__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
}
.contact-aside__head h2 {
  font-family: var(--font-display);
  font-size: var(--text-h1);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  line-height: var(--leading-snug);
  margin: 0 0 var(--space-4);
  letter-spacing: var(--tracking-tight);
  text-wrap: balance;
}
.contact-aside__head p {
  font-size: var(--text-body-lg);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0;
  max-width: 42ch;
}

.contact-wrapper {
  display: grid;
  grid-template-columns: 0.92fr 1.08fr;
  gap: var(--space-6);
  align-items: stretch;
  min-width: 0;
}

/* ========= Dark editorial panel ========= */
.contact-aside {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-10);
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
}
.contact-aside__glow {
  position: absolute;
  top: -28%;
  right: -22%;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--color-primary-subtle), transparent 70%);
  pointer-events: none;
}
.contact-aside > *:not(.contact-aside__glow) {
  position: relative;
  z-index: 1;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.method {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition:
    border-color var(--transition-base),
    transform var(--transition-base);
}
a.method:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-2px);
}
.method__icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}
.method__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.method__label {
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  font-weight: var(--weight-medium);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}
.method__value {
  font-size: clamp(0.85rem, 3.6vw, var(--text-body));
  color: var(--color-text-primary);
  font-weight: var(--weight-semibold);
  overflow-wrap: anywhere;
}

#bericht label {
  padding-top: var(--space-6);
}

.contact-social {
  margin-top: auto;
}
.contact-social__label {
  display: block;
  font-size: var(--text-xs);
  color: var(--color-text-tertiary);
  font-weight: var(--weight-medium);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  margin-bottom: var(--space-4);
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
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  transition:
    border-color var(--transition-base),
    color var(--transition-base),
    transform var(--transition-base);

  &:hover {
    border-color: var(--color-border-hover);
    color: var(--color-primary);
    transform: translateY(-2px);
  }
}

/* ========= Contact Form ========= */
.contact-form {
  position: relative;
  min-width: 0;

  > form {
    background: var(--color-bg-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-10);
  }
}

/* ========= Service Selection ========= */
.form-group:has(.service-options) {
  margin-bottom: var(--space-6);
}
.service-options {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-3);
}

.service-option {
  cursor: pointer;
  position: relative;

  input[type='radio'] {
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

    svg {
      color: var(--color-primary);
    }
    span {
      color: var(--color-text-primary);
    }
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

    .required {
      color: var(--color-accent);
    }
  }

  input,
  textarea {
    padding: 0.875rem 1rem;
    background: var(--color-bg-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    font-size: var(--text-body);
    font-family: var(--font-sans);
    transition:
      border-color var(--transition-base),
      box-shadow var(--transition-base);

    &::placeholder {
      color: var(--color-text-tertiary);
    }

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px var(--color-primary-subtle);
    }

    &.has-error {
      border-color: var(--color-error);
      box-shadow: 0 0 0 3px var(--color-error-subtle, rgba(220, 38, 38, 0.12));
    }
  }

  textarea {
    resize: vertical;
    min-height: 140px;
  }
}

.field-error {
  display: block;
  margin-top: var(--space-1);
  font-size: var(--text-xs);
  color: var(--color-error);
}

/* ========= Submit Button — canonical .btn, full width ========= */
.submit-btn {
  width: 100%;
  margin-top: var(--space-8);

  svg {
    transition: transform var(--transition-base);
  }
  &:hover:not(:disabled) svg {
    transform: translateX(3px);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

/* ========= Privacy note under submit ========= */
.form-privacy {
  margin: var(--space-3) 0 0;
  font-size: var(--text-xs);
  line-height: var(--leading-snug);
  color: var(--color-text-tertiary);
  text-align: center;

  a {
    color: var(--color-text-secondary);
    text-decoration: underline;
    text-underline-offset: 2px;
    &:hover {
      color: var(--color-primary);
    }
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
    svg {
      transform: translateX(2px);
      opacity: 1;
    }
  }
}

.form-link.secondary {
  color: var(--color-text-tertiary);
}

/* ========= Responsive ========= */
@media (max-width: 900px) {
  .contact-section {
    padding: var(--hero-pad-top) var(--space-6) var(--section-pad-y);
  }
  .contact-wrapper {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  .contact-aside {
    padding: var(--space-8);
    gap: var(--space-8);
  }
  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .contact-section {
    padding: var(--hero-pad-top) var(--space-4) var(--section-pad-y);
  }

  .contact-form > form {
    padding: var(--space-8) var(--space-6);
  }

  .service-options {
    grid-template-columns: 1fr;
  }

  .form-backlinks-links {
    flex-direction: column;
    .form-link {
      width: 100%;
      justify-content: center;
    }
  }
}

/* ========= Inline submit error banner ========= */
.form-banner {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-6);
  padding: var(--space-4);
  border: 1px solid var(--color-error);
  border-radius: var(--radius-md);
  background: var(--color-error-subtle, rgba(198, 58, 43, 0.08));
  color: var(--color-error);
  font-size: var(--text-small);
  line-height: var(--leading-snug);

  svg {
    flex-shrink: 0;
  }
}

/* ========= Inline success state ========= */
.form-sent {
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-12) var(--space-10);
  min-height: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.form-sent__icon {
  width: 64px;
  height: 64px;
  margin-bottom: var(--space-6);
  border-radius: 50%;
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-sent h3 {
  font-family: var(--font-display);
  font-size: var(--text-h2);
  font-weight: var(--weight-semibold);
  color: var(--color-text-primary);
  letter-spacing: var(--tracking-tight);
  margin: 0 0 var(--space-3);
}
.form-sent p {
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0 0 var(--space-8);
  max-width: 38ch;
}

/* ========= Form ↔ success swap ========= */
.form-swap-enter-active,
.form-swap-leave-active {
  transition:
    opacity var(--duration-base) var(--ease-out-expo),
    transform var(--duration-base) var(--ease-out-expo);
}
.form-swap-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.form-swap-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
