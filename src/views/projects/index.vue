<template>
  <main class="projects-page">
    <section class="projects-description">
      <BreadcrumbsComponent :links="breadcrumbs" />
      <h1 class="projects-description__title">Проекты</h1>
    </section>
    <!--    <ProjectsSlider />-->
    <ProjectsTabComponent />
  </main>
</template>

<script>
import PROJECTS_PAGE from "@/graphql/queries/projects_page.graphql";
import ProjectsTabComponent from "./components/ProjectsTabComponent.vue";
import BreadcrumbsComponent from "components/BreadcrumbsComponent.vue";
import ProjectsSlider from "components/ProjectsSlider.vue";

export default {
  name: "ProjectsPage",
  async asyncData({ apollo, store }) {
    await apollo.defaultClient
      .query({
        query: PROJECTS_PAGE,
      })
      .then(({ data }) => {
        store.state.projects_page.projects = data.projects;
        store.state.projects_page.tags = data.tags;
        store.state.projects_page.parent_categories = data.parent_categories;
        store.state.clients = data.clients;
      })
      .catch(() => {});
  },
  data: () => ({
    breadcrumbs: [
      {
        route: {
          name: "projects",
        },
        title: "Проекты",
      },
    ],
  }),
  computed: {
    projects() {
      return this.$store.state.projects_page.parent_categories.map((item) => item.projects);
    },
  },
  components: { ProjectsSlider, BreadcrumbsComponent, ProjectsTabComponent },
  metaInfo: {
    title: "Проекты",
  },
};
</script>

<style lang="stylus">
.projects-description {
  display: flex;
  flex-direction: column;
  padding: 32px 100px 60px;
  gap 60px
  background: var(--gray-1);
  width: 100%;
  +below(1400px) {
    padding: 32px 80px 15px;
  }
  +below(1100px) {
    padding: 32px 15px 15px;
  }

  &__title {
    font-weight: 500;
    font-size: 3.75rem;
    line-height: 71px;
    color: var(--blue);
    margin 0
    padding 0

    +below(1100px) {
      font-size 1.875rem
    }
  }
}
</style>
