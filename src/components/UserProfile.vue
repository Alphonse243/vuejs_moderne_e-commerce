<script setup>
import { ref } from 'vue';

// Simulation des données du client
const user = ref({
  name: "Alexandre Schor",
  email: "alexandre.schor@exemple.com",
  role: "Client Premium",
  avatar: null, // Si null, on affiche les initiales
  phone: "+33 6 12 34 56 78",
  location: "Paris, France",
  joinedDate: "Membre depuis Janvier 2024",
  stats: [
    { label: "Commandes", value: 12 },
    { label: "Points SCHOR", value: 450 },
    { label: "Favoris", value: 8 }
  ]
});

const isEditing = ref(false);
</script>

<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-900 rounded-t-3xl shadow-lg">
      <div class="absolute -bottom-16 left-8 flex items-end space-x-6">
        <div class="relative">
          <div class="w-32 h-32 rounded-2xl border-4 border-white bg-gray-100 shadow-xl flex items-center justify-center overflow-hidden">
            <img v-if="user.avatar" :src="user.avatar" alt="Avatar" class="object-cover w-full h-full" />
            <span v-else class="text-4xl font-black text-blue-600 uppercase">
              {{ user.name.split(' ').map(n => n[0]).join('') }}
            </span>
          </div>
          <button class="absolute bottom-1 right-1 bg-white p-1.5 rounded-lg shadow-md hover:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-b-3xl shadow-sm border border-gray-100 pt-20 pb-8 px-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 class="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            {{ user.name }}
            <span class="px-2 py-0.5 text-[10px] bg-blue-100 text-blue-700 rounded-full uppercase tracking-widest">
              {{ user.role }}
            </span>
          </h1>
          <p class="text-gray-500 flex items-center mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ user.location }}
          </p>
        </div>

        <div class="mt-6 md:mt-0 flex gap-3">
          <button @click="isEditing = !isEditing" class="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Modifier le profil
          </button>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4 mt-10 border-t border-b border-gray-50 py-8">
        <div v-for="stat in user.stats" :key="stat.label" class="text-center">
          <p class="text-2xl font-black text-gray-900">{{ stat.value }}</p>
          <p class="text-xs text-gray-400 uppercase tracking-tighter font-bold">{{ stat.label }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div>
          <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Informations de contact</h3>
          <div class="space-y-4">
            <div class="flex items-center p-3 bg-gray-50 rounded-xl">
              <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-blue-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-gray-400 font-medium">Email</p>
                <p class="text-sm font-bold text-gray-800">{{ user.email }}</p>
              </div>
            </div>

            <div class="flex items-center p-3 bg-gray-50 rounded-xl">
              <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-blue-600 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-gray-400 font-medium">Téléphone</p>
                <p class="text-sm font-bold text-gray-800">{{ user.phone }}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Sécurité & Compte</h3>
          <div class="space-y-3">
            <button class="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all group">
              <div class="flex justify-between items-center">
                <span class="font-bold text-gray-700">Historique des commandes</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            <button class="w-full text-left p-4 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all group">
              <div class="flex justify-between items-center">
                <span class="font-bold text-gray-700">Changer le mot de passe</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            <button class="w-full text-left p-4 rounded-xl text-red-600 font-bold hover:bg-red-50 transition-all">
              Se déconnecter
            </button>
          </div>
        </div>
      </div>

      <div class="mt-10 text-center">
        <p class="text-xs text-gray-400">{{ user.joinedDate }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ajoute une petite animation d'entrée si tu veux */
.max-w-4xl {
  animation: slideUp 0.5s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>