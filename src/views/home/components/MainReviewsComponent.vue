<template>
  <div class="reviews">
    <h2 class="reviews__title">Клиенты о нас</h2>
    <div class="reviews__body">
      <ReviewCardComponent
        v-for="(item, i) in data"
        :key="i"
        :data="item"
        :class="{ 'blue-bg': setFill(i + 1) }"
      />
    </div>
  </div>
</template>

<script>
import ReviewCardComponent from "components/ReviewCardComponent.vue";

export default {
  name: "MainReviewsComponent",
  components: { ReviewCardComponent },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    setFill(i) {
      return i % 4 === 0 || i % 4 === 1;
    },
  },
};
</script>

<style lang="stylus">
.blue-bg {
  background var(--blue)
  color var(--white)

  +below(1024px) {
    background var(--gray-1)
    color var(--blue)
  }
}
.reviews {
  padding: 60px 100px
  //background var(--gray-1)
  background var(--white)
  display flex
  flex-direction column

  +below(1400px) {
    padding: 60px 80px;
  }

  +below(1100px) {
    padding: 30px 15px;
  }

  &__body {
    display grid
    grid-template-columns 1fr 1fr
    grid-gap 48px

    +below(1024px) {
      display flex
      flex-direction column
      grid-gap 32px
    }
  }

  &__title {
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 35px;
    padding-bottom: 30px;
    color: var(--blue);

    +below(1100px) {
      font-size: 1.25rem;
    }
  }
}
</style>
