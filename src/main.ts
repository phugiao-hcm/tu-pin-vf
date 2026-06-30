import '@/assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@/assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { useUI } from '@/mixins/globalMixin'
import { initRouter } from './views'

async function bootstrap() {
  // init router trước
  await initRouter()

  // chỉ tạo app 1 lần
  const app = createApp(App)
  app.use(ElementPlus)
  app.use(useUI)
  app.use(router)
  app.mount('#app')
}

bootstrap()
