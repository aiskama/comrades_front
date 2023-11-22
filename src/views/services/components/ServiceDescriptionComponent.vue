<template>
  <section class="service-description">
    <BreadcrumbsComponent :links="breadcrumbs" />
    <h1 class="service-description__title">Услуги</h1>
    <span class="service-description__subtitle">Мы сможем разработать все что угодно и даже больше</span>
    <span class="service-description__description">
      С 2019 года помогли 44 клиентам создать сложные стартапы, интернет-проекты и онлайн-сервисы.
    </span>
    <div class="service-description__buttons">
      <button class="btn btn--blue" @click="showRequestModal">
        <span>Обсудить проект</span>
      </button>
      <a target="_blank" href="/static/files/ComradesDevs.pdf" class="btn btn--white">
        <IconComponent name="presentation" />
        <span>Скачать презентацию</span>
      </a>
    </div>
  </section>
</template>

<script>
import IconComponent from "@/components/IconComponent.vue";
import BreadcrumbsComponent from "components/BreadcrumbsComponent.vue";
import RequestModalComponent from "components/modals/RequestModalComponent.vue";

export default {
  name: "ServiceDescriptionComponent",
  data: () => ({
    breadcrumbs: [
      {
        route: {
          name: "services",
        },
        title: "Услуги",
      },
    ],
  }),
  methods: {
    showRequestModal() {
      this.$store.state._modals.push({
        component: RequestModalComponent,
      });
    },
  },
  components: {
    BreadcrumbsComponent,
    IconComponent,
  },
};
</script>

<style lang="stylus">
.service-description {
  display: flex;
  flex-direction: column;
  padding: 32px 100px 60px;
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
    padding-top: 60px;
    font-size: 3.75rem;
    line-height: 71px;
    color: var(--blue);
    margin 0

    +below(1100px) {
      font-size: 1.875rem;
      line-height: 35px;
    }
  }

  &__subtitle {
    font-weight: 400;
    font-size: 1.875rem
    line-height: 35px;
    color: var(--blue);
    padding-top 15px
  }

  &__description {
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 24px;
    color: var(--gray-3);
    padding 10px 0 30px 0
  }

  &__buttons {
    display flex
    gap 30px
    +below(1100px) {
      flex-direction column
    }
  }
}
</style>
