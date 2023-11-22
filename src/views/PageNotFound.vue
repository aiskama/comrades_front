<template>
  <main class="not-found-page">
    <section class="not-found">
      <span class="not-found__title">Ooops...</span>
      <span class="not-found__subtitle">
        Кажется, эта страница недоступна. Попробуйте обновить ее позже
      </span>
      <button type="button" @click="handleBackButton" class="btn btn--blue">Обратно</button>
    </section>
  </main>
</template>

<script>
export default {
  name: "PageNotFound",
  asyncData({ res }) {
    res.status(404);
  },
  methods: {
    handleBackButton() {
      window.history.length > 2 ? this.$router.go(-1) : this.$router.push("/");
    },
  },
  metaInfo: {
    title: "Ooops...",
  },
};
</script>

<style lang="stylus">
.not-found-page {
  display flex
  flex-direction column
  justify-content flex-end
  align-items flex-end
  padding: 32px 100px 60px;
  position relative
  background-color var(--white)
  background-image url("/static/images/404.png")
  background-position bottom left
  background-size contain
  background-repeat no-repeat
  height calc(100vh - 300px)
  @media screen and ( max-height: 600px ) {
    height auto
  }
  +below(1400px) {
    padding: 32px 80px 60px;
  }
  +below(1100px) {
    padding: 32px 15px;
    height auto
  }
  +below(540px) {
    background var(--white)
  }
}

.not-found {
  display inline-flex
  flex-direction column
  max-width 550px
  width 100%
  justify-content flex-end
  align-items flex-end
  +below(768px) {
    max-width 300px
  }

  &__title {
    font-weight: 400;
    font-size: 3.75rem;
    line-height: 71px;
    color: var(--blue);
    +below(768px) {
      font-size: 1.75rem;
      line-height: 31px;
    }
  }

  &__subtitle {
    font-weight: 400;
    font-size: 1.875rem;
    line-height: 35px;
    text-align: right;
    color: var(--gray-5);
    padding 16px 0 32px
    +below(768px) {
      font-size: 1rem;
      line-height: 20px;
      padding 8px 0 16px
    }
  }
}
</style>
