import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wordle',
      name: 'wordle',
      component: () => import('../views/WordleView.vue')
    },
    {
      path: '/dinogame',
      name: 'dinogame',
      component: () => import('../views/DinoGameView.vue')
    },
  ]
})

export default router
