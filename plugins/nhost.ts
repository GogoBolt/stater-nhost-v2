// plugins/nhost.ts

/**
 * Ce plugin initialise le client Nhost pour votre application Nuxt.
 *
 * Les variables de configuration utilisées ici proviennent du runtime config,
 * qui charge les variables d'environnement depuis :
 * - .env.local pour le développement
 * - .env.production pour la production
 *
 * Les clés utilisées ici correspondent aux variables définies dans vos fichiers d'environnement :
 *   - config.nhostSubdomain  <-> NUXT_PUBLIC_NHOST_SUBDOMAIN
 *   - config.nhostRegion     <-> NUXT_PUBLIC_NHOST_REGION
 *   - config.nhostBackendUrl <-> NUXT_PUBLIC_NHOST_BACKEND_URL
 *   - config.nhostAuthUrl    <-> NUXT_PUBLIC_NHOST_AUTH_URL
 *   - config.nhostStorageUrl <-> NUXT_PUBLIC_NHOST_STORAGE_URL
 *   - config.nhostFunctionsUrl <-> NUXT_PUBLIC_NHOST_FUNCTIONS_URL
 *   - config.nhostDashboardUrl <-> NUXT_PUBLIC_NHOST_DASHBOARD_URL
 *   - config.nhostMailhogUrl <-> NUXT_PUBLIC_NHOST_MAILHOG_URL (optionnel en production)
 *   - config.nhostPostgresUrl <-> NUXT_PUBLIC_NHOST_POSTGRES_URL
 */

import { NhostClient } from '@nhost/nhost-js'
import { NhostVueProvider } from '@nhost/vue'
import type { NhostAuthMethods } from '~/types/nhost'

export default defineNuxtPlugin((nuxtApp) => {
  // Récupération des variables d'environnement publiques via le runtime config Nuxt
  const config = useRuntimeConfig().public

  // Si le client Nhost n'est pas déjà présent dans l'application, on l'initialise
  if (!nuxtApp.$nhost) {
    const nhost = new NhostClient({
      // Configuration du client Nhost avec les variables d'environnement
      subdomain: String(config.nhostSubdomain), // Ex. "local" ou "mon-sous-domaine-prod"
      region: String(config.nhostRegion),         // Ex. "local" ou "ma-region-prod"
      graphqlUrl: String(config.nhostBackendUrl),   // URL du serveur GraphQL
      authUrl: String(config.nhostAuthUrl)          // URL d'authentification
    })

    // Stockage des autres URLs pour une utilisation ultérieure dans l'application
    const additionalUrls = {
      storageUrl: config.nhostStorageUrl,       // URL du service de stockage
      functionsUrl: config.nhostFunctionsUrl,   // URL des fonctions serverless
      dashboardUrl: config.nhostDashboardUrl,   // URL du dashboard Nhost
      mailhogUrl: config.nhostMailhogUrl,         // URL de Mailhog (généralement en développement)
      postgresUrl: config.nhostPostgresUrl        // URL de la base de données Postgres
    }

    // Définition des méthodes d'authentification personnalisées
    const authMethods: NhostAuthMethods = {
      register: async (email: string, password: string, role?: string) => {
        try {
          const { error, session } = await nhost.auth.signUp({
            email,
            password,
            options: {
              defaultRole: role || 'guest',       // Définit le rôle par défaut
              allowedRoles: [role || 'guest']       // Définit les rôles autorisés
            }
          })

          if (error) {
            console.error('Erreur lors de l\'inscription :', error)
            return false
          }
          return true
        } catch (error) {
          console.error('Erreur lors de l\'inscription :', error)
          return false
        }
      },
      login: async (email: string, password: string) => {
        try {
          const { error, session } = await nhost.auth.signIn({
            email,
            password
          })

          if (error) {
            console.error('Erreur lors de la connexion :', error)
            return false
          }
          return true
        } catch (error) {
          console.error('Erreur lors de la connexion :', error)
          return false
        }
      },
      logout: async () => {
        try {
          const { error } = await nhost.auth.signOut()

          if (error) {
            console.error('Erreur lors de la déconnexion :', error)
            return false
          }
          return true
        } catch (error) {
          console.error('Erreur lors de la déconnexion :', error)
          return false
        }
      }
    }

    // Injection des instances dans l'application Nuxt
    nuxtApp.provide('nhost', nhost)
    nuxtApp.provide('nhostUrls', additionalUrls)
    nuxtApp.provide('auth', authMethods)

    // Ajout du provider NhostVueProvider à l'application Vue
    nuxtApp.vueApp.use(NhostVueProvider, { nhost })
  }
})
