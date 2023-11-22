<template>
  <article class="project-page-task" v-if="data && data.tasks">
    <h2 class="project-page-title">Задача</h2>
    <!--    <p class="project-page-task__text">-->
    <!--      {{ data.tasks }}-->
    <!--    </p>-->
    <EditorJSArticleComponent :text="tasks" class="project-page-task__text" />
  </article>
</template>

<script>
import EditorJSArticleComponent from "components/EditorJSArticleComponent.vue";

export default {
  components: { EditorJSArticleComponent },
  name: "ProjectPageTask",
  computed: {
    data() {
      return this.$store.state.project_page;
    },
    tasks() {
      if (this.data && this.data.tasks) {
        try {
          return JSON.parse(this.data.tasks);
        } catch (e) {
          return this.data.tasks;
        }
      }
      return "";
    },
  },
};
</script>

<style lang="stylus">
.project-page-task {
  display: flex;
  flex-direction: column;
  gap 32px

  &__text {
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 28px;
    color: var(--blue);
    word-break break-word

    & p {
      column-count 2
      column-gap 60px

      +below(970px) {
        column-count 1
      }
    }

    +below(1220px) {
      font-size 1.375rem
      line-height: 26px
      column-gap 32px
    }

    +below(900px) {
      font-size 1rem
      line-height: 19px;
    }
  }
}
</style>
