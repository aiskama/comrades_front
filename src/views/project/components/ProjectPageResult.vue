<template>
  <article class="project-page-result" v-if="canShowBlock">
    <h2 class="project-page-title">Результат работы</h2>
    <div class="project-page-result__row">
      <div :class="{ 'project-page-result__wrapper': data.results.length }">
        <!--      <p class="project-page-result__text" v-if="data.work_result">{{ data.work_result }}</p>-->
        <EditorJSArticleComponent
          v-if="data.work_result"
          :text="work_result"
          class="project-page-result__text"
        />
        <div class="project-page-result__counts" v-if="data.results.length">
          <div class="project-page-result__count" v-for="(item, i) in data.results.slice(0, 2)" :key="i">
            <span v-if="item.value">{{ item.value }}</span>
            <span v-if="item.title">{{ item.title }}</span>
          </div>
        </div>
      </div>
      <div v-if="data.some_text" class="project-page-result__wrapper project-page-result__wrapper-center">
        <span class="project-page-title project-page-title--blue">
          {{ data.some_text }}
        </span>
        <button
          type="button"
          class="btn btn--blue project-page-result__btn"
          v-if="data.some_text"
          @click="showRequestModal"
        >
          Хочу такой же проект
        </button>
      </div>
      <template v-if="data.review_description">
        <div :class="{ 'project-page-result__wrapper': data.review_img }">
          <div class="project-page-result__review">
            <h2 class="project-page-title">Отзыв заказчика</h2>
            <span class="project-page-title project-page-title--blue" v-if="data.review_fio">
              {{ data.review_fio }}
            </span>
            <span class="project-page-title project-page-title--small" v-if="data.review_post">
              {{ data.review_post }}
            </span>
            <p
              class="project-page-result__text project-page-result__text--gray"
              v-if="data.review_description"
            >
              {{ data.review_description }}
            </p>
          </div>
          <ImageComponent
            v-if="data.review_img"
            :head_img="data.review_img"
            :title="data.review_fio"
            class="project-page-result__image"
          />
        </div>
      </template>
    </div>
  </article>
</template>

<script>
import ImageComponent from "components/ImageComponent.vue";
import RequestModalComponent from "components/modals/RequestModalComponent.vue";
import EditorJSArticleComponent from "components/EditorJSArticleComponent.vue";

export default {
  name: "ProjectPageResult",
  components: { EditorJSArticleComponent, ImageComponent },
  computed: {
    data() {
      return this.$store.state.project_page;
    },
    canShowBlock() {
      return !!(this.data && (this.data.work_result || this.data.review_description));
    },
    work_result() {
      if (this.data && this.data.work_result) {
        try {
          return JSON.parse(this.data.work_result);
        } catch (e) {
          return this.data.work_result;
        }
      }
      return "";
    },
  },
  methods: {
    showRequestModal() {
      this.$store.state._modals.push({
        component: RequestModalComponent,
      });
    },
  },
};
</script>

<style lang="stylus">
.project-page-result {
  display flex
  flex-direction column
  gap 32px

  &__row {
    display grid
    grid-template-columns 1fr
    gap 65px

    +below(1220px) {
      gap 60px
    }

    .project-page-title {
      padding 0
      margin-right 15px

      +below(700px) {
        font-size: 1.25rem
        line-height: 24px;
      }
    }
  }

  &__btn {
    margin-right auto
    padding: 0 32px

    +below(1220px) {
      margin-right: 0
      margin-left: auto
    }

    +below(920px) {
      margin: 0;
    }
  }

  &__counts {
    display flex
    align-items flex-start
    gap 60px

    +below(1220px) {
      gap 42px
    }

    +below(920px) {
      gap: 60px
    }
  }

  &__image {
    height auto
    width auto
    max-width 300px
    object-fit contain
    object-position left
  }

  &__wrapper {
    display grid
    grid-template-columns 1.5fr 1fr
    gap 79px
    align-items flex-start

    & .project-page-result__text {
      max-width 671px
    }

    +below(1220px) {
      gap 59px
      grid-template-columns 2fr 1fr
    }

    +below(920px) {
      grid-template-columns 1fr
      gap 32px
    }

    &-center {
      align-items center
    }
  }

  &__review {
    display grid
    margin-right 15px

    .project-page-title--blue {
      margin 32px 0 16px
    }

    & ^[0]__text--gray {
      margin-top 16px

      +below(1220px) {
        margin-top: 8px
      }
    }
  }

  &__text {
    margin-right 15px
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 28px;
    color: var(--blue);

    +below(1220px) {
      font-size 1.375rem
      line-height 26px
    }

    +below(900px) {
      font-size 1rem
      line-height 19px
    }

    &--gray {
      color var(--gray-5)
    }
  }

  &__count {
    display grid
    gap 8px

    span {
      font-weight 400

      &:first-child {
        font-size: 3.75rem;
        line-height: 71px;
        color: var(--red);

        +below(920px) {
          font-size: 1.875rem
          line-height: 35px;
        }
      }

      &:last-child {
        font-weight: 400;
        font-size: 1.5rem;
        line-height: 28px;
        color: var(--blue);

        +below(1220px) {
          font-size 1.375rem
        }

        +below(920px) {
          font-size: 1rem
          line-height: 18px
        }
      }
    }
  }
}
</style>
