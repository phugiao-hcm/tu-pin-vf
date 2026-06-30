<template>
  <el-pagination
    :class="ui.isResponsiveMobile ? 'flex' : 'flex justify-flex-end'"
    background
    :layout="ui.isResponsiveMobile ? 'prev, next' : 'prev, pager, next'"
    :total="pagination.total"
    :page-size="pagination.perPage"
    :current-page="pagination.currentPage"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useUI } from '@/mixins/globalMixin'

/**
 * Props
 */
const props = defineProps<{
  pageSizes?: number[]
  layout?: string
}>()

const emit = defineEmits<{
  (e: 'changePageSize', size: number): void
  (e: 'changeCurrentPage', currentPage: number): void
}>()

/**
 * Global state từ plugin useUI
 */
const { ui } = useUI()

/**
 * Local state cho pagination
 */
const pagination = reactive({
  total: 1,
  perPage: props.pageSizes?.[0] ?? 10,
  currentPage: 1,
})

/**
 * Methods
 */
function fetchMetaPagination(meta: { total: number; perPage: number; currentPage: number }) {
  pagination.total = meta.total
  pagination.perPage = meta.perPage
  pagination.currentPage = meta.currentPage
}

function handleSizeChange(size: number) {
  pagination.currentPage = 1
  pagination.perPage = size
  emit('changePageSize', size)
}

function handleCurrentChange(currentPage: number) {
  pagination.currentPage = currentPage
  emit('changeCurrentPage', currentPage)
}
</script>
