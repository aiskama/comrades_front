<template>
  <section class="staff">
    <span class="staff__title">{{ data.info_employees }}</span>
    <span class="staff__subtitle">{{ data.description }}</span>
  </section>
</template>

<script>
export default {
  name: "AboutStaffComponent",
  props: {
    data: Object,
  },
};
</script>

<style lang="stylus">
.staff {
  display: flex;
  flex-direction: column;
  padding: 60px 100px 30px;

  +below(1400px) {
    padding: 60px 80px 30px;
  }

  +below(1100px) {
    padding: 30px 15px 15px;
  }

  &__title {
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 35px;
    padding-bottom: 32px;
    color: var(--blue);

    +below(1400px) {
      font-size: 1.625rem;
    }

    +below(1100px) {
      font-size: 1.25rem;
      line-height: 25px;
    }
  }

  &__subtitle {
    display: block;
    column-count 2
    column-gap 60px
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 24px;
    color: var(--gray-5);

    +below(1100px) {
      font-size: 1rem;
      line-height: 20px;
      column-count 1
    }
  }
}
</style>
