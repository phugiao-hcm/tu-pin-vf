import router from '@/router'
import { useBreadcrumb } from '@/router/breadcrumb'
const { project } = useBreadcrumb()

router.addRoute({
  path: `/post/detail`,
  name: 'PostDetail',
  meta: { requiresAuth: true },
  beforeEnter(to, from, next) {
    to.meta.breadcrumb = project.detail()
    next()
  },
  component: () => import('./View.vue'),
})
