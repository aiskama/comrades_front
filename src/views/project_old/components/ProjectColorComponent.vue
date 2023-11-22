<template>
  <div class="project_color" v-if="data">
    <div class="project_color__title">
      <span>Цветовая палитра</span>
    </div>
    <div class="project_color__blocks">
      <div class="project_color__blocks-item" v-for="(image, i) in images" :key="i">
        <div class="project_color__blocks-item-image">
          <img :src="image.color" :alt="image.description" />
        </div>
        <div class="project_color__blocks-item-description">
          <span>
            {{ image.description }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
  data() {
    return {
      images: [
        { color: "/static/images/color_1.png", description: "#98B830" },
        { color: "/static/images/color_2.png", description: "#FFFFFF" },
        { color: "/static/images/color_3.png", description: "#E9EDF3" },
        { color: "/static/images/color_4.png", description: "#222A37" },
      ],
    };
  },
};
</script>

<style lang="stylus">
.project_color {
  display: flex;
  flex-direction: column;
  padding: 60px 100px;

  +below(1400px) {
    padding: 30px 0 60px 80px;
  }

  +below(1100px) {
    padding: 30px 15px 60px 15px;
  }

  &__title {
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 35px;
    color: var(--blue-o5);
    padding-bottom: 30px;

    +below(1100px) {
      font-size: 1.25rem;
    }
  }

  &__blocks {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    &-item {
      display: flex;
      flex-direction: column;
      gap: 16px;

      &-image {
        img{
          border-radius 10px
        }
      }

      &-description {
        font-size: 1.875rem;
        line-height: 35px;
        font-weight: 400px;
        color: var(--gray-3);
      }
    }
  }
}
</style>
