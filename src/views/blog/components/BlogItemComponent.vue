<template>
  <router-link
    :to="{ name: 'blog_item', params: { id: data.id } }"
    class="blog-item"
    :title="data.title || ''"
    v-if="data"
  >
    <div class="blog-item__image">
      <ImageComponent :head_img="data.img" :title="data.title" width="600" height="350" />
      <div class="blog-item__tags" v-if="data.tags.length">
        <span class="blog-item__tag" v-for="(tag, i) in data.tags" :key="i">{{ tag.title }}</span>
      </div>
    </div>
    <div class="blog-item__content">
      <span class="blog-item__title" v-if="data.title">{{ data.title }}</span>
      <span class="blog-item__subtitle" v-if="data.short_description">{{ data.short_description }}</span>
      <time :datetime="data.published_at | robotDate" class="blog-item__date" v-if="data.published_at">
        {{ data.published_at | humanDate }}
      </time>
    </div>
  </router-link>
</template>

<script>
import ImageComponent from "components/ImageComponent.vue";

export default {
  name: "BlogItemComponent",
  components: { ImageComponent },
  props: {
    data: Object,
  },
};
</script>

<style lang="stylus">
.blog-item {
  display flex
  flex-direction column
  background: var(--gray-1);
  border-radius 20px
  overflow hidden

  &__image {
    height 250px
    box-shadow 0 0 4px rgba(0, 0, 0, 0.1);
    position relative
    flex-shrink 0
    +below(560px) {
      width 100%
    }

    img {
      width 100%
      height 100%
      object-fit cover
      object-position center
    }
  }

  &__tags {
    display flex
    absolute left 0 bottom 0
    padding 10px
    gap 10px
    flex-wrap wrap-reverse
  }

  &__tag {
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 16px;
    color: var(--blue);
    padding 4px 8px
    background: var(--white);
    border-radius: 10px;
  }

  &__content {
    display flex
    flex-direction column
    padding 31px
  }

  &__title {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 28px;
    color: var(--blue);
    +below(1400px) {
      font-size 1.125rem
    }
  }

  &__subtitle {
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 24px;
    color: var(--gray-5);
    margin 20px 0 12px 0
    +below(1400px) {
      font-size 1rem
      margin 16px 0
    }
  }

  &__date {
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 16px;
    color: var(--black);
  }
}
</style>
