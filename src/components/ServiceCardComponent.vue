<template>
  <router-link :to="{ name: 'service-item', params: { id: data.id } }" class="service-card">
    <div class="service-card__header">
      <figure class="service-card__img" v-html="data.icon" v-if="data.icon" />
      <div class="service-card__title">{{ data.title }}</div>
    </div>
    <div class="service-card__description">{{ data.description }}</div>
  </router-link>
</template>

<script>
export default {
  name: "ServiceCardComponent",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="stylus">
.service-card {
  display flex
  flex-direction column
  gap 16px
  padding: 30px
  background: var(--white);
  border-radius: 10px;
  transition: var(--transition);
  border: 1px solid transparent;

  &:hover {
    border-color rgba(0, 0, 0, 0.1)
    transform: scale(1.001);
  }

  &:active {
    transform: scale(0.99);
  }

  &__img {
    & svg {
      width 32px
      height 32px
    }
  }

  &__header {
    display flex
    gap 10px
    align-content center
  }

  &__title {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 32px;
    color: var(--blue);
    width: 100%;

    +below(1400px) {
      font-size: 1.375rem;
    }

    +below(1100px) {
      font-size: 1.25rem;
    }
  }

  &__description {
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 24px;
    color: var(--gray-3);
    list-style-type: none;

    +below(1400px) {
      font-size: 1.125rem;
    }
  }
}
</style>
