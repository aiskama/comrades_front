<template>
  <article class="project-page-color" v-if="data && data.palettes">
    <h2 class="project-page-title">Цветовая палитра</h2>
    <ul class="project-page-color__list">
      <li v-for="(color, i) in data.palettes.filter((p) => !!p.title)" :key="i">
        <figure :style="`background-color: ${color.code}`"></figure>
        <span>{{ color.title }}</span>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  name: "ProjectPagePalette",
  computed: {
    data() {
      return this.$store.state.project_page;
    },
  },
};
</script>

<style lang="stylus">
.project-page-color {
  display flex
  flex-direction column
  gap 32px

  &__list {
    display grid
    gap 40px
    grid-template-columns repeat(4, 1fr)
    +below(1000px) {
      grid-template-columns repeat(3, 1fr)
    }
    +below(1220px) {
      gap 32px
    }
    +below(900px) {
      grid-template-columns repeat(1, 1fr)
      gap 16px
    }
    +below(430px) {
      grid-template-columns auto
    }

    li {
      display flex
      flex-direction column
      gap 16px

      +below(900px) {
        gap 8px
      }

      figure {
        height 120px
        width 100%
        border-radius 10px
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.12);

        +below(1220px) {
          height 90px
        }

        +below(900px) {
          height 60px
        }
      }

      span {
        font-weight: 400;
        font-size: 1.875rem;
        line-height: 35px
        color var(--gray-5)

        +below(900px) {
          font-size: 1.25rem;
          line-height: 24px
        }
      }
    }
  }
}
</style>
