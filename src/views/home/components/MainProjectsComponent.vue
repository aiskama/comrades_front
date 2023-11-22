<template>
  <section v-if="projects.length" class="our_projects">
    <h2 class="our_projects__title">Наши проекты</h2>
    <div class="our_projects__projects">
      <ProjectCardComponent v-for="(project, i) in projects" :key="i" :data="project" />
    </div>
  </section>
</template>

<script>
import ProjectCardComponent from "components/ProjectCardComponent.vue";

export default {
  name: "MainProjectsComponent",

  props: {
    projects: Array,
  },
  components: { ProjectCardComponent },
};
</script>

<style lang="stylus">
.our_projects {
  display: flex;
  flex-direction: column;

  &__title {
    padding: 60px 100px 0 100px
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 35px;
    color: var(--blue)
    +below(1400px) {
      padding: 60px 80px 0 80px;
    }
    +below(1100px) {
      font-size: 1.25rem;
    }

    +below(1100px) {
      padding: 30px 15px 0 15px;
    }
  }

  &__projects {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 60px 100px 60px 100px;
    grid-gap: 30px;

    +below(1640px) {
      grid-template-columns: repeat(2, 1fr);
    }

    +below(1400px) {
      padding: 60px 80px 60px 80px;
    }

    +below(1100px) {
      padding: 30px 15px 30px 15px;
    }

    +below(786px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
