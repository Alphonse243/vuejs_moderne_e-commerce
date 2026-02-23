import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '@/views/CategoryView.vue'
import UserProfile from '@/components/UserProfile.vue'

const router = createRouter({
  history: createWebHistory(),
  // Scroll to top automatique lors du changement de page
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/boutique',
      name: 'shop',
      component: () => import('../views/ShopView.vue')
    },
    // NOUVELLE ROUTE : Détails du produit via le Slug
    {
      path: '/produit/:slug',
      name: 'product-detail',
      component: () => import('../views/ProductDetailView.vue'), // Assure-toi de nommer ton fichier ainsi
      props: true // Permet de passer le slug comme une prop au composant
    },
    {
      path: '/categories',
      name: 'category',
      component: CategoryView
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile
    }
  ]
})

export default router