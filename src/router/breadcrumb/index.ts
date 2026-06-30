import { usePostBreadcrumb } from './posts'
import { useUserBreadcrumb } from './users'

export const useBreadcrumb = () => {
  return {
    project: usePostBreadcrumb(),
    user: useUserBreadcrumb(),
    // sau này thêm order, blog, v.v...
  }
}
