<script setup>
import { ref, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import api from '@/api/axios';

// 1. État pour la catégorie sélectionnée (null = toutes)
const selectedCategory = ref(null);

// 2. Récupération des produits
const { data: products, isLoading: loadingProducts, isError, error } = useQuery({
  queryKey: ['products'],
  queryFn: async () => {
    const response = await api.get('/products');
    return response.data.products; 
  },
});

// 3. Récupération des catégories
const { data: categories, isLoading: loadingCats } = useQuery({
  queryKey: ['categories'],
  queryFn: async () => {
    const response = await api.get('/categories');
    return response.data.categories;
  },
});

// 4. Logique de filtrage
const filteredProducts = computed(() => {
  if (!products.value) return [];
  if (!selectedCategory.value) return products.value;
  
  return products.value.filter(product => 
    product.categorie.id === selectedCategory.value
  );
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD' }).format(price);
};
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <header class="mb-10 text-center">
      <h1 class="text-4xl font-extrabold text-gray-900">Boutique</h1>
      <p class="text-gray-500 mt-2">Équipements et contenus pour professionnels</p>
    </header>

    <div class="mb-10 overflow-x-auto pb-4">
      <div class="flex flex-nowrap md:flex-wrap gap-3 justify-start md:justify-center min-w-max md:min-w-0">
        <button 
          @click="selectedCategory = null"
          :class="[
            'px-6 py-2 rounded-full text-sm font-semibold transition-all border',
            selectedCategory === null 
              ? 'bg-gray-900 text-white border-gray-900 shadow-md' 
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
          ]"
        >
          Tous
        </button>

        <button 
          v-for="cat in categories" 
          :key="cat.id"
          @click="selectedCategory = cat.id"
          :class="[
            'px-6 py-2 rounded-full text-sm font-semibold transition-all border whitespace-nowrap',
            selectedCategory === cat.id 
              ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
          ]"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>

    <div v-if="loadingProducts || loadingCats" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="h-80 bg-gray-100 animate-pulse rounded-2xl"></div>
    </div>

    <div v-else-if="isError" class="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">
      Erreur : {{ error.message }}
    </div>

    <div v-else>
      <div v-if="filteredProducts.length > 0" class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <article 
          v-for="product in filteredProducts" 
          :key="product.id" 
          class="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
        >
          <div class="relative">
              <div 
                class="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm z-10"
                :style="{ backgroundColor: product.categorie.color || '#3b82f6' }"
              >
                {{ product.categorie.name }}
              </div>
              <div class="aspect-video bg-gray-200 flex items-center justify-center overflow-hidden">
                 <span class="text-gray-400 font-medium group-hover:scale-110 transition-transform duration-500">{{ product.brand }}</span>
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
                class="bg-gray-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors shadow-lg active:scale-95"
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

      <div v-else class="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
        <p class="text-gray-500">Aucun produit trouvé dans cette catégorie.</p>
        <button @click="selectedCategory = null" class="mt-4 text-blue-600 font-bold underline">Voir tout</button>
      </div>
    </div>
  </div>
</template>