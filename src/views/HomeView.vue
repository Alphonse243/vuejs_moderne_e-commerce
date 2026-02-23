<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import api from '@/api/axios';
import ProductList from '@/components/ProductList.vue';

// --- TYPES ---
interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  short_description: string;
  categorie: {
    id: number;
    name: string;
    color?: string;
  };
  // Champs optionnels si ton API les ajoute plus tard
  image?: string;
  discount?: number;
  isNew?: boolean;
}

// --- LOGIQUE API ---

// 1. Récupération des catégories
const { data: categoriesData, isLoading: loadingCats } = useQuery({
  queryKey: ['categories'],
  queryFn: async () => {
    const response = await api.get('/categories');
    return response.data.categories as Category[];
  },
});

// 2. Récupération des produits
const { data: products, isLoading: loadingProducts } = useQuery({
  queryKey: ['products'],
  queryFn: async () => {
    const response = await api.get('/products');
    return response.data.products as Product[];
  },
});

// 3. Filtrage
const activeCategoryId = ref<number | null>(null);

const filteredProducts = computed(() => {
  if (!products.value) return [];
  if (activeCategoryId.value === null) return products.value;
  return products.value.filter(p => p.categorie.id === activeCategoryId.value);
});

// Produits pour les "Ventes Flash" (ex: les 4 premiers)
const flashProducts = computed(() => {
  return products.value ? products.value.slice(0, 5) : [];
});

// --- UI HELPERS ---
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD' }).format(price);
};

const timeLeft = ref("02:45:12"); // Tu peux garder ta logique de compte à rebours ici

// --- LOGIQUE CAROUSEL ---
const currentSlide = ref(0);
const slides = [
  { title: "Mois de la Mode", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?auto=format&fit=crop&w=800&q=80" },
  { title: "Tech Days -70%", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80" },
];

let timer: number;
onMounted(() => {
  timer = window.setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length;
  }, 4000);
});
onUnmounted(() => clearInterval(timer));
</script>

<template>
  <main class="bg-gray-100 min-h-screen pb-24">
    
    <header class="fixed top-0 left-0 right-0 z-50 bg-[#FF4B2B] px-4 py-3 flex items-center gap-3 shadow-md">
      <div class="flex-1 bg-white rounded-full flex items-center px-4 py-2 gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input type="text" placeholder="Chercher sur SchorShop..." class="bg-transparent text-sm w-full outline-none text-gray-700" />
      </div>
      <button class="relative text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        <span class="absolute -top-1 -right-1 bg-yellow-400 text-[10px] text-black font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">5</span>
      </button>
    </header>

    <section class="mt-14 relative h-48 overflow-hidden">
      <div v-for="(slide, i) in slides" :key="i" 
           class="absolute inset-0 transition-all duration-700"
           :class="currentSlide === i ? 'translate-x-0' : 'translate-x-full'">
        <img :src="slide.img" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-6">
          <h2 class="text-white text-2xl font-black uppercase italic">{{ slide.title }}</h2>
          <p class="text-yellow-400 text-xs font-bold mt-1">Saisissez l'occasion maintenant</p>
        </div>
      </div>
    </section>

    <section class="bg-white py-4 px-2 flex overflow-x-auto no-scrollbar gap-4 shadow-sm border-b border-gray-100">
      <button 
        @click="activeCategoryId = null"
        class="flex flex-col items-center min-w-[75px] gap-1 transition-all"
        :class="activeCategoryId === null ? 'scale-110' : 'opacity-60'"
      >
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors"
             :class="activeCategoryId === null ? 'bg-orange-50 border-orange-200 text-[#FF4B2B]' : 'bg-gray-50 border-gray-100 text-gray-400'">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>
        </div>
        <span class="text-[10px] font-bold uppercase tracking-tighter">Tous</span>
      </button>

      <button v-for="cat in categoriesData" :key="cat.id" 
        @click="activeCategoryId = cat.id"
        class="flex flex-col items-center min-w-[75px] gap-1 transition-all"
        :class="activeCategoryId === cat.id ? 'scale-110' : 'opacity-60'"
      >
        <div class="w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors"
             :class="activeCategoryId === cat.id ? 'bg-orange-50 border-orange-200 text-[#FF4B2B]' : 'bg-gray-50 border-gray-100 text-gray-400'">
           <span class="text-xs font-bold">{{ cat.name.substring(0,2).toUpperCase() }}</span>
        </div>
        <span class="text-[10px] font-bold uppercase tracking-tighter truncate w-full text-center">{{ cat.name }}</span>
      </button>
    </section>

    <section v-if="flashProducts.length > 0" class="mt-2 bg-white p-4">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-2">
          <h3 class="text-[#FF4B2B] font-black uppercase text-sm italic tracking-tighter">Ventes Flash</h3>
          <div class="flex gap-1 text-white font-bold text-[10px]">
            <span class="bg-black px-1.5 py-0.5 rounded">{{ timeLeft.split(':')[0] }}</span>
            <span class="text-black">:</span>
            <span class="bg-black px-1.5 py-0.5 rounded">{{ timeLeft.split(':')[1] }}</span>
            <span class="text-black">:</span>
            <span class="bg-black px-1.5 py-0.5 rounded text-[#FF4B2B]">{{ timeLeft.split(':')[2] }}</span>
          </div>
        </div>
        <button class="text-gray-400 text-[10px] font-bold uppercase">Tout voir</button>
      </div>
      
      <div class="flex overflow-x-auto gap-4 no-scrollbar">
        <div v-for="p in flashProducts" :key="p.id" class="min-w-[130px] relative animate-fade-in">
          <div class="aspect-square rounded-2xl bg-gray-100 overflow-hidden mb-2">
            <div class="w-full h-full flex items-center justify-center text-gray-300 font-bold bg-gray-200">
               {{ p.brand }}
            </div>
          </div>
          <p class="text-[#FF4B2B] font-black text-lg leading-none">{{ formatPrice(p.price) }}</p>
          <p class="text-[9px] text-gray-400 line-through">{{ formatPrice(p.price * 1.2) }}</p>
          <div class="absolute top-1 right-1 bg-[#FF4B2B] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-lg shadow-sm">
            -20%
          </div>
        </div>
      </div>
    </section>

    <section class="p-3 mt-2">
      <div class="flex items-center justify-between mb-4 px-1">
        <h3 class="font-black text-gray-800 text-sm uppercase tracking-widest italic">Pour vous</h3>
        <span class="h-[1px] flex-1 bg-gray-200 ml-4"></span>
      </div>

      <div v-if="loadingProducts" class="grid grid-cols-2 gap-3">
        <div v-for="i in 4" :key="i" class="h-60 bg-white rounded-3xl animate-pulse"></div>
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div v-for="p in filteredProducts" :key="p.id" 
             class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col active:scale-95 transition-all duration-300">
          
          <div class="relative aspect-[4/5] bg-gray-50 flex items-center justify-center group">
            <span class="text-gray-300 font-black text-xl transition-transform group-hover:scale-110">{{ p.brand }}</span>
            <div v-if="p.isNew" class="absolute top-3 left-3 bg-green-500 text-white text-[8px] font-black px-2 py-1 rounded-full shadow-sm">NOUVEAU</div>
            
            <div class="absolute bottom-2 left-2 text-[8px] bg-white/80 backdrop-blur-sm text-gray-600 px-2 py-0.5 rounded-full font-bold">
              {{ p.categorie.name }}
            </div>
          </div>

          <div class="p-4 flex-1 flex flex-col">
            <h4 class="text-xs text-gray-800 font-bold line-clamp-2 leading-snug mb-3 h-8">{{ p.name }}</h4>
            
            <div class="mt-auto">
              <div class="flex items-end justify-between">
                <div>
                  <p class="text-[#FF4B2B] font-black text-xl leading-none">{{ formatPrice(p.price) }}</p>
                  <p class="text-[9px] text-gray-400 font-bold mt-1 uppercase">Stock limité</p>
                </div>
                <button class="bg-gray-900 text-white w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#FF4B2B] transition-colors shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!loadingProducts && filteredProducts.length === 0" class="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
        <p class="text-gray-400 font-bold italic">Aucun article ici...</p>
      </div>
    </section>

    <ProductList />

  </main>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

/* On applique l'animation avec un délai pour chaque produit */
.grid > div {
  animation: fadeIn 0.5s ease-out forwards;
}
</style>