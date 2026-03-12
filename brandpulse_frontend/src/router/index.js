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
      name: 'Login',
      component: () => import('../view/login.vue'),
      meta: {requiresAuth: false}
    },
    {
      path: '/',
      name: 'Dashboard',
      component: () => import('../view/dashboard.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/analyze',
      name: 'Analyze',
      component: () => import('../view/analyze.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../view/profile.vue'),
      meta: {requiresAuth: true}
    },
    {
      path: '/benchmark',
      name: 'Benchmark',
      component: () => import('../view/benchmark.vue'),
      meta: {requiresAuth: true}
    },
  ],
})
import { useUserStore } from '@/stores/userStore';
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const authenticated = userStore.authentication?.status; // Check if userData exists
    // console.log(authenticated)
    if (to.meta.requiresAuth && !authenticated) {
        next({ name: "Login" }); // Redirect to login if not authenticated
    }else if(!to.meta.requiresAuth && authenticated){
        next({ name: "Dashboard" });
    }
    else {
        next(); // Continue navigation
    }
});
export default router
