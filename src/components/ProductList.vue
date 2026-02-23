<script setup>
import { useQuery } from '@tanstack/vue-query';
import api from '@/api/axios';

const { data: products, isLoading, isError, error } = useQuery({
  queryKey: ['products'],
  queryFn: async () => {
    const response = await api.get('/products');
    // On cible précisément la clé "products" de ton JSON
    return response.data.products; 
  },
});

// Petite fonction pour formater le prix
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD' }).format(price);
};
</script>


<template>
  <div class="max-w-7xl mx-auto p-6">
    <header class="mb-10 text-center">
      <h1 class="text-4xl font-extrabold text-gray-900">Boutique SCHOR</h1>
      <p class="text-gray-500 mt-2">Équipements et contenus pour professionnels</p>
    </header>

    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="h-80 bg-gray-100 animate-pulse rounded-2xl"></div>
    </div>

    <div v-else-if="isError" class="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">
      Erreur : {{ error.message }}
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <article 
        v-for="product in products" 
        :key="product.id" 
        class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
      >
        <div class="relative">
            <div 
              class="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
              :style="{ backgroundColor: product.categorie.color }"
            >
              {{ product.categorie.name }}
            </div>
            <div class="aspect-video bg-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
               <span class="text-gray-400 font-medium">{{ product.brand }}</span>
            </div>
        </div>

        <div class="p-5 flex flex-col flex-grow">
          <h2 class="text-lg font-bold text-gray-800 line-clamp-2 min-h-[3.5rem]">
            {{ product.name }}
          </h2>
          
          <p class="text-sm text-gray-500 mt-2 line-clamp-2">
            {{ product.short_description }}
          </p>

          <div class="mt-auto pt-5 flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-xs text-gray-400 uppercase font-bold tracking-tighter">Prix</span>
              <span class="text-xl font-black text-blue-600">{{ formatPrice(product.price) }}</span>
            </div>
            
            <button 
              class="bg-gray-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors"
              title="Ajouter au panier"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>