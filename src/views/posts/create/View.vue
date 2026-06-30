<template>
    <ha-offset-section :isHeaderCustom="true">
        <div class="flex-baseline wrap" style="margin-bottom: 16px">
            <div class="flex-center">
                <div>
                    <el-link :underline="false" type="primary" @click="onBack()">
                        <el-icon color="black" style="margin-right: 8px"><Back /></el-icon>
                    </el-link>
                </div>
                <div>
                    <p class="title2 neutral-900">Tạo Tin Đăng mới</p>
                </div>
            </div>

            <div class="flex-center wrap">
                <el-button
                    :loading="ui.isSubmitting"
                    type="primary"
                    size="large"
                    @click="preHandleBeforeSubmit"
                >
                    Tạo mới
                </el-button>
            </div>
        </div>

        <el-form :model="form" :rules="rules" ref="formRef">
            <div class="custom-flex">
                <div class="flex-left">
                    <p class="body-medium-semi-bold neutral-700">Thông tin phòng</p>
                    <p class="body-small-regular neutral-500">
                        Thiết lập các thông tin cơ bản của phòng
                    </p>
                </div>
                <div class="flex-right mobile-mt-sm">
                    <div class="custom-card">
                        <div>
                            <p class="body-small-regular neutral-700">
                                Tên cơ sở lưu trú
                                <span class="secondary-red-600">*</span>
                            </p>
                        </div>
                        <div>
                            <el-form-item prop="title">
                                <el-input
                                    :placeholder="'Nhập tên cơ sở lưu trú'"
                                    v-model="form.title"
                                ></el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <div class="custom-card">
                        <div class="mt-12px flex-gap">
                            <div class="w-100">
                                <p class="body-small-regular neutral-700">
                                    Tổng số lượng phòng
                                    <span class="secondary-red-600">*</span>
                                </p>
                                <el-form-item prop="totalRoom">
                                    <InputNumber
                                        :algin="'left'"
                                        :min="1"
                                        :max="100"
                                        :placeholder="'Nhập Tổng số lượng phòng'"
                                        :valueNumber="form.totalRoom"
                                        @onChange="onChangeNumOfRoomHotel"
                                    />
                                </el-form-item>
                            </div>
                            <div class="w-100">
                                <p class="body-small-regular neutral-700">
                                    Diện tích phòng (/m²)
                                    <span class="secondary-red-600">*</span>
                                </p>
                                <el-form-item prop="square">
                                    <InputNumber
                                        :algin="'left'"
                                        :suffix="` m²`"
                                        :min="0"
                                        :max="9999"
                                        :placeholder="'Nhập diện tích phòng'"
                                        :valueNumber="form.square"
                                        @onChange="onChangeSquare"
                                    />
                                </el-form-item>
                            </div>
                        </div>
                    </div>

                    <div class="custom-card">
                        <div class="mt-12px flex-gap">
                            <div class="w-100">
                                <p class="body-small-regular neutral-700">
                                    Họ và tên người đại diện
                                    <span class="secondary-red-600">*</span>
                                </p>
                                <el-form-item prop="ownerName">
                                    <el-input
                                        :placeholder="'Nhập Họ và tên người đại diện'"
                                        v-model="form.ownerName"
                                    ></el-input>
                                </el-form-item>
                            </div>
                            <div class="w-100">
                                <p class="body-small-regular neutral-700">
                                    Số điện thoại liên hệ
                                    <span class="secondary-red-600">*</span>
                                </p>
                                <el-form-item prop="ownerName">
                                    <el-input
                                        :placeholder="'Nhập số số điện thoại liên hệ'"
                                        v-model="form.ownerPhone"
                                    ></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </div>

                    <div class="custom-card">
                        <div class="mt-12px flex-gap">
                            <div class="w-100">
                                <p class="body-small-regular neutral-700">
                                    Số phòng còn lại
                                    <span class="secondary-red-600">*</span>
                                </p>
                                <el-form-item prop="ownerName">
                                    <InputNumber
                                        :algin="'left'"
                                        :suffix="` m²`"
                                        :min="0"
                                        :max="9999"
                                        :placeholder="'Nhập số phòng còn trống'"
                                        :valueNumber="form.currentRoom"
                                        @onChange="onChangeNumORoomAvailable"
                                    />
                                </el-form-item>
                            </div>
                            <div class="w-100">
                                <p class="body-small-regular neutral-700">
                                    Giá thuê phòng (/1 tháng)
                                    <span class="secondary-red-600">*</span>
                                </p>
                                <el-form-item prop="price">
                                    <InputRoundMoney
                                        :suffix="'/1 tháng'"
                                        :algin="'left'"
                                        placeholder="Nhập giá thuê phòng"
                                        v-model="form.price"
                                        @input="onChangePrice"
                                    />
                                </el-form-item>
                            </div>
                        </div>
                    </div>

                    <div class="custom-card">
                        <div>
                            <p class="body-small-regular neutral-700">
                                Loại phòng <span class="secondary-red-600">*</span>
                            </p>
                        </div>
                        <div>
                            <el-form-item prop="roomType">
                                <el-select
                                    :loading="ui.isLoadingRoomBed"
                                    class="w-100"
                                    v-model="form.roomType"
                                    :placeholder="'Chọn loại phòng'"
                                    :loading-text="'Đang tải...'"
                                    :no-data-text="'Không có dữ liệu'"
                                >
                                    <el-option
                                        v-for="(item, index) in TYPE_ROOM_OPTIONS"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>

                    <div class="custom-card">
                        <div>
                            <p class="body-small-regular neutral-700">Hướng phòng</p>
                        </div>
                        <div>
                            <el-form-item prop="roomDirection">
                                <el-select
                                    :loading="ui.isLoadingRoomView"
                                    class="w-100"
                                    v-model="form.roomDirection"
                                    :placeholder="'Chọn hướng phòng'"
                                    :loading-text="'message.loading'"
                                    :no-data-text="'no_data'"
                                >
                                    <el-option
                                        v-for="(item, index) in DIRECTION_ROOM_OPTIONS"
                                        :key="index"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>

                    <div class="custom-card">
                        <div>
                            <p class="body-small-regular neutral-700">
                                Địa chỉ (số nhà)
                                <span class="secondary-red-600">*</span>
                            </p>
                        </div>
                        <div>
                            <el-form-item prop="houseNo">
                                <el-input
                                    :placeholder="'Nhập địa chỉ'"
                                    v-model="form.houseNo"
                                ></el-input>
                            </el-form-item>
                        </div>
                    </div>

                    <div class="custom-card">
                        <div>
                            <p class="body-small-regular neutral-700">Mô tả phòng</p>
                        </div>
                        <div>
                            <el-form-item prop="content">
                                <el-input
                                    type="textarea"
                                    :placeholder="'Nhập mô tả ngắn gọn'"
                                    v-model="form.content"
                                    rows="5"
                                    maxlength="3000"
                                    show-word-limit
                                ></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>
            </div>
            <el-divider></el-divider>
            <!-- ================= TIỆN ÍCH VÀ HÌNH ẢNH ================= -->
            <div class="custom-flex">
                <div class="flex-left">
                    <p class="body-medium-semi-bold neutral-700">Tiện ích và hình ảnh</p>
                    <p class="body-small-regular neutral-500">
                        Thêm tiện ích và hình ảnh để khách dễ dàng lựa chọn phòng của bạn
                    </p>
                </div>
                <div class="flex-right mobile-mt-sm">
                    <!-- <div class="custom-card">
                        <div>
                            <p class="body-small-regular neutral-700">Loại tin đăng</p>
                            <div>
                                <el-radio-group v-model="form.adType">
                                    <el-radio :value="FEATURED_STATUS.NORMAL">Tin thường</el-radio>
                                    <el-radio :value="FEATURED_STATUS.FEATURED"
                                        >Tin nổi bật</el-radio
                                    >
                                </el-radio-group>
                            </div>
                        </div>
                    </div> -->

                    <div class="custom-card">
                        <div>
                            <p class="body-small-regular neutral-700">Thêm tiện ích</p>
                            <div>
                                <el-form-item prop="facility">
                                    <el-select
                                        :loading="ui.isLoadingRoomBed"
                                        class="w-100"
                                        multiple
                                        v-model="form.facility"
                                        :placeholder="'Chọn tiên ích'"
                                        :loading-text="'Đang tải...'"
                                        :no-data-text="'Không có dữ liệu'"
                                    >
                                        <el-option
                                            v-for="(item, index) in FACILITY_ROOM_OPTIONS"
                                            :key="index"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </div>

                    <div class="custom-card">
                        <div>
                            <p class="body-small-regular neutral-500">
                                Thêm ảnh phòng
                                <span class="secondary-red-600">*</span>
                            </p>
                            <p class="body-small-regular neutral-500">
                                Ảnh phòng phải có định dạng JPG hoặc PNG, dung lượng không quá 3Mb.
                            </p>
                        </div>
                    </div>

                    <div class="custom-card">
                        <el-form-item prop="photos">
                            <div class="image-gallery">
                                <div
                                    class="image-box"
                                    v-for="(image, index) in form.photos"
                                    :key="image.id"
                                    :class="{ active: index === 0 }"
                                >
                                    <el-image :src="image.url" class="image-preview" fit="cover" />
                                    <span
                                        class="image-order body-extra-small-semi-bold neutral-800"
                                        >{{ index + 1 }}</span
                                    >

                                    <div class="image-actions">
                                        <div>
                                            <div>
                                                <el-tooltip
                                                    content="Đặt làm ảnh đại diện"
                                                    placement="top"
                                                >
                                                    <el-icon class="secondary-orange-600"
                                                        ><Star
                                                    /></el-icon>
                                                </el-tooltip>
                                            </div>
                                        </div>

                                        <div>
                                            <el-tooltip content="Xóa ảnh" placement="top">
                                                <el-icon
                                                    class="neutral-0"
                                                    @click="deleteImage(image)"
                                                    ><Delete
                                                /></el-icon>
                                            </el-tooltip>
                                        </div>
                                    </div>

                                    <div v-if="index === 0" class="main-label flex-center">
                                        <i class="el-icon-star-on secondary-orange-500" />
                                        <p class="small-cap-small-cap secondary-orange-600">
                                            Ảnh đại diện
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <CropperFixed
                                        ref="cropperFixedRef"
                                        @onResult="resultThumbnail"
                                        :width="1520"
                                        :height="1180"
                                        :typeUpload="'avatar-upload-custom'"
                                    >
                                        <div class="image-box add-image">
                                            <el-icon><Plus /></el-icon>
                                        </div>
                                    </CropperFixed>
                                </div>
                            </div>
                        </el-form-item>
                    </div>

                    <div class="custom-card">
                        <div>
                            <p class="body-small-regular neutral-500">
                                Thêm vị trí trên bản đồ
                                <span class="secondary-red-600">*</span>
                            </p>
                            <p class="body-small-regular neutral-500">
                                Bản đồ được chọn bằng cách nhập địa điểm bên dưới.
                            </p>
                        </div>
                    </div>

                    <div class="custom-card">
                        <GoogleMapWithAutocomplete @update:location="handleLocation" />
                    </div>

                    <div class="custom-card">
                        <div class="mt-12px flex-gap">
                            <div class="w-100">
                                <el-form-item prop="provinceId">
                                    <el-select
                                        filterable
                                        :loading="ui.isLoadingProvinces"
                                        class="w-100"
                                        v-model="form.provinceId"
                                        :placeholder="'Chọn tỉnh/thành phố'"
                                        :loading-text="'Đang tải...'"
                                        :no-data-text="'Không có dữ liệu'"
                                        @change="onChangeProvinceList"
                                    >
                                        <el-option
                                            v-for="(item, index) in provinces"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div class="w-100">
                                <el-form-item prop="wardId">
                                    <el-select
                                        filterable
                                        :loading="ui.isLoadingRoomBed"
                                        class="w-100"
                                        v-model="form.wardId"
                                        :placeholder="'Chọn xã/phường'"
                                        :loading-text="'Đang tải...'"
                                        :no-data-text="'Không có dữ liệu'"
                                    >
                                        <el-option
                                            v-for="(item, index) in wards"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.id"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-form>
    </ha-offset-section>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

import HaOffsetSection from '@/components/global/HaOffsetSection.vue'
import InputNumber from '@/components/global/InputNumber.vue'
import InputRoundMoney from '@/components/global/InputRoundMoney.vue'
import CropperFixed from '@/components/global/cropper-fixed/index.vue'
import { Back, Plus, Delete, Star } from '@element-plus/icons-vue'
import {
    TYPE_ROOM_OPTIONS,
    DIRECTION_ROOM_OPTIONS,
    FACILITY_ROOM_OPTIONS,
    PROJECT_STATUS,
    FEATURED_STATUS,
} from '../const'
import { type CreatePostPayload } from './api'
import { useUI } from '@/mixins/globalMixin'
import GoogleMapWithAutocomplete from '@/components/global/GoogleMap.vue'
import { getTokenImage, uploadImage } from '@/apis/upload.ts'
// import { toSlug } from '@/utils/string'
import { createPhongTro } from './api'
import { getProvinces, getWards } from '@/apis/province'

const router = useRouter()
const { generateRandomSuffix, onResetValidateField, validateRequired } = useUI()

// Wrap validateRequired to callback style for async-validator
const validateRequiredCallback = (rule: any, value: any, callback: any) => {
    validateRequired(rule, value)
        .then(() => callback())
        .catch((err: any) => callback(err))
}

const validateNumberRequiredCallback = (rule: any, value: any, callback: any) => {
    if (!value) {
        callback(new Error('Không bỏ trống'))
    } else {
        callback()
    }
}

const validateOptionRequiredCallback = (rule: any, value: any, callback: any) => {
    if (!value || value.length === 0) {
        callback(new Error('Không bỏ trống'))
    } else {
        callback()
    }
}

const validateImagesRequiredCallback = (rule: any, value: any, callback: any) => {
    if (!form.photos || form.photos.length === 0) {
        callback(new Error('Không bỏ trống'))
    } else {
        callback()
    }
}

// refs
const formRef = ref<FormInstance>()
const cropperFixedRef = ref<InstanceType<typeof CropperFixed> | null>(null)

const provinces = ref<any>([])
const wards = ref<any>([])
const tokenImage = ref<any>({})

const ui = reactive({
    isSubmitting: false,
    isLoadingRoomView: false,
    isLoadingRoomBed: false,
    isLoadingFacility: false,
    isLoadingCancellationPolicySetupInfo: false,
    isLoadingProvinces: false,
    isLoadingWards: false,
})

const form = reactive<CreatePostPayload>({
    title: null,
    totalRoom: null,
    square: null,
    ownerName: null,
    roomType: null,
    roomDirection: null,
    content: null,
    facility: [],
    price: null,
    houseNo: null,
    photos: [],
    latitude: null,
    longitude: null,
    ownerPhone: null,
    currentRoom: null,
    deposit: null,
    provinceId: null,
    wardId: null,
})

const rules: FormRules = {
    title: [{ validator: validateRequiredCallback, trigger: ['blur'] }],
    content: [{ validator: validateRequiredCallback, trigger: ['blur'] }],
    totalRoom: [{ validator: validateNumberRequiredCallback, trigger: ['blur'] }],
    square: [{ validator: validateNumberRequiredCallback, trigger: ['blur'] }],
    ownerName: [{ validator: validateRequiredCallback, trigger: ['blur'] }],
    price: [{ validator: validateNumberRequiredCallback, trigger: ['blur'] }],
    houseNo: [{ validator: validateRequiredCallback, trigger: ['blur'] }],
    facility: [{ validator: validateOptionRequiredCallback, trigger: ['blur', 'change'] }],
    provinceId: [{ validator: validateRequiredCallback, trigger: ['blur', 'change'] }],
    wardId: [{ validator: validateRequiredCallback, trigger: ['blur', 'change'] }],
    photos: [{ validator: validateImagesRequiredCallback, trigger: ['blur', 'change'] }],
    roomDirection: [{ validator: validateOptionRequiredCallback, trigger: ['blur', 'change'] }],
    roomType: [{ validator: validateOptionRequiredCallback, trigger: ['blur', 'change'] }],
}

const getProvinceList = async () => {
    try {
        ui.isLoadingProvinces = true
        const { res } = await getProvinces()
        provinces.value = res.data
    } catch (e) {
        console.error(e)
    } finally {
        ui.isLoadingProvinces = false
    }
}
const getWardList = async (provinceSn: number) => {
    try {
        ui.isLoadingWards = true
        const { res } = await getWards(provinceSn)
        wards.value = res.data
    } catch (e) {
        console.error(e)
    } finally {
        ui.isLoadingWards = false
    }
}

const onChangeProvinceList = (provinceSn: number) => {
    getWardList(provinceSn)
}

const getTokenImg = async () => {
    try {
        tokenImage.value = await getTokenImage()
    } catch (e) {
        console.error(e)
    }
}

const uploadFileImg = async (image: File) => {
    try {
        const imageUpdated = await uploadImage(image, tokenImage.value)
        return imageUpdated
    } catch (e) {
        console.error(e)
    }
    return null
}

onMounted(() => {
    getProvinceList()
    getTokenImg()
})

const resultThumbnail = (result: File) => {
    const newImage = {
        file: result,
        url: URL.createObjectURL(result),
        fileName: `${generateRandomSuffix()}-${result.name}`,
        firstDisplay: 0,
    }
    if (form.photos.length < 11) {
        form.photos.push(newImage)
        onResetValidateField('photos')
    }
    onRefreshImage()
}

const deleteImage = (image: any) => {
    form.photos = form.photos.filter((img: any) => img.fileName !== image.fileName)
    onRefreshImage()
}

const onRefreshImage = () => {
    cropperFixedRef.value?.resetImage()
}

const onChangeNumOfRoomHotel = (value: number) => {
    form.totalRoom = value
}
const onChangeSquare = (value: number) => {
    form.square = value
}
const onChangePrice = (value: number) => {
    form.price = value
}

const onChangeNumORoomAvailable = (value: number) => {
    form.currentRoom = value
}

const onBack = () => {
    router.go(-1)
}

const preHandleBeforeSubmit = () => {
    console.log('preHandleBeforeSubmit')

    formRef.value?.validate((valid) => {
        console.log('zzzz', valid)
        if (!valid) return
        onSubmit()
    })
}

const onSubmit = async () => {
    console.log('onSubmit')

    ui.isSubmitting = true
    try {
        console.log('onSubmit IN')

        const onlyFiles = form.photos.map((item) => item.file)
        if (onlyFiles.length > 0) {
            await uploadAll() // ✅ đợi upload xong rồi mới lưu
        }
        console.log('onSubmit IN 2')

        // gọi API lưu post khi đã có link ảnh
        form.photos = form.photos.map((path) => path.file.name)

        const id = await createPhongTro(form)
        console.log('onSubmit IN 3')

        if (id) {
            ElMessage({
                message: 'Thêm Tin đăng mới thành công! Vui lòng chờ Quản trị viên Duyệt bài',
                type: 'success',
            })
            router.push({ name: 'PostList' })
        }
    } catch (error) {
        alert('Có lỗi xảy ra: ' + error)
    } finally {
        ui.isSubmitting = false
    }
}

// Cập nhật list ảnh
const uploadAll = async () => {
    const onlyFiles = form.photos.map((item) => item.file)
    await Promise.all(onlyFiles.map((file) => uploadFileImg(file)))
}

const handleLocation = (location: { lat: number; lng: number }) => {
    form.latitude = location.lat
    form.longitude = location.lng
}
</script>



<style lang="scss">
@use '../common/scss/create.scss';
</style>