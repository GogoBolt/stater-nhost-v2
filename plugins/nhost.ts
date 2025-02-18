import { NhostClient } from '@nhost/nhost-js'
import { NhostVueProvider } from '@nhost/vue'
import { type NhostAuthMethods } from '~/types/nhost'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig().public

  if (!nuxtApp.$nhost) {
    const nhost = new NhostClient({
      subdomain: String(config.nhostSubdomain),
      region: String(config.nhostRegion),
      graphqlUrl: String(config.nhostBackendUrl),
      authUrl: String(config.nhostAuthUrl)
    })

    const additionalUrls = {
      storageUrl: config.nhostStorageUrl,
      functionsUrl: config.nhostFunctionsUrl,
      dashboardUrl: config.nhostDashboardUrl,
      mailhogUrl: config.nhostMailhogUrl,
      postgresUrl: config.nhostPostgresUrl
    }

    const authMethods: NhostAuthMethods = {
      register: async (email: string, password: string, role?: string) => {
        try {
          const { error, session } = await nhost.auth.signUp({
            email,
            password,
            options: {
              defaultRole: role || 'guest',
              allowedRoles: [role || 'guest']
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
      },

      // Connexion avec un fournisseur OAuth dynamique (Google, Facebook, GitHub, etc.)
      loginWithProvider: async (provider: string) => {
        try {
          const { error, session } = await nhost.auth.signIn({
            provider: provider  as any 
          })

          if (error) {
            console.error(`Erreur lors de la connexion via ${provider}:`, error)
            return false
          }
          return true
        } catch (error) {
          console.error(`Erreur lors de la connexion via ${provider}:`, error)
          return false
        }
      },

      signIn: function (arg0: { email: string; password: string }): { session: any; error: any } | PromiseLike<{ session: any; error: any }> {
        throw new Error('Function not implemented.')
      }
    }

    nuxtApp.provide('nhost', nhost)
    nuxtApp.provide('nhostUrls', additionalUrls)
    nuxtApp.provide('auth', authMethods)

    nuxtApp.vueApp.use(NhostVueProvider, { nhost })
  }
})
