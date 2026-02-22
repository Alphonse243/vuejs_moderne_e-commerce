<script setup lang="ts">
import { ref, computed } from 'vue'

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
  discount?: number;
}

const products = ref<Product[]>([
  { id: 1, name: "Montre Quartz", price: 125, category: "Accessoires", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600", isNew: true },
  { id: 2, name: "Casque Audio", price: 299, category: "Électronique", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600", discount: 15 },
  { id: 3, name: "Sneakers White", price: 89, category: "Chaussures", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600" },
  { id: 4, name: "Sac Urbain", price: 55, category: "Mode", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600", isNew: true },
  { id: 5, name: "Appareil Vintage", price: 450, category: "Électronique", image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80&w=600" },
  { id: 6, name: "Lunettes Or", price: 175, category: "Accessoires", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600", discount: 10 },
  { id: 7, name: "Clavier RGB", price: 120, category: "Électronique", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=600" },
  { id: 8, name: "Chaise Ergonomique", price: 340, category: "Mobilier", image: "https://images.unsplash.com/photo-1505797149-43b00fe9ee2c?auto=format&fit=crop&q=80&w=600" },
])

const categories = ['Tous', 'Accessoires', 'Électronique', 'Chaussures', 'Mode']
const activeCategory = ref('Tous')

const filteredProducts = computed(() => {
  if (activeCategory.value === 'Tous') return products.value
  return products.value.filter(p => p.category === activeCategory.value)
})
</script>

<template>
  <main class="bg-white pb-32"> <section class="relative min-h-[60vh] flex items-center bg-slate-900 px-6 py-12 overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full"></div>
      <div class="max-w-7xl mx-auto w-full relative z-10">
        <span class="text-blue-400 font-black uppercase tracking-[0.2em] text-[10px]">Collection 2026</span>
        <h1 class="text-4xl md:text-7xl font-black text-white mt-2 leading-[1.1] tracking-tighter uppercase">
          L'Élite du <span class="text-blue-500 italic">Style.</span>
        </h1>
        <button class="mt-8 bg-white text-slate-900 px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">
          Découvrir
        </button>
      </div>
    </section>

    <div class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-4 overflow-x-auto no-scrollbar flex gap-2">
      <button 
        v-for="cat in categories" :key="cat"
        @click="activeCategory = cat"
        :class="activeCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-500'"
        class="flex-none px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap"
      >
        {{ cat }}
      </button>
    </div>

    <section class="p-4 md:p-8">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
        <div 
          v-for="(product, index) in filteredProducts" 
          :key="product.id" 
          class="group animate-fade-in"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <div class="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-slate-100 mb-3">
            <div class="absolute top-2 left-2 z-10 flex flex-col gap-1">
              <span v-if="product.isNew" class="bg-blue-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">New</span>
              <span v-if="product.discount" class="bg-rose-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">-{{ product.discount }}%</span>
            </div>
            <img :src="product.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            
            <button class="absolute bottom-2 right-2 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>

          <div class="px-1">
            <h3 class="font-bold text-slate-900 text-xs md:text-lg truncate">{{ product.name }}</h3>
            <div class="flex items-center gap-2">
              <span class="font-black text-blue-600 text-sm">{{ product.price }} $</span>
              <span v-if="product.discount" class="text-[10px] text-slate-400 line-through font-bold">
                {{ Math.round(product.price * 1.2) }} $
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <nav class="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
      <div class="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-2 shadow-2xl flex justify-around items-center">
        <router-link to="/" class="p-3 text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        </router-link>
        <button class="p-3 text-slate-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
        <div class="relative">
          <button class="bg-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-500/40 -translate-y-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </button>
          <span class="absolute -top-1 -right-1 bg-rose-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-slate-900">2</span>
        </div>
        <button class="p-3 text-slate-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </button>
        <button class="p-3 text-slate-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </button>
      </div>
    </nav>

  </main>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
  opacity: 0;
}
</style>