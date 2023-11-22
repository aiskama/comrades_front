<template>
  <section class="service-item-content">
    <EditorJSArticleComponent :text="description" class="service-item-content__description" />
    <ServiceStagesWorkComponent :data="data.service_contents" />
    <div v-if="projects.length" class="service-item-content__projects">
      <h2>Проекты в этой услуге</h2>
      <div class="service-item-content__projects-blocks">
        <ProjectCardComponent v-for="(item, i) in projects" :key="i" :data="item" />
      </div>
    </div>
  </section>
</template>

<script>
import EditorJSArticleComponent from "components/EditorJSArticleComponent.vue";
import ProjectCardComponent from "components/ProjectCardComponent.vue";
import ServiceStagesWorkComponent from "./ServiceStagesWorkComponent.vue";

export default {
  name: "ServiceItemContentComponent",
  components: { ServiceStagesWorkComponent, ProjectCardComponent, EditorJSArticleComponent },
  computed: {
    data() {
      return this.$store.state.services_item_page.service_item;
    },
    projects() {
      return this.$store.state.services_item_page.projects;
    },
    description() {
      if (this.data && this.data.text) {
        try {
          return JSON.parse(this.data.text);
        } catch (e) {
          return this.data.text;
        }
      }
      return "";
    },
  },
};
</script>

<style lang="stylus">
.service-item-content {
  display: flex;
  flex-direction: column;
  padding: 60px 100px;
  gap 40px
  width: 100%;
  +below(1400px) {
    padding: 32px 80px 15px;
  }
  +below(1100px) {
    padding: 32px 15px 60px;
  }

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

  &__projects {
    padding-top 40px

    +below(900px) {
      padding-top: 0
    }

    h2 {
      font-weight: 500;
      font-size: 1.875rem;
      line-height: 35px;
      color: var(--blue-o5);

      +below(1100px) {
        font-size: 1.25rem;
      }
    }

    &-blocks {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding-top: 32px;
      grid-gap: 60px;

      +below(1800px) {
        grid-template-columns: 1fr 1fr;
      }

      +below(1400px) {
        grid-gap: 32px;
      }

      +below(1100px) {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
