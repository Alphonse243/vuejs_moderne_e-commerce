<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  isNew?: boolean;
  discount?: number;
  sales?: number;
}

// Données étendues pour démonstration
const products = ref<Product[]>([
  { id: 1, name: "Montre Quartz S-Series", price: 12, category: "Accessoires", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600", isNew: true, sales: 154 },
  { id: 2, name: "Casque Audio Wireless Pro", price: 45, category: "Électronique", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600", discount: 30, sales: 890 },
  { id: 3, name: "Sneakers Air-Walk White", price: 25, category: "Chaussures", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600", sales: 432 },
  { id: 4, name: "Sac à dos Urbain Waterproof", price: 18, category: "Mode", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600", isNew: true, sales: 67 },
  { id: 5, name: "Appareil Photo Retro X5", price: 120, category: "Électronique", image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80&w=600", sales: 12 },
  { id: 6, name: "Lunettes Polarisées Gold", price: 15, category: "Accessoires", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600", discount: 50, sales: 1205 },
  { id: 7, name: "Clavier Gaming Mécanique", price: 35, category: "Électronique", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=600", sales: 88 },
  { id: 8, name: "Chaise Pivotante Ergonomique", price: 85, category: "Mobilier", image: "https://images.unsplash.com/photo-1505797149-43b00fe9ee2c?auto=format&fit=crop&q=80&w=600", sales: 45 },
])

const categories = [
  { name: 'Tous', icon: 'app-grid' },
  { name: 'Mode', icon: 'person' },
  { name: 'Électronique', icon: 'flash' },
  { name: 'Chaussures', icon: 'walk' },
  { name: 'Accessoires', icon: 'watch' }
]
const activeCategory = ref('Tous')

// Compte à rebours ventes flash
const timeLeft = ref("02:45:12")

// Logique Carousel
const currentSlide = ref(0)
const slides = [
  { title: "Mois de la Mode", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?auto=format&fit=crop&w=800&q=80", color: "from-orange-500" },
  { title: "Tech Days -70%", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80", color: "from-blue-600" }
]

let timer: number
onMounted(() => {
  timer = window.setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
  }, 4000)
})
onUnmounted(() => clearInterval(timer))

const filteredProducts = computed(() => {
  if (activeCategory.value === 'Tous') return products.value
  return products.value.filter(p => p.category === activeCategory.value)
})
</script>

<template>
  <main class="bg-gray-100 min-h-screen pb-24">
    
    <header class="fixed top-0 left-0 right-0 z-50 bg-[#FF4B2B] px-4 py-3 flex items-center gap-3 shadow-md">
      <div class="flex-1 bg-white rounded-full flex items-center px-4 py-2 gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input type="text" placeholder="Chercher sur SchorShop..." class="bg-transparent text-sm w-full outline-none text-gray-700" />
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
      </div>
      <button class="relative text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        <span class="absolute -top-1 -right-1 bg-yellow-400 text-[10px] text-black font-bold w-4 h-4 rounded-full flex items-center justify-center">5</span>
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
      <div class="absolute bottom-3 right-6 flex gap-1.5">
        <div v-for="(_, i) in slides" :key="i" class="w-2 h-2 rounded-full border border-white" :class="currentSlide === i ? 'bg-white' : ''"></div>
      </div>
    </section>

    <section class="bg-white py-4 px-2 flex overflow-x-auto no-scrollbar gap-4 shadow-sm">
      <button v-for="cat in categories" :key="cat.name" 
        @click="activeCategory = cat.name"
        class="flex flex-col items-center min-w-[70px] gap-1 transition-all"
        :class="activeCategory === cat.name ? 'scale-110' : 'opacity-70'"
      >
        <div class="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100"
             :class="activeCategory === cat.name ? 'bg-orange-50 border-orange-200 text-[#FF4B2B]' : 'text-gray-600'">
           <i :class="`fas fa-${cat.icon}`"></i>
        </div>
        <span class="text-[10px] font-bold uppercase tracking-tighter">{{ cat.name }}</span>
      </button>
    </section>

    <section class="mt-2 bg-white p-4">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-2">
          <h3 class="text-[#FF4B2B] font-black uppercase text-sm italic">Ventes Flash</h3>
          <div class="flex gap-1 text-white font-bold text-[10px]">
            <span class="bg-black px-1 rounded">{{ timeLeft.split(':')[0] }}</span>
            <span class="text-black">:</span>
            <span class="bg-black px-1 rounded">{{ timeLeft.split(':')[1] }}</span>
            <span class="text-black">:</span>
            <span class="bg-black px-1 rounded text-[#FF4B2B]">{{ timeLeft.split(':')[2] }}</span>
          </div>
        </div>
        <button class="text-gray-400 text-[10px] font-bold uppercase">Plus ></button>
      </div>
      <div class="flex scroll-px-20 overflow-x-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8no-scrollbar">
        <div v-for="p in products.filter(x => x.discount)" :key="p.id" class="min-w-[120px]  px-2  relative">
          <div class="aspect-square rounded-xl bg-gray-50 overflow-hidden mb-2">
            <a href="/boutique">
              <img :src="p.image" loading="lazy" class="w-full h-full object-cover" />
            </a>
          </div>
          <p class="text-[#FF4B2B] font-black text-2xl">{{ p.price }} $</p>
          <p class="text-[9px] text-gray-400 line-through">{{ Math.round(p.price * 1.5) }} $</p>
          <div class="absolute top-1 right-1 bg-[#FF4B2B] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
            -{{ p.discount }}%
          </div>
        </div>
      </div>
    </section>

    <section class="p-2 mt-2">
      <h3 class="px-2 mb-3 font-bold text-gray-500 text-xs uppercase tracking-widest">Articles recommandés</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div v-for="p in filteredProducts" :key="p.id" 
             class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col active:scale-[0.98] transition-all">
          
          <div class="relative aspect-[4/5] bg-gray-50">
            <a href="/boutique">
              <img :src="p.image" loading="lazy" class="w-full h-full object-cover" />
            </a>
            <div v-if="p.isNew" class="absolute top-2 left-2 bg-green-500 text-white text-[8px] font-black px-2 py-0.5 rounded-sm">NOUVEAU</div>
          </div>

          <div class="p-3 flex-1 flex flex-col justify-between">
            <div>
              <h4 class="text-xs text-gray-700 font-medium line-clamp-2 leading-tight mb-2">{{ p.name }}</h4>
            </div>
            <div>
              <div class="flex items-baseline gap-1">
                <span class="text-[#FF4B2B] font-black text-lg">{{ p.price }} $</span>
              </div>
              <div class="flex justify-between items-center mt-1">
                <span class="text-[9px] text-gray-400 font-bold uppercase">{{ p.sales }} Vendus</span>
                <button class="text-[#FF4B2B]"><i class="fas fa-cart-plus"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>



  </main>
</template>

<style scoped>
/* Masquer scrollbar */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

/* Animation entrée produits */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

.grid > div {
  animation: fadeInUp 0.5s ease-out forwards;
}

/* Line clamp pour le titre (2 lignes max) */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>