<template>
  <article
    class="project-page-description"
    :style="{
      'background-image': `url('${$store.state._env.MEDIA_ENDPOINT + data.img.path}')`,
      'background-color': data.color_banner,
    }"
  >
    <BreadcrumbsComponent :links="breadcrumbs" />
    <h1 class="project-page-description__title" v-if="data.title">{{ data.title }}</h1>
    <ul class="project-page-description__tags" v-if="data.tags.length">
      <li v-for="(tag, i) in data.tags.filter((t) => !!t.title)" :key="i">{{ tag.title }}</li>
    </ul>
    <EditorJSArticleComponent :text="info_site" class="project-page-description__text" />
  </article>
</template>

<script>
import BreadcrumbsComponent from "components/BreadcrumbsComponent.vue";
import EditorJSArticleComponent from "components/EditorJSArticleComponent.vue";

export default {
  name: "ProjectPageDescription",
  data() {
    let data = this.$store.state.project_page;
    let itemBreadcrumb = data
      ? {
          route: {
            name: this.$route.name,
            params: this.$route.params,
          },
          title: data.title,
        }
      : null;
    return {
      breadcrumbs: [
        {
          route: {
            name: "projects",
          },
          title: "Проекты",
        },
        itemBreadcrumb,
      ],
    };
  },
  computed: {
    data() {
      return this.$store.state.project_page;
    },
    info_site() {
      if (this.data && this.data.info_site) {
        try {
          return JSON.parse(this.data.info_site);
        } catch (e) {
          return this.data.info_site;
        }
      }
      return "";
    },
  },
  components: { EditorJSArticleComponent, BreadcrumbsComponent },
};
</script>

<style lang="stylus">
.project-page-description {
  display flex
  flex-direction column
  //background-color var(--gray-5-o5)
  background-position right center
  background-repeat no-repeat
  background-size 50%
  margin 0 -100px
  padding 32px 100px 60px
  +below(1400px) {
    margin 0 -80px
    padding: 32px 80px 60px;
  }
  +below(1100px) {
    margin 0 -15px
    padding: 32px 15px;
  }
  +below(900px) {
    background-image none !important
  }

  .breadcrumbs {
    &__img .icon path {
      fill var(--white)
    }

    ul li span,
    ul li a {
      color var(--white)
    }
  }

  &__title {
    font-weight: 500;
    font-size: 3.75rem;
    line-height: 71px;
    color: var(--white);
    padding 60px 0 8px
    max-width 50%
    +below(900px) {
      max-width 100%
    }
    +below(530px) {
      font-size 3rem
      line-height 45px
    }
    +below(430px) {
      font-size 2.5rem
    }
  }

  &__tags {
    display flex
    gap 8px
    flex-wrap wrap
    list-style none
    width 100%
    max-width 50%
    +below(900px) {
      max-width 100%
    }

    li {
      background var(--white)
      border-radius 10px
      display flex
      align-items center
      justify-content center
      padding 0 16px
      height 24px
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 16px;
      color: var(--gray-5);
    }
  }

  &__text {
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 24px;
    color: var(--white);
    max-width 50%
    width 100%
    padding-top 32px

    +below(900px) {
      max-width 100%
    }

    +below(700px) {
      font-size: 1rem
      line-height: 19px;
      padding-top: 16px
    }
  }
}
</style>
