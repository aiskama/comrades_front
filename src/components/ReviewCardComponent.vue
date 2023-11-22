<template>
  <div class="review-card">
    <template v-if="data.logo_image">
      <ImageComponent :head_img="data.logo_image" class="review-card__logo" />
    </template>
    <span class="review-card__about">{{ data.description }}</span>
    <div class="review-card__author">
      <ImageComponent
        v-if="data.img"
        :head_img="data.img"
        width="320"
        height="320"
        class="review-card__img"
      />
      <div class="review-card__author-wrapper">
        <span class="review-card__fio">{{ data.title }}</span>
        <span class="review-card__post">{{ data.post }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ImageComponent from "components/ImageComponent.vue";

export default {
  name: "ReviewCardComponent",
  components: { ImageComponent },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="stylus">
.review-card {
  padding: 32px 40px
  display flex
  flex-direction column
  gap 24px
  font-size: 1rem
  line-height: 22px;
  background var(--gray-1)
  color var(--black)
  border-radius: 24px;
  break-inside avoid-column
  justify-content center

  +below(1024px) {
    &:nth-child(odd) {
      background var(--blue)
      color var(--white)
    }
  }

  +below(768px) {
    padding: 24px 16px
  }

  &:first-child {
    background var(--blue)
    color var(--white)
  }

  &__about {
    //font-size: 1rem
    //line-height: 22px;
  }

  &__author {
    display flex
    gap 24px
    align-items center

    &-wrapper {
      display flex
      flex-direction column
    }
  }

  &__fio {
    margin-bottom: 4px
    font-weight 500
  }

  &__img {
    border-radius: 50%;
    height: 60px;
    width: 60px;
    box-shadow: 0 0 4px rgba(0,0,0,0.1);
    object-position top
  }

  &__logo {
    max-width 150px
    height: 40px;
    object-fit: contain;
    align-self flex-start
  }
  //
  //&__post {
  //  font-size: 16px;
  //  line-height: 22px;
  //}
}
</style>
