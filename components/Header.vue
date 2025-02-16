<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <span class="text-2xl font-bold text-primary-600">GogoSoft</span>
            <span class="ml-2 text-sm text-gray-500">Cantine Scolaire</span>
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <div class="hidden md:flex md:items-center md:space-x-6">
          <template v-if="isAuthenticated">
            <NuxtLink 
              to="/dashboard" 
              class="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Tableau de bord
            </NuxtLink>
            <button
              @click="logout"
              class="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Déconnexion
            </button>
          </template>
          <template v-else>
            <NuxtLink 
              to="/login" 
              class="text-gray-600 hover:text-primary-600 transition-colors"
            >
              Connexion
            </NuxtLink>
            <NuxtLink 
              to="/register" 
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              Inscription
            </NuxtLink>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template> 


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const { $nhost } = useNuxtApp();
const router = useRouter();

// État pour vérifier si l'utilisateur est authentifié
const isAuthenticated = ref(false);

// Fonction pour vérifier l'état d'authentification
const checkAuth = () => {
  isAuthenticated.value = $nhost.auth.isAuthenticated();
};

// Fonction pour déconnecter l'utilisateur
const logout = async () => {
  try {
    await $nhost.auth.signOut();
    isAuthenticated.value = false; // Mettre à jour l'état d'authentification
    router.push('/login'); // Rediriger vers la page de connexion
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
  }
};

// Vérifier l'état d'authentification au montage du composant
onMounted(() => {
  checkAuth();
});
</script>