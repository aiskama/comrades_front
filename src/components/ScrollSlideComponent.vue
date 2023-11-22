<template>
  <div class="slide" v-if="data">
    <span class="slide__block-heading" v-if="data.subtitle">{{ data.title }}</span>
    <span class="slide__block-tool">{{ data.subtitle || data.title }}</span>
  </div>
</template>

<script>
export default {
  name: "ScrollSlideComponent",
  props: {
    data: Object,
  },
};
</script>

<style lang="stylus">
.slide {
  display: flex;
  flex-direction: column
  cursor pointer

  +below(1400px) {
    padding: 60px 80px;
  }

  +below(1100px) {
    padding: 30px 15px;
  }

  &__block {
    display: flex;
    // width: max-content;
    flex-shrink: 0;
    flex-direction: column;

    &-heading {
      font-weight: 400;
      font-size: 1.25rem;
      line-height: 24px;
      color: var(--gray-2);

      +below(1100px) {
        font-size: 1rem;
      }
    }

    &-tool {
      width: max-content;
      font-weight: 400;
      font-size: 2.5rem;
      line-height: 47px;
      color: var(--gray-2);

      +below(1100px) {
        font-size: 1.875rem;
        // width: max-content;
      }
    }
  }
}
</style>
