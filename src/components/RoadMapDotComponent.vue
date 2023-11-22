<template>
  <div ref="dot" class="road-map-dot">
    <span class="road-map-dot-content" :class="{ 'road-map-dot__fill': isFill }"></span>
  </div>
</template>
<script>
export default {
  name: "RoadMapDotComponent",
  props: {
    isEven: {
      type: Boolean,
    },
  },
  data() {
    return {
      isFill: null,
    };
  },
  // mounted() {
  //   window.addEventListener("scroll", this.handleScroll);
  // },
  // beforeDestroy() {
  //   window.removeEventListener("scroll", this.handleScroll);
  // },
  // methods: {
  //   handleScroll() {
  //     clearTimeout(scrollDebounce);
  //     let scrollDebounce = setTimeout(() => {
  //       // Получаем высоту видимой части страницы
  //       const windowHeight = window.innerHeight;
  //
  //       let el = this.$refs.dot.getBoundingClientRect();
  //
  //       if (this.isEven) {
  //         this.isFill = el.top < windowHeight / 2 - 100;
  //       } else this.isFill = el.top < windowHeight / 2;
  //     }, 500);
  //   },
  // },
};
</script>
<style lang="stylus">
.road-map-dot {
  display flex
  justify-content center
  align-items center
  width 45px
  height 45px
  border-radius 50%
  background var(--blue)
  border 1px dotted var(--red)
  padding: 7px

  &-content {
    width 100%
    height 100%
    border-radius 50%
    border 1px solid var(--red)
    transition var(--transition)
  }

  &__fill {
    background var(--red)
  }
}
</style>
