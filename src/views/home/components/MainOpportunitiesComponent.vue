<template>
  <section class="opportunities">
    <div class="opportunities__text">
      <ImgComponent class="opportunities__bg-img" src="static/svg/logo.svg" />
      <h1 class="opportunities__text-title">
        Профессиональная разработка Web-проектов и Мобильных приложений для бизнеса и стартапов
      </h1>
      <!--      <span class="opportunities__text-subtitle"-->
      <!--        >Создание вашего проекта проходит в несколько этапов: Анализ. Проектирование. Создание минимального-->
      <!--        жизнеспособного продукта (MVP). Тестирование. Развитие.-->
      <!--      </span>-->
      <!--      <span class="opportunities__text-description">-->
      <!--        С 2019 года помогли 44 клиентам создать сложные стартапы, интернет-проекты и онлайн-сервисы.-->
      <!--      </span>-->
      <div class="opportunities__buttons">
        <button class="btn btn--blue" type="button" @click="showRequestModal">Заказать проект</button>
        <a target="_blank" href="/static/files/ComradesDevs.pdf" class="btn btn--white">
          <IconComponent name="presentation" />
          <span>Скачать презентацию</span>
        </a>
      </div>
    </div>
    <!--    <div class="opportunities__image">-->
    <!--      <img src="/static/images/computer.svg" alt="ComradesDevs" />-->
    <!--    </div>-->
  </section>
</template>

<script>
import IconComponent from "components/IconComponent.vue";
import RequestModalComponent from "components/modals/RequestModalComponent.vue";
import ImgComponent from "components/ImageComponent.vue";

export default {
  name: "MainOpportunitiesComponent",
  components: {ImgComponent, IconComponent },
  data() {
    return {};
  },
  methods: {
    showRequestModal() {
      this.$store.state._modals.push({
        component: RequestModalComponent,
      });
    },
  },
};
</script>
<style lang="stylus">
.modal_open {
  display: flex !important;
  align-content: center;
  justify-content: center;
  align-items: center;
  transition: var(--transition);
}

.opportunities {
  display: flex;
  padding: 70px 0 40px 100px;
  min-height: calc(100vh - 250px);
  align-items: center;
  position relative

  +below(1400px) {
    padding: 70px 0 40px 80px;
  }

  +below(1100px) {
    flex-direction: column;
    padding: 0 15px 40px 15px;
  }

  +below(768px) {
    //min-height: auto
    padding-top: 30px
    min-height: calc(100vh - 280px);
  }

  &__bg-img {
    position: absolute;
    height: 100%;
    padding: 50px 0;
    z-index: -1;
    right: 120px;
    top: 0;

    & svg path {
      //fill #EDEDED
    }

    +below(1100px) {
      right: 0;
      top -100px
      max-height 450px
      opacity 0.2 !important
    }

    +below(480px) {
      max-width 180px
      top: 15px;
      height: auto;
      padding: 0;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    padding-right: 100px;

    +below(1100px) {
      padding-right: 0;
    }

    &-title {
      font-weight: 700;
      font-size: 3.6rem;
      line-height: 71px;
      color: var(--blue);
      padding-bottom: 30px;
      max-width: 1000px;
      margin: 0;

      +below(1100px) {
        font-size: 1.875rem;
        line-height: 35px;
      }

      +below(428px) {
        font-size: 1.625rem;
      }
    }

    &-subtitle {
      font-weight: 600;
      font-size: 1.875rem;
      line-height: 40px;
      color: var(--blue);
      padding-bottom: 20px;

      +below(1100px) {
        font-size: 1.25rem;
        line-height: 25px;
      }
    }

    &-description {
      font-weight: 400;
      font-size: 1.25rem;
      line-height: 24px;
      color: var(--gray-4);
      padding-bottom: 30px;

      +below(1100px) {
        font-size: 1rem;
      }
    }
  }

  &__buttons {
    display: flex;
    padding-top: 30px;
    grid-gap: 30px;

    +below(1100px) {
      flex-direction: column;
      grid-gap: 15px;
    }

    +below(480px) {
      padding-top: 0
    }
  }

  &__image {
    height 100%
    width 100%

    img {
      height 100%
      width 100%
    }
    +below(1100px) {
      display: none;
    }
  }
}
</style>
