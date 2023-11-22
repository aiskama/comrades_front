<template>
  <main class="project">
    <ProjectDescriptionComponent :data="projectsItem" v-if="projectsItem" />
    <ProjectJsonComponent :data="projectsItem.info_site" v-if="projectsItem.info_site" />
    <SliderComponent
      v-if="projectsItem.technologies && projectsItem.technologies.length"
      :items="projectsItem.technologies"
      v-slot="{ item }"
      :slider-options="ToolsSliderOptions"
    >
      <ScrollSlideComponent :data="item" />
    </SliderComponent>
    <ProjectTab />
  </main>
</template>

<script>
import ProjectDescriptionComponent from "./components/ProjectDescriptionComponent.vue";
import SliderComponent from "components/SliderComponent.vue";
import ScrollSlideComponent from "components/ScrollSlideComponent.vue";
import ProjectTab from "./components/ProjectTab.vue";
import ProjectJsonComponent from "./components/ProjectJsonComponent.vue";
import PROJECT_PAGE from "@/graphql/queries/project_page.graphql";
// import ImageComponent from "components/ImageComponent.vue";
export default {
  name: "ProjectPage",
  async asyncData({ apollo, store, route }) {
    await apollo.defaultClient
      .query({
        query: PROJECT_PAGE,
        variables: {
          id: parseInt(route.params.id),
        },
      })
      .then(({ data }) => {
        store.state.project_page.projects_item = data.projects_item;
        store.state.projects = data.projects_paginate.data;
        store.state.services = data.services_paginate.data;
      });
  },

  computed: {
    projectsItem() {
      return this.$store.state.project_page.projects_item;
    },
  },
  components: {
    ProjectDescriptionComponent,
    SliderComponent,
    ScrollSlideComponent,
    ProjectJsonComponent,
    // ImageComponent,
    ProjectTab,
  },
  data() {
    return {
      ToolsSliderOptions: {
        slidesPerView: 4,
        spaceBetween: 160,
        pagination: false,
        clickable: false,
        preloadImages: true,
        loop: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        speed: 2000,
        breakpoints: {
          1550: {
            slidesPerView: 4,
            spaceBetween: 60,
          },
          1400: {
            slidesPerView: 3.5,
            spaceBetween: 40,
          },
          1100: {
            slidesPerView: 2.5,
            spaceBetween: 30,
          },
          400: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      },
      ToolsSlides: [
        { title: "Frontend", description: "VUE.JS /" },
        { title: "Backend", description: "LARAVEL" },
        { title: "Язык запросов", description: "GRAPHQL" },
        { title: "Мобильные приложения", description: "FLUTTER" },
      ],
    };
  },
};
</script>
