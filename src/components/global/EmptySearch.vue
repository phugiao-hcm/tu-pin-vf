<template>
  <div>
    <el-empty>
      <template slot="image">
        <el-image style="width: 180px; height: 180px" :src="src"></el-image>
      </template>

      <template slot="description">
        <p class="body-small-regular neutral-500">sorry_no_result_found</p>
      </template>
    </el-empty>
  </div>
</template>
  
  <script>
export default {
  name: 'EmptySearch',
  data() {
    return {
      src: require('@/assets/images/png/empty-search.png'),
    }
  },
}
</script>
  
<style lang="scss" scoped>
.neutral-700 {
  color: var(--neutral-700) !important;
}
.neutral-500 {
  color: var(--neutral-500) !important;
}
</style>
  