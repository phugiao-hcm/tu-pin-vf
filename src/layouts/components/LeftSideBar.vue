<template>
    <div class="left-section-sidebar">
        <div class="flex-between custom-logo" style="padding: 14px">
            <div class="flex-center">
                <img class="logo-big" src="@/assets/images/png/favicon-32x32.png" />
                <p v-if="isOpenMenu" class="body-small-medium">Đăng tin Tủ Pin VGreen</p>
            </div>

            <div v-show="isOpenMenu && ui.isResponsiveMobile">
                <el-button :icon="DArrowLeft" @click="changeCollapse" />
            </div>
        </div>

        <el-menu
            default-active="posts"
            class="el-menu-vertical-demo"
            :collapse="!isOpenMenu"
            @open="handleOpen"
            @close="handleClose"
        >
            <div v-for="(item, index) in menuList" :key="index" :index="item.index">
                <router-link :to="{ name: item.name }">
                    <el-menu-item
                        :class="{
                            'is-active': setActive(item.actives),
                        }"
                    >
                        <el-icon><component :is="item.icon" /></el-icon>
                        <template #title
                            ><span>{{ item.title }}</span></template
                        >
                    </el-menu-item>
                </router-link>
            </div>

            <div class="custom-position-profile w-100">
                <el-menu-item>
                    <div v-if="isOpenMenu">
                        <el-icon><component :is="Tools" /></el-icon>
                    </div>
                    <el-dropdown disabled placement="top-start" class="w-100" trigger="click">
                        <div v-if="!isOpenMenu">
                            <el-icon><component :is="Tools" /></el-icon>
                        </div>
                        <p>Tài khoản Miễn phí</p>

                        <template #dropdown>
                            <el-dropdown-menu class="custom-dropdown-menu">
                                <el-dropdown-item class="dropdown-item" :command="'/profile'">
                                    <el-button class="w-100 text-left" type="text">
                                        <span class="body-small-regular neutral-600">Hồ sơ</span>
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item class="dropdown-item" :command="'/sign-in'">
                                    <el-button class="w-100 text-left" type="text">
                                        <span class="body-small-regular secondary-red-600"
                                            >Đăng xuất</span
                                        >
                                    </el-button>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-menu-item>
            </div>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { Document, Menu, Star as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import { useUI } from '@/mixins/globalMixin'

import { useRouter } from 'vue-router'
const router = useRouter()
const { ui } = useUI()

/**
 * Props
 */
const props = defineProps<{
    isOpenMenu: boolean
}>()

// khai báo emit
const emit = defineEmits<{
    (e: 'collapsed'): void
}>()

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

// hàm emit sự kiện
const changeCollapse = () => {
    emit('collapsed')
}

const menuList = computed(() => [
    // {
    //     title: 'Trang chủ',
    //     icon: House,
    //     index: 'homepage',
    //     name: 'DashboardList',
    //     actives: ['DashboardList'],
    // },
    {
        title: 'Quản lý Tủ Pin',
        icon: Document,
        index: 'posts',
        name: 'PostList',
        actives: ['PostList', 'PostCreate', 'PostDetail'],
    },
    {
        title: 'Vị trí bản đồ',
        icon: Document,
        index: 'maps',
        name: 'MapsList',
        actives: ['MapsList'],
    },
])

const setActive = (actives: string[]): boolean => {
    if (!actives || actives.length === 0) return false
    return actives.includes(router.currentRoute.value.name as string)
}
</script>


<style lang="scss" scoped>
.el-menu--collapse > .el-menu-item span,
.el-menu--collapse > .el-submenu > .el-submenu__title [class^='icon-'] {
    overflow: unset;
    visibility: unset;
    height: 40px !important;
    line-height: 40px !important;
}

.el-menu--collapse {
    width: 64px !important;

    .el-menu-item {
        margin: unset;
    }
}

.el-menu-vertical-demo {
    background: var(--neutral-50);
    width: 240px;
    overflow-y: auto;
    border: none;
    height: calc(100vh - 62px);

    &::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 0;
        display: none;
    }
}

a {
    text-decoration: none;
}

:deep(.el-submenu__title):hover {
    background: var(--neutral-100);
}
:deep(.el-menu-item-group__title) {
    display: none !important;
}

.menu {
    &__button {
        z-index: 1;
        background: var(--neutral-0);
        padding: 12px;
        position: -webkit-sticky;
        /* Safari */
        /*position: sticky; */
        position: absolute;
        bottom: 0;

        @media only screen and (max-width: 992px) {
            position: sticky;
        }

        .active {
            background: var(--neutral-100);
        }
    }
}

.custom-dropdown-menu {
    width: 216px;
    padding: 4px;
}

.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
    background: var(--neutral-50);
}

.bg-neutral-200 {
    background: var(--neutral-200);
}

.bg-neutral-100 {
    background: var(--neutral-100);
}

:deep(.el-submenu__icon-arrow) {
    font-size: 16px;
}

.el-icon-arrow-down,
.el-icon-arrow-up {
    font-size: 16px;
}

.el-dropdown-selfdefine {
    border: none;
    border-radius: 6px;
    background: var(--neutral-100);
}

.bg-none {
    background: none;
}

:deep(.button--only-profile) {
    background: var(--neutral-100);
    border: none;
    outline: none;
    padding: 8px;
    box-shadow: none;

    span {
        color: var(--neutral-700);
        text-align: center;
        font-family: Inter;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 20px;
        /* 142.857% */
    }

    &:hover {
        color: var(--neutral-700);
        background: var(--neutral-200);
        border: none;
        outline: none;
        box-shadow: none;
    }

    &:active,
    &:focus {
        color: var(--neutral-700);
        background: var(--neutral-200);
        border: none;
        outline: none;
        box-shadow: none;
    }
}

:deep(.custom-badge-menu) {
    .el-badge__content {
        height: 20px;
        width: 22px;
        font-size: 12px;
    }
}

.custom-position-profile {
    position: absolute;
    bottom: 0;
}
</style>
