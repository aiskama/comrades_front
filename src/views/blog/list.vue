<template>
  <main class="blog-page">
    <section class="blog-page__header">
      <BreadcrumbsComponent :links="breadcrumbs" />
      <h1 class="blog-page__title">Блог</h1>
    </section>
    <section class="blog-page__list" v-if="items.data.length">
      <BlogItemComponent v-for="(item, i) in items.data" :data="item" :key="i" />
    </section>
    <div class="blog-page__empty" v-else>Пока ничего нет</div>
    <section
      class="blog-page__pagination"
      v-if="items.paginatorInfo.total && items.paginatorInfo.total > first"
    >
      <PaginationComponent
        :first="first"
        :page="page"
        :disabled="loading"
        :total="Math.ceil(items.paginatorInfo.total / first)"
        :totalItems="items.paginatorInfo.total"
        @paginate="handlePagination"
      />
    </section>
  </main>
</template>

<script>
import BreadcrumbsComponent from "components/BreadcrumbsComponent.vue";
import BlogItemComponent from "./components/BlogItemComponent.vue";
import PaginationComponent from "components/Pagination.vue";
import BLOG_PAGE from "@/graphql/queries/blog_page.graphql";

function getPage(route) {
  const urlParams = new URLSearchParams(route.fullPath.replace("/blog", ""));
  const page = urlParams.get("page");
  return page ? parseInt(page) : 1;
}

let isMobileGlb = null;

async function fetchData(apollo, page, first) {
  return await apollo.query({
    query: BLOG_PAGE,
    variables: {
      page: page,
      first: first,
    },
  });
}

export default {
  name: "BlogPage",
  async asyncData({ apollo, route, isMobile, store }) {
    let initFirst = 13;
    isMobileGlb = isMobile;
    if (isMobile) {
      initFirst = 7;
    }
    await fetchData(apollo.defaultClient, getPage(route), initFirst)
      .then(({ data }) => {
        if (data && data.blogs_paginate) {
          store.state.blog_page = data.blogs_paginate;
        }
      })
      .catch(() => {});
  },
  data() {
    return {
      loading: false,
      page: getPage(this.$route),
      first: isMobileGlb ? 7 : 13,
      total: 50,
      breadcrumbs: [
        {
          route: {
            name: "blog",
          },
          title: "Блог",
        },
      ],
    };
  },
  computed: {
    items() {
      return this.$store.state.blog_page;
    },
  },
  methods: {
    handlePagination(page) {
      let link = location.origin + location.pathname;

      function getParam(string) {
        return link.includes("?") ? "&" + string : "?" + string;
      }

      if (!this.loading) {
        this.loading = true;
        this.page = page;

        if (this.page && this.page !== 1) link += getParam("page=" + this.page);
        history.pushState({}, null, link);

        fetchData(this.$apollo, this.page, this.first)
          .then(({ data }) => {
            if (data && data.blogs_paginate) {
              this.$store.state.blog_page = data.blogs_paginate;
            }
          })
          .finally(() => {
            this.loading = false;
            this.$nextTick(() => {
              window.scroll(0, 0);
            });
          });
      }
    },
  },
  components: { PaginationComponent, BlogItemComponent, BreadcrumbsComponent },
  metaInfo: {
    title: "Блог",
  },
};
</script>

<style lang="stylus">
.blog-page {
  &__header {
    display: flex;
    flex-direction: column;
    padding: 32px 100px 60px;
    gap 60px
    background: var(--gray-1);
    width: 100%;
    +below(1400px) {
      padding: 32px 80px 15px;
    }
    +below(1100px) {
      padding: 32px 15px 15px;
    }
  }

  &__title {
    font-weight: 500;
    font-size: 3.75rem;
    line-height: 71px;
    color: var(--blue);
    margin 0
    padding 0

    +below(1100px) {
      font-size: 1.875rem;
      line-height: 35px;
    }
  }

  &__list {
    display grid
    grid-template-columns repeat(3, 1fr)
    grid-gap 30px
    padding: 32px 100px 60px;
    background: var(--white);
    +below(1400px) {
      padding: 32px 80px 60px;
    }
    +below(1100px) {
      padding: 32px 15px 60px;
      grid-template-columns repeat(2, 1fr)
    }
    +below(780px) {
      grid-template-columns 1fr
    }

    & .blog-item {
      flex 1
      +below(1400px) {
        flex 50%
      }

      &:first-child {
        flex 100%
      }
    }
  }

  &__pagination {
    padding: 0 100px 32px;
    background: var(--white);
    +below(1400px) {
      padding: 0 80px 32px;
    }
    +below(1100px) {
      padding: 0 15px 15px;
    }
  }

  &__empty {
    padding: 0 100px 32px;
    background: var(--gray-1);
    font-size 1.875rem
    +below(1400px) {
      padding: 0 80px 32px;
    }
    +below(1100px) {
      padding: 0 15px 15px;
    }
  }
}
</style>
