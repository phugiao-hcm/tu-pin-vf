<template>
  <section class="section">
    <header class="section__header">
      <div v-if="title || description">
        <h1 v-if="title" class="section__title">{{ title }}</h1>
        <p v-if="description" class="section__description">{{ description }}</p>
      </div>

      <slot name="header" />
    </header>

    <div :class="{ 'is-mobile': isMobile }" class="section__body">
      <el-row>
        <el-col :span="isMobile ? 22 : 16" :offset="isMobile ? 1 : 4">
          <slot />
        </el-col>
      </el-row>
    </div>

    <div class="section__footer">
      <slot name="footer" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUI } from '@/mixins/globalMixin'

const props = defineProps<{
  title?: string
  description?: string
  isHeaderCustom?: boolean
}>()

const router = useRouter()
const { isMobile } = useUI()

function onBack() {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.section {
  background-color: white;

  &__title {
    font-size: 16px;
    font-weight: 600;
    padding-top: 1em;
  }

  &__footer {
    margin: 12px 0;
  }

  &:not(:last-child) {
    margin-bottom: 36px;
  }

  .section__header {
    position: sticky;
    top: 0;
    background: white;
    z-index: 1;
  }
}

.section__body {
  padding-bottom: calc(80px + env(safe-area-inset-bottom, 0));
}
</style>
