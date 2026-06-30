<template>
    <HaSection>
        <div>
            <MultipleGoogleMap
                :is-disabled="true"
                :center="center"
                :lat="center.lat"
                :lng="center.lng"
                :zoom="12"
                height="400px"
                width="100%"
            />
        </div>
        <!-- =================== -->
        <!-- =================== -->
    </HaSection>
</template>


<script lang="ts" setup>
import HaSection from '@/components/global/HaSection.vue'
import MultipleGoogleMap from '@/components/global/MultipleGoogleMap.vue'
import { reactive, ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
// import { getPosts, type PostFilter } from './api'

// const router = useRouter()

// const tableData = ref<any>([])

const ui = reactive({
    isLoading: false,
})

const filter: PostFilter = {
    page: 1,
    provinceId: 28,
}

const center = ref<any>({})

const fetchPosts = async () => {
    try {
        ui.isLoading = true
        // const { res } = await getPosts(filter)
        // tableData.value = res.data?.phongTroList // chỉ lấy danh sách

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

// const fetchPosts = async () => {
//     try {
//         ui.isLoading = true
//         const { res } = await getPosts(filter)
//         tableData.value = res.data?.phongTroList // chỉ lấy danh sách

//         console.log('tableData :', res)
//     } catch (e) {
//         console.error(e)
//     } finally {
//         ui.isLoading = false
//     }
// }

onMounted(() => {
    fetchPosts()
})
</script>


<style lang="scss" scoped>
.el-popover_item {
    div {
        margin: 4px 0;
    }
}
</style>