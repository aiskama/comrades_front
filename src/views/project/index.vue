<template>
  <main class="project-page">
    <ProjectPageDescription />
    <ProjectPageAbout />
    <ProjectPageTask />
    <ProjectPageSolution />
    <SliderComponent
      v-if="toolsSlides && toolsSlides.length"
      :items="toolsSlides"
      title="Технологии"
      v-slot="{ item }"
      :slider-options="toolsSliderOptions"
      hide-arrows
    >
      <ScrollSlideComponent :data="item" />
    </SliderComponent>
    <ProjectPageDesign />
    <ProjectPagePalette />
    <ProjectPageTechChoice />
    <ProjectPageAdaptation />
    <ProjectPageResult />
  </main>
</template>

<script>
import ProjectPageDescription from "./components/ProjectPageDescription.vue";
import SliderComponent from "components/SliderComponent.vue";
import ScrollSlideComponent from "components/ScrollSlideComponent.vue";
import ProjectPageTask from "./components/ProjectPageTask.vue";
import ProjectPageSolution from "./components/ProjectPageSolution.vue";
import ProjectPageDesign from "./components/ProjectPageDesign.vue";
import ProjectPagePalette from "./components/ProjectPagePalette.vue";
import ProjectPageTechChoice from "./components/ProjectPageTechChoice.vue";
import ProjectPageAdaptation from "./components/ProjectPageAdaptation.vue";
import ProjectPageResult from "./components/ProjectPageResult.vue";
import PROJECT_PAGE from "@/graphql/queries/project_page.graphql";
import ProjectPageAbout from "./components/ProjectPageAbout.vue";

export default {
  name: "ProjectPage",
  async asyncData({ apollo, store, route, res }) {
    let id = route.params.id;
    if (!id) {
      res.status(404);
      return;
    }
    await apollo.defaultClient
      .query({
        query: PROJECT_PAGE,
        variables: { id: parseInt(id) },
      })
      .then(({ data }) => {
        if (data && data.projects_item) {
          store.state.project_page = data.projects_item;
        } else {
          res.status(404);
        }
      })
      .catch(() => {});
  },
  data: () => ({
    toolsSliderOptions: {
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
  }),
  computed: {
    data() {
      return this.$store.state.project_page;
    },
    toolsSlides() {
      if (this.data && this.data.technologies.length) {
        return this.data.technologies;
      }
      return [];
    },
  },
  metaInfo() {
    if (!this.data) {
      return {};
    }
    let image = this.$store.state._env.MEDIA_ENDPOINT + this.data.img.path;
    return {
      title: this.data.title,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: this.data.description,
        },
        {
          vmid: "og:title",
          name: "og:title",
          content: this.data.title,
        },
        {
          vmid: "og:image",
          name: "og:image",
          content: image,
        },
        {
          vmid: "og:description",
          name: "og:description",
          content: this.data.description,
        },
      ],
    };
  },
  components: {
    ProjectPageAbout,
    ProjectPageResult,
    ProjectPageAdaptation,
    ProjectPageTechChoice,
    ProjectPagePalette,
    ProjectPageDesign,
    ProjectPageSolution,
    ProjectPageTask,
    ScrollSlideComponent,
    SliderComponent,
    ProjectPageDescription,
  },
};
</script>

<style lang="stylus">
.project-page {
  display flex
  flex-direction column
  gap 60px
  padding 0 100px
  margin-bottom 60px
  width 100%
  +below(1400px) {
    padding 0 80px
  }
  +below(1100px) {
    padding 0 15px
  }

  & > .slider {
    margin -60px -100px
    +below(1400px) {
      margin -60px -80px
    }
    +below(1100px) {
      margin -30px -15px
    }
  }
}

.project-page-title {
  font-weight: 400;
  font-size: 1.875rem;
  line-height: 35px;
  color: var(--blue-o5);
  word-break break-word

  +below(900px) {
    font-size: 1.25rem;
    line-height: 24px;
  }

  &--blue {
    color var(--blue)
    font-weight 500
    padding 60px 0 16px

    +below(1220px) {
      font-size 1.625rem
      padding 32px 0 16px
    }

    +below(700px) {
      font-size: 1.25rem
      line-height: 24px;
    }
  }

  &--small {
    font-size 1.5em
    line-height 28px
  }
}
</style>
