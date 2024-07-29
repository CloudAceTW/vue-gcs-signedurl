/**
 * router/index.ts
 *
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import SignUrlIndex from '@/pages/SignUrlIndex.vue'
import ShortIndex from '@/pages/ShortIndex.vue'
import PathNotFound from '@/pages/PathNotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'SignUrlIndex',
      component: SignUrlIndex,
    },
    {
      path: '/:shortId(\\w{7})',
      sensitive: true,
      name: 'ShortIndex',
      component: ShortIndex,
    },
    {
      path: "/:pathMatch(.*)*",
      component: PathNotFound,
    }
  ]
})

export default router
