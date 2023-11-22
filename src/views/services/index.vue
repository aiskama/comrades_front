<template>
  <main class="services-page">
    <ServiceDescriptionComponent />
    <ServiceTabComponent v-if="$store.state.service_page.services.length" />
    <!--    <ListComponent :data="competences" />-->
    <!--    <OurDestinationsComponent v-if="!id" :data="scrollSlides" />-->
    <RoadMapComponent v-if="!id" />
    <PrinciplesOfWorkComponent :data="principleWorks" />
    <SliderComponent
      :items="citySlides"
      v-slot="{ item }"
      :slider-options="citySliderOptions"
      class="scroll-slider"
    >
      <ScrollSlideComponent :data="item" />
    </SliderComponent>
    <!--    <ServiceClientsComponent :data="clients" />-->
  </main>
</template>

<script>
import ServiceDescriptionComponent from "./components/ServiceDescriptionComponent.vue";
import ServiceTabComponent from "./components/ServiceTabComponent.vue";
import ListComponent from "components/ListComponent.vue";
import SliderComponent from "components/SliderComponent.vue";
import ScrollSlideComponent from "components/ScrollSlideComponent.vue";
import BlockComponent from "components/BlockComponent.vue";
import ServiceClientsComponent from "./components/ServiceClientsComponent.vue";
import SERVICE_PAGE from "@/graphql/queries/service_page.graphql";
import PrinciplesOfWorkComponent from "components/PrinciplesOfWorkComponent.vue";
import RoadMapComponent from "components/RoadMapComponent.vue";
import OurDestinationsComponent from "components/OurDestinationsComponent.vue";

export default {
  name: "ServicePage",
  async asyncData({ apollo, store }) {
    await apollo.defaultClient
      .query({
        query: SERVICE_PAGE,
      })
      .then(({ data }) => {
        store.state.service_page.competences = data.competences;
        store.state.service_page.principle_works = data.principle_works;
        store.state.service_page.clients = data.clients;
        store.state.service_page.services = data.services;
        store.state.service_page.projects = data.projects;
      })
      .catch(() => {});
  },
  data() {
    return {
      citySliderOptions: {
        slidesPerView: "auto",
        spaceBetween: 70,
        pagination: false,
        clickable: false,
        preloadImages: true,
        loop: true,

        autoplay: {
          delay: 1,
          disableOnInteraction: false,
        },
        speed: 3000,
        // grabCursor: true,
        // mousewheelControl: true,
        // keyboardControl: true,

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
      scrollSlides: [
        { title: "Общепит", subtitle: "FOOD TECH" },
        { title: "Образование", subtitle: "ED TECH" },
        { title: "Логистика", subtitle: "LOGISTIX TECH" },
        { title: "Юриспруденция", subtitle: "LEGAL TECH" },
        { title: "Умный дом", subtitle: "HOME TECH" },
      ],
      citySlides: [
        { title: "", subtitle: "Москва" },
        { title: "", subtitle: "Казань" },
        { title: "", subtitle: "Махачкала" },
        { title: "", subtitle: "Сочи" },
        { title: "", subtitle: "Минск" },
        { title: "", subtitle: "Нурсултан" },
      ],
      principleSliderOptions: {
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
  computed: {
    competences() {
      return this.$store.state.service_page.competences;
    },
    principleWorks() {
      return this.$store.state.service_page.principle_works;
    },
    clients() {
      return this.$store.state.service_page.clients;
    },
    services() {
      return this.$store.state.service_page.services;
    },
    id() {
      return this.$route.params.id;
    },
  },
  metaInfo() {
    if (this.id) {
      let service = this.services.find((item) => item.id === this.id);
      return {
        title: service.title,
        meta: [
          {
            vmid: "description",
            name: "description",
            content: service.description,
          },
          {
            vmid: "og:title",
            name: "og:title",
            content: service.title,
          },
          {
            vmid: "og:image",
            name: "og:image",
            content: "",
          },
          {
            vmid: "og:description",
            name: "og:description",
            content: service.description,
          },
        ],
      };
    } else {
      return {
        title: "Услуги",
      };
    }
  },
  components: {
    OurDestinationsComponent,
    RoadMapComponent,
    PrinciplesOfWorkComponent,
    ServiceDescriptionComponent,
    ServiceTabComponent,
    ListComponent,
    SliderComponent,
    ScrollSlideComponent,
    BlockComponent,
    ServiceClientsComponent,
  },
};
</script>
<style lang="stylus">
.services-page {
  & .our-destinations {
    background var(--white)
    padding-top: 30px

    & .our-destinations__title {
      color var(--blue-o5)
    }
  }
}
</style>
