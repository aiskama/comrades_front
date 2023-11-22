<template>
  <router-link :to="{ name: 'project', params: { id: data.id } }" class="project-card">
    <ImageComponent
      :head_img="data.map_image"
      class="project-card__image"
      width="700"
      height="500"
      :title="data.title"
    />
    <div class="project-card__content">
      <span class="project-card__title">{{ data.title }}</span>
      <div class="project-card__tags">
        <span class="project-card__tag" v-for="(item, i) in data.tags" :key="i">{{ item.title }}</span>
      </div>
    </div>
  </router-link>
</template>

<script>
import ImageComponent from "./ImageComponent.vue";

export default {
  name: "ProjectCardComponent",
  props: {
    data: Object,
  },
  components: { ImageComponent },
};
</script>

<style lang="stylus">
.project-card {
  display grid
  grid-template-columns 1fr
  gap 24px
  //padding: 30px;
  background: var(--gray-1);
  border-radius: 10px;
  transition: var(--transition);
  border 1px solid transparent
  overflow hidden

  +below(560px) {
    grid-template-columns 1fr
  }

  &:hover {
    border-color rgba(0, 0, 0, 0.1)
    transform: scale(1.001);
  }

  &:active {
    transform: scale(0.99);
  }

  &__content {
    display flex
    flex-direction column
    gap 8px
    padding: 0 30px 30px

    +below(560px) {
      padding: 0 16px 16px
    }
  }

  &__title {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 28px;
    color: var(--blue);

    +below(1400px) {
      font-size: 1.375rem;
    }

    +below(1100px) {
      font-size: 1.25rem;
    }
  }

  &__description {
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 24px;
    color: var(--gray-4);
    +below(1400px) {
      font-size: 1.125rem;
    }
    +below(1100px) {
      font-size: 1rem;
    }
  }

  &__tags {
    display flex
    flex-wrap wrap
    gap 8px
  }

  &__tag {
    font-weight: 400;
    font-size: 0.875rem;
    color: var(--gray-4);
    padding: 4px 16px;
    background: var(--white);
    border-radius: 10px;
  }

  &__image {
    width 100%
    //height 100px
    object-fit cover
    object-position top
    //width 180px
    box-shadow 0 0 4px rgba(0, 0, 0, 0.1)
    //border-radius 10px
    max-height 305px

    +below(560px) {
      //height 100%
      width 100%
    }
  }
}
</style>
