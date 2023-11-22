<template>
  <article class="project-page-about" v-if="data && data.about">
    <h2 class="project-page-title">О проекте</h2>
    <EditorJSArticleComponent :text="about" class="project-page-about__description" />
  </article>
</template>

<script>
import EditorJSArticleComponent from "components/EditorJSArticleComponent.vue";

export default {
  name: "ProjectPageAbout",
  computed: {
    data() {
      return this.$store.state.project_page;
    },
    about() {
      if (this.data && this.data.about) {
        try {
          return JSON.parse(this.data.about);
        } catch (e) {
          return this.data.about;
        }
      }
      return "";
    },
  },
  components: { EditorJSArticleComponent },
};
</script>

<style lang="stylus">
.project-page-about {
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
