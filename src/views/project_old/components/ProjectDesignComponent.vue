<template>
  <div class="project_design" v-if="data">
    <div class="project_design__title"><span>Дизайн</span></div>
    <div class="project_design__subtitle">
      <span
        >Перед лендингом стояла имиджевая задача — передать креативность как ценность Академии. В основу
        концепции лег стиль Lo-Fi. Его ключевые слова — простота, расслабленность, отсутствие обработки (или
        же такое ощущение). Так, был доработан дизайн кассеты, а для фона выбрана текстура писчей бумаги с
        рваными краями.</span
      ><br />
      <img src="/static/images/S7_picture.png" alt="S7" /><br />
      <span
        >Также мы добавили динамики: анимировали элементы при скроллинге, местами использовали живой видеоряд
        для фона.</span
      ><br />
      <img src="/static/images/S7_picture.png" alt="S7" />
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
.project_design {
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

    +below(1100px) {
      font-size: 1.25rem;
    }
  }
  &__subtitle{
    padding-top 30px
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 28px;
    color: var(--blue);

    +below(1400px) {
      font-size: 1.25rem;
    }

    +below(700px) {
      flex-direction: column;
    }
  }

  img{
    border-radius 10px
    padding 60px 0

  }
}
</style>
