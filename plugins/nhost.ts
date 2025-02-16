import { NhostClient } from '@nhost/nhost-js'

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig().public

  // Vérification si l'instance Nhost est déjà fournie, sinon on la crée
  if (!nuxtApp.$nhost) {
    const nhost = new NhostClient({
      subdomain: String(config.nhostSubdomain),
      region: String(config.nhostRegion),
      graphqlUrl: String(config.nhostBackendUrl),
      authUrl: String(config.nhostAuthUrl)
    })

    // Stockage des autres URLs pour utilisation ultérieure
    const additionalUrls = {
      storageUrl: config.nhostStorageUrl,
      functionsUrl: config.nhostFunctionsUrl,
      dashboardUrl: config.nhostDashboardUrl,
      mailhogUrl: config.nhostMailhogUrl,
      postgresUrl: config.nhostPostgresUrl
    }

    // Injection dans l'application Nuxt si pas déjà injecté
    nuxtApp.provide('nhost', nhost)
    nuxtApp.provide('nhostUrls', additionalUrls)
  }
})
