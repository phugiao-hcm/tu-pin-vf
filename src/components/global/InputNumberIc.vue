<!-- FilteredInput.vue -->
<template>
    <el-input
        class="w-100"
        v-model="inputValue"
        :maxlength="maxlength"
        @input="filterInput"
        :placeholder="placeholder"
        :disabled="isDisabled"
    ></el-input>
</template>

<script>
export default {
    name: "InputNumberIc",
    props: {
        value: {
            type: String,
            default: "",
        },
        maxlength: {
            type: Number,
            default: 255,
        },
        placeholder: {
            type: String,
            default: "Nhập số",
        },
        isDisabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            inputValue: this.value,
        };
    },
    watch: {
        value(newValue) {
            this.inputValue = newValue;
        },
        inputValue(newValue) {
            this.$emit("input", newValue);
        },
    },
    methods: {
        filterInput() {
            // Biểu thức chính quy chỉ cho phép nhập số
            this.inputValue = this.inputValue.replace(/\D/g, "");
            this.inputValue = this.inputValue.trimStart();
        },
    },
};
</script>
