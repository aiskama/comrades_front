<template>
  <div class="slider-arrows">
    <button type="button" title="Влево" class="slider-arrows__item" @click="$emit('left')">
      <IconComponent name="arrow-left-s-line" />
    </button>
    <button type="button" title="Вправо" class="slider-arrows__item" @click="$emit('right')">
      <IconComponent name="arrow-right-s-line" />
    </button>
  </div>
</template>

<script>
import IconComponent from "components/IconComponent.vue";

export default {
  name: "SliderArrowsComponent",
  components: { IconComponent },
};
</script>

<style lang="stylus">

.slider-arrows {
  display: flex;
  z-index: 1;


  &__item {
    z-index: 1;
    display flex
    justify-content center
    align-items center
    border-radius: 50%;
    border none
    width: 40px;
    height: 40px;
    background: #FFFFFF;
    .icon {
      display flex
      width 14px
    }
    .icon svg path {
      fill var(--gray-3)
    }
    &:hover {
      border-color white
      .icon svg path {
        fill var(--orange)
      }
    }
      &:active {
    transform scale(0.96)
  }

    .icon {
      svg path {
      }
    }

    &:first-child {
      box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.05);
      margin-right 5px
      +below(1360px) {
      }
    }

    &:last-child {
      box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.05);

      +below(1360px) {
      }
    }
  }
}
</style>
