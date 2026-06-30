<template>
  <div class="login-outer">
    <div class="login-outer__left">
      <img src="../../../assets/images/svg/intro-screen.svg" />
    </div>
    <div class="login-outer__right">
      <div class="login-form">
        <ha-offset-section>
          <div class="w-100 text-left" style="margin-bottom: 64px">
            <img src="../../../assets/images/svg/g2j-mini.svg" style="width: 40px; height: 40px" />
          </div>

          <p class="title3 black-0">Đăng Nhập</p>
          <el-form
            :model="formLabelAlign"
            :rules="rules"
            ref="form"
            label-position="top"
            label-width="auto"
          >
            <div class="custom-form">
              <el-form-item>
                <p class="body-small-semi-bold neutral-700">Tài khoản</p>
                <el-input
                  placeholder="Tên đăng nhập hoặc Email"
                  v-model.trim="formLabelAlign.name"
                  size="large"
                ></el-input>
              </el-form-item>
            </div>
            <div class="custom-form">
              <el-form-item>
                <p class="body-small-semi-bold neutral-700" style="margin-top: 16px">Mật khẩu</p>
                <el-input
                  placeholder="Nhập mật khẩu"
                  v-model.trim="formLabelAlign.region"
                  type="password"
                  show-password
                  size="large"
                >
                </el-input>
              </el-form-item>
            </div>
          </el-form>

          <div>
            <el-button class="w-100" type="primary" size="large">Đăng nhập</el-button>
          </div>

          <div style="margin-top: 24px" class="text-center">
            <el-link :underline="false" type="primary">
              <p class="body-small-medium word-break">Đăng ký trở thành đổi tác</p>
            </el-link>
          </div>
        </ha-offset-section>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import HaOffsetSection from '../../../components/global/HaOffsetSection.vue'
import { reactive, ref } from 'vue'
import type { FormItemProps, FormProps } from 'element-plus'

const itemLabelPosition = ref<FormItemProps['labelPosition']>('')
const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})

const rules = () => {}
</script>



<style lang="scss" scoped>
$tablet: 992px;

.login-outer::v-deep {
  .login__form {
    margin: 1em 0;

    .el-input {
      padding: 6px 0;
    }

    .el-button.is-disabled {
      pointer-events: painted;
    }
  }

  .el-form-item {
    margin: unset;
    p {
      margin-bottom: 6px;
    }
  }

  .el-form-item__error {
    position: unset;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--secondary-red-600);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
}

.login-outer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;

  @media only screen and (max-width: $tablet) {
    grid-template-columns: 1fr;
  }

  &__left {
    position: relative;
    background: #f1f9ff;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -50%);
    }

    @media only screen and (max-width: $tablet) {
      display: none;
    }
  }

  &__right {
    position: relative;
    .login-form {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }

    .login-content-form {
      padding: 32px 0;
    }

    :deep(.el-input__suffix) {
      padding: 0 7px;
    }
  }
}

:deep(.el-form-item.is-error) .el-input__inner {
  border-color: var(--secondary-red-600);
}

.el-form {
  margin: 32px 0;
}
.custom-form {
  margin: 8px 0;
}
</style>
