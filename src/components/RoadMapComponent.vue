<template>
  <div class="road-map">
    <div class="road-map__content">
      <h2 class="road-map__title">Как мы работаем со стартапами?</h2>
      <div class="road-map__list">
        <div v-for="(arr, i) in data" :key="i" class="road-map__wrapper">
          <div v-for="item in arr" :key="item.id" class="road-map__item">
            <RoadMapDotComponent ref="dots" :is-even="item.id % 2 === 0" />
            <span class="road-map__item-num">{{ item.step }}</span>
            <span class="road-map__item-title">{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoadMapDotComponent from "components/RoadMapDotComponent.vue";

export default {
  name: "RoadMapComponent",
  components: { RoadMapDotComponent },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      if (scrollDebounce) {
        clearTimeout(scrollDebounce);
      }
      let scrollDebounce = setTimeout(() => {
        // Получаем высоту видимой части страницы
        const windowHeight = window.innerHeight;

        let dots = this.$refs.dots;
        dots.forEach((dot) => {
          let dotPosition = dot.$el.getBoundingClientRect();
          if (dot._props.isEven) {
            dot.isFill = dotPosition.top < windowHeight / 2 - 100;
          } else dot.isFill = dotPosition.top < windowHeight / 2;
        });
      }, 500);
    },
  },
  data() {
    return {
      data: [
        [
          { id: 1, title: "Анализируем идею и создаем предложение", step: "1" },
          { id: 2, title: "Создаем систему для анализа внутри проекта", step: "2" },
        ],
        [
          { id: 4, title: "Анализ конкурентов", step: "4" },
          { id: 3, title: "Продуктовый сегмент", step: "3" },
        ],
        [
          { id: 5, title: "Поиск сегмента целевой аудитории", step: "5" },
          { id: 6, title: "Боли и потребности аудитории", step: "6" },
        ],
        [
          { id: 8, title: "Создание MVP модели", step: "8" },
          { id: 7, title: "Разработка гипотез", step: "7" },
        ],
        [{ id: 9, title: "Запуск и развитие проекта", step: "9" }],
      ],
    };
  },
};
</script>

<style lang="stylus">
.road-map {
  padding: 60px 100px
  background var(--blue)
  padding-bottom: 0

  +below(1400px) {
    padding: 60px 80px;
  }

  +below(1100px) {
    padding: 30px 15px;

    +below(880px) {
      padding-top: 50px
    }
  }

  &__content {
    width 100%
    max-width 995px
    margin 0 auto
  }

  &__title {
    text-align center
    font-weight: 500;
    font-size: 2.875rem;
    line-height: 35px;
    padding-bottom: 80px;
    color: var(--white);

    +below(880px) {
      padding-bottom: 60px
      font-size: 1.875rem;
    }

    +below(628px) {
      font-size: 1.5rem;
    }
  }

  &__list {
    display flex
    flex-direction column
  }

  &__wrapper {
    display flex
    //border-top 3px solid var(--red)
    border-radius 32px
    justify-content space-around
    padding: 20px 0
    position: relative

    &::before {
      content ""
      position absolute
      top 0
      right 0
      bottom 0
      border 3px solid var(--red)
      width 100%
      margin-top: -3px
    }

    &:first-child {
      margin-left: 20%
    }

    &:last-child {
      &::before {
        border none
      }
    }

    &:nth-child(odd) {
      margin-left: 25%;

      +below(628px) {
        margin-left: 0
      }

      &::before {
        border-radius 0 77px 77px 0
        border-left: none
        max-width: 90%;

        +below(628px) {
          max-width 78%
        }
      }
    }

    &:nth-child(even) {
      margin-right: 8%;

      &::before {
        border-radius 77px 0 0 77px
        border-right none
        left 0
        max-width: 55%;

        //+below(880px) {
        //  max-width 50%
        //}
      }
    }
  }

  &__item {
    display flex
    flex-direction column
    //gap 16px
    color var(--white)
    max-width 280px
    width 100%
    position: relative;
    top -44px

    +below(880px) {
      max-width 212px
    }

    +below(628px) {
      align-items center
    }

    &-title {
      font-weight: 600;
      line-height: 27px;
      font-size: 20px

      +below(880px) {
        font-size: 18px
        line-height 23px
      }

      +below(628px) {
        font-size: 14px
        line-height 18px
        text-align center
      }

      +below(380px) {
        max-width 120px
      }
    }

    &-num {
      font-weight: 700;
      line-height: 1;
      font-size: 160px

      +below(880px) {
        font-size: 120px
      }

      +below(628px) {
        font-size: 80px
      }
    }
  }
}
</style>
