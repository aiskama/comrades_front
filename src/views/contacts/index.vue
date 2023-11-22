<template>
  <main class="main">
    <section class="contacts-description">
      <BreadcrumbsComponent :links="breadcrumbs" />
      <h1 class="contacts-description__title">Контакты</h1>
    </section>
    <ContactsInfoComponent />
  </main>
</template>

<script>
import ContactsInfoComponent from "./components/ContactsInfoComponent.vue";
import BreadcrumbsComponent from "components/BreadcrumbsComponent.vue";
// import CONTACTS_PAGE from "@/graphql/queries/contacts_page.graphql";

export default {
  name: "ContactsPage",
  // async asyncData({ apollo, store }) {
  //   await apollo.defaultClient
  //     .query({
  //       query: CONTACTS_PAGE,
  //     })
  //     .then(({ data }) => {
  //       store.state.projects = data.projects_paginate.data;
  //       store.state.services = data.services_paginate.data;
  //     })
  //     .catch(() => {});
  // },
  data: () => ({
    breadcrumbs: [
      {
        route: {
          name: "contacts",
        },
        title: "Контакты",
      },
    ],
  }),
  components: { BreadcrumbsComponent, ContactsInfoComponent },
  metaInfo: {
    title: "Контакты",
  },
};
</script>

<style lang="stylus">
.contacts-description {
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
