<template>
  <div>
    <div class="service-info">
      <h2>{{ services.title }}</h2>
      <EditorJSArticleComponent :text="description" class="service-info__description" />
    </div>
    <!--    <OurDestinationsComponent :data="scrollSlides" />-->
    <div class="tab-component__content-projects" v-if="projects.length">
      <h2>Проекты в этой услуге</h2>
      <div class="tab-component__content-projects_blocks">
        <ProjectCardComponent v-for="(item, i) in projects" :key="i" :data="item" />
      </div>
    </div>
  </div>
</template>

<script>
import SliderComponent from "components/SliderComponent.vue";
import BlockComponent from "components/BlockComponent.vue";
// import ScrollSlideComponent from "components/ScrollSlideComponent.vue";
import ProjectCardComponent from "components/ProjectCardComponent.vue";
import OurDestinationsComponent from "components/OurDestinationsComponent.vue";
import EditorJSArticleComponent from "components/EditorJSArticleComponent.vue";
export default {
  components: {
    EditorJSArticleComponent,
    OurDestinationsComponent,
    SliderComponent,
    BlockComponent,
    // ScrollSlideComponent,
    ProjectCardComponent,
  },
  props: {
    services: Object,
  },

  computed: {
    projects() {
      return this.$store.state.service_page.projects.filter((item) =>
        item.services.map((s) => s.id).includes(this.services.id)
      );
    },
    description() {
      if (this.services && this.services.text) {
        try {
          return JSON.parse(this.services.text);
        } catch (e) {
          return this.services.text;
        }
      }
      return "";
    },
  },
  data() {
    return {
      CreateSliderOptions: {
        slidesPerView: 4,
        spaceBetween: 60,
        pagination: false,
        clickable: false,
        preloadImages: true,
        loop: true,
        autoplay: {
          delay: 400,
          disableOnInteraction: true,
        },
        speed: 5000,
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
            slidesPerView: 3,
            spaceBetween: 30,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      },
      ToolsSliderOptions: {
        slidesPerView: 4,
        spaceBetween: 160,
        pagination: false,
        clickable: false,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        speed: 2000,
        preloadImages: true,
        loop: true,
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
        { title: "Frontend", subtitle: "VUE.JS /" },
        { title: "Backend", subtitle: "LARAVEL" },
        { title: "Язык запросов", subtitle: "GRAPHQL" },
        { title: "Мобильные приложения", subtitle: "FLUTTER" },
      ],
      scrollSlides: [
        { title: "Общепит", subtitle: "FOOD TECH" },
        { title: "Образование", subtitle: "ED TECH" },
        { title: "Логистика", subtitle: "LOGISTIX TECH" },
        { title: "Юриспруденция", subtitle: "LEGAL TECH" },
        { title: "Умный дом", subtitle: "HOME TECH" },
      ],
    };
  },
};
</script>

<style lang="stylus">
.service-info {
  padding: 60px 100px 32px ;

  +below(1400px) {
    padding: 60px 80px 0;
  }

  +below(1100px) {
    padding: 60px 15px 0;
  }

  & h2 {
    font-weight: 600;
    font-size: 2rem;
    line-height: 35px;
    padding-bottom: 30px;
    color: var(--blue);

    +below(1100px) {
      font-size: 1.875rem;
      line-height: 35px;
    }

    +below(580px) {
      font-size: 1.725rem;
      line-height: 35px;
    }
  }

  &__description {
    padding-top: 24px

    +below(1220px) {
      font-size: 1.375rem
      line-height: 26px;
    }

    +below(900px) {
      font-size: 1rem
      line-height: 19px;
      padding-top: 0
    }

    & li {
      margin: 12px 0
    }
  }
}
</style>
