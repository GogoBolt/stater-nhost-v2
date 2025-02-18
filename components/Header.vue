<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" class="h-10 w-10 mr-3 rounded-lg object-cover" />
            <div>
              <span class="text-xl font-bold text-primary-600">GogoSoft</span>
              <span class="text-sm text-gray-500 block">Cantine Scolaire</span>
            </div>
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <div class="hidden md:flex md:items-center md:space-x-6">
          <template v-if="isAuthenticated">
            <NuxtLink 
              to="/dashboard" 
              class="text-gray-600 hover:text-primary-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Tableau de bord
            </NuxtLink>
            <button
              @click="handleLogout"
              class="text-gray-600 hover:text-primary-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Déconnexion
            </button>
          </template>
          <template v-else>
            <NuxtLink 
              to="/login" 
              class="text-gray-600 hover:text-primary-600 transition-colors px-3 py-2 rounded-md text-sm font-medium"
            >
              Connexion
            </NuxtLink>
            <NuxtLink 
              to="/register" 
              class="btn btn-primary"
            >
              Inscription
            </NuxtLink>
          </template>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
          >
            <span class="sr-only">Ouvrir le menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        v-show="mobileMenuOpen"
        class="md:hidden"
      >
        <div class="pt-2 pb-3 space-y-1">
          <template v-if="isAuthenticated">
            <NuxtLink
              to="/dashboard"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              @click="mobileMenuOpen = false"
            >
              Tableau de bord
            </NuxtLink>
            <button
              @click="handleLogout"
              class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Déconnexion
            </button>
          </template>
          <template v-else>
            <NuxtLink
              to="/login"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              @click="mobileMenuOpen = false"
            >
              Connexion
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              @click="mobileMenuOpen = false"
            >
              Inscription
            </NuxtLink>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '~/composables/auth';
import { toast } from 'vue3-toastify';
import { navigateTo }from 'nuxt/app';

const { isAuthenticated, logout } = useAuth(); 
const mobileMenuOpen = ref(false);

const handleLogout = async () => {
  try {
    await logout();
    toast.success('Déconnexion réussie');
    navigateTo('/login');
  } catch (error) {
    toast.error('Erreur lors de la déconnexion');
  }
};
</script>