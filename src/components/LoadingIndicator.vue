<template>
  <div class="loading-indicator">
    <span>{{ title }}</span>
    <!-- eslint-disable vue/no-unused-vars -->
    <template v-for="_ in dots">.</template>
  </div>
</template>

<script>
/**
 * Текст "Подождите" с динамическими точками
 */
export default {
  name: "LoadingIndicator",
  props: {
    title: {
      type: String,
      default: "Подождите",
    },
  },
  data() {
    return {
      dots: 1,
      interval: null,
    };
  },
  created() {
    this.interval = setInterval(() => {
      if (this.dots >= 5) {
        this.dots = 1;
      } else {
        this.dots += 1;
      }
    }, 200);
  },
};
</script>

<style lang="stylus">
.loading-indicator {
  display flex
  align-items center
}
</style>
