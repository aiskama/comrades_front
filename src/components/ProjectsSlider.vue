<template>
  <div class="projects">
    <div class="projects__title">
      <span>Нам доверяют</span>
    </div>
    <SliderComponent
      :items="clients"
      :slider-options="SliderOptions"
      v-slot="{ item }"
      class="projects__slider"
    >
      <a :href="item.link" target="_blank" class="projects__slide">
        <ImageComponent width="120" height="50" :head_img="item.img" />
        <span class="projects__slide-title">{{ item.title }}</span>
      </a>
    </SliderComponent>
  </div>
</template>

<script>
import ImageComponent from "components/ImageComponent.vue";
import SliderComponent from "@/components/SliderComponent.vue";

export default {
  name: "ProjectsSlider",
  components: { SliderComponent, ImageComponent },
  data() {
    return {
      SliderOptions: {
        slidesPerView: "auto",
        spaceBetween: 50,
        pagination: false,
        clickable: false,
        preloadImages: true,
        // lazy: true,
        loop: true,
        speed: 3000,
        freeMode: true,
        autoplay: {
          delay: 1,
          enabled: true,
          disableOnInteraction: false,
        },
        breakpoints: {
          780: {
            spaceBetween: 80,
          },
          // 1400: {
          //   slidesPerView: 3.5,
          //   spaceBetween: 40,
          // },
          // 1100: {
          //   slidesPerView: 2.5,
          //   spaceBetween: 30,
          // },
          // 400: {
          //   slidesPerView: 2,
          //   spaceBetween: 20,
          // },
          // 0: {
          //   slidesPerView: 1,
          //   spaceBetween: 10,
          // },
        },
      },
    };
  },
  computed: {
    clients() {
      return this.$store.state.clients;
    },
  },
};
</script>

<style lang="stylus">
.projects {
  width 100%
  padding: 0 0 30px 100px;
  display flex
  align-items center
  overflow hidden

  +below(1400px) {
    padding: 50px 0 30px 80px;
  }

  +below(1100px) {
    padding: 0 0 30px 15px;
  }

  &__title {
    white-space nowrap
    color: rgba(19, 47, 99, 0.70);
    font-size: 2.5rem
    font-weight: 500;
    padding-right: 15px
    border-right: 3px solid var(--blue);
    display: flex;
    align-items: center;
    height: 70px;

    +below(1100px) {
      font-size: 1.75rem
    }

    +below(780px) {
      font-size: 1.25rem
      height 55px
    }
  }

  &__slider {
    width 100%

    & a {
      color var(--black)
    }

    & .slider__container {
      padding: 0
    }

    .swiper-wrapper {
      transition-timing-function: linear !important
    }

    & .swiper-slide {
      width auto
    }
  }

  &__slide {
    min-width 80px
    width 120px
    //width auto
    height 115px
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    transition var(--transition)
    cursor: pointer;

    +below(780px) {
      width: 80px
    }

    &-title {
      visibility hidden
      opacity: 0;
      text-align center
      font-size 0.825rem
      position absolute
      top 80%
      transition var(--transition)

      +below(780px) {
        top 75%
      }
    }

    &:hover {
      & .projects__slide-title {
        visibility visible
        opacity: 1
      }

      & img {
        filter none
      }
    }

    & img {
      object-fit contain
      max-height 50px
      width 100%
      filter grayscale(1)
      transition var(--transition)
      //max-width 150px

      +below(780px) {
        height 35px
      }
    }
  }
}
</style>
