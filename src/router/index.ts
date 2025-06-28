import LoginView from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sign-in',
      component: LoginView,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('../views/RegisterView.vue'),
    },
  ],
})

export default router
