import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
     {
      path: '/landingpage',
      name: 'Landing Page',
      component: () => import('../view/landingpage.vue'),
      // meta: {requiresAuth: true}
    },
    {
      path: '/login',
      name: 'Login Page',
      component: () => import('../view/login.vue'),
      // meta: {requiresAuth: true}
    },
  ],
})

export default router
