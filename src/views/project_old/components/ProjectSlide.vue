<template>
  <div class="phone-slide">
    <ImageComponent :head_img="data" width="800" height="800" />
  </div>
</template>

<script>
import ImageComponent from "components/ImageComponent.vue";
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    ImageComponent,
  },
};
</script>

<style lang="stylus">
.phone-slide {
  width 100%
  height 100%
  img {
    width 100%
    height 100%
    max-height 2000px
    object-fit contain
  }
}
</style>
