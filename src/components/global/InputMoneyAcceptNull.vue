<template>
  <el-input
    :disabled="disabled"
    v-model="priceMoney"
    @blur="onChange"
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
  name: "InputMoneyAcceptNull",
  props: {
    valueMoney: {
      type: Number,
      default: null,
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
  },
  data() {
    return {};
  },
  computed: {
    priceMoney: {
      get() {
        if (this.valueMoney === null || this.valueMoney === "") {
          return null;
        }
        return this.formatMoney(this.valueMoney);
      },
      set(val) {
        this.valueMoney = val ? Number(val.split(".").join("")) : null;
      },
    },
  },
  methods: {
    onChange() {
      this.$emit("onChange", this.valueMoney, this.dataObject);
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