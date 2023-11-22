<template>
  <main class="main">
    <MainOpportunitiesComponent />
    <ProjectsSlider />
    <ColumnBlocksComponent v-if="numbers.length === 4" :data="numbers" />
    <MainProjectsComponent :projects="projects" />
    <MainServicesComponent :services="services" />
    <PrinciplesOfWorkComponent :data="principleWorks" white-bg />
    <!--    <ListComponent :data="competences" />-->
    <!--    <RoadMapComponent />-->
    <MainReviewsComponent v-if="reviews.length" :data="reviews" />
    <OurDestinationsComponent :data="scrollSlides" />
    <SliderComponent
      :items="citySlides"
      v-slot="{ item }"
      :slider-options="citySliderOptions"
      class="scroll-slider"
    >
      <ScrollSlideComponent :data="item" />
    </SliderComponent>
  </main>
</template>

<script>
// import ListComponent from "@/components/ListComponent.vue";
import MainOpportunitiesComponent from "./components/MainOpportunitiesComponent.vue";
import MainProjectsComponent from "./components/MainProjectsComponent.vue";
import SliderComponent from "@/components/SliderComponent.vue";
import ScrollSlideComponent from "@/components/ScrollSlideComponent.vue";
import HOME_PAGE from "@/graphql/queries/home_page.graphql";
import HOME_PAGE_DEFAULT from "@/graphql/queries/home_page_default.graphql";
import ProjectsSlider from "components/ProjectsSlider.vue";
import ColumnBlocksComponent from "components/ColumnBlocksComponent.vue";
import PrinciplesOfWorkComponent from "components/PrinciplesOfWorkComponent.vue";
import MainServicesComponent from "./components/MainServicesComponent.vue";
import OurDestinationsComponent from "components/OurDestinationsComponent.vue";
import MainReviewsComponent from "./components/MainReviewsComponent.vue";
// import RoadMapComponent from "components/RoadMapComponent.vue";

export default {
  name: "MainPage",
  async asyncData({ apollo, store }) {
    await apollo.defaultClient
      .query({
        query: HOME_PAGE,
      })
      .then(({ data }) => {
        store.state.home_page.companyinfo = data.companyinfo;
        store.state.home_page.projects = data.projects_paginate.data;
        store.state.clients = data.clients;
      })
      .catch(() => {});
  },
  mounted() {
    this.get();
  },
  methods: {
    async get() {
      await this.$apollo.provider.defaultClient
        .query({
          query: HOME_PAGE_DEFAULT,
        })
        .then(({ data }) => {
          this.$store.state.home_page.services = data.services;
          this.$store.state.home_page.principle_works = data.principle_works;
          this.$store.state.home_page.competences = data.competences;
          this.$store.state.home_page.reviews = data.reviews;
        });
    },
  },
  computed: {
    services() {
      return this.$store.state.home_page.services;
    },
    principleWorks() {
      return this.$store.state.home_page.principle_works;
    },
    projects() {
      return this.$store.state.home_page.projects || [];
    },
    competences() {
      return this.$store.state.home_page.competences;
    },
    reviews() {
      return this.$store.state.home_page.reviews;
    },
    numbers() {
      return this.$store.state.home_page.companyinfo.numbers;
    },
  },
  components: {
    // RoadMapComponent,
    MainReviewsComponent,
    OurDestinationsComponent,
    MainServicesComponent,
    PrinciplesOfWorkComponent,
    ColumnBlocksComponent,
    ProjectsSlider,
    MainProjectsComponent,
    MainOpportunitiesComponent,
    SliderComponent,
    ScrollSlideComponent,
  },

  data() {
    return {
      scrollSliderOptions: {
        slidesPerView: 4.5,
        spaceBetween: 90,
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
            slidesPerView: 3,
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
      scrollSlides: [
        { title: "Общепит", subtitle: "FOOD TECH" },
        { title: "Образование", subtitle: "ED TECH" },
        { title: "Логистика", subtitle: "LOGISTIX TECH" },
        { title: "Юриспруденция", subtitle: "LEGAL TECH" },
        { title: "Умный дом", subtitle: "HOME TECH" },
      ],

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
      toolsSlides: [
        { title: "Frontend", subtitle: "VUE.JS /" },
        { title: "Backend", subtitle: "LARAVEL" },
        { title: "Язык запросов", subtitle: "GRAPHQL" },
        { title: "Мобильные приложения", subtitle: "FLUTTER" },
      ],

      citySliderOptions: {
        slidesPerView: "auto",
        spaceBetween: 70,
        pagination: false,
        clickable: false,
        preloadImages: true,
        loop: true,
        // grabCursor: true,
        // mousewheelControl: true,
        // keyboardControl: true,
        autoplay: {
          delay: 1,
          disableOnInteraction: false,
        },
        speed: 3000,
        breakpoints: {
          1550: {
            slidesPerView: 6,
            spaceBetween: 70,
          },
          1400: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          500: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          300: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        },
      },
      citySlides: [
        { title: "", subtitle: "Москва" },
        { title: "", subtitle: "Казань" },
        { title: "", subtitle: "Махачкала" },
        { title: "", subtitle: "Сочи" },
        { title: "", subtitle: "Минск" },
        { title: "", subtitle: "Нурсултан" },
      ],

      serviceSliderOptions: {
        slidesPerView: 4,
        spaceBetween: 60,
        pagination: false,
        clickable: false,
        preloadImages: true,
        loop: true,
        rewind: true,
        autoplay: {
          delay: 300,
          disableOnInteraction: false,
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
    };
  },
  metaInfo: {
    title: "Комрадес Девс",
  },
};
</script>
<style lang="stylus">
.main {
  & .principles-work {
    +below(728px) {
      padding: 30px 45px
    }
  }
}
</style>
