<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 flex justify-around items-center z-50">
      <a href="/" class="flex flex-col items-center gap-1 text-[#FF4B2B]">
        <i class="fas fa-home text-lg"></i>
        <span class="text-[9px] font-bold uppercase">Accueil</span>
      </a>
      <a href="/categories" class="flex flex-col items-center gap-1 text-gray-400">
        <i class="fas fa-th-large text-lg"></i>
        <span class="text-[9px] font-bold uppercase">Catégories</span>
      </a>
      <button class="flex flex-col items-center gap-1 text-gray-400 relative">
        <div class="bg-gray-100 w-12 h-12 rounded-full -mt-8 border-4 border-gray-100 flex items-center justify-center shadow-lg bg-gradient-to-tr from-[#FF4B2B] to-[#FF8C00] text-white">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <span class="text-[9px] font-bold uppercase mt-1">Panier</span>
        <span class="absolute -top-6 right-0 bg-yellow-400 text-black text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">2</span>
      </button>
      <button class="flex flex-col items-center gap-1 text-gray-400">
        <i class="fas fa-heart text-lg"></i>
        <span class="text-[9px] font-bold uppercase">Favoris</span>
      </button>
      <button class="flex flex-col items-center gap-1 text-gray-400">
        <i class="fas fa-user text-lg"></i>
        <span class="text-[9px] font-bold uppercase">Compte</span>
      </button>
    </nav>
</template>