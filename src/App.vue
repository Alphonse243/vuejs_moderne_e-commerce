<script setup>
import NavBar from './components/NavBar.vue'
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
    
  </div>
  <NavBar />
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
