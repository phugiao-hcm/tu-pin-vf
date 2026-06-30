<template>
  <el-dialog
    class="popup-update-version"
    :visible.sync="ui.openPopupCheckVersion"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :width="'472px'"
  >
    <template #title>
      <p class="flex-center">
        <span
          class="icon-privacy-tip"
          style="font-size: 24px; color: #1f845a"
        ></span>
        {{ i18n.t("message.a_new_version") }}
      </p>
    </template>
    <el-divider></el-divider>
    <div class="custom-body">
      <div>
        <p class="word-break">
          {{
            i18n.t(
              "message.the_system_has_a_new_version_please_update_the_page_or_logout_and_login_again_to_use_it"
            )
          }}
        </p>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-flex-end">
        <el-button
          type="primary"
          size="small"
          @click="onReLoadPage"
          :loading="ui.isSubmitting"
        >
          <span class="icon-refresh"></span>
          {{ i18n.t("button.update") }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import i18n from "@/plugins/i18n/i18n";
import eventBus from "@/utils/eventBus";

export default {
  name: "PopupUpdateVersion",
  data() {
    return {
      ui: {
        openPopupCheckVersion: false,
        isSubmitting: false,
      },
      i18n: i18n,
    };
  },
  created() {
    eventBus.$on("onShowPopupUpdateVersion", this.open);
  },
  methods: {
    open() {
      // Push vào trang homepage khi reload -> update version (vì login nó sẽ vào trang homepage - phải có css vs js của homepage trước)
      this.ui.openPopupCheckVersion = true;
    },
    onReLoadPage() {
      this.ui.isSubmitting = true;
      this.ui.openPopupCheckVersion = false;

      const loading = this.$loading({
        lock: true,
        text: "Đang cập nhật phiên bản mới",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
        setTimeout(() => {
          window.location.reload(true); // Tạm thời đóng lại để force logout - sau này mở HS-433
        }, 500);
      }, 2000);
    },
  },
};
</script>

<style lang="scss">
.popup-update-version {
  .el-dialog {
    margin-top: unset !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media (max-width: 768px) {
      width: 346px !important;
    }
  }

  .el-dialog__body {
    padding: 0 20px !important;
  }

  .el-divider--horizontal {
    margin: 0 0 20px 0;
  }

  .flex-center {
    display: flex;
    align-items: center;
    gap: 6px;
  }
}
</style>
