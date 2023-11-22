<template>
  <main class="about" v-if="aboutDescription">
    <section class="about-description" v-if="aboutDescription.title || aboutDescription.subtitle">
      <BreadcrumbsComponent :links="breadcrumbs" />
      <h1 class="about-description__title">{{ aboutDescription.title }}</h1>
      <span class="about-description__subtitle">{{ aboutDescription.subtitle }}</span>
    </section>
    <!--    <SliderComponent-->
    <!--      v-if="principleWorks.length"-->
    <!--      title="Принципы работы"-->
    <!--      :items="principleWorks"-->
    <!--      class="slider__background"-->
    <!--      v-slot="{ item }"-->
    <!--      :slider-options="ServiceSliderOptions"-->
    <!--    >-->
    <!--      <BlockComponent :data="item" />-->
    <!--    </SliderComponent>-->
    <PrinciplesOfWorkComponent :data="principleWorks" />
    <AboutStaffComponent :data="aboutDescription" v-if="aboutDescription.info_employees" />
    <AboutClientsComponent :data="clients" v-if="clients && clients.length" />
    <SliderComponent :items="toolsSlides" v-slot="{ item }" :slider-options="toolsSliderOptions">
      <ScrollSlideComponent :data="item" />
    </SliderComponent>
  </main>
</template>

<script>
import AboutStaffComponent from "./components/AboutStaffComponent.vue";
import AboutClientsComponent from "./components/AboutClientsComponent.vue";
import SliderComponent from "components/SliderComponent.vue";
import BlockComponent from "components/BlockComponent.vue";
import ABOUT_PAGE from "@/graphql/queries/about_page.graphql";
import BreadcrumbsComponent from "components/BreadcrumbsComponent.vue";
import ScrollSlideComponent from "components/ScrollSlideComponent.vue";
import PrinciplesOfWorkComponent from "components/PrinciplesOfWorkComponent.vue";

export default {
  name: "AboutPage",
  async asyncData({ apollo, store }) {
    await apollo.defaultClient
      .query({
        query: ABOUT_PAGE,
      })
      .then(({ data }) => {
        store.state.about_page.companyinfo = data.companyinfo;
        store.state.about_page.principle_works = data.principle_works;
        store.state.about_page.clients = data.clients;
      })
      .catch(() => {});
  },
  data() {
    return {
      ServiceSliderOptions: {
        slidesPerView: 4,
        spaceBetween: 60,
        pagination: false,
        clickable: false,
        preloadImages: true,
        loop: true,
        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
        speed: 6000,
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
      breadcrumbs: [
        {
          route: {
            name: "about",
          },
          title: "О нас",
        },
      ],
    };
  },
  computed: {
    aboutDescription() {
      return this.$store.state.about_page.companyinfo;
    },
    principleWorks() {
      return this.$store.state.about_page.principle_works;
    },
    clients() {
      return this.$store.state.about_page.clients;
    },
  },
  components: {
    PrinciplesOfWorkComponent,
    ScrollSlideComponent,
    BreadcrumbsComponent,
    AboutStaffComponent,
    AboutClientsComponent,
    SliderComponent,
    BlockComponent,
  },
  metaInfo: {
    title: "О нас",
  },
};
</script>

<style lang="stylus">
.about {
  .breadcrumbs {
    &__img .icon path {
      fill var(--white)
    }

    ul li span,
    ul li a {
      color var(--white)
    }
  }
}

.about-description {
  display: flex;
  flex-direction: column;
  background-image: url('/static/images/office.png');
  background-size: cover;
  padding: 32px 100px 60px;
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
    color: var(--white);
    margin 0
    padding 0
    padding-top: 60px;

    +below(1100px) {
      font-size: 1.875rem;
      line-height: 35px;
    }
  }

  &__subtitle {
    font-weight: 400;
    width: 60%;
    font-size: 1.25rem;
    line-height: 24px;
    color: var(--white);
    padding-top: 15px;

    +below(1100px) {
      font-size: 1rem;
      width: 100%;
    }
  }
}
</style>
