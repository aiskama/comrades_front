<template>
  <div class="block" v-if="data">
    <!-- <img :src="data.icon" :alt="data.title" class="block__img" /> -->
    <figure class="block__img" v-html="data.logo" v-if="data.logo" />
    <figure class="block__img" v-html="data.icon" v-if="data.icon" />
    <span v-if="data.position" class="block__position">{{ data.position }}</span>
    <span class="block__title">{{ data.title }}</span>
    <ul>
      <li class="block__description">
        {{ data.description }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BlockComponent",

  props: {
    data: Object,
  },
  data() {
    return {};
  },
};
</script>

<style lang="stylus">
.block {
  display: flex;
  flex-direction: column;
  cursor pointer

  ul {
    grid-gap: 5px;
    display: grid;
  }

  +below(1400px) {
    width: 100%;
  }

  &__img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }

  &__position {
    background: var(--blue);
    border-radius: 10px;
    width: 40px;
    height: 40px;
    padding: 7px;
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 28px;
    color: var(--white);
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

  &__title {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 28px;
    padding: 30px 0 15px 0;
    color: var(--blue);
    width: 100%;

    +below(1400px) {
      font-size: 1.375rem;
    }

    +below(1100px) {
      font-size: 1.25rem;
    }
  }
}
</style>
