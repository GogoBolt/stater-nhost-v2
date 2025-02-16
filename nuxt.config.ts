export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      Subdomain: process.env.NUXT_NHOST_SUBDOMAIN,  // Sous-domaine en local
      nhostBackendUrl: process.env.NUXT_NHOST_BACKEND_URL,
      nhostAuthUrl: process.env.NUXT_NHOST_AUTH_URL,
      nhostStorageUrl: process.env.NUXT_NHOST_STORAGE_URL,
      nhostFunctionsUrl: process.env.NUXT_NHOST_FUNCTIONS_URL,
      nhostDashboardUrl: process.env.NUXT_NHOST_DASHBOARD_URL,
      nhostMailhogUrl: process.env.NUXT_NHOST_MAILHOG_URL,
      Region: process.env.NHOST_REGION,
      nhostPostgresUrl: process.env.NUXT_NHOST_POSTGRES_URL
    }
  },
  plugins: ['~/plugins/nhost.js']
})
