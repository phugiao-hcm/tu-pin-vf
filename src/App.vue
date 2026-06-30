<script setup>
import { computed } from 'vue'
import DefaultLayout from './layouts/DefaultLayout.vue'
import BlankLayout from './layouts/BlankLayout.vue'

const token = '12312313'
const layoutComponent = computed(() => {
  return token ? DefaultLayout : BlankLayout
})
</script>

<template>
  <component :is="layoutComponent">
    <router-view />
  </component>
</template>


<style lang="scss">
@use './assets/scss/main.scss';
</style>