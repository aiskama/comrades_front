<template>
  <article class="project-page-adaptation" v-if="data && data.parentCategories.length">
    <h2 class="project-page-title">Адаптация</h2>
    <div class="project-page-adaptation__tabs">
      <button
        type="button"
        class="btn"
        :class="{
          'btn--blue': activeSubCategory === null,
          'btn--white': activeSubCategory !== null,
        }"
        @click="activeSubCategory = null"
      >
        Все фотографии
      </button>
      <button
        type="button"
        class="btn"
        :class="{
          'btn--blue': activeSubCategory === c.id,
          'btn--white': activeSubCategory !== c.id,
        }"
        v-for="(c, i) in childs"
        :key="i"
        @click="activeSubCategory = c.id"
      >
        {{ c.title }}
      </button>
    </div>
    <SliderComponent v-if="images.length" :items="images" v-slot="{ item }" :slider-options="sliderOptions">
      <MockupComponent :data="item.img" device="phone" v-if="item.category.type.code === 1" />
      <MockupComponent :data="item.img" device="pc" v-if="item.category.type.code === 2" />
    </SliderComponent>
  </article>
</template>

<script>
import SliderComponent from "components/SliderComponent.vue";
import MockupComponent from "components/MockupComponent.vue";

export default {
  name: "ProjectPageAdaptation",
  data: () => ({
    activeCategory: null,
    activeSubCategory: null,
    sliderOptions: {
      slidesPerView: "auto",
      spaceBetween: 32,
      pagination: false,
      clickable: false,
      speed: 5000,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    },
  }),
  computed: {
    data() {
      return this.$store.state.project_page;
    },
    parents() {
      return this.data.parentCategories;
    },
    childs() {
      let cats = [];
      this.parents
        .map((p) => p.childs)
        .forEach((c) => {
          cats.push(...c);
        });
      return cats;
    },
    images() {
      let images = this.data.images.filter((i) => !!i.category);
      if (this.activeSubCategory) {
        images = images.filter((i) => i.category.id === this.activeSubCategory);
      }
      return images;
    },
  },
  components: { MockupComponent, SliderComponent },
};
</script>

<style lang="stylus">
.project-page-adaptation {
  display flex
  flex-direction column

  & .slider {
    margin 0 -100px
    +below(1400px) {
      margin 0 -80px
    }
    +below(1100px) {
      margin 0 -15px
    }

    .swiper-slide {
      width auto
    }
  }

  &__tabs {
    display flex
    gap 16px
    flex-wrap wrap
    margin-top 32px

    +below(750px) {
      flex-direction column
    }

    .btn {
      padding 0 24px
      gap 16px
      font-size: 1.25rem;
      line-height: 24px;
      height 40px
    }
  }
}
</style>
