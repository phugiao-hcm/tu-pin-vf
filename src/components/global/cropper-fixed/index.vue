<template>
  <div>
    <!-- input file ẩn -->
    <input
      style="display: none"
      type="file"
      ref="fileInput"
      :accept="accept"
      @change="(e) => loadImage(e, false)"
    />

    <!-- ============ HANDLE IMAGES ============== -->
    <el-dialog
      custom-class="dialog-cropper"
      v-model="dialogVisibleCropper"
      :width="`${defaultSize().width + 10}px !important`"
      class="thumbnail-dialog"
    >
      <div class="thumbnail-dialog__body">
        <Cropper
          ref="cropperRef"
          :src="image.src"
          image-restriction="stencil"
          :default-size="defaultSize"
          :stencil-props="{
            handlers: {},
            movable: false,
            resizable: false,
            aspectRatio: Number(width) / Number(height),
          }"
          :stencil-size="{ width, height }"
        />
      </div>

      <template #footer>
        <div class="thumbnail-dialog__footer flex justify-flex-end">
          <el-button type="info" @click="dialogVisibleCropper = false" size="small">
            Hủy
          </el-button>
          <el-button size="small" :loading="ui.isSubmitting" type="primary" @click="crop">
            Xác nhận
          </el-button>
        </div>
      </template>
    </el-dialog>

    <img :src="imageCropper ?? undefined" style="display: none" />

    <!-- upload button -->
    <div class="upload-file custom-button-upload" v-if="typeUpload === 'file-upload'">
      <el-button type="primary" @click="onOpen" size="small"> Chọn tệp <slot /> </el-button>
    </div>

    <div class="avatar-upload" @click="onOpen" v-else-if="typeUpload === 'avatar-upload'">
      <i class="el-icon-plus"></i>
    </div>

    <div v-else-if="typeUpload === 'avatar-upload-custom'">
      <div class="fit-content" @click="onOpen">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits } from 'vue'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

const props = defineProps({
  width: { type: [String, Number], default: 300 },
  height: { type: [String, Number], default: 300 },
  typeUpload: {
    type: String,
    default: 'file-upload',
    validator: (value: string) =>
      ['file-upload', 'avatar-upload', 'avatar-upload-custom'].includes(value),
  },
  accept: { type: String, default: 'image/png, image/jpeg, image/jpg' },
  scale: { type: Number, default: 2 }, // ✅ scale nhân độ phân giải
})

const emit = defineEmits<{
  (e: 'onResult', file: File, is360?: boolean): void
}>()

// refs
const fileInput = ref<HTMLInputElement | null>(null)
const cropperRef = ref<any>(null)

// state
const dialogVisibleCropper = ref(false)
const dialogTypeImageVisible = ref(false)
const image = reactive<{ src: string | null; type: string | null }>({ src: null, type: null })
const ui = reactive({ isSubmitting: false })
const infoFile = ref<File | null>(null)
const imageCropper = ref<string | null>(null)
const result = ref<File | null>(null)
const result360 = ref<File | null>(null)
const keepOriginalImage = ref(0)
const is360 = ref(false)

// ========== utils ==========
function getMimeType(file: ArrayBuffer, fallback: string | null = null): string | null {
  const byteArray = new Uint8Array(file).subarray(0, 4)
  let header = ''
  for (let i = 0; i < byteArray.length; i++) {
    header += byteArray[i].toString(16)
  }
  switch (header) {
    case '89504e47':
      return 'image/png'
    case '47494638':
      return 'image/gif'
    case 'ffd8ffe0':
    case 'ffd8ffe1':
    case 'ffd8ffe2':
    case 'ffd8ffe3':
    case 'ffd8ffe8':
      return 'image/jpeg'
    default:
      return fallback
  }
}

// ========== methods ==========
const onOpen = () => {
  dialogTypeImageVisible.value = true
  keepOriginalImage.value = 0
  is360.value = false
  if (fileInput.value) {
    fileInput.value.value = ''
    fileInput.value.click()
  }
}

const defaultSize = () => ({ width: Number(props.width), height: Number(props.height) })

// ✅ crop trực tiếp từ ảnh gốc
const crop = () => {
  try {
    ui.isSubmitting = true
    const { coordinates } = cropperRef.value.getResult()
    if (!coordinates) return
    cropFromOriginal(coordinates)
  } catch (error) {
    ui.isSubmitting = false
    return false
  } finally {
    dialogTypeImageVisible.value = false
  }
}

const cropFromOriginal = (coordinates: any) => {
  const img = new Image()
  img.src = image.src || ''
  img.onload = () => {
    const scale = props.scale // nhân độ phân giải
    const canvas = document.createElement('canvas')
    canvas.width = coordinates.width * scale
    canvas.height = coordinates.height * scale

    const ctx = canvas.getContext('2d')!
    ctx.drawImage(
      img,
      coordinates.left,
      coordinates.top,
      coordinates.width,
      coordinates.height,
      0,
      0,
      coordinates.width * scale,
      coordinates.height * scale
    )

    imageCropper.value = canvas.toDataURL('image/webp', 0.98)

    canvas.toBlob(
      (blob) => {
        if (!blob || !infoFile.value) return
        result.value = new File(
          [blob],
          keepOriginalImage.value ? infoFile.value.name : `${infoFile.value.name}.webp`,
          { type: blob.type }
        )
        emit('onResult', result.value)
        dialogVisibleCropper.value = false
        ui.isSubmitting = false
      },
      keepOriginalImage.value ? infoFile.value?.type : 'image/webp',
      0.98
    )
  }
}

const loadImage = (event: Event, isImg360: boolean) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files || !files[0]) return

  if (!isImg360) dialogVisibleCropper.value = true
  is360.value = isImg360
  infoFile.value = files[0]

  if (image.src) URL.revokeObjectURL(image.src)

  const blob = URL.createObjectURL(files[0])
  const reader = new FileReader()
  reader.onload = (e) => {
    image.src = blob
    image.type = getMimeType(e.target?.result as ArrayBuffer, files[0].type)
  }
  reader.readAsArrayBuffer(files[0])

  if (isImg360) ResizeImage360()
}

const ResizeImage360 = () => {
  if (!infoFile.value) return
  const reader = new FileReader()
  reader.onload = (e) => {
    const img360 = new Image()
    img360.src = e.target?.result as string
    const scaleCanvas360 = document.createElement('canvas')
    scaleCanvas360.width = img360.width
    scaleCanvas360.height = img360.height

    const ctx360 = scaleCanvas360.getContext('2d')!
    if (scaleCanvas360.width && scaleCanvas360.height) {
      ctx360.drawImage(img360, 0, 0, scaleCanvas360.width, scaleCanvas360.height)

      scaleCanvas360.toBlob(
        (blob) => {
          if (!blob) return
          result360.value = new File(
            [blob],
            keepOriginalImage.value ? infoFile.value!.name : `${infoFile.value!.name}.webp`,
            { type: blob.type }
          )
          emit('onResult', result360.value!, is360.value)
        },
        keepOriginalImage.value ? infoFile.value!.type : 'image/webp'
      )
    } else {
      ResizeImage360()
    }
  }
  reader.readAsDataURL(infoFile.value)
  dialogTypeImageVisible.value = false
}

const resetImage = () => {
  image.src = null
  image.type = null
  imageCropper.value = null
  result.value = null
  if (fileInput.value) fileInput.value.value = ''
}

// cuối script setup
defineExpose({
  resetImage,
})
</script>
