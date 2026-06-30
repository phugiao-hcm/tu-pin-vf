import { computed, reactive } from 'vue'
import type { App } from 'vue'
import { ref, nextTick } from 'vue'
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()

const ui = reactive({
  isFixedRight: null as null | boolean,
  isFixedLeft: null as null | boolean,
  isResponsiveMobile: false,
  windowWidth: window.innerWidth,
})

const isMobile = computed(() => {
  return ui.windowWidth <= 992
})

const formatPrice = (value?: number | null): string => {
  if (typeof value !== 'number') return ''
  return value ? value.toLocaleString('vi-VN') + ' ₫' : '---'
}

const validateRequired = async (_rule: any, value: any) => {
  if (!value || (typeof value === 'string' && value.trimStart().length === 0)) {
    throw new Error('Không bỏ trống')
  }
}

const onResetValidateField = (field: string) => {
  nextTick(() => {
    const fieldItem = (formRef.value as any)?.fields?.find((f: any) => f.prop === field)
    const fieldError = fieldItem?.validateState === 'error'

    if (fieldError) {
      formRef.value?.validateField(field)
    }
  })
}

const generateRandomSuffix = (length = 6) => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
}

const handleResize = () => {
  ui.windowWidth = window.innerWidth
  ui.isResponsiveMobile = ui.windowWidth < 768
}

window.addEventListener('resize', handleResize)
handleResize()

export function createGlobalPlugin() {
  return {
    install(app: App) {
      app.config.globalProperties.$ui = ui
      app.config.globalProperties.$formatPrice = formatPrice
    },
  }
}

// ✅ Composable để dùng trong <script setup>
export function useUI() {
  return { ui, formatPrice, generateRandomSuffix, onResetValidateField, validateRequired, isMobile }
}
