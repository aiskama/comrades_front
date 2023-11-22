<template>
  <div class="photo-modal modal-body">
    <ProjectSlider :items="options.images" :index="options.i" />
  </div>
</template>
<script>
import ProjectSlider from "../../views/project_old/components/ProjectSlider.vue";
export default {
  name: "PhotoModal",
  props: {
    options: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  components: {
    ProjectSlider,
  },
};
</script>
<style lang="stylus">
.modal__body {
  margin 80px 0
}
.photo-modal {
  display flex
  justify-content center
  max-width calc(100% - 400px)
  //height 800px
  //max-height 80vh
  overflow-y auto
  padding: 0

  +below(1200px) {
    max-width calc(100% - 200px)
    //padding: 15px 15px;
  }

  +below(600px) {
    max-width calc(100% - 30px)
    //padding: 15px 15px;
    border-radius: 5px;
  }

  .slider__container {
    padding 0
  }
}
</style>
