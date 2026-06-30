<template>
  <el-input
    :class="algin"
    :disabled="disabled"
    type="text"
    :placeholder="placeholder || $t('calendar.price_after_discount')"
    v-model="displayValue"
    @change="onChange"
  >
    <span
      v-if="suffix"
      slot="suffix"
      class="el-input__icon body-small-regular neutral-600"
    >
      {{ suffix }}
    </span>
  </el-input>
</template>

<script>
export default {
  name: "InputNumber",
  props: {
    valueNumber: {
      type: [Number, String], // ✅ Chấp nhận số hoặc chuỗi, cho phép null
      default: null,
    },
    dataObject: {
      type: Object,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "",
    },
    suffix: {
      type: String,
      default: "",
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    algin: {
      type: String,
      default: "center",
    },
  },
  data() {
    return {
      displayValue: this.valueNumber !== null ? String(this.valueNumber) : "",
    };
  },
  watch: {
    valueNumber(newVal) {
      this.displayValue = newVal !== null ? String(newVal) : "";
    },
  },
  methods: {
    onChange() {
      if (this.displayValue === "") {
        this.$emit("onChange", this.displayValue, this.dataObject);
        return;
      }

      let num = parseFloat(this.displayValue);
      if (isNaN(num)) {
        num = null;
      } else {
        if (num < this.min) num = this.min;
        if (num > this.max) num = this.max;
      }

      this.displayValue = num !== null ? String(num) : "";
      this.$emit("onChange", num, this.dataObject);
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(input::-webkit-inner-spin-button) {
  display: none;
}
:deep(.el-input__inner) {
  text-align: center;
}
.left {
  :deep(.el-input__inner) {
    text-align: left !important;
  }
}
</style>
