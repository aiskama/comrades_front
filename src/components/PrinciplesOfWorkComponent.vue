<template>
  <div class="principles-work" :class="{ 'principles-work__white': whiteBg }">
    <h2 class="principles-work__title">Принципы работы</h2>
    <div class="principles-work__body">
      <BlockComponent v-for="(item, i) in data" :key="i" :data="item" />
    </div>
  </div>
</template>

<script>
import BlockComponent from "components/BlockComponent.vue";

export default {
  name: "PrinciplesOfWorkComponent",
  components: { BlockComponent },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    whiteBg: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus">
.principles-work {
  padding: 60px 100px
  //background var(--gray-1)
  background var(--gray-1)
  display flex
  flex-direction column

  &__white {
    background var(--white)
  }

  +below(1400px) {
    padding: 60px 80px;
  }

  +below(1100px) {
    padding: 30px 15px;
  }

  &__body {
    display flex
    justify-content space-between
    gap 50px

    +below(1100px) {
      font-size: 1.25rem;
    }

    +below(780px) {
      flex-direction column
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
