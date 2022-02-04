import { createRouter, createWebHistory } from 'vue-router';
// eslint-disable-next-line import/no-cycle
import store from '../store';

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('../components/DefaultLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '/home', name: 'Home', component: () => import('../views/Home.vue') },
      { path: '/about', name: 'About', component: () => import('../views/About.vue') },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  // 404 - must be the last route
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.user.token) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
