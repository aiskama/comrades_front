<template>
  <ul v-if="page !== null && totalItems !== null && totalItems > first" class="pagination">
    <li v-if="page !== 1">
      <button class="pagination__btn" type="button" @click="$emit('paginate', 1)" :disabled="disabled">
        <Icon category="system" name="arrow-left-s-line" />
      </button>
    </li>
    <li v-for="(p, i) in currentFive" :key="i">
      <button
        :disabled="disabled"
        :class="{ 'pagination__btn--active': page === p }"
        class="pagination__btn"
        type="button"
        @click="$emit('paginate', p)"
      >
        {{ p }}
      </button>
    </li>
    <li v-if="page !== total">
      <button class="pagination__btn" :disabled="disabled" type="button" @click="$emit('paginate', total)">
        <Icon category="system" name="arrow-right-s-line" />
      </button>
    </li>
  </ul>
</template>

<script>
import Icon from "./IconComponent.vue";

export default {
  name: "PaginationComponent",
  props: {
    page: Number,
    total: Number,
    totalItems: Number,
    first: Number,
    disabled: Boolean,
  },
  computed: {
    currentFive() {
      let startPage, endPage;
      let maxPages = 5;
      if (this.total <= maxPages) {
        // total pages less than max so show all pages
        startPage = 1;
        endPage = this.total;
      } else {
        // total pages more than max so calculate start and end pages
        let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
        let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
        if (this.page <= maxPagesBeforeCurrentPage) {
          // current page near the start
          startPage = 1;
          endPage = maxPages;
        } else if (this.page + maxPagesAfterCurrentPage >= this.total) {
          // current page near the end
          startPage = this.total - maxPages + 1;
          endPage = this.total;
        } else {
          // current page somewhere in the middle
          startPage = this.page - maxPagesBeforeCurrentPage;
          endPage = this.page + maxPagesAfterCurrentPage;
        }
      }
      return Array.from(Array(endPage + 1 - startPage).keys()).map((i) => startPage + i);
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="stylus">
.pagination {
  display flex
  justify-content center
  align-items center
  list-style none
  gap 16px

  &__btn {
    background: var(--gray-1);
    border-radius: 10px;
    width 44px
    height 44px
    display flex
    justify-content center
    align-items center
    border 1px solid transparent
    box-sizing border-box
    font-weight: normal;
    font-size: 1.25rem;
    line-height 24px;
    text-align: center;
    outline none
    color: var(--blue);
    cursor pointer

    &--active {
      background var(--blue)
      color var(--white)
      font-weight 500

      svg path {
        fill var(--white)
      }
    }

    .icon {
      width 20px
      height 20px

      svg {
        width 100%
        height 100%

        path {
          fill var(--blue)
        }
      }
    }
  }
}
</style>
