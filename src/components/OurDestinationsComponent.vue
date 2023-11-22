<template>
  <div class="our-destinations">
    <h2 class="our-destinations__title">Направления</h2>
    <div class="our-destinations__body">
      <div v-for="(item, i) in data" :key="i" class="our-destinations__block">
        <span class="our-destinations__block-heading" v-if="item.subtitle">{{ item.title }}</span>
        <span class="our-destinations__block-tool">{{ item.subtitle || item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OurDestinationsComponent",
  props: {
    data: Array,
  },
};
</script>

<style lang="stylus">
.our-destinations {
  padding: 60px 100px
  background var(--gray-1)
  display flex
  flex-direction column

  +below(1400px) {
    padding: 60px 80px;
  }

  +below(1180px) {
    padding: 30px 15px 60px;
  }

  &__body {
    display flex
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  &__block {
    display: flex;
    // width: max-content;
    flex-direction: column;
    border-radius: 15px;
    background: var(--white);
    box-shadow: 0 13px 21px 0 rgba(182, 182, 182, 0.16);
    width: 100%;
    padding: 30px 0 22px 30px;
    max-width: calc(33% - 10px)
    color #A9AAAC

    +below(1030px) {
      max-width: calc(50% - 10px)
    }

    +below(860px) {
      padding: 30px 0 22px 20px;
    }

    +below(728px) {
      max-width: 100%
    }

    &:nth-child(2) {
      background: var(--blue)
      color var(--gray-2)
    }

    &:nth-child(5) {
      background: var(--red)
      color var(--gray-2)
    }


    &-heading {
      font-weight: 400;
      font-size: 1rem;
      line-height: 24px;
      //color: var(--gray-2);

      +below(1180px) {
        font-size: 1rem;
      }
    }

    &-tool {
      width: max-content;
      font-weight: 400;
      font-size: 1.875rem;
      line-height: 38px;
      //color: var(--gray-2);

      +below(1180px) {
        font-size: 1.875rem;
        // width: max-content;
      }
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
