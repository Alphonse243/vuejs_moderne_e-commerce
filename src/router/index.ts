import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '@/views/CategoryView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/boutique',
      name: 'shop',
      component: () => import('../views/ShopView.vue') // Lazy loading
    },
    {
      path: '/categories',
      name: 'category',
      component: CategoryView
    }
  ]
})

export default router