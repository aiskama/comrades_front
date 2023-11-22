<template>
  <div class="our-services">
    <h2 class="our-services__title">Наши услуги</h2>
    <div class="our-services__list">
      <ServiceCardComponent v-for="(item, i) in services" :key="i" :data="item" />
    </div>
  </div>
</template>

<script>
import ServiceCardComponent from "components/ServiceCardComponent.vue";

export default {
  name: "MainServicesComponent",
  components: { ServiceCardComponent },
  props: {
    services: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="stylus">
.our-services {
  width: 100%;
  padding: 60px 100px;
  background var(--gray-1)

  +below(1400px) {
    padding: 60px 80px;
  }

  +below(1100px) {
    padding: 30px 15px;
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

  &__list {
    display grid
    grid-template-columns repeat(3, 1fr)
    grid-gap 30px

    +below(1024px) {
      grid-template-columns repeat(2, 1fr)
    }

    +below(728px) {
      grid-template-columns repeat(1, 1fr)
    }
  }
}
</style>
