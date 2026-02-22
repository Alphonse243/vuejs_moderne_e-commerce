<script setup lang="ts">
import { ref } from 'vue'

// Données de démo pour les avis
const reviews = ref([
  { id: 1, user: "Marc D.", rating: 5, date: "Il y a 2 jours", comment: "Qualité incroyable, la livraison a été super rapide à Kinshasa !", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, user: "Sarah L.", rating: 4, date: "Il y a 1 semaine", comment: "Très bon produit, conforme aux photos. Je recommande.", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, user: "Jean-Paul M.", rating: 5, date: "Il y a 2 semaines", comment: "Le meilleur rapport qualité/prix que j'ai trouvé jusqu'ici.", avatar: "https://i.pravatar.cc/150?u=3" },
])

const activeTab = ref('description') // 'description' ou 'avis'
const whatsappNumber = "+243000000000" // Remplace par ton vrai numéro
const productUrl = window.location.href

const shareOnWhatsApp = () => {
  const message = encodeURIComponent(`Salut ! Je suis intéressé par ce produit : ${productUrl}`)
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
}
</script>

<template>
  <main class="bg-gray-50 min-h-screen pb-32">
    <div class="bg-white p-4 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-50">
      <button @click="$router?.back()" class="text-gray-900"><i class="fas fa-arrow-left"></i></button>
      <h1 class="text-lg font-black uppercase tracking-tighter">Détails du Produit</h1>
    </div>

    <section class="bg-white p-4">
      <div class="aspect-square rounded-[2rem] overflow-hidden mb-6 shadow-xl">
        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800" class="w-full h-full object-cover" alt="Produit">
      </div>
      
      <div class="flex justify-between items-start mb-2">
        <span class="bg-[#FF4B2B]/10 text-[#FF4B2B] text-[10px] font-black px-3 py-1 rounded-full uppercase">Top Vente</span>
        <div class="flex items-center gap-1 text-amber-400">
          <i class="fas fa-star text-xs"></i>
          <span class="text-gray-900 font-black text-xs">4.9</span>
          <span class="text-gray-400 text-[10px] font-bold">(128 avis)</span>
        </div>
      </div>
      
      <h2 class="text-2xl font-black text-gray-900 leading-tight">Montre Quartz Minimalist S-Series 2026</h2>
      <p class="text-[#FF4B2B] text-3xl font-black mt-2">125.00 $</p>
    </section>

    <div class="mt-4 flex border-b border-gray-100 bg-white sticky top-14 z-40">
      <button 
        @click="activeTab = 'description'"
        :class="activeTab === 'description' ? 'border-[#FF4B2B] text-[#FF4B2B]' : 'border-transparent text-gray-400'"
        class="flex-1 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all">
        Description
      </button>
      <button 
        @click="activeTab = 'avis'"
        :class="activeTab === 'avis' ? 'border-[#FF4B2B] text-[#FF4B2B]' : 'border-transparent text-gray-400'"
        class="flex-1 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all">
        Avis Clients
      </button>
    </div>

    <section class="p-6 bg-white min-h-[300px]">
      <div v-if="activeTab === 'description'" class="animate-fade-in">
        <h3 class="font-bold text-gray-900 mb-2">À propos de cet article</h3>
        <p class="text-gray-500 text-sm leading-relaxed">
          Cette montre en édition limitée allie la précision du quartz suisse à un design industriel épuré. Résistante à l'eau jusqu'à 50m, elle est le compagnon idéal de l'homme moderne.
        </p>
        <ul class="mt-4 space-y-2">
          <li class="flex items-center gap-3 text-sm text-gray-600">
            <i class="fas fa-check-circle text-green-500"></i> Boîtier en acier inoxydable 316L
          </li>
          <li class="flex items-center gap-3 text-sm text-gray-600">
            <i class="fas fa-check-circle text-green-500"></i> Verre saphir inrayable
          </li>
        </ul>
      </div>

      <div v-else class="animate-fade-in space-y-6">
        <div v-for="review in reviews" :key="review.id" class="border-b border-gray-50 pb-4">
          <div class="flex items-center gap-3 mb-2">
            <img :src="review.avatar" class="w-10 h-10 rounded-full border-2 border-gray-100">
            <div>
              <p class="text-xs font-black text-gray-900">{{ review.user }}</p>
              <div class="flex text-[8px] text-amber-400">
                <i v-for="i in 5" :key="i" class="fas fa-star" :class="i <= review.rating ? '' : 'text-gray-200'"></i>
              </div>
            </div>
            <span class="ml-auto text-[10px] text-gray-400 font-bold">{{ review.date }}</span>
          </div>
          <p class="text-sm text-gray-500 italic">"{{ review.comment }}"</p>
        </div>
        
        <button class="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-colors">
          Laisser un commentaire
        </button>
      </div>
    </section>

    <button 
      @click="shareOnWhatsApp"
      class="fixed bottom-28 right-6 w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center justify-center text-3xl z-50 animate-bounce-subtle">
      <i class="fab fa-whatsapp"></i>
    </button>

    <footer class="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 flex items-center gap-4 z-50">
      <button class="w-12 h-12 rounded-2xl border-2 border-gray-100 flex items-center justify-center text-gray-400 active:scale-90 transition-transform">
        <i class="far fa-heart text-xl"></i>
      </button>
      <button class="flex-1 bg-gray-900 text-white h-12 rounded-2xl font-black uppercase text-xs tracking-widest active:scale-95 transition-all flex items-center justify-center gap-3">
        <i class="fas fa-shopping-bag"></i>
        Ajouter au panier
      </button>
    </footer>
  </main>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce-subtle {
  animation: bounce-subtle 3s infinite ease-in-out;
}

/* Personnalisation Font-Awesome si non inclus globalement */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
</style>