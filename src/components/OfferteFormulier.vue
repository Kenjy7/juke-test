<template>
  <section class="offerte-section" id="offerte">
    <div class="container">
      <div class="offerte-header">
        <h2>
          <span>{{ t('offerteFormulier.header.title') }}</span>
        </h2>
        <p>
          {{ t('offerteFormulier.header.subtitle') }}
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
            <button @click="closeModal" class="modal-btn">
              {{ t('offerteFormulier.modal.close') }}
            </button>
          </div>
        </div>
      </transition>

      <div class="offerte-wrapper">
        <!-- Package Notification -->
        <div v-if="selectedPackage" class="package-notification">
          <div class="notification-content">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M16.6663 5L7.49967 14.1667L3.33301 10"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span
              >{{ t('offerteFormulier.packageNotification.prefix') }}
              <strong>{{ selectedPackage }}</strong>
              {{ t('offerteFormulier.packageNotification.suffix') }}</span
            >
          </div>
          <button @click="clearPackage" class="clear-btn" type="button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        <!-- Offerte Form -->
        <div class="offerte-form">
          <div v-if="isLoading" class="loading-overlay">
            <div class="loader"></div>
          </div>

          <div @submit.prevent="sendOfferte">
            <!-- Honeypot: hidden from real users, bots fill it → submit is dropped -->
            <div
              aria-hidden="true"
              style="position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden"
            >
              <label
                >{{ t('offerteFormulier.honeypot.label') }}
                <input type="text" v-model="honeypot" tabindex="-1" autocomplete="off" />
              </label>
            </div>
            <!-- Basisgegevens -->
            <div class="form-section">
              <h3 class="section-title">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {{ t('offerteFormulier.sections.basics.title') }}
              </h3>

              <div class="form-grid">
                <div class="form-group">
                  <label for="name"
                    >{{ t('offerteFormulier.fields.name.label') }}
                    <span class="required">*</span></label
                  >
                  <input
                    type="text"
                    id="name"
                    v-model="formData.name"
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div class="form-group">
                  <label for="companyName"
                    >{{ t('offerteFormulier.fields.companyName.label') }}
                    <span class="required">*</span></label
                  >
                  <input
                    type="text"
                    id="companyName"
                    v-model="formData.companyName"
                    :placeholder="t('offerteFormulier.fields.companyName.placeholder')"
                  />
                </div>

                <div class="form-group">
                  <label for="email"
                    >{{ t('offerteFormulier.fields.email.label') }}
                    <span class="required">*</span></label
                  >
                  <input
                    type="email"
                    id="email"
                    v-model="formData.email"
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div class="form-group">
                  <label for="phone"
                    >{{ t('offerteFormulier.fields.phone.label') }}
                    <span class="required">*</span></label
                  >
                  <input
                    type="tel"
                    id="phone"
                    v-model="formData.phone"
                    placeholder="+32 470 12 34 56"
                  />
                </div>
              </div>
            </div>

            <!-- Type Project -->
            <div class="form-section">
              <h3 class="section-title">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                {{ t('offerteFormulier.sections.projectType.title') }}
              </h3>

              <div class="checkbox-grid">
                <label v-for="type in projectTypes" :key="type.value" class="checkbox-option">
                  <input type="checkbox" :value="type.value" v-model="formData.projectTypes" />
                  <span class="checkbox-label">{{ type.label }}</span>
                </label>
              </div>
            </div>

            <!-- Pakket Keuze -->
            <div class="form-section">
              <h3 class="section-title">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                </svg>
                {{ t('offerteFormulier.sections.packageChoice.title') }}
              </h3>

              <div class="radio-grid">
                <label
                  v-for="pkg in packages"
                  :key="pkg.value"
                  class="radio-option"
                  :class="{ active: formData.package === pkg.value }"
                >
                  <input
                    type="radio"
                    name="package"
                    :value="pkg.value"
                    v-model="formData.package"
                  />
                  <div class="radio-content">
                    <span class="radio-title">{{ pkg.label }}</span>
                    <span class="radio-description">{{ pkg.description }}</span>
                  </div>
                  <svg
                    v-if="formData.package === pkg.value"
                    class="check-icon"
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M16.6663 5L7.49967 14.1667L3.33301 10"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </label>
              </div>
            </div>

            <!-- Functionaliteiten -->
            <div class="form-section">
              <h3 class="section-title">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6M1 12h6m6 0h6" />
                </svg>
                {{ t('offerteFormulier.sections.features.title') }}
              </h3>

              <div class="checkbox-grid">
                <label v-for="feature in features" :key="feature.value" class="checkbox-option">
                  <input type="checkbox" :value="feature.value" v-model="formData.features" />
                  <span class="checkbox-label">{{ feature.label }}</span>
                </label>
              </div>
            </div>

            <!-- AI Automatisation -->
            <div class="form-section ai-section">
              <h3 class="section-title">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" />
                </svg>
                {{ t('offerteFormulier.sections.aiAutomation.title') }}
              </h3>

              <div class="checkbox-grid">
                <label
                  v-for="service in aiServices"
                  :key="service.value"
                  class="checkbox-option ai-option"
                >
                  <input type="checkbox" :value="service.value" v-model="formData.aiServices" />
                  <span class="checkbox-label">{{ service.label }}</span>
                </label>
              </div>

              <div
                v-if="formData.aiServices.length > 0"
                class="form-group"
                style="margin-top: 1rem"
              >
                <label for="aiDescription"
                  >{{ t('offerteFormulier.fields.aiDescription.label') }}
                  <span class="optional">{{ t('offerteFormulier.common.optional') }}</span></label
                >
                <textarea
                  id="aiDescription"
                  v-model="formData.aiDescription"
                  :placeholder="t('offerteFormulier.fields.aiDescription.placeholder')"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <!-- Design & Inspiratie -->
            <div class="form-section">
              <h3 class="section-title" id="design">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                {{ t('offerteFormulier.sections.design.title') }}
              </h3>

              <div class="form-group">
                <label>{{ t('offerteFormulier.fields.hasIdentity.label') }}</label>
                <div class="radio-inline">
                  <label
                    class="radio-inline-option"
                    :class="{ active: formData.hasIdentity === 'ja' }"
                  >
                    <input
                      type="radio"
                      name="hasIdentity"
                      value="ja"
                      v-model="formData.hasIdentity"
                    />
                    <span>{{ t('offerteFormulier.fields.hasIdentity.yes') }}</span>
                  </label>
                  <label
                    class="radio-inline-option"
                    :class="{ active: formData.hasIdentity === 'nee' }"
                  >
                    <input
                      type="radio"
                      name="hasIdentity"
                      value="nee"
                      v-model="formData.hasIdentity"
                    />
                    <span>{{ t('offerteFormulier.fields.hasIdentity.no') }}</span>
                  </label>
                </div>
              </div>

              <div class="form-group">
                <label id="inspirationLinks" for="inspirationLinks"
                  >{{ t('offerteFormulier.fields.inspirationLinks.label') }}
                  <span class="optional">{{ t('offerteFormulier.common.optional') }}</span></label
                >
                <textarea
                  class="inputlengte"
                  v-model="formData.inspirationLinks"
                  :placeholder="t('offerteFormulier.fields.inspirationLinks.placeholder')"
                  rows="2"
                ></textarea>
              </div>
            </div>

            <!-- Timing & Budget -->
            <div class="form-section">
              <h3 class="section-title">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {{ t('offerteFormulier.sections.timingBudget.title') }}
              </h3>

              <div class="form-grid">
                <div class="form-group">
                  <label for="timeline">{{ t('offerteFormulier.fields.timeline.label') }}</label>
                  <select class="timelinebackground" id="timeline" v-model="formData.timeline">
                    <option value="">
                      {{ t('offerteFormulier.fields.timeline.placeholder') }}
                    </option>
                    <option value="asap">
                      {{ t('offerteFormulier.fields.timeline.options.asap') }}
                    </option>
                    <option value="1month">
                      {{ t('offerteFormulier.fields.timeline.options.within1Month') }}
                    </option>
                    <option value="1-3months">
                      {{ t('offerteFormulier.fields.timeline.options.1to3Months') }}
                    </option>
                    <option value="flexible">
                      {{ t('offerteFormulier.fields.timeline.options.noDeadline') }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="budget"
                    >{{ t('offerteFormulier.fields.budget.label') }}
                    <span class="optional">{{ t('offerteFormulier.common.optional') }}</span></label
                  >
                  <select id="budget" v-model="formData.budget">
                    <option value="">{{ t('offerteFormulier.fields.budget.placeholder') }}</option>
                    <option value="500-1000">€500 - €1.000</option>
                    <option value="1000-2500">€1.000 - €2.500</option>
                    <option value="2500+">€2.500+</option>
                    <option value="unknown">
                      {{ t('offerteFormulier.fields.budget.options.unknown') }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Extra Uitleg -->
            <div class="form-section">
              <div class="form-group">
                <label for="description">{{
                  t('offerteFormulier.fields.description.label')
                }}</label>
                <textarea
                  class="inputlengte"
                  id="description"
                  v-model="formData.description"
                  :placeholder="t('offerteFormulier.fields.description.placeholder')"
                  rows="4"
                ></textarea>
              </div>
            </div>

            <!-- Submit Button -->
            <button @click="sendOfferte" type="button" class="submit-btn" :disabled="isLoading">
              <span>{{
                isLoading
                  ? t('offerteFormulier.submit.loading')
                  : t('offerteFormulier.submit.label')
              }}</span>
              <svg v-if="!isLoading" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M18.3346 1.66669L9.16797 10.8334M18.3346 1.66669L12.5013 18.3334L9.16797 10.8334M18.3346 1.66669L1.66797 7.50002L9.16797 10.8334"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <!-- Trust Message -->
            <div class="trust-message">
              <div class="trust-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" />
                  <polyline
                    points="10 5 10 10 13 13"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <span
                  >{{ t('offerteFormulier.trust.responseTime') }}
                  <strong> {{ t('offerteFormulier.trust.responseValue') }}</strong></span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import emailjs from '@emailjs/browser'
import { trackEvent } from '@/composables/useAnalytics'
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default {
  name: 'OfferteComponent',
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const selectedPackage = ref(null)

    const formData = ref({
      name: '',
      companyName: '',
      email: '',
      phone: '',
      projectTypes: [],
      package: '',
      features: [],
      aiServices: [],
      aiDescription: '',
      hasIdentity: '',
      inspirationLinks: '',
      timeline: '',
      budget: '',
      description: '',
    })

    // Spam honeypot — must stay empty for a genuine human submission.
    const honeypot = ref('')

    const projectTypes = computed(() => [
      { value: 'nieuwe-website', label: t('offerteFormulier.projectTypes.newWebsite') },
      { value: 'redesign', label: t('offerteFormulier.projectTypes.redesign') },
      { value: 'webshop', label: t('offerteFormulier.projectTypes.webshop') },
      { value: 'webapp', label: t('offerteFormulier.projectTypes.webapp') },
      { value: 'seo', label: t('offerteFormulier.projectTypes.seo') },
      { value: 'onderhoud', label: t('offerteFormulier.projectTypes.maintenance') },
      { value: 'anders', label: t('offerteFormulier.projectTypes.other') },
    ])

    const packages = computed(() => [
      {
        value: 'lite',
        label: 'Juke Lite',
        description: t('offerteFormulier.packages.lite.description'),
      },
      {
        value: 'groove',
        label: 'Juke Groove',
        description: t('offerteFormulier.packages.groove.description'),
      },
      {
        value: 'amplify',
        label: 'Juke Amplify',
        description: t('offerteFormulier.packages.amplify.description'),
      },
      {
        value: 'advies',
        label: t('offerteFormulier.packages.advies.label'),
        description: t('offerteFormulier.packages.advies.description'),
      },
    ])

    const features = computed(() => [
      { value: 'contactformulier', label: t('offerteFormulier.features.contactForm') },
      { value: 'meertalig', label: t('offerteFormulier.features.multilingual') },
      { value: 'cms', label: t('offerteFormulier.features.cms') },
      { value: 'seo-basis', label: t('offerteFormulier.features.seoBasic') },
      { value: 'animaties', label: t('offerteFormulier.features.animations') },
      { value: 'blog', label: t('offerteFormulier.features.blog') },
      { value: 'login', label: t('offerteFormulier.features.login') },
      { value: 'betalingen', label: t('offerteFormulier.features.payments') },
    ])

    const aiServices = computed(() => [
      { value: 'chatbot', label: t('offerteFormulier.aiServices.chatbot') },
      { value: 'email-automation', label: t('offerteFormulier.aiServices.emailAutomation') },
      { value: 'content-generation', label: t('offerteFormulier.aiServices.contentGeneration') },
      { value: 'data-analyse', label: t('offerteFormulier.aiServices.dataAnalysis') },
      { value: 'workflow', label: t('offerteFormulier.aiServices.workflow') },
      { value: 'voice-assistant', label: t('offerteFormulier.aiServices.voiceAssistant') },
      { value: 'ai-anders', label: t('offerteFormulier.aiServices.other') },
    ])

    const isLoading = ref(false)
    const showModal = ref(false)
    const modalType = ref('success')
    const modalTitle = ref('')
    const modalMessage = ref('')

    const closeModal = () => {
      showModal.value = false
    }

    const checkForPackage = () => {
      const packageFromUrl = route.query.pakket
      if (packageFromUrl) {
        selectedPackage.value = packageFromUrl
        formData.value.package = packageFromUrl.toLowerCase()
      }
    }

    watch(
      () => route.query.pakket,
      (newPackage) => {
        if (newPackage) {
          selectedPackage.value = newPackage
          formData.value.package = newPackage.toLowerCase()
        }
      },
    )

    const clearPackage = () => {
      selectedPackage.value = null
      formData.value.package = ''
    }

    const sendOfferte = async () => {
      // Bot filled the honeypot → silently pretend success, send nothing.
      if (honeypot.value) {
        modalType.value = 'success'
        modalTitle.value = t('offerteFormulier.messages.success.title')
        modalMessage.value = t('offerteFormulier.messages.success.body')
        showModal.value = true
        resetForm()
        return
      }

      isLoading.value = true

      try {
        if (!validateForm()) {
          isLoading.value = false
          return
        }

        // Format arrays naar leesbare strings met komma's
        const templateParams = {
          ...formData.value,
          projectTypes: formData.value.projectTypes.join(', ') || 'Niet opgegeven',
          features: formData.value.features.join(', ') || 'Niet opgegeven',
          aiServices: formData.value.aiServices.join(', ') || 'Niet opgegeven',
          aiDescription: formData.value.aiDescription || 'Geen toelichting',
          inspirationLinks: formData.value.inspirationLinks || 'Geen inspiratie opgegeven',
          description: formData.value.description || 'Geen extra uitleg',
          hasIdentity: formData.value.hasIdentity || 'Niet opgegeven',
          timeline: formData.value.timeline || 'Niet opgegeven',
          budget: formData.value.budget || 'Niet opgegeven',
        }

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const templateId = import.meta.env.VITE_EMAILJS_OFFERTE_TEMPLATE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)

        if (response.status === 200) {
          // Conversion event (consent-gated, no PII) — enumerable values only
          trackEvent('quote_requested', {
            source_form: 'offerte',
            package: formData.value.package || 'geen',
            budget_band: formData.value.budget || 'niet_opgegeven',
          })
          modalType.value = 'success'
          modalTitle.value = t('offerteFormulier.messages.success.title')
          modalMessage.value = t('offerteFormulier.messages.success.body')
          showModal.value = true
          resetForm()
          selectedPackage.value = null
        }
      } catch (error) {
        console.error('EmailJS error:', error)
        modalType.value = 'error'
        modalTitle.value = t('offerteFormulier.messages.error.title')
        modalMessage.value = t('offerteFormulier.messages.error.body')
        showModal.value = true
      } finally {
        isLoading.value = false
      }
    }

    const validateForm = () => {
      if (!formData.value.email || !formData.value.name) {
        modalType.value = 'error'
        modalTitle.value = t('offerteFormulier.messages.validation.title')
        modalMessage.value = t('offerteFormulier.messages.validation.body')
        showModal.value = true
        return false
      }
      return true
    }

    const resetForm = () => {
      formData.value = {
        name: '',
        companyName: '',
        email: '',
        phone: '',
        projectTypes: [],
        package: '',
        features: [],
        aiServices: [],
        aiDescription: '',
        hasIdentity: '',
        inspirationLinks: '',
        timeline: '',
        budget: '',
        description: '',
      }
    }

    onMounted(() => {
      checkForPackage()
    })

    return {
      t,
      formData,
      honeypot,
      projectTypes,
      packages,
      features,
      aiServices,
      isLoading,
      selectedPackage,
      showModal,
      modalType,
      modalTitle,
      modalMessage,
      sendOfferte,
      clearPackage,
      closeModal,
    }
  },
}
</script>

<style scoped lang="scss">
.offerte-section {
  position: relative;
  background: transparent;
  overflow: hidden;
  padding: 1rem 0 4rem;
}

#inspirationLinks {
  padding-top: 1rem;
}

.container {
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  z-index: 1;
}

.offerte-header {
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeInUp 0.8s ease;

  h2 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 800;
    color: var(--color-text-primary);
    line-height: 1.2;
    margin-bottom: 0.75rem;
    letter-spacing: -0.02em;
  }

  p {
    font-size: 1.125rem;
    color: var(--color-text-secondary);
    margin: 0;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.offerte-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.package-notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-glow);
  border-radius: 1rem;
  padding: 0.875rem 1rem;
  margin-bottom: 1.5rem;
  animation: slideIn 0.5s ease;

  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    color: var(--color-text-primary);
    font-size: 0.9375rem;

    svg {
      flex-shrink: 0;
      color: var(--color-primary);
    }

    strong {
      color: var(--color-primary);
      font-weight: 600;
    }
  }

  .clear-btn {
    background: var(--color-border);
    border: none;
    border-radius: 0.5rem;
    padding: 0.375rem;
    cursor: pointer;
    color: var(--color-text-secondary);
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: var(--color-border-hover);
      color: var(--color-text-primary);
    }
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.offerte-form {
  position: relative;
  background: var(--color-bg-card-inner);
  backdrop-filter: blur(20px);
  border: 1px solid var(--color-border);
  border-radius: 1.5rem;
  padding: 2rem;

  @media (min-width: 768px) {
    padding: 2.5rem;
  }
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-bg-overlay);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  border-radius: 1.5rem;
}

.loader {
  border: 3px solid var(--color-primary-border);
  border-top: 3px solid var(--color-primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.form-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);

  &:last-of-type {
    border-bottom: none;
    margin-bottom: 1.5rem;
    padding-bottom: 0;
  }
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1rem;

  svg {
    color: var(--color-primary);
    flex-shrink: 0;
  }
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0;

  &.full-width {
    grid-column: 1 / -1;
  }

  label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text-primary);

    .required {
      color: var(--color-primary);
    }

    .optional {
      color: var(--color-text-tertiary);
      font-weight: 400;
      font-size: 0.8125rem;
    }
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.75rem;
    background: var(--color-bg-card-inner);
    border: 1px solid var(--color-border);
    border-radius: 0.625rem;
    color: var(--color-text-primary);
    font-size: 0.9375rem;
    transition: all 0.2s ease;
    font-family: inherit;
    box-sizing: border-box;

    &::placeholder {
      color: var(--color-text-tertiary);
    }

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      background: var(--color-primary-subtle);
      box-shadow: 0 0 0 3px var(--color-primary-subtle);
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
    line-height: 1.5;
  }

  select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23a8a29e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    padding-right: 2.5rem;

    option {
      background: var(--color-bg-primary);
      color: var(--color-text-primary);
      padding: 0.5rem;
    }
  }
}

.checkbox-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.625rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.checkbox-option {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 0.875rem;
  background: var(--color-bg-card-inner);
  border: 1px solid var(--color-border);
  border-radius: 0.625rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    border-color: var(--color-border-active);
    background: var(--color-primary-subtle);
  }

  input[type='checkbox'] {
    width: 1.125rem;
    height: 1.125rem;
    flex-shrink: 0;
    cursor: pointer;
    accent-color: var(--color-primary);
  }

  .checkbox-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-primary);
  }

  &.ai-option {
    border-color: var(--color-primary-border);

    &:hover {
      border-color: var(--color-border-active);
      background: var(--color-primary-subtle);
    }

    input[type='checkbox'] {
      accent-color: var(--color-primary);
    }
  }
}

.radio-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.radio-option {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--color-bg-card-inner);
  border: 2px solid var(--color-border);
  border-radius: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    border-color: var(--color-border-active);
    background: var(--color-primary-subtle);
  }

  &.active {
    border-color: var(--color-primary);
    background: var(--color-primary-subtle);
  }

  input[type='radio'] {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .radio-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .radio-title {
    font-size: 0.9375rem;
    font-weight: 700;
    color: var(--color-text-primary);
  }

  .radio-description {
    font-size: 0.8125rem;
    color: var(--color-text-tertiary);
  }

  .check-icon {
    flex-shrink: 0;
    color: var(--color-primary);
  }
}

.radio-inline {
  display: flex;
  gap: 0.75rem;
}

.radio-inline-option {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background: var(--color-bg-card-inner);
  border: 2px solid var(--color-border);
  border-radius: 0.625rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-text-secondary);
  box-sizing: border-box;

  &:hover {
    border-color: var(--color-border-active);
    background: var(--color-primary-subtle);
    color: var(--color-text-primary);
  }

  &.active {
    border-color: var(--color-primary);
    background: var(--color-primary-subtle);
    color: var(--color-text-primary);
  }

  input[type='radio'] {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  span {
    pointer-events: none;
  }
}

.ai-section {
  background: var(--color-primary-subtle);
  border: 1px solid var(--color-primary-border);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;

  .section-title svg {
    color: var(--color-primary);
  }
}

.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 1rem 2rem;
  background: var(--color-accent);
  border: none;
  border-radius: 0.875rem;
  color: var(--color-text-on-accent);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-glow-primary);
  box-sizing: border-box;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow-primary);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
  }
}

.trust-message {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .trust-item {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    font-size: 0.875rem;
    color: var(--color-text-secondary);

    svg {
      flex-shrink: 0;
      color: var(--color-primary);
    }

    strong {
      color: var(--color-text-primary);
      font-weight: 600;
    }
  }
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: var(--color-primary);
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
  animation: pulse 2s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: var(--color-primary);
    border-radius: 50%;
    animation: pulseRing 2s ease-in-out infinite;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes pulseRing {
  0% {
    width: 100%;
    height: 100%;
    opacity: 1;
  }
  100% {
    width: 200%;
    height: 200%;
    opacity: 0;
  }
}

@media (max-width: 639px) {
  .container {
    padding: 0 1rem;
  }

  .offerte-form {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.125rem;
  }

  .radio-grid,
  .checkbox-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}

// Modal Styles
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: var(--color-bg-surface);
  backdrop-filter: blur(20px);
  border: 1px solid var(--color-border);
  border-radius: 1.5rem;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  animation: slideUp 0.4s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);

  &.error .modal-icon {
    color: var(--color-error);
    background: rgba(239, 68, 68, 0.1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: var(--color-primary-subtle);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  animation: scaleIn 0.5s ease 0.2s both;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-content h3 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
}

.modal-content p {
  font-size: 1.0625rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.modal-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2.5rem;
  background: var(--color-accent);
  color: var(--color-text-on-accent);
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-glow-primary);

  &:hover {
    box-shadow: var(--shadow-glow-primary);
    transform: translateY(-2px);
    background: var(--color-primary-hover);
  }
}

// Responsive modal
@media (max-width: 600px) {
  .modal-content {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }

  .modal-icon {
    width: 64px;
    height: 64px;

    svg {
      width: 36px;
      height: 36px;
    }
  }

  .modal-content h3 {
    font-size: 1.5rem;
  }

  .modal-content p {
    font-size: 1rem;
  }
}
</style>
