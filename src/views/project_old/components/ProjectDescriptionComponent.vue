<template>
  <section class="project-description">
    <ImageComponent :head_img="data.img" class="project-description__img" />
    <div class="project-description__container">
      <BreadcrumbsComponent :links="breadcrumbs" />
      <span class="project-description__title">{{ data.title }}</span>
      <div class="project-description__tags">
        <span class="project-description__tag" v-for="(tag, i) in data.tags" :key="i">{{ tag.title }}</span>
      </div>
      <span class="project-description__subtitle">{{ data.description }}</span>
    </div>
  </section>
</template>

<script>
import BreadcrumbsComponent from "components/BreadcrumbsComponent.vue";
import ImageComponent from "components/ImageComponent.vue";

export default {
  name: "ProjectDescriptionComponent",
  props: {
    data: Object,
  },
  data() {
    return {
      breadcrumbs: [
        {
          route: {
            name: "projects",
          },
          title: "Проекты",
        },
        {
          route: {
            name: "project",
            params: {
              id: this.data?.id || 0,
            },
          },
          title: this.data?.title || "",
        },
      ],
    };
  },
  computed: {
    projectsItem() {
      return this.$store.state.project_page.projects_item;
    },
  },
  components: { ImageComponent, BreadcrumbsComponent },
};
</script>

<style lang="stylus">
.project-description {
  position relative

  .breadcrumbs {
    &__img .icon path {
      fill var(--white)
    }

    ul li span,
    ul li a {
      color var(--white)
    }
  }

  &__container {
    position relative
    z-index 1
    display: flex;
    flex-direction: column;
    padding: 32px 100px 60px;
    background: rgba(0, 0, 0, 0.5);
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
    color: var(--white);
    margin 0
    padding 0
    padding-top 60px
    +below(1100px) {
      padding-top 32px
      font-size: 1.875rem;
      line-height: 35px;
    }
  }

  &__tags {
    display: flex;
    gap: 8px;
    padding-top 8px
  }

  &__tag {
    display flex
    align-items: center;
    font-weight: 400;
    font-size: 0.875rem;
    color: var(--gray-3);
    padding: 0 16px 2px;
    background: var(--white);
    border-radius: 10px;
    height 24px
  }

  &__subtitle {
    font-weight: 400;
    width: 50%;
    font-size: 1.25rem;
    line-height: 24px;
    color: var(--white);
    padding-top 32px

    +below(1100px) {
      padding-top 16px
      font-size: 1rem;
      width: 100%;
    }
  }

  &__img {
    position: absolute;
    right: 0;
    top: 0;
    object-fit: contain;
    object-position: right top;
    height: 100%;
    width: 100%;
  }
}
</style>
