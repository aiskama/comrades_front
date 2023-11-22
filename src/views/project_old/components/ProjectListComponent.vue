<template>
  <div class="project_task" v-if="data">
    <div class="project_task__title">{{ data.title }}</div>
    <img :src="data.image" :alt="data.title" v-if="data.image" />

    <div class="project_task__subtitle">
      <span v-for="(item, i) in data.items" :key="i">{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>

<style lang="stylus">
.project_task {
  display: flex;
  flex-direction: column;
  padding: 60px 100px;

  +below(1400px) {
    padding: 30px 0 60px 80px;
  }

  +below(1100px) {
    padding: 30px 15px 60px 15px;
  }

  img{
    max-width: 450px;
    object-fit: cover;
  }

  &__title {
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 35px;
    padding-bottom: 30px;
    color: var(--blue-o5);

    +below(1100px) {
      font-size: 1.25rem;
    }
  }

  &__subtitle {
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 28px;
    color: var(--blue);
    display: grid;
    grid-template-columns: 1fr ;
    column-gap: 70px;
    row-gap: 15px;

    +below(1400px) {
      font-size: 1.375rem;
    }
    +below(1100px) {
      font-size: 1rem;
    }
  }
}
</style>
