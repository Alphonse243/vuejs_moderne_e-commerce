<script setup>
import { useQuery } from '@tanstack/vue-query';
import api from '@/api/axios';

const { data: products, isLoading, isError } = useQuery({
  queryKey: ['products'],
  queryFn: async () => {
    const response = await api.get('/products');
    return response.data;
  },
});
</script>

<template>
  <div v-if="isLoading">Chargement des produits...</div>
  <div v-else-if="isError">Erreur de connexion avec l'API</div>
  <ul v-else>
    <li v-for="product in products" :key="product.id">{{ product.name }}</li>
  </ul>
</template>