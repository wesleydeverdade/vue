import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

/*
const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('../components/DefaultLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '/home', name: 'Home', component: () => import('../pages/Home.vue') },
      { path: '/about', name: 'About', component: () => import('../pages/About.vue') },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
  },
  // 404 - must be the last route
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFound.vue'),
  },
];
*/
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
