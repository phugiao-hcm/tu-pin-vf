<template>
  <el-input
    :class="algin"
    :disabled="disabled"
    :min="min"
    :max="max"
    type="number"
    v-model="countNumber"
    @change="onChange"
    :placeholder="
      placeholder ? placeholder : $t('calendar.price_after_discount')
    "
  >
    <span
      v-if="suffix"
      slot="suffix"
      class="el-input__icon body-small-regular neutral-600"
      >{{ suffix }}</span
    >
  </el-input>
</template>
<script>
export default {
  name: "InputNumber",
  props: {
    valueNumber: {
      type: [Number, String],
      default: 0,
    },
    dataObject: {},
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
      default: 0,
    },
    max: {
      type: Number,
      default: 10,
    },
    algin: {
      type: String,
      default: "center",
    },
  },
  data() {
    return {
      localValue: this.valueNumber, // Sao chép giá trị từ prop vào data
    };
  },
  computed: {
    countNumber: {
      get() {
        return this.localValue;
      },
      set(val) {
        this.localValue = Number(val.split(".").join(""));

        // START ONLY APPLY FOR IOS ĐỂ KÍCH HOẠT ĐƯỢC ONCHANGE TRÊN IOS
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          this.onChange(this.localValue);
        }
        // END ONLY APPLY FOR IOS ĐỂ KÍCH HOẠT ĐƯỢC ONCHANGE TRÊN IOS
      },
    },
  },
  watch: {
    valueNumber(newValue) {
      this.localValue = newValue; // Cập nhật khi prop thay đổi
    },
  },
  methods: {
    onChange(localValue) {
      this.localValue = localValue !== "NaN" ? Number(localValue) : this.min;

      if (this.localValue > this.max) {
        this.localValue = this.max;
      } else if (this.localValue < this.min) {
        this.localValue = this.min;
      }
      this.$emit("onChange", this.localValue, this.dataObject);
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