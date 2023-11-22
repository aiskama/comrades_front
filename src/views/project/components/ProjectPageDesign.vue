<template>
  <article class="project-page-design" v-if="data && data.description">
    <h2 class="project-page-title">Дизайн</h2>
    <EditorJSArticleComponent :text="description" class="project-page-design__description" />
  </article>
</template>

<script>
import EditorJSArticleComponent from "components/EditorJSArticleComponent.vue";

export default {
  name: "ProjectPageDesign",
  computed: {
    data() {
      return this.$store.state.project_page;
    },
    description() {
      if (this.data && this.data.description) {
        try {
          return JSON.parse(this.data.description);
        } catch (e) {
          return this.data.description;
        }
      }
      return "";
    },
  },
  components: { EditorJSArticleComponent },
};
</script>

<style lang="stylus">
.project-page-design {
  display: flex;
  gap 30px
  flex-direction: column;

  &__description {

    +below(1220px) {
      font-size: 1.375rem
      line-height: 26px;
    }

    +below(900px) {
      font-size: 1rem
      line-height: 19px;
    }
  }
}
</style>
