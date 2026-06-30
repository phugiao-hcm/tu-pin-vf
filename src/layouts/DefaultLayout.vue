<template>
    <div class="layout-default">
        <el-container>
            <!-- Sidebar -->
            <el-aside
                id="sidebar-section"
                class="left-section"
                :class="menuClass"
                style="z-index: 99"
            >
                <LeftSidebar :isOpenMenu="isOpenMenu" @collapsed="changeCollapse" />
            </el-aside>

            <el-container>
                <!-- Header -->
                <el-header class="main-section" :class="[menuClass]">
                    <HeaderBar :isOpenMenu="isOpenMenu" @collapsed="changeCollapse" />
                </el-header>
                <el-divider style="margin: 12px 0" />

                <!-- Main content -->
                <el-main id="main-section" class="main-section" :class="[menuClass]">
                    <router-view />
                    <div :style="iosPaddingStyle"></div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import LeftSidebar from './components/LeftSideBar.vue'
import HeaderBar from './components/HeaderBar.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import { useUI } from '@/mixins/globalMixin'

/**
 * State
 */
const isOpenMenu = ref(true)

const { ui } = useUI()

/**
 * Computed
 */
const menuClass = computed(() => (isOpenMenu.value ? 'active' : ''))

const iosPaddingStyle = computed(() =>
    ui.isResponsiveMobile
        ? { paddingBottom: '100px !important' }
        : { paddingBottom: '60px !important' }
)

/**
 * Methods
 */
// hàm emit sự kiện
const changeCollapse = () => {
    isOpenMenu.value = !isOpenMenu.value
}
/**
 * Lifecycle
 */
onBeforeUnmount(() => {
    const scrollDemo = document.querySelector('#main-section')
    if (scrollDemo) {
        scrollDemo.removeEventListener('scroll', () => {})
    }
})
</script>


<style lang="scss" scoped>
.layout-default {
    .header-section {
        right: 0;
        top: 0;
        position: fixed;
        background: white;
        z-index: 100;
        width: 100%;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    }

    .left-section {
        border-right: 1px solid var(--neutral-300);
        z-index: 99;
        background: white;
        position: fixed;
        text-align: left;
        width: auto !important;

        top: 0;
        bottom: 0;
        overflow-y: scroll;
        overflow-x: hidden;

        /* custome crollbar css */
        &::-webkit-scrollbar {
            width: 0;
            display: none;
        }

        &::-webkit-scrollbar-track {
            -webkit-box-shadow: white;
        }

        &::-webkit-scrollbar-thumb {
            background: white;
        }

        :deep(.el-menu-vertical-demo) {
            animation: menuAnimationTextOut 0s alternate;
        }

        :deep(.display-none) {
            width: 0;
            transition: width 0.3s ease-in-out;
        }

        :deep(.menu__button) {
            width: 64px;
            transition: width 0.3s ease-in-out;
            transition: height 0.3s ease-in-out;
        }

        @media only screen and (max-width: 992px) {
            display: none;
        }
    }

    .left-section.active {
        width: 240px !important;
        animation: menuAnimationIn 0.5s alternate;

        :deep(.el-menu-vertical-demo) {
            animation: menuAnimationText 0.2s forwards;
        }

        :deep(.menu__button) {
            width: 240px;
        }

        @media only screen and (max-width: 992px) {
            display: unset;
        }
    }

    .main-section {
        margin-left: 64px;
        transition: margin-left 0.2s ease-in;
        -webkit-transition: 0.3s ease-in;
        -moz-transition: 0.3s ease-in;
        -o-transition: 0.3s ease-in;
        // margin-bottom: 1em;

        @media only screen and (max-width: 992px) {
            width: -webkit-fill-available;
            margin-left: 0;
        }
    }

    .main-section.active {
        -webkit-transition: 0.3s ease-in-out;
        -moz-transition: 0.3s ease-in-out;
        -o-transition: 0.3s ease-in-out;
        transition: 0.3s ease-in-out;
    }

    @keyframes menuAnimationText {
        from {
            width: 0;
            transition-timing-function: linear;
        }

        to {
            width: 240px;
            transition-timing-function: linear;
        }
    }

    @keyframes menuAnimationTextOut {
        from {
            width: 240px;
            transition-timing-function: ease-out;
        }

        to {
            width: 64px;
            transition-timing-function: ease-in;
        }
    }

    @keyframes menuAnimationIn {
        from {
            transform: translateX(-240px);
            transition-timing-function: ease-in;
        }

        to {
            transform: translateX(0px);
            transition-timing-function: ease-out;
        }
    }

    @keyframes showMRO {
        0% {
            bottom: -120px;
        }

        100% {
            bottom: 0;
        }
    }

    @keyframes hiddenMRO {
        0% {
            bottom: 0;
        }

        100% {
            bottom: -120px;
        }
    }

    .main-section.active {
        margin-left: 240px;
    }

    .main-section.active ~ .footer-section {
        margin-left: 240px;
        transition: all 0.5s ease;
    }

    @media only screen and (max-width: 992px) {
        .main-section.active {
            margin-left: 0;
        }

        .main-section.active ~ .footer-section {
            margin-left: 240px;
            transition: all 0.5s ease;
        }
    }

    .modal-mro:deep(.el-dialog__header) {
        padding: 0;
    }

    .modal-mro img {
        width: 100%;
        height: 100%;
    }

    .modal-mro:deep(.el-dialog__body) {
        padding: 0;
        line-height: 0;
    }

    .is-icon-close {
        font-size: 20px;
        z-index: 10;
        margin-left: -35px;
        margin-top: -35px;
        background: #fff;
        border-radius: 6px;
        padding: 4px;
    }
}

:deep(.el-header) {
    height: 46px !important;
    padding-bottom: 10px;
    z-index: 1;
}

.overlay {
    position: fixed;
    top: 46px;
    left: 0;
    height: -webkit-fill-available;
}
.overlay-header-bg {
    background: rgba(255, 255, 255, 1);
    filter: brightness(0.5);
}
</style>
