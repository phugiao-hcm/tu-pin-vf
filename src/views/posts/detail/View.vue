<template>
    <HaOffsetSection v-loading="ui.isLoading">
        <div style="margin-bottom: 16px">
            <div class="custom-header-action">
                <div class="flex-center">
                    <div>
                        <el-link :underline="false" @click="router.go(-1)">
                            <el-icon class="title2 neutral-900"><Back /></el-icon>
                        </el-link>
                    </div>
                    <div class="position-item-2">
                        <p class="title3 neutral-900 text-hidden">{{ post.title }}</p>
                    </div>
                    <!-- <div>
                        <el-tag :type="setTypeStatus(post.status)">
                            {{ setStatus(post.status) }}
                        </el-tag>
                    </div> -->
                </div>

                <!-- <div class="flex-center">
                    <el-button type="primary" @click="onDirectpostEdit">
                        <el-icon><EditPen /></el-icon>
                        <span>Chỉnh sửa</span>
                    </el-button>
                    <el-button type="danger" @click="onpostRemove(post)">
                        <el-icon><CircleCloseFilled /></el-icon>
                        <span>Ngừng kinh doanh</span>
                    </el-button>
                </div> -->
            </div>
        </div>

        <div class="custom-container">
            <div class="mb-sm">
                <p class="body-medium-semi-bold neutral-800">Thông tin phòng</p>
            </div>
            <div class="custom-card">
                <div>
                    <el-card shadow="never">
                        <p class="body-small-regular neutral-500">Giá /1 phòng</p>
                        <p class="body-small-semi-bold neutral-800">
                            {{ formatPrice(Number(post.price)) }}
                        </p>
                    </el-card>
                </div>
                <div>
                    <el-card shadow="never">
                        <p class="body-small-regular neutral-500">Số lượng phòng</p>
                        <p class="body-small-semi-bold neutral-800">{{ post.totalRoom }}</p>
                    </el-card>
                </div>
                <div>
                    <el-card shadow="never">
                        <p class="body-small-regular neutral-500">Diện tích</p>
                        <p class="body-small-semi-bold neutral-800">{{ post.square }}m²</p>
                    </el-card>
                </div>
                <div>
                    <el-card shadow="never">
                        <p class="body-small-regular neutral-500">Hướng phòng</p>
                        <p class="body-small-semi-bold neutral-800">
                            {{ setDirectionRoom(post.roomDirection) }}
                        </p>
                    </el-card>
                </div>
            </div>
        </div>

        <div class="custom-container">
            <div class="mb-sm">
                <p class="body-medium-semi-bold neutral-800">Tiện ích</p>
            </div>

            <div class="custom-card-facilities">
                <div class="item" v-for="(item, index) in post.facility" :key="index">
                    <p class="body-small-regular neutral-700 text-hidden-no-magin">
                        {{ setFacilityRoom(item) }}
                    </p>
                </div>
            </div>
        </div>

        <div class="custom-container">
            <div class="mb-sm">
                <p class="body-medium-semi-bold neutral-800">Hình ảnh phòng</p>
            </div>

            <div class="image-gallery">
                <div
                    class="image-box grid-item"
                    v-for="(item, index) in post.photos"
                    :key="index"
                    :class="{ active: index === 0 }"
                >
                    <el-image :src="item" class="image-preview" fit="cover" />
                    <div v-if="index === 0" class="main-label flex-center">
                        <i class="el-icon-star-on secondary-orange-500" />
                        <p class="small-cap-small-cap secondary-orange-600">Ảnh đại diện</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="custom-container">
            <div class="mb-sm">
                <p class="body-medium-semi-bold neutral-800">Địa chỉ</p>
            </div>

            <div class="custom-address">
                <div>
                    <div class="mb-sm">
                        <p class="body-small-regular neutral-700">{{ post.houseNo }}</p>
                    </div>
                    <div class="mb-sm">
                        <p class="body-small-regular neutral-500">Tên chủ thuê</p>
                        <p class="body-small-semi-bold neutral-800">{{ post.authorName }}</p>
                    </div>

                    <div class="mb-sm">
                        <p class="body-small-regular neutral-500">Số điện thoại liên hệ</p>
                        <p class="body-small-semi-bold neutral-800">{{ post.authorMobile }}</p>
                    </div>
                </div>
                <div>
                    <GoogleMap
                        :is-disabled="true"
                        :center="center"
                        :lat="center.lat"
                        :lng="center.lng"
                        :zoom="12"
                        height="400px"
                        width="100%"
                    />
                </div>
            </div>
        </div>

        <div class="custom-container">
            <div class="mb-sm">
                <p class="body-medium-semi-bold neutral-800">Mô tả</p>
            </div>

            <div>
                <p style="white-space: pre-line; line-height: 1.625" v-html="post.content"></p>
            </div>
        </div>

        <!-- =================== -->
        <PopupRemove ref="dialogRef" />
        <!-- =================== -->
    </HaOffsetSection>
</template>

<script lang="ts" setup>
import HaOffsetSection from '@/components/global/HaOffsetSection.vue'
import { EditPen, CircleCloseFilled, Back } from '@element-plus/icons-vue'
import GoogleMap from '@/components/global/GoogleMap.vue'
import { ref, onMounted, reactive } from 'vue'
import { getPhongTroDetail } from './api'
import { usePage } from '../mixin'
import PopupRemove from '../components/PopupRemove.vue'

const { setStatus, setTypeStatus, setDirectionRoom, setFacilityRoom } = usePage()
import { useUI } from '@/mixins/globalMixin'
const { formatPrice } = useUI()

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const onDirectpostEdit = (value: number) => {
    console.log('onDirectEdit :', value)
}

const ui = reactive({
    isLoading: false,
})

const post = ref<any>([])
const center = ref<any>({})

const fetchPostDetail = async () => {
    try {
        ui.isLoading = true
        const id = route.query.id as string
        const { res } = await getPhongTroDetail(id)
        post.value = res.data // chỉ lấy danh sách

        center.value = {
            lat: post.value.latitude,
            lng: post.value.longitude,
        }
    } catch (e) {
        console.error(e)
    } finally {
        ui.isLoading = false
    }
}

onMounted(() => {
    fetchPostDetail()
})

const dialogRef = ref<any>(null)
const onpostRemove = (row: any) => {
    dialogRef.value?.open(row)
}
</script>

<style lang="scss" scoped>
.custom-header-action {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 16px;
    align-items: baseline;
    justify-items: flex-end;

    @media only screen and (max-width: 992px) {
        grid-template-columns: 1fr;
        justify-items: flex-start;
    }

    .position-item-2 {
        margin-left: 8px;
        margin-right: 16px;
    }
}

.custom-container {
    margin: 16px 0;
}

.mb-sm {
    margin-bottom: 8px;
}

.custom-card {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 16px;

    :deep(.el-card__body) {
        text-align: center;
    }

    p:first-child {
        margin-bottom: 4px;
    }
}

/* ------------ START FACILITIES ------------ */
.custom-card-facilities {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 16px;

    .item {
        border-bottom: 1px dashed var(--neutral-200);
        padding-bottom: 12px;
    }

    @media only screen and (max-width: 992px) {
        grid-template-columns: 1fr;
    }
}

.custom-address {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

/* ------------ START IMAGE ------------ */
.image-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
}
.image-box {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 6px;
    overflow: hidden;
    border: 2px solid transparent;
}
.image-box.active {
    border: 3px solid var(--secondary-orange-300);
}
.image-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.image-actions {
    position: absolute;
    bottom: 0;
    display: flex;
    gap: 4px;
    justify-content: space-between;
    width: 100%;
    padding: 4px;
}
.image-actions i {
    background: #00000066;
    padding: 4px;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
}
.image-order {
    position: absolute;
    top: 4px;
    right: 4px;
    background: #ffffff99;
    border-radius: 4px;
    width: 20px;
    height: 18px;
    text-align: center;
}
.main-label {
    position: absolute;
    bottom: 4px;
    left: 4px;
    background: var(--secondary-orange-100);
    color: white;
    padding: 0 8px 0 4px;
    border-radius: 12px;
    height: 20px;
}
.add-image {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed var(--neutral-300);
    color: #999;
    cursor: pointer;
}
</style>