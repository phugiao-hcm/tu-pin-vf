
<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index" :to="item.path">
      <span v-if="!item.path" class="body-extra-small-regular neutral-600">{{ item.label }}</span>
      <a v-else @click.prevent="go(item.path)" class="body-extra-small-regular neutral-600">
        {{ item.label }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>



<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

// build mảng breadcrumb từ meta
const breadcrumbs = computed(() => {
  const meta = route.meta.breadcrumb as any
  if (!meta) return []
  return [meta.level_1, meta.level_2, meta.level_3].filter(Boolean).map((lv: any) => ({
    label: lv.name,
    path: lv.router_name ? { name: lv.router_name } : null,
  }))
})

const go = (path: any) => router.push(path)
</script>