<template>
  <div
    class="mockup"
    :class="{
      'mockup--phone': device === 'phone',
      'mockup--pc': device === 'pc',
    }"
  >
    <div class="mockup__image">
      <ImageComponent :head_img="data" title="Макет" quality="50" />
    </div>
  </div>
</template>

<script>
import ImageComponent from "components/ImageComponent.vue";

export default {
  components: { ImageComponent },
  props: {
    data: Object,
    device: {
      type: String,
      default: "phone",
    },
  },
};
</script>

<style lang="stylus">
.mockup {
  background-size 100%
  background-repeat no-repeat

  &--phone {
    height 451px
    width 222px
    background-image url("/static/images/iphone.png")
  }

  &--pc {
    height 440px
    width 720px
    background-image url("/static/images/macbook.png")
  }

  &__image {
    width 100%
    height 100%
    overflow-y auto
    scrollbar-width: none;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;

    ^[0]--phone & {
      clip-path: inset(10px round 25px);

      img {
        padding 10px
      }
    }

    ^[0]--pc & {
      clip-path: inset(14px 72px 53px round 10px 10px 0px 0px);

      img {
        padding 14px 73px 53px
      }
    }

    &::-webkit-scrollbar {
      display: none;
    }

    img {
      width 100%
    }
  }
}
</style>
