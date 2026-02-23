<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import api from '@/api/axios';

const router = useRouter();
const searchQuery = ref('');

// --- API DATA ---
const { data: categories, isLoading: loadingCats } = useQuery({
  queryKey: ['categories'],
  queryFn: async () => {
    const response = await api.get('/categories');
    return response.data.categories;
  },
});

const { data: products, isLoading: loadingProducts } = useQuery({
  queryKey: ['products'],
  queryFn: async () => {
    const response = await api.get('/products');
    return response.data.products;
  },
});

// --- LOGIQUE DE FILTRAGE ---
const activeCategoryId = ref<number | null>(null);

const filteredProducts = computed(() => {
  let list = products.value || [];
  if (activeCategoryId.value !== null) {
    list = list.filter(p => p.categorie.id === activeCategoryId.value);
  }
  if (searchQuery.value.trim() !== '') {
    list = list.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
  }
  return list;
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD' }).format(price);
};
</script>

<template>
  <main class="bg-white min-h-screen flex flex-col font-sans">
    
    <header class="px-5 py-4 space-y-4 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-50">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-black tracking-tighter italic">RAYONS <span class="text-blue-600">.</span></h1>
        <div class="flex gap-3">
          <button class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
            <i class="fas fa-bell"></i>
          </button>
        </div>
      </div>

      <div class="relative group">
        <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors"></i>
        <input 
          v-model="searchQuery"
          type="text" 
          placeholder="Rechercher un article..." 
          class="w-full bg-gray-100 border-none rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
        />
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      
      <aside class="w-20 md:w-28 bg-gray-50/50 border-r border-gray-100 overflow-y-auto no-scrollbar">
        <div class="flex flex-col py-4">
          <button 
            @click="activeCategoryId = null"
            class="group relative py-5 flex flex-col items-center gap-2 transition-all"
            :class="activeCategoryId === null ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'"
          >
            <div v-if="activeCategoryId === null" class="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
            
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-active:scale-90"
                 :class="activeCategoryId === null ? 'bg-white shadow-xl shadow-blue-100 border border-blue-50' : 'bg-transparent border border-transparent'">
              <i class="fas fa-border-all text-lg"></i>
            </div>
            <span class="text-[9px] font-black uppercase tracking-widest">Tous</span>
          </button>

          <button 
            v-for="cat in categories" 
            :key="cat.id"
            @click="activeCategoryId = cat.id"
            class="group relative py-5 flex flex-col items-center gap-2 transition-all"
            :class="activeCategoryId === cat.id ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'"
          >
            <div v-if="activeCategoryId === cat.id" class="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-l-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
            
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-active:scale-90"
                 :class="activeCategoryId === cat.id ? 'bg-white shadow-xl shadow-blue-100 border border-blue-50' : 'bg-transparent border border-transparent'">
              <span class="text-xs font-black">{{ cat.name.substring(0,2).toUpperCase() }}</span>
            </div>
            <span class="text-[9px] font-black uppercase tracking-widest text-center px-1 line-clamp-1">{{ cat.name }}</span>
          </button>
        </div>
      </aside>

      <section class="flex-1 overflow-y-auto p-4 bg-white relative">
        
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
            {{ activeCategoryId ? categories?.find(c => c.id === activeCategoryId)?.name : 'Tous les articles' }}
          </h2>
          <span class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
            {{ filteredProducts.length }} items
          </span>
        </div>

        <div v-if="loadingProducts" class="grid grid-cols-2 gap-4">
          <div v-for="i in 6" :key="i" class="h-64 bg-gray-50 rounded-[2.5rem] animate-pulse"></div>
        </div>

        <div v-else-if="filteredProducts.length === 0" class="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
          <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
             <i class="fas fa-search text-gray-200 text-3xl"></i>
          </div>
          <h3 class="text-lg font-black text-gray-900 leading-tight">Aucun résultat</h3>
          <p class="text-sm text-gray-400 mt-2 px-10">Désolé, nous n'avons pas trouvé l'article "{{ searchQuery }}" dans ce rayon.</p>
        </div>

        <TransitionGroup 
          name="list" 
          tag="div" 
          class="grid grid-cols-2 gap-4 pb-32"
        >
          <article 
            v-for="p in filteredProducts" 
            :key="p.id"
            @click="router.push(`/produit/${p.slug}`)"
            class="group bg-white rounded-[2.5rem] p-2 border border-gray-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 cursor-pointer relative flex flex-col"
          >
            <div class="aspect-[4/5] rounded-[2rem] bg-gray-50 overflow-hidden relative group">
              <div class="w-full h-full flex items-center justify-center text-gray-200 font-black text-3xl transition-transform duration-700 group-hover:scale-125">
                {{ p.brand.substring(0,1) }}
              </div>
              
              <div class="absolute bottom-3 right-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <button class="w-10 h-10 bg-gray-900 text-white rounded-2xl shadow-xl flex items-center justify-center active:scale-90">
                  <i class="fas fa-plus text-xs"></i>
                </button>
              </div>
            </div>

            <div class="p-3">
              <p class="text-[9px] font-black text-blue-600 uppercase tracking-tighter mb-1">{{ p.brand }}</p>
              <h4 class="text-[11px] font-bold text-gray-900 line-clamp-1 mb-3 italic tracking-tight">{{ p.name }}</h4>
              <div class="flex items-center justify-between mt-auto">
                <span class="text-sm font-black text-gray-900">{{ formatPrice(p.price) }}</span>
                <div class="flex items-center gap-1">
                   <i class="fas fa-star text-amber-400 text-[8px]"></i>
                   <span class="text-[9px] font-bold text-gray-400">4.8</span>
                </div>
              </div>
            </div>
          </article>
        </TransitionGroup>

      </section>
    </div>

    <nav class="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-gray-900/95 backdrop-blur-xl h-16 rounded-[2rem] flex items-center justify-around px-6 shadow-2xl z-50">
      <button @click="router.push('/')" class="text-white/40 hover:text-white transition-colors"><i class="fas fa-home text-lg"></i></button>
      <button class="text-blue-500 transition-colors scale-125"><i class="fas fa-th-large text-lg"></i></button>
      <button @click="router.push('/boutique')" class="text-white/40 hover:text-white transition-colors"><i class="fas fa-shopping-bag text-lg"></i></button>
      <button @click="router.push('/profile')" class="text-white/40 hover:text-white transition-colors"><i class="fas fa-user text-lg"></i></button>
    </nav>
  </main>
</template>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* ANIMATION DE LISTE (FLUIDE) */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

.list-leave-active {
  position: absolute;
}

/* FADE IN SIMPLE */
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* TOUCH FEEDBACK */
button:active {
  transform: scale(0.95);
}
</style>