export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      Subdomain: process.env.NUXT_NHOST_SUBDOMAIN,  // Sous-domaine en local
      BackendUrl: process.env.NUXT_NHOST_BACKEND_URL,
      AuthUrl: process.env.NUXT_NHOST_AUTH_URL,
      StorageUrl: process.env.NUXT_NHOST_STORAGE_URL,
      FunctionsUrl: process.env.NUXT_NHOST_FUNCTIONS_URL,
      DashboardUrl: process.env.NUXT_NHOST_DASHBOARD_URL,
      MailhogUrl: process.env.NUXT_NHOST_MAILHOG_URL,
      Region: process.env.NHOST_REGION,
      nhostPostgresUrl: process.env.NUXT_NHOST_POSTGRES_URL
    }
  },
  plugins: ['~/plugins/nhost.js']
})
