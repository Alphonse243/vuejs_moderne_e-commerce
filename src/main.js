import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

// 1. Activation de Pinia (Gestion du panier/auth)
const pinia = createPinia()
app.use(pinia)

// 2. Activation du Router
app.use(router)

// 3. Activation de Vue Query (Gestion de l'API Laravel)
app.use(VueQueryPlugin)

app.mount('#app')