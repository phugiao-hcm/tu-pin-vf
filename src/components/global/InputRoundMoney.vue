<template>
  <el-input
    :class="algin"
    :disabled="disabled"
    v-model="inputValue"
    @blur="handleBlur"
    @focus="removeFormatting"
    :placeholder="placeholder || $t('calendar.price_after_discount')"
    ref="inputRef"
  >
    <template #suffix>
      <span class="el-input__icon body-small-regular neutral-600">
        {{ suffix }}
      </span>
    </template>
  </el-input>
</template>

<script>
export default {
  name: 'InputRoundMoney',
  props: {
    value: {
      type: [Number, String],
      default: '', // Để trống mặc định thay vì 0
    },
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
    algin: {
      type: String,
      default: 'center',
    },
  },
  data() {
    return {
      inputValue: this.formatNumber(this.value),
    }
  },
  watch: {
    value(newValue) {
      this.inputValue = this.formatNumber(newValue)
    },
    inputValue(newVal) {
      this.$emit('input', this.parseNumber(newVal))
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.inputRef?.$refs?.input) {
        this.$refs.inputRef.$refs.input.setAttribute('enterkeyhint', 'go')
      }
    })
  },
  methods: {
    handleBlur() {
      const parsedValue = this.parseNumber(this.inputValue)
      if (!parsedValue) {
        this.inputValue = ''
        this.$emit('input', '')
        return
      }
      // Làm tròn lên hoặc xuống theo đơn vị 1000
      const rounded =
        parsedValue % 1000 >= 500
          ? Math.ceil(parsedValue / 1000) * 1000
          : Math.floor(parsedValue / 1000) * 1000
      this.inputValue = this.formatNumber(rounded)
      this.$emit('input', rounded)
    },
    removeFormatting() {
      const parsed = this.parseNumber(this.inputValue)
      this.inputValue = parsed ? String(parsed) : ''
    },
    formatNumber(value) {
      if (value === null || value === undefined || value === '' || Number(value) === 0) return ''
      return new Intl.NumberFormat('it-IT', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)
    },
    parseNumber(value) {
      const strVal = String(value || '')
      const onlyDigits = strVal.replace(/[^\d]/g, '')
      return onlyDigits ? Number(onlyDigits) : ''
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
.center {
  :deep(.el-input__inner) {
    text-align: center !important;
  }
}
</style>


