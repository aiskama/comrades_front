<template>
  <img
    :src="src || source"
    :alt="alt"
    loading="lazy"
    class="img"
    decoding="async"
    :class="{ lazy: loader, loaded, 'img--contain': contain }"
    @load="loaded = true"
    @error="loaded = true"
  />
</template>

<script>
export default {
  name: "ImgComponent",
  props: {
    src: String,
    title: String,
    head_img: {
      type: Object,
      default: () => {},
    },
    quality: {
      type: String,
      default: "90",
    },
    width: [Number, String],
    height: [Number, String],
    loader: {
      type: Boolean,
      default: true,
    },
    contain: Boolean,
  },
  data() {
    return {
      loaded: false,
    };
  },
  computed: {
    alt() {
      return this.head_img?.alt || this.title || "";
    },
    endpoint() {
      return this.$store.state._env.MEDIA_ENDPOINT;
    },
    source() {
      let link = null;
      if (this.head_img && this.head_img.id) {
        const urlParams = new URLSearchParams();
        if (this.quality) urlParams.append("quality", this.quality);
        if (this.width) urlParams.append("width", "" + this.width);
        if (this.height) urlParams.append("height", "" + this.height);
        const urlParamsString = urlParams.toString();
        if (this.head_img.links) {
          link = this.head_img.links.find((i) => i.query === urlParamsString);
          if (link) {
            return this.endpoint + link.path;
          }
        }
        return `${this.endpoint}/action/img/${this.head_img.id}?${urlParamsString}`;
      }
      return "static/images/no-image.jpg";
    },
  },
};
</script>

<style lang="stylus">
.img {
  object-fit cover
  object-position center

  &--contain {
    object-fit contain
  }
}

.lazy {
  opacity 0
  transition var(--transition)

  &.loaded {
    opacity 1
  }
}
</style>
