<template>
  <article class="project-page-task project-page-tech" v-if="data && data.optimal_technologies">
    <h2 class="project-page-title">Выбор оптимальных технологий</h2>
    <!--    <p class="project-page-task__text">-->
    <!--      {{ data.optimal_technologies }}-->
    <!--    </p>-->
    <EditorJSArticleComponent :text="optimal_technologies" class="project-page-task__text" />
  </article>
</template>

<script>
import EditorJSArticleComponent from "components/EditorJSArticleComponent.vue";

export default {
  name: "ProjectPageTechChoice",
  components: { EditorJSArticleComponent },
  computed: {
    data() {
      return this.$store.state.project_page;
    },
    optimal_technologies() {
      if (this.data && this.data.optimal_technologies) {
        try {
          return JSON.parse(this.data.optimal_technologies);
        } catch (e) {
          return this.data.optimal_technologies;
        }
      }
      return "";
    },
  },
};
</script>

<style lang="stylus">
.project-page-tech {
  margin 0 -100px
  background var(--gray-1)
  padding 60px 100px
  +below(1400px) {
    margin 0 -80px
    padding: 60px 80px;
  }

  +below(1100px) {
    margin 0 -15px
    padding: 60px 15px;
  }

  .project-page-task__text {
    color var(--gray-5)
  }
}
</style>
