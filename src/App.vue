<template>
  <div id="app">
    <vue-progress-bar />
    <HeaderComponent />
    <Transition mode="out-in" name="page">
      <RouterView :key="$route.fullPath" />
    </Transition>
    <FooterComponent />
    <ModalsComponent />
    <CookiesComponent />
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import ModalsComponent from "components/ModalsComponent.vue";
import CookiesComponent from "components/CookiesComponent.vue";

export default {
  components: {
    CookiesComponent,
    HeaderComponent,
    FooterComponent,
    ModalsComponent,
  },
  created() {
    this.$Progress.start();
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        const meta = to.meta.progress;
        this.$Progress.parseMeta(meta);
      }
      this.$Progress.start();
      next();
    });
    this.$router.afterEach(() => {
      this.$Progress.finish();
    });
  },
  mounted() {
    this.$Progress.finish();
    window.onscroll = () => {
      this.showScrollTop = window.scrollY > window.innerHeight;
    };
  },
  metaInfo: {
    title: "Разработка сложных веб приложений и автоматизация бизнеса",
    titleTemplate: "%s | Comrades Devs",
    meta: [
      {
        vmid: "keywords",
        name: "keywords",
        content:
          "Разработка сайтов, разработка мобильных приложений, автоматизация бизнеса, разработка CRM систем",
      },
      {
        vmid: "description",
        name: "description",
        content:
          "Comrades Devs - IT-Компания по разработке стартапов, интернет-проектов, онлайн-сервисов, мобильных приложений.",
      },
      {
        vmid: "og:title",
        name: "og:title",
        content: "Разработка сложных веб приложений и автоматизация бизнеса",
      },
      {
        vmid: "og:description",
        name: "og:description",
        content:
          "Comrades Devs - IT-Компания по разработке стартапов, интернет-проектов, онлайн-сервисов, мобильных приложений.",
      },
    ],
  },
};
</script>

<style lang="stylus">
@import 'styles/style.styl';
</style>
