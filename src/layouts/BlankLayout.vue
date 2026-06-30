<template>
  <div class="theme-blank">
    <!-- Đây là layout trống, chỉ bọc RouterView -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
// BlankLayout không cần logic gì đặc biệt
</script>

<style scoped>
.theme-blank {
  min-height: 100vh;
  background: #fff; /* hoặc để trống */
}
</style>
