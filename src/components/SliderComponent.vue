<template>
  <section class="slider" v-if="items && items.length">
    <div class="slider__container">
      <div class="slider__header" v-if="title">
        <h2 class="slider__title">{{ title }}</h2>
        <SliderArrowsComponent
          v-if="swiper && !hideArrows && canShowArrows"
          @left="swiper.slidePrev()"
          @right="swiper.slideNext()"
        />
      </div>

      <!--      <h2 v-if="title" class="slider__title">{{ title }}</h2>-->
      <div class="slider__items">
        <div class="swiper" ref="items">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, i) in items" :key="i">
              <slot :item="item" :i="i"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SliderArrowsComponent from "components/SliderArrowsComponent.vue";
export default {
  name: "SliderComponent",
  props: {
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
    sliderOptions: {
      type: Object,
      default() {
        return {
          spaceBetween: "auto",
          slidesPerView: "auto",
          pagination: false,
          clickable: false,
        };
      },
    },
  },
  data() {
    return {
      swiper: null,
    };
  },
  computed: {
    canShowArrows() {
      let slidesPerView = this.getCurrentBreakpoint().slidesPerView;
      if (typeof slidesPerView === "string") {
        return slidesPerView === "auto";
      }
      if (typeof slidesPerView === "number") {
        return this.items.length > slidesPerView || !!this.sliderOptions.loop;
      }
      return false;
    },
  },
  methods: {
    getCurrentBreakpoint() {
      if (this.sliderOptions.breakpoints && typeof window !== "undefined") {
        let returnCandidate = this.sliderOptions;
        Object.keys(this.sliderOptions.breakpoints).forEach((key) => {
          if (window.innerWidth > parseInt(key)) {
            returnCandidate = this.sliderOptions.breakpoints[key];
          }
        });
        return returnCandidate;
      }
      return this.sliderOptions;
    },
  },
  mounted() {
    require(["swiper/swiper-bundle.esm.browser.js"], ({ Swiper }) => {
      this.swiper = new Swiper(this.$refs.items, this.sliderOptions);
    });
  },
  components: { SliderArrowsComponent },
};
</script>

<style lang="stylus">
@import '~swiper/swiper-bundle.min.css';

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

  &__header {
    display flex
    justify-content space-between
  }
  &__title {
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 35px;
    padding-bottom: 30px;
    color: var(--blue-o5);

    +below(1100px) {
      font-size: 1.25rem;
      padding-bottom 30px
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
