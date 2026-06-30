<template>
  <el-dialog
    v-model="visible"
    title="Cảnh báo"
    width="400"
    align-center
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <p class="body-medium-semi-bold neutral-700" style="margin-bottom: 8px">
      {{ row?.name }}
    </p>
    <p class="body-small-regular neutral-700">
      Khách sẽ không thể đặt phòng này sau khi bạn ngừng kinh doanh loại phòng. Bạn có thể mở kinh
      doanh lại loại phòng trong tương lai.
    </p>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">Huỷ</el-button>
        <el-button type="danger" @click="confirm"> Xác nhận ngừng kinh doanh </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'

const visible = ref(false)
const row = ref<any>()

const open = (data: any) => {
  visible.value = true
  row.value = data
}
const close = () => (visible.value = false)
const confirm = () => {
  visible.value = false
}

defineExpose({ open, close })
</script>
