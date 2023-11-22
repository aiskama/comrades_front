<template>
  <section class="slider" v-if="items && items.length">
    <div class="slider__container">
      <div class="slider__items">
        <div class="swiper" ref="items">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, i) in items" :key="i">
              <ProjectSlide :data="item.img" />
            </div>
          </div>
        </div>
        <div class="slider-button">
          <div type="button" title="Влево" class="slider-button__prev" @click="swiper.slidePrev()">
            <IconComponent name="arrow-left-s-line" />
          </div>
          <div type="button" title="Вправо" class="slider-button__next" @click="swiper.slideNext()">
            <IconComponent name="arrow-right-s-line" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import IconComponent from "components/IconComponent.vue";
import ImageComponent from "components/ImageComponent.vue";
import ProjectSlide from "./ProjectSlide.vue";
export default {
  name: "SliderComponent",
  props: {
    index: {
      type: Number,
      default: 0,
    },
    title: String,
    buttonTitle: String,
    items: Array,
    hideArrows: Boolean,
    route: {
      type: Object,
      default() {
        return {
          name: "",
        };
      },
    },
  },
  data() {
    return {
      swiper: null,
    };
  },
  mounted() {
    require(["swiper/swiper-bundle.esm.browser.js"], ({ Swiper }) => {
      this.swiper = new Swiper(this.$refs.items, {
        loop: true,
        autoHeight: true,
        slidesPerView: 1,
        pagination: false,
        clickable: true,
        preloadImages: true,
      });
      this.swiper.slideTo(this.index + 1, 0, false);
    });
  },
  components: { IconComponent, ProjectSlide },
};
</script>

<style lang="stylus">
@import '~swiper/swiper-bundle.min.css';
.slider-button {

  &__prev {
    position: fixed;
    top: 40vh;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 120px;

    +below(1200px) {
      left 30px
    }
    +below(600px) {
      display none
    }

    .icon {
      width 70px
      height 70px

      svg path {
        fill var(--blue)
      }
    }
  }
  &__next {
    position: fixed;
    top: 40vh;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 120px;

    +below(1200px) {
      right 30px
    }
    +below(600px) {
      display none
    }

    .icon {
      width 70px
      height 70px

      svg path {
        fill var(--blue)
      }
    }

  }
}
.slider {
  display: flex;
  justify-content: center;
  align-items: center;

  &__background {
    display: flex;
    flex-direction: column;
    background: var(--gray-1);

    // +below(1400px) {
    //   padding: 60px 80px;
    // }

    // +below(1100px) {
    //   padding: 60px 15px;
    // }
  }

  &__items {
    position: relative;
    width: 100%;

    &__footer {
      margin: -100px 0 0 189px;
      display: flex;
      align-items: center;
    }
  }

  &__title {
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 35px;
    padding-bottom: 60px;
    color: var(--blue-o5);

    +below(1100px) {
      font-size: 1.25rem;
    }
  }

  &__container {
    width: 100%;
    padding: 60px 100px;

    +below(1400px) {
      padding: 60px 80px;
    }

    +below(1100px) {
      padding: 30px 15px;
    }
  }
}
</style>
