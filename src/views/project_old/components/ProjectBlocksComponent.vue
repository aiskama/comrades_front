<template>
  <div class="project_solution" v-if="projectItem.blocks">
    <div class="project_solution__title">Этапы работы</div>
    <div class="project_solution__blocks">
      <BlockComponent v-for="(item, i) in projectItem.blocks" :key="i" :data="item" />
    </div>
    <div class="project_solution__tag">
      <span>{{ projectItem.title }}</span>
    </div>
  </div>
</template>

<script>
import BlockComponent from "components/BlockComponent.vue";
export default {
  components: { BlockComponent },
  data() {
    return {};
  },
  computed: {
    projectItem() {
      return this.$store.state.projects.find((item) => item.id === this.$route.params.id);
    },
  },
};
</script>

<style lang="stylus">
.project_solution {
  display: flex;
  flex-direction: column;
  background-color: var(--gray-1);
  padding: 60px 100px;

  +below(1400px) {
    padding: 30px 0 60px 80px;
  }

  +below(1100px) {
    padding: 30px 15px 60px 15px;
  }

  &__title {
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 35px;
    color: var(--blue-o5);

    +below(1100px) {
      font-size: 1.25rem;
    }
  }

  .block__title {
    font-size: 1.875rem;

    +below(1400px) {
      font-size: 1.625rem;

      +below(1100px) {
        font-size: 1.25rem;
      }
    }
  }

  .block__description {
    font-size: 1.25rem;

    +below(1400px) {
      font-size: 1.125rem;
    }

    +below(1100px) {
      font-size: 1rem;
    }
  }

  &__blocks {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding-top: 60px;
    // padding: 60px 100px 0 100px;
    grid-gap: 60px;

    +below(1800px) {
      grid-template-columns: 1fr  1fr;
    }

    +below(1400px) {
      // padding: 60px 80px 0 80px;
    }

    +below(1100px) {
      // padding: 30px 15px 0 15px;
      grid-template-columns: 1fr
    }
  }

  &__tag {
    padding-top: 30px;

    span {
      background: var(--white);
      border-radius: 10px;
      font-weight: 400;
      font-size: 0.58rem;
      padding: 4px 16px;
      color: var(--red);
    }
  }
}
</style>
