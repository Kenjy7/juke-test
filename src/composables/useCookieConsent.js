// composables/useCookieConsent.js

import { ref, computed } from 'vue'

const CONSENT_KEY = 'cookieConsent'
const CONSENT_TIMESTAMP_KEY = 'cookieConsentTimestamp'
const CONSENT_VERSION = '1.0'

// Shared state across components
const consentGiven = ref(null)
const consentPreferences = ref({
    necessary: true, // Always true
    functional: false,
    analytics: false,
    marketing: false
})

export const useCookieConsent = () => {
    // Initialize consent from localStorage
    const initializeConsent = () => {
        const stored = localStorage.getItem(CONSENT_KEY)
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                consentGiven.value = true
                consentPreferences.value = { ...consentPreferences.value, ...parsed }

                // 👇 BELANGRIJK
                initializeScripts()

                return true
            } catch (e) {
                console.error('Error parsing cookie consent:', e)
            }
        }
        return false
    }


    // Check if user has given consent
    const hasConsent = computed(() => consentGiven.value !== null)

    // Check if specific type is allowed
    const isAllowed = (type) => {
        if (type === 'necessary') return true
        return consentPreferences.value[type] === true
    }

    // Save consent preferences
    const saveConsent = (preferences) => {
        consentPreferences.value = {
            necessary: true,
            ...preferences
        }
        consentGiven.value = true

        localStorage.setItem(CONSENT_KEY, JSON.stringify(consentPreferences.value))
        localStorage.setItem(CONSENT_TIMESTAMP_KEY, Date.now().toString())
        localStorage.setItem('cookieConsentVersion', CONSENT_VERSION)

        // Initialize scripts based on consent
        initializeScripts()
    }

    // Accept all cookies
    const acceptAll = () => {
        saveConsent({
            functional: true,
            analytics: true,
            marketing: true
        })
    }

    // Accept only necessary cookies
    const acceptNecessary = () => {
        saveConsent({
            functional: false,
            analytics: false,
            marketing: false
        })
    }

    // Revoke consent and clear cookies
    const revokeConsent = () => {
        consentGiven.value = null
        consentPreferences.value = {
            necessary: true,
            functional: false,
            analytics: false,
            marketing: false
        }

        localStorage.removeItem(CONSENT_KEY)
        localStorage.removeItem(CONSENT_TIMESTAMP_KEY)
        localStorage.removeItem('cookieConsentVersion')

        // Clear non-necessary cookies
        clearNonNecessaryCookies()
    }

    // Clear non-necessary cookies
    const clearNonNecessaryCookies = () => {
        const cookies = document.cookie.split(';')

        for (let cookie of cookies) {
            const cookieName = cookie.split('=')[0].trim()

            // Don't delete necessary cookies
            if (cookieName === CONSENT_KEY) continue

            // Delete cookie
            document.cookie = `${cookieName}=;expires=Thu, 01 Jan 2026 00:00:00 GMT;path=/`
            document.cookie = `${cookieName}=;expires=Thu, 01 Jan 2026 00:00:00 GMT;path=/;domain=${window.location.hostname}`
        }
    }

    // Cookie management functions
    const setCookie = (name, value, days = 365, type = 'functional') => {
        if (!isAllowed(type)) {
            console.warn(`Cookie ${name} not set: ${type} cookies not allowed`)
            return false
        }

        const expires = new Date()
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
        return true
    }

    const getCookie = (name) => {
        const value = `; ${document.cookie}`
        const parts = value.split(`; ${name}=`)
        if (parts.length === 2) return parts.pop().split(';').shift()
        return null
    }

    const deleteCookie = (name) => {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    }

    // Initialize third-party scripts based on consent
    const initializeScripts = () => {
        if (isAllowed('analytics')) {
            loadGoogleAnalytics()
        }

        if (isAllowed('marketing')) {
            loadMarketingScripts()
        }
    }

    // Load Google Analytics
    const loadGoogleAnalytics = () => {
        // Only load if not already loaded
        if (window.gtag) return

        const GA_MEASUREMENT_ID = 'G-MDEMFNGVWJ'

        const script = document.createElement('script')
        script.async = true
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
        document.head.appendChild(script)

        window.dataLayer = window.dataLayer || []
        function gtag(){ window.dataLayer.push(arguments) }
        window.gtag = gtag

        gtag('js', new Date())

        // ✅ CONSENT MODE (dit is de upgrade)
        gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied'
        })

        // ✅ GA configuratie
        gtag('config', GA_MEASUREMENT_ID, {
            anonymize_ip: true,
            cookie_flags: 'SameSite=Lax;Secure'
        })

        console.log('Google Analytics loaded with consent mode')
    }


    // Load marketing scripts
    const loadMarketingScripts = () => {
        // Add your marketing scripts here (Facebook Pixel, etc.)
        console.log('Marketing scripts loaded')
    }

    return {
        // State
        consentGiven,
        consentPreferences,
        hasConsent,

        // Methods
        initializeConsent,
        isAllowed,
        saveConsent,
        acceptAll,
        acceptNecessary,
        revokeConsent,
        setCookie,
        getCookie,
        deleteCookie,
        initializeScripts
    }
}