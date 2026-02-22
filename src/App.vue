<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <router-link to="/" class="text-2xl font-black tracking-tighter text-blue-600">
          Duka<span class="text-slate-900">SHOP</span>
        </router-link>
        
        <div class="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-widest">
          <router-link to="/" class="hover:text-blue-600 transition-colors">Accueil</router-link>
          <router-link to="/boutique" class="hover:text-blue-600 transition-colors">Boutique</router-link>
          <a href="#" class="hover:text-blue-600 transition-colors">Contact</a>
        </div>

        <div class="flex items-center gap-4">
          <button class="relative p-2 hover:bg-slate-100 rounded-full transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="absolute top-0 right-0 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </button>
        </div>
      </div>
    </nav>

    <router-view></router-view>
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 flex justify-around items-center z-50">
      <button class="flex flex-col items-center gap-1 text-[#FF4B2B]">
        <i class="fas fa-home text-lg"></i>
        <span class="text-[9px] font-bold uppercase">Accueil</span>
      </button>
      <button class="flex flex-col items-center gap-1 text-gray-400">
        <i class="fas fa-th-large text-lg"></i>
        <span class="text-[9px] font-bold uppercase">Catégories</span>
      </button>
      <button class="flex flex-col items-center gap-1 text-gray-400 relative">
        <div class="bg-gray-100 w-12 h-12 rounded-full -mt-8 border-4 border-gray-100 flex items-center justify-center shadow-lg bg-gradient-to-tr from-[#FF4B2B] to-[#FF8C00] text-white">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <span class="text-[9px] font-bold uppercase mt-1">Panier</span>
        <span class="absolute -top-6 right-0 bg-yellow-400 text-black text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">2</span>
      </button>
      <button class="flex flex-col items-center gap-1 text-gray-400">
        <i class="fas fa-heart text-lg"></i>
        <span class="text-[9px] font-bold uppercase">Favoris</span>
      </button>
      <button class="flex flex-col items-center gap-1 text-gray-400">
        <i class="fas fa-user text-lg"></i>
        <span class="text-[9px] font-bold uppercase">Compte</span>
      </button>
    </nav>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
