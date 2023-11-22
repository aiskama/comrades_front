<template>
  <div v-if="data.length" class="service-item-content-stages-work">
    <h3 class="service-item-content-stages-work__title">Этапы работы</h3>
    <ul class="service-item-content-stages-work__list">
      <li v-for="(item, i) in data" :key="i">
        <div @click="changeActive(i)" class="service-item-content-stages-work__item-wrapper">
          <span>{{ item.title }}</span>
          <IconComponent
            v-if="item.description"
            class="service-item-content-stages-work__item-icon"
            :class="{
              'service-item-content-stages-work__item-icon--active': activesIndex.includes(i),
            }"
            name="arrow"
          />
        </div>
        <div
          v-if="item.description"
          class="service-item-content-stages-work__item-subtitle"
          :class="{ 'service-item-content-stages-work__item-subtitle--active': activesIndex.includes(i) }"
        >
          <span>{{ item.description }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import IconComponent from "components/IconComponent.vue";

export default {
  name: "ServiceStagesWorkComponent",
  components: { IconComponent },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activesIndex: [],
    };
  },
  methods: {
    changeActive(i) {
      if (this.activesIndex.includes(i)) {
        this.activesIndex = this.activesIndex.filter((item) => item !== i);
      } else {
        this.activesIndex = [...this.activesIndex, i];
      }
    },
  },
};
</script>

<style lang="stylus">
.service-item-content-stages-work {
  display flex
  flex-direction column

  &__title {
    line-height 30px
    font-size: 1.5rem
    color var(--blue)

    +below(900px) {
      font-size: 1.17rem
    }
  }

  &__list {
    list-style none

    & li {
      border-bottom: 1px solid #d1d1d1;
      padding-bottom: 30px;
      padding-top: 30px;
      color var(--blue)

      +below(900px) {
        padding-bottom: 20px;
        padding-top: 20px;
      }
    }
  }

  &__item-wrapper {
    cursor: pointer;
    font-size: 1.25rem
    font-weight: 500
    margin: 0 8px
    display flex
    justify-content space-between
    align-items center

    +below(900px) {
      font-size: 1rem
    }
  }

  &__item-icon {
    transition var(--transition)
    +below(900px) {
      width 16px
      height 16px
    }

    &--active {
      transform rotate(180deg)
    }
  }

  &__item-subtitle {
    height 0
    overflow hidden
    visibility hidden
    opacity 0
    transition var(--transition)
    max-width 90%
    font-size: 1.125rem
    line-height 22px
    padding: 0 16px;

    +below(900px) {
      font-size: 0.875rem
    }

    //& > div {
    //  padding: 20px 0 0 16px;
    //}

    &--active {
      padding-top: 20px
      height auto
      visibility visible
      opacity: 1;

      +below(900px) {
        padding-top: 8px
      }
    }
  }
}
</style>
