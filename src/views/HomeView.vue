<script setup lang="ts">
import { ref } from 'vue'

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

const products = ref<Product[]>([
  { id: 1, name: "Montre Quartz Minimal", price: 125, category: "Accessoires", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Casque Audio Pro", price: 299, category: "Électronique", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Sneakers All-White", price: 89, category: "Chaussures", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "Sac à dos Urbain", price: 55, category: "Mode", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400" },
])
</script>

<template>
  <main>
    <section class="relative bg-slate-900 py-24 px-6 overflow-hidden">
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="max-w-2xl">
          <span class="text-blue-400 font-black uppercase tracking-[0.3em] text-xs">Nouvelle Collection 2026</span>
          <h1 class="text-5xl md:text-7xl font-black text-white mt-4 leading-tight">
            Le style n'attend <span class="text-blue-500 italic">jamais.</span>
          </h1>
          <p class="text-slate-400 mt-6 text-lg">Découvrez notre sélection exclusive de produits pensés pour votre quotidien.</p>
          <div class="mt-10 flex gap-4">
            <button class="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
              Acheter maintenant
            </button>
            <button class="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all">
              En savoir plus
            </button>
          </div>
        </div>
      </div>
      <div class="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] rounded-full"></div>
    </section>

    <section class="max-w-7xl mx-auto py-20 px-6">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">Nos Bestsellers</h2>
          <p class="text-slate-500 font-medium">Les articles les plus populaires cette semaine.</p>
        </div>
        <router-link to="/boutique" class="text-blue-600 font-bold hover:underline">Voir tout →</router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="product in products" :key="product.id" class="group">
          <div class="relative aspect-square overflow-hidden rounded-[2rem] bg-slate-200 border border-slate-200">
            <img :src="product.image" :alt="product.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <button class="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <div class="mt-4">
            <p class="text-[10px] font-black text-blue-600 uppercase tracking-widest">{{ product.category }}</p>
            <h3 class="font-bold text-slate-900 text-lg">{{ product.name }}</h3>
            <p class="text-slate-500 font-bold mt-1 text-sm">{{ product.price }} $</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>