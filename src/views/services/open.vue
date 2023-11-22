<template>
  <main class="service-page">
    <div class="service-page__description">
      <BreadcrumbsComponent :links="breadcrumbs" />
      <h1 class="service-page__title">{{ data.title }}</h1>
    </div>
    <ServiceItemContentComponent />
  </main>
</template>

<script>
import BreadcrumbsComponent from "components/BreadcrumbsComponent.vue";
import GET from "@/graphql/queries/service_item_page.graphql";
import ServiceItemContentComponent from "./components/ServiceItemContentComponent.vue";

export default {
  name: "ServiceItemPage",
  components: { ServiceItemContentComponent, BreadcrumbsComponent },
  async asyncData({ apollo, store, route, res }) {
    let id = route.params.id;
    if (!id) {
      res.status(404);
      return;
    }
    await apollo.defaultClient
      .query({
        query: GET,
        variables: { id: parseInt(id) },
      })
      .then(({ data }) => {
        if (data && data.services_item) {
          store.state.services_item_page.service_item = data.services_item;
          store.state.services_item_page.projects = data.projects;
        } else {
          res.status(404);
        }
      })
      .catch(() => {});
  },
  data() {
    return {};
  },
  computed: {
    data() {
      return this.$store.state.services_item_page.service_item;
    },
    breadcrumbs() {
      return [
        {
          route: {
            name: "services",
          },
          title: "Услуги",
        },
        {
          route: {
            name: this.$route.name,
            params: this.$route.params,
          },
          title: this.data.title,
        },
      ];
    },
  },
  metaInfo() {
    if (!this.data) {
      return {};
    }
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
          content: "",
        },
        {
          vmid: "og:description",
          name: "og:description",
          content: this.data.description,
        },
      ],
    };
  },
};
</script>

<style lang="stylus">
.service-page {

  &__description {
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
  }

  &__title {
    font-weight: 500;
    font-size: 3.75rem;
    line-height: 71px;
    color: var(--blue);
    margin 0
    padding 0

    +below(1100px) {
      font-size: 1.875rem;
      line-height: 35px;
    }
  }

}
</style>
