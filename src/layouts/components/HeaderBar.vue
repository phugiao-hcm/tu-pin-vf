<template>
    <div class="flex-between" style="padding: 12px 0">
        <div class="header-image">
            <el-button :icon="!isOpenMenu ? DArrowRight : DArrowLeft" @click="changeCollapse" />
        </div>
        <div>
            <Breadcrumb />
        </div>
        <div>
            <el-popover disabled placement="bottom" :width="360" trigger="click">
                <template #reference>
                    <el-badge :value="12">
                        <el-button type="primary" plain
                            >Thông báo <el-icon class="el-icon--right"><Bell /></el-icon
                        ></el-button>
                    </el-badge>
                </template>

                <!-- Custom header -->
                <div class="wrapper">
                    <div class="sticky-header flex-between">
                        <div>
                            <p class="body-small-semi-bold neutral-700">Thông báo</p>
                        </div>
                        <div>
                            <el-link type="primary" underline="never">Xem tất cả</el-link>
                        </div>
                    </div>
                    <div v-for="item in 10" :key="item" style="margin-top: 16px">
                        <div>
                            <p style="margin-bottom: 8px" class="body-small-semi-bold neutral-700">
                                Bạn có yêu cầu tạo phòng mới:
                            </p>
                            <ul>
                                <li>
                                    <el-link type="primary" underline="never"
                                        ><p class="body-small-regular">Phòng VIP 15m2</p></el-link
                                    >
                                </li>
                                <li>
                                    <p>
                                        <span class="body-small-regular neutral-700"
                                            >Giá phòng:
                                        </span>
                                        <span class="body-small-semi-bold neutral-700">{{
                                            formatPrice(1111111)
                                        }}</span>
                                    </p>
                                </li>
                                <li>
                                    <p class="body-small-regular neutral-700">
                                        <span class="body-small-regular neutral-700"
                                            >Ngày tạo:
                                        </span>
                                        <span class="body-small-semi-bold neutral-700"
                                            >30/08/2025</span
                                        >
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <el-divider style="margin: 12px 0" />
                    </div>
                </div>
            </el-popover>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Breadcrumb from './Breadcrumb.vue'
import { useUI } from '@/mixins/globalMixin'
import { Bell, DArrowRight, DArrowLeft } from '@element-plus/icons-vue'
const { formatPrice } = useUI()

/**
 * Props
 */
const props = defineProps<{
    isOpenMenu: boolean
}>()

const emit = defineEmits<{
    (e: 'collapsed'): void
}>()

/**
 * Computed
 */

const changeCollapse = () => {
    emit('collapsed')
}
</script>

<style lang="scss" scoped>
.custom-button {
    font-size: initial;
    border: none;
}

.el-popper {
    .el-dropdown-menu__item {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        img {
            padding-right: 5px;
        }
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.wrapper {
    max-height: 500px;
    overflow-y: auto;
    padding-left: 16px;
}
.sticky-header {
    position: sticky;
    top: 0;
    background: white;
    padding: 16px 16px 16px 0px;
    border-bottom: 1px solid #eee;
    z-index: 1;
}
</style>
