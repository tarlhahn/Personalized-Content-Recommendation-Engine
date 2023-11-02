import { createRouter, createWebHistory } from 'vue-router';
import HomeLayout from '@/components/HomeLayout.vue';
import PersonalRecommendations from '@/components/PersonalRecommendations.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeLayout
  },
  {
    path: '/recommendations/:userId',
    name: 'Recommendations',
    component: PersonalRecommendations
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

