import { NhostClient } from '@nhost/nhost-js'
import { NhostVueProvider } from '@nhost/vue'
import type { NhostAuthMethods } from '~/types/nhost'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public

  // Vérification si l'instance Nhost est déjà fournie, sinon on la crée
  if (!nuxtApp.$nhost) {
    const nhost = new NhostClient({
      subdomain: String(config.nhostSubdomain), // Utilisez la variable correcte
      region: String(config.nhostRegion), // Utilisez la variable correcte
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

    // Méthodes d'authentification personnalisées
    const authMethods: NhostAuthMethods = {
      register: async (email: string, password: string, role?: string) => {
        try {
          const { error, session } = await nhost.auth.signUp({
            email,
            password,
            options: {
              defaultRole: role || 'guest', // Utilisez defaultRole pour définir le rôle
              allowedRoles: [role || 'guest'] // Ajoutez allowedRoles si nécessaire
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

    // Injection dans l'application Nuxt si pas déjà injecté
    nuxtApp.provide('nhost', nhost)
    nuxtApp.provide('nhostUrls', additionalUrls)
    nuxtApp.provide('auth', authMethods)

    // Ajouter le provider NhostVueProvider à Nuxt
    nuxtApp.vueApp.use(NhostVueProvider, { nhost })
  }
})