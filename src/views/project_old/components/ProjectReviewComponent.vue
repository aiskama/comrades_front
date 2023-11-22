<template>
  <div class="project_feedback" v-if="data">
    <div class="project_feedback__title"><span>Отзыв заказчика</span></div>
    <div class="project_feedback__customer"><span>Иван И.И.</span></div>
    <div class="project_feedback__subtitle">
      <span>Генеральный директор S7 AirLines</span>
    </div>
    <div class="project_result__description">
      <span
        >Мы ценим терпение и профессионализм, который команда Sibdev показала на протяжении работы над
        проектом. Надеемся на продолжение работы с компанией Sibdev и дальнейшее совместное создание
        креативных и смелых проектов. Надеемся на продолжение работы с компанией Sibdev и дальнейшее
        совместное создание креативных и смелых проектов.</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>

<style lang="stylus">
.project_feedback {
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

  &__customer {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 28px;
    padding: 0 0 15px 0;
    color: var(--blue);
    width: 100%;

    +below(1400px) {
      font-size: 1.375rem;
    }

    +below(1100px) {
      font-size: 1.25rem;
    }
  }

  &__subtitle {
    display: flex;
    gap: 60px;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 28px;
    color: var(--blue-o5);
    padding-bottom 16px

    +below(1400px) {
      font-size: 1.25rem;
    }

    +below(700px) {
      flex-direction: column;
    }
  }

  &__description {
    display: flex;
    gap: 60px;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 28px;
    color: var(--gray-4);

    +below(1400px) {
      font-size: 1.25rem;
    }

    +below(700px) {
      flex-direction: column;
    }
  }
}
</style>
