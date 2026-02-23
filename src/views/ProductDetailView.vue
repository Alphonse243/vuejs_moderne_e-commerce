<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import api from '@/api/axios'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string

// --- RÉCUPÉRATION DU PRODUIT VIA LE SLUG ---
const { data: product, isLoading, isError } = useQuery({
  queryKey: ['product', slug],
  queryFn: async () => {
    // On suppose que ton API accepte le slug en paramètre
    const response = await api.get(`/products/${slug}`)
    return response.data.product 
  }
})

// --- LOGIQUE UI ---
const activeTab = ref('description')
const whatsappNumber = "+243972049788"

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'USD' }).format(price)
}

const shareOnWhatsApp = () => {
  if (!product.value) return
  const message = encodeURIComponent(`Salut SCHOR ! Je suis intéressé par : ${product.value.name}\nLien : ${window.location.href}`)
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
}

// Données de démo pour les avis (peuvent être rendues dynamiques plus tard)
const reviews = ref([
  { id: 1, user: "Marc D.", rating: 5, date: "2j", comment: "Qualité incroyable !", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, user: "Sarah L.", rating: 4, date: "1sm", comment: "Conforme aux photos.", avatar: "https://i.pravatar.cc/150?u=2" },
])
</script>

<template>
  <main class="bg-white min-h-screen pb-32 font-sans selection:bg-orange-100">
    
    <nav class="fixed top-0 inset-x-0 h-16 bg-white/80 backdrop-blur-lg border-b border-gray-100 z-50 flex items-center justify-between px-4">
      <button @click="router.back()" class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-900 active:scale-90 transition-transform">
        <i class="fas fa-chevron-left"></i>
      </button>
      <h1 class="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Détails de l'article</h1>
      <button class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-900">
        <i class="fas fa-ellipsis-h"></i>
      </button>
    </nav>

    <div v-if="isLoading" class="pt-24 px-6 space-y-6 animate-pulse">
      <div class="aspect-square bg-gray-100 rounded-[2.5rem]"></div>
      <div class="h-8 bg-gray-100 w-3/4 rounded-lg"></div>
      <div class="h-6 bg-gray-100 w-1/4 rounded-lg"></div>
    </div>

    <div v-else-if="isError" class="pt-32 px-6 text-center">
      <div class="bg-red-50 p-8 rounded-[2.5rem] border border-red-100">
        <i class="fas fa-exclamation-circle text-red-500 text-3xl mb-4"></i>
        <p class="text-red-600 font-bold">Produit introuvable</p>
        <button @click="router.push('/')" class="mt-4 text-sm font-black underline uppercase">Retour boutique</button>
      </div>
    </div>

    <div v-else-if="product" class="animate-page-in">
      <section class="pt-20 px-4">
        <div class="relative group">
          <div class="aspect-square rounded-[3rem] overflow-hidden bg-gray-100 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200">
                <span class="text-6xl font-black text-gray-300 opacity-50 uppercase tracking-tighter">{{ product.brand }}</span>
            </div>
            
            <div class="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-white/20">
              <span class="text-[10px] font-black uppercase tracking-widest text-gray-800">{{ product.categorie.name }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="p-6">
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
            <i class="fas fa-star text-amber-400 text-[10px]"></i>
            <span class="text-amber-700 font-black text-[10px]">4.9</span>
            <span class="text-amber-400/50 text-[10px] font-bold">| 128 ventes</span>
          </div>
          <span class="text-green-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span> En Stock
          </span>
        </div>

        <h2 class="text-3xl font-black text-gray-900 leading-none tracking-tighter mb-2 italic">
          {{ product.name }}
        </h2>
        <p class="text-gray-400 text-sm font-medium mb-6">{{ product.brand }} — Original Edition</p>
        
        <div class="flex items-end gap-3">
            <p class="text-[#FF4B2B] text-4xl font-black tracking-tighter leading-none">
              {{ formatPrice(product.price) }}
            </p>
            <p class="text-gray-300 text-lg line-through font-bold decoration-2 leading-none">
              {{ formatPrice(product.price * 1.25) }}
            </p>
        </div>
      </section>

      <div class="px-6">
        <div class="flex p-1.5 bg-gray-100 rounded-[2rem] mb-8">
            <button @click="activeTab = 'description'"
              :class="activeTab === 'description' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'"
              class="flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-[1.5rem] transition-all">
              Détails
            </button>
            <button @click="activeTab = 'avis'"
              :class="activeTab === 'avis' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'"
              class="flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-[1.5rem] transition-all">
              Avis ({{ reviews.length }})
            </button>
        </div>

        <div class="min-h-[200px] pb-10">
          <div v-if="activeTab === 'description'" class="animate-fade-in space-y-4">
            <p class="text-gray-500 text-sm leading-relaxed font-medium">
              {{ product.short_description }}
            </p>
            <div class="grid grid-cols-2 gap-3 mt-6">
              <div v-for="feat in ['Authentique', 'Garantie 1 an', 'Livraison 24h', 'SAV Schor']" :key="feat" 
                class="flex items-center gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <i class="fas fa-check-circle text-blue-500 text-[10px]"></i>
                <span class="text-[10px] font-bold text-gray-700 uppercase tracking-tighter">{{ feat }}</span>
              </div>
            </div>
          </div>

          <div v-else class="animate-fade-in space-y-6">
            <div v-for="review in reviews" :key="review.id" class="p-4 bg-gray-50 rounded-[2rem] relative">
                <div class="flex items-center gap-3 mb-3">
                    <img :src="review.avatar" class="w-8 h-8 rounded-full shadow-sm">
                    <span class="text-[10px] font-black text-gray-900">{{ review.user }}</span>
                    <span class="text-[9px] text-gray-300 font-bold ml-auto">{{ review.date }}</span>
                </div>
                <p class="text-xs text-gray-500 leading-relaxed font-medium italic">"{{ review.comment }}"</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button @click="shareOnWhatsApp"
      class="fixed bottom-28 right-6 w-14 h-14 bg-[#25D366] text-white rounded-2xl shadow-xl flex items-center justify-center text-2xl z-50 hover:scale-110 active:scale-90 transition-all animate-bounce-subtle">
      <i class="fab fa-whatsapp"></i>
    </button>

    <footer class="fixed bottom-0 inset-x-0 p-6 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex items-center gap-4 z-50">
      <button class="w-16 h-16 rounded-[1.5rem] bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 active:scale-90 transition-all hover:text-[#FF4B2B]">
        <i class="far fa-heart text-xl"></i>
      </button>
      <button class="flex-1 bg-gray-900 hover:bg-blue-600 text-white h-16 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] active:scale-95 transition-all shadow-2xl shadow-gray-200 flex items-center justify-center gap-4 group">
        <span>Ajouter au panier</span>
        <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
      </button>
    </footer>
  </main>
</template>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');

.animate-page-in {
  animation: pageIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes pageIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-8px) rotate(5deg); }
}

.animate-bounce-subtle {
  animation: bounce-subtle 4s infinite ease-in-out;
}

/* Custom transitions pour les tabs */
button {
  -webkit-tap-highlight-color: transparent;
}
</style>