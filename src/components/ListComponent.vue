<template>
  <section class="list-component">
    <div class="list-component__block" v-if="data.length">
      <h2 class="list-component__block-title">Наши компетенции</h2>
      <ul class="list-component__competencies">
        <li v-for="(item, i) in data" :key="i" @click="openCompetencies(i)">
          <div class="list-component__item-title">{{ item.title }}</div>
          <div
            class="list-component__item-subtitle"
            :class="{ 'list-component__item-subtitle--active': active === i }"
          >
            {{ item.subtitle }}
          </div>
        </li>
      </ul>
    </div>
    <div class="list-component__block list-component__block--mobile">
      <h2>Как мы работаем со стартапами?</h2>
      <ul>
        <li>Анализируем идею и создаем предложение</li>
        <li>Создаем систему для анализа внутри проекта</li>
        <li>Продуктовый сегмент</li>
        <li>Анализ конкурентов</li>
        <li>Поиск сегмента целевой аудитории</li>
        <li>Боли и потребности аудитории</li>
        <li>Разработка гипотез</li>
        <li>Создание MVP модели</li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: "ListComponent",
  props: {
    data: Array,
  },
  data() {
    return {
      active: null,
    };
  },
  methods: {
    openCompetencies(i) {
      if (i === this.active) {
        this.active = null;
      } else {
        this.active = i;
      }
    },
  },
};
</script>

<style lang="stylus">
.list-component {
  display: flex;
  padding: 60px 100px;
  background: var(--gray-1);
  grid-gap: 30px;

  h2 {
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 35px;
    padding: 30px 0;
    color: var(--blue);

    +below(1400px) {
      padding: 0;
    }
  }

  &__competencies {
    padding-left: 24px
  }

  li {
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 28px;
    padding-top: 30px;
    color: var(--blue);
    list-style unset

    +below(1400px) {
      font-size: 1.25rem;
    }
  }

  +below(1100px) {
    flex-direction: column;
    padding: 60px 15px;
    grid-gap: 0;
  }

  &__block {
    display: flex;
    flex-direction: column;
    width: 50%;

    & ul {
      padding-left: 24px
    }

    +below(1100px) {
      width: 100%;
    }
  }

  &__block-title {
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 35px;
    padding-bottom: 30px;
    color: var(--blue-o5);

    +below(1100px) {
      font-size: 1.25rem;
    }
  }

  &__item-title {
    //cursor pointer
  }

  &__item-subtitle {
    display none
    font-weight 400
    font-size 1.250rem
    line-height 24px
    color var(--gray-5)
  }

  &__item-subtitle--active {
    display block
  }

  &__block--mobile {
    +below(1100px) {
      display none
    }
  }
}
</style>
