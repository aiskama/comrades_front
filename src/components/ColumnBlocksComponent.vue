<template>
  <div class="column-blocks">
    <div v-for="(item, i) in data" :key="i" class="column-blocks__item">
      <span class="column-blocks__value">{{ item.title }}</span>
      <span class="column-blocks__title">{{ item.description }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColumnBlocksComponent",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="stylus">
.column-blocks {
  width 100%
  //display grid
  //grid-template-columns repeat(4, 1fr)
  padding: 60px 100px;
  display flex
  justify-content space-between
  background var(--gray-1)

  +below(1100px) {
    padding: 60px 15px;
  }

  +below(920px) {
    display grid
    grid-template-columns repeat(2, 1fr)
    gap 30px

    +below(350px) {
      grid-template-columns 1fr
    }
  }

  &__item {
    display flex
    flex-direction column
    gap 10px
    align-items flex-start
  }

  &__value {
    color: var(--blue);
    font-size: 3.75rem
    font-weight: 600;
    line-height: normal;

    +below(920px) {
      font-size: 2.75rem
    }
  }

  &__title {
    color: rgba(19, 47, 99, 0.70);
    //text-align: center;
    font-size: 1.45rem
    font-weight: 500;
    line-height: normal;
    max-width 220px

    +below(920px) {
      font-size: 1.25rem
    }

    +below(350px) {
      width 100%
    }
  }
}
</style>
