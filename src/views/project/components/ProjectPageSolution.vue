<template>
  <article class="project-page-solution" v-if="data && data.solution_title">
    <h2 class="project-page-title">Решение</h2>
    <span class="project-page-title project-page-title--blue" v-if="data.solution_title">
      {{ data.solution_title }}
    </span>
    <!--    <p class="project-page-solution__text" v-if="data.solution_description">-->
    <!--      {{ data.solution_description }}-->
    <!--    </p>-->
    <EditorJSArticleComponent :text="solution_description" class="project-page-solution__text" />
    <a
      :href="data.solution_url"
      v-if="data.solution_url"
      target="_blank"
      class="project-page-solution__link"
      rel="nofollow"
    >
      {{ data.solution_url }}
    </a>
  </article>
</template>

<script>
import EditorJSArticleComponent from "components/EditorJSArticleComponent.vue";

export default {
  name: "ProjectPageSolution",
  components: { EditorJSArticleComponent },
  computed: {
    data() {
      return this.$store.state.project_page;
    },
    solution_description() {
      if (this.data && this.data.solution_description) {
        try {
          return JSON.parse(this.data.solution_description);
        } catch (e) {
          return this.data.solution_description;
        }
      }
      return "";
    },
  },
};
</script>

<style lang="stylus">
.project-page-solution {
  display flex
  flex-direction column
  align-items flex-start
  justify-content flex-start
  background var(--gray-1)
  margin 0 -100px
  padding 60px 100px
  +below(1400px) {
    margin 0 -80px
    padding: 32px 80px;
  }

  +below(1220px) {
    padding: 60px 80px;
  }

  +below(1100px) {
    margin 0 -15px
    padding: 60px 15px;
  }

  &__text {
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 28px;
    color: var(--gray-5);

    +below(1220px) {
      font-size: 1.375rem
      line-height: 26px;
    }

    +below(900px) {
      font-size: 1rem
      line-height: 19px;
    }
  }

  &__link {
    background: var(--white);
    border-radius: 10px;
    height 24px
    display inline-flex
    align-items center
    justify-content center
    padding 0 16px
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 16px;
    color: var(--red);
    margin-top 32px
  }
}
</style>
