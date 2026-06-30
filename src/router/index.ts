// // export default router
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Base routes
const baseRoutes: RouteRecordRaw[] = [
  { path: '/', redirect: `/post/create` }, // default route]
]

const router = createRouter({
  history: createWebHistory('/tu-pin-vf/'),
  routes: baseRoutes,
})

export default router
