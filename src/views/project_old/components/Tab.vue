<template>
  <div class="project_adaptation__tabs-content">
    <div
      v-for="(image, i) in data"
      :key="i"
      @click="openAskModal(i, data)"
      class="project_adaptation__tabs-content--cursor"
    >
      <ImageComponent :head_img="image" />
    </div>
  </div>
</template>

<script>
import ImageComponent from "components/ImageComponent.vue";
import PhotoModal from "components/modals/PhotoModal.vue";
export default {
  data() {
    return {};
  },
  props: {
    data: Array,
  },
  methods: {
    openAskModal(i, images) {
      this.$store.state._modals.push({
        component: PhotoModal,
        options: {
          i,
          images,
        },
      });
    },
  },
  components: { ImageComponent },
};
</script>

<style lang="stylus">
.project_adaptation__tabs-content--cursor {
  cursor pointer
}
</style>
