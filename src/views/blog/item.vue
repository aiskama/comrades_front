<template>
  <main class="blog-item-page" v-if="data">
    <section class="blog-item-page__header">
      <BreadcrumbsComponent :links="breadcrumbs" />
      <h1 class="blog-item-page__title">{{ data.title }}</h1>
      <time class="blog-item-page__subtitle" :datetime="data.published_at | robotDate">
        {{ data.published_at | humanDate }}
      </time>
    </section>
    <section class="blog-item-page__content" v-if="data.description">
      <div class="blog-item-page__aside blog-item-page__aside-similar">
        <span v-if="data.blogs.length" class="blog-item-page__section-title">Читайте далее</span>
        <div v-if="data.blogs.length" class="blog-item-page__aside-body">
          <BlogItemComponent v-for="(item, i) in data.blogs" :key="i" :data="item" />
        </div>
      </div>
      <EditorJSArticleComponent :text="JSON.parse(data.description)" class="blog-item-page__content-text" />
      <div v-if="data.images.length" class="mobile">
        <SliderComponent
          :items="data.images"
          :slider-options="SliderOptions"
          title="Фотогалерея"
          v-slot="{ item, i }"
          class="blog-item-page__photos"
        >
          <div @click="openPhotoModal(i, data.images)" class="blog-item-page__photos-item">
            <ImageComponent :head_img="item.img" :title="data.title" width="800" height="800" />
          </div>
        </SliderComponent>
      </div>
      <div class="blog-item-page__aside blog-item-page__aside-blog">
        <span v-if="data.blogs.length" class="blog-item-page__section-title"> Мы в СМИ</span>
        <div v-if="smis.length" class="blog-item-page__aside-body">
          <SmisItemCard v-for="(item, i) in smis" :key="i" :data="item" />
        </div>
      </div>
    </section>
    <section v-if="data.images.length" class="desktop">
      <SliderComponent
        :items="data.images"
        :slider-options="SliderOptions"
        title="Фотогалерея"
        v-slot="{ item, i }"
        class="blog-item-page__photos"
      >
        <div @click="openPhotoModal(i, data.images)" class="blog-item-page__photos-item">
          <ImageComponent :head_img="item.img" :title="data.title" width="800" height="800" />
        </div>
      </SliderComponent>
    </section>
    <section class="blog-item-page__section" v-if="data.projects.length">
      <span class="blog-item-page__section-title">Проекты</span>
      <div class="blog-item-page__section-body">
        <ProjectCardComponent v-for="(item, i) in data.projects" :key="i" :data="item" />
      </div>
    </section>
  </main>
  <PageNotFound v-else />
</template>

<script>
import BreadcrumbsComponent from "components/BreadcrumbsComponent.vue";
import BlogItemComponent from "./components/BlogItemComponent.vue";
import ProjectCardComponent from "components/ProjectCardComponent.vue";
import BLOG_ITEM_PAGE from "@/graphql/queries/blog_item_page.graphql";
import PageNotFound from "../PageNotFound.vue";
import ImageComponent from "components/ImageComponent.vue";
import EditorJSArticleComponent from "components/EditorJSArticleComponent.vue";
import SliderComponent from "components/SliderComponent.vue";
import PhotoModal from "components/modals/PhotoModal.vue";
import SmisItemCard from "components/SmisItemCard.vue";

export default {
  name: "BlogItemPage",
  async asyncData({ apollo, route, res, store }) {
    let id = route.params.id;
    if (!id) {
      res.status(404);
      return;
    }
    await apollo.defaultClient
      .query({
        query: BLOG_ITEM_PAGE,
        variables: { id: parseInt(id) },
      })
      .then(({ data }) => {
        if (data && data.blogs_item) {
          store.state.blog_item_page = data.blogs_item;
          store.state.smis = data.smis;
        } else {
          res.status(404);
        }
      })
      .catch(() => {});
  },
  data() {
    let data = this.$store.state.blog_item_page;
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
            name: "blog",
          },
          title: "Блог",
        },
        itemBreadcrumb,
      ],
      SliderOptions: {
        slidesPerView: "auto",
        spaceBetween: 50,
        pagination: false,
        clickable: false,
        preloadImages: true,
        // loop: true,
        speed: 3000,
        freeMode: true,
        autoplay: {
          delay: 1,
          enabled: true,
          disableOnInteraction: false,
        },
        breakpoints: {
          0: {
            spaceBetween: 16,
            slidesPerView: 2,
          },
          768: {
            spaceBetween: 16,
            slidesPerView: 4,
          },
          1100: {
            spaceBetween: 32,
            slidesPerView: 5,
          },
        },
      },
    };
  },
  computed: {
    data() {
      return this.$store.state.blog_item_page;
    },
    smis() {
      return this.$store.state.smis;
    },
  },
  methods: {
    openPhotoModal(i, images) {
      this.$store.state._modals.push({
        component: PhotoModal,
        options: {
          i,
          images,
        },
      });
    },
  },

  metaInfo() {
    if (!this.data) {
      return {};
    }
    let image = this.$store.state._env.MEDIA_ENDPOINT + this.data?.img?.path || "";
    return {
      title: this.data.title,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: this.data.short_description,
        },
        {
          vmid: "og:title",
          name: "og:title",
          content: this.data.title,
        },
        {
          vmid: "og:image",
          name: "og:image",
          content: image,
        },
        {
          vmid: "og:description",
          name: "og:description",
          content: this.data.short_description,
        },
      ],
    };
  },
  components: {
    SmisItemCard,
    SliderComponent,
    EditorJSArticleComponent,
    ImageComponent,
    PageNotFound,
    ProjectCardComponent,
    BlogItemComponent,
    BreadcrumbsComponent,
  },
};
</script>

<style lang="stylus">
.blog-item-page {
  margin-bottom 30px

  &__header {
    display: flex;
    flex-direction: column;
    padding: 32px 100px 60px;
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
    margin 60px 0 16px
    padding 0

    +below(1100px) {
      font-size: 1.875rem;
      line-height: 35px;
      margin 32px 0 16px
    }
  }

  &__content {
    display grid
    grid-template-columns 1fr 3fr 1fr
    padding: 32px 100px 28px;
    width: 100%;
    gap 30px
    +below(1400px) {
      padding: 32px 80px 15px;
    }
    +below(1100px) {
      padding: 32px 15px 15px;
      grid-template-columns 1fr

    .blog-item-page__aside-blog {
      order 4
    }

    .blog-item-page__aside-similar {
      order 3
    }
      .blog-item-page__aside-text {
      order 1
    }
    }
  }

  &__aside {
    display flex
    flex-direction column
    gap 20px


    &-body {
      display flex
      flex-direction column
      gap 30px
      +below(1100px) {
        display grid
        grid-template-columns 1fr 1fr
      }
      +below(680px) {
        grid-template-columns 1fr
      }
    }
  }
  &__photos {
    max-height 460px
  }

  &__photos-item {
    cursor pointer
    img {
      border-radius 10px
      width 100%
      height: 100%;
      object-fit cover
      max-height 180px
    }
  }

  &__subtitle {
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 28px;
    color: var(--gray-5);
  }

  &__section {
    display flex
    flex-direction column
    gap 32px
    padding: 32px 100px 28px;
    width: 100%;
    +below(1400px) {
      padding: 32px 80px 15px;
    }
    +below(1100px) {
      gap 16px
      padding: 32px 15px 15px;
    }
  }

  &__section-title {
    font-weight: 400;
    font-size: 1.875rem;
    line-height: 35px;
    color: var(--blue-o5);
    +below(1100px) {
      font-size: 1.5rem;
      line-height: 28px;
    }
  }

  &__section-body {
    display grid
    grid-template-columns repeat(3, 1fr)
    gap 32px
    +below(1100px) {
      grid-template-columns repeat(2, 1fr)
    }
    +below(640px) {
      grid-template-columns 1fr
    }

    .blog-item {
      flex-direction column

      &__image {
        max-width 340px
        width 100%
      }

      &__subtitle {
        margin 16px 0
      }
    }
  }
  .desktop {
    +below(1100px) {
      display none
    }
  }

  .mobile {
    +above(1101px) {
      display none
    }
  }
}
</style>
