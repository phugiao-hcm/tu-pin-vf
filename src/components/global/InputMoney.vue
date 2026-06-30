<template>
  <el-input
    :disabled="disabled"
    :min="0"
    v-model="priceOneDay"
    @blur="onChange"
    :placeholder="placeholder ? placeholder : ''"
  >
    <span v-if="suffix" slot="suffix" class="el-input__icon">{{ suffix }}</span>
  </el-input>
</template>
<script>
export default {
  name: 'InputMoney',
  props: {
    valueMoney: {
      type: Number,
      default: 0,
    },
    dataObject: {},
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    suffix: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // value: this.valueMoney
    }
  },
  computed: {
    priceOneDay: {
      get() {
        // if(this.value) return this.formatMoney(this.value)
        return this.formatMoney(this.valueMoney)
      },
      set(val) {
        this.valueMoney = Number(val.split('.').join(''))
      },
    },
  },
  methods: {
    onChange() {
      this.$emit('onChange', this.valueMoney, this.dataObject)
    },
  },
}
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