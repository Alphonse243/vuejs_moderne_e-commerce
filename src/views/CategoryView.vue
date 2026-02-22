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
    { title: "Tech Days -70%", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80", color: "from-blue-600" },
    { title: "Mois de la Mode 2", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?auto=format&fit=crop&w=800&q=80", color: "from-orange-500" },
    { title: "Tech Days -70% 2", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80", color: "from-blue-600" }
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
    

    <section class="p-2 mt-2">
      <h3 class="px-2 mb-3 font-bold text-gray-500 text-xs uppercase tracking-widest">Toute les categories</h3>
      <div class="mt-3 flex">
       <div class="w-20 px-5 py-5 ">
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
       
       </div>
       <div class="w-full px-5 py-5">
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
       </div>
      </div>
      
    </section>



  </main>
</template>