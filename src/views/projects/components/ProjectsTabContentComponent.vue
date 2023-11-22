<template>
  <div class="projects-tab-content">
    <div class="projects-tab-content__content">
      <div v-if="data.length" class="projects-tab-content__cards">
        <ProjectCardComponent v-for="(project, i) in data" :key="i" :data="project" />
      </div>
    </div>
  </div>
</template>

<script>
import ProjectCardComponent from "components/ProjectCardComponent.vue";

export default {
  name: "ProjectsTabContentComponent",
  props: {
    data: Array,
  },
  components: { ProjectCardComponent },
};
</script>

<style lang="stylus">
.projects-tab-content {
  display: flex;
  flex-direction: column;

  &__cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 32px 0 0;
    grid-gap: 60px;

    +below(1640px) {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 30px;
    }

    +below(1100px) {
      grid-template-columns: 1fr;
      grid-gap: 16px;
      padding: 16px 0 0;
    }
  }
}
</style>
