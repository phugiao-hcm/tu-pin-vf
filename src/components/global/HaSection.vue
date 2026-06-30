<template>
  <section class="section">
    <header class="section__header" id="sticky-header">
      <div v-if="title || description">
        <h1 v-if="title" class="section__title" v-text="title" />
        <p v-if="description" class="section__description" v-text="description" />
      </div>
      <div v-if="!$route.meta.noShowHeader" class="flex-between">
        <div
          v-if="$route.meta.breadcrumb?.title"
          class="title2 neutral-900"
          style="margin: 10px 0 12px"
        >
          {{ setBreadcrumbTitle($route) }}
        </div>
        <div>
          <slot name="header-filter" />
        </div>
      </div>
      <slot name="header" />
    </header>
    <div class="section__body">
      <slot />
    </div>
    <div class="section__footer">
      <slot name="footer" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'TrueSection',
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  methods: {
    setBreadcrumbTitle(route) {
      if (!route.meta.breadcrumb.title.hard_code) {
        return route.meta.breadcrumb.title.name
      }
      return route.meta.breadcrumb.title.name
    },
  },
}
</script>

<style lang="scss" scoped>
.section {
  padding: 0 20px 16px !important;
  background-color: white;

  &__header {
    margin: 0 0 12px;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    padding-top: 1em;
  }

  &__footer {
    margin: 12px 0;
  }

  &:not(:last-child) {
    margin-bottom: 36px;
  }

  @media only screen and (max-width: 992px) {
    #sticky-header {
      top: 0;
      z-index: 99;
      background: white;
      margin: 0 -16px;
      padding: 0 16px 8px;
    }
  }
}
</style>
