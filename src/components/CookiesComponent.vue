<template>
  <div v-if="showCookie" class="cookies">
    <div class="cookies__container">
      <div class="cookies__body">
        <span>
          Мы используем файлы Cookie, чтобы вам было удобнее пользоваться нашим сайтом. Продолжая
          использование сайта, Вы соглашаетесь с использованием нами файлов Cookies
        </span>
      </div>
      <div class="cookies__confirmed">
        <button class="btn btn--blue" @click="confirmCookies">Принять</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CookiesComponent",
  data() {
    return {
      showCookie: false,
      isConfirmed: false,
    };
  },
  mounted() {
    this.isConfirmed = localStorage.getItem("confirmed-cookie");
    this.showCookie = !this.isConfirmed;
  },
  methods: {
    confirmCookies() {
      localStorage.setItem("confirmed-cookie", "confirm");
      this.showCookie = false;
    },
  },
};
</script>

<style lang="stylus">
.cookies {
  padding 15px 15px
  display flex
  width 100%
  bottom 0
  z-index: 20;
  justify-content: space-between;
  align-items: center;
  position: fixed;

  &__container {
    margin 0 auto
    width 100%
    display flex
    max-width: 940px;
    padding: 20px;
    background-color: var(--white);
    border-radius: 10px;
    box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.4);

    +below(700px) {
      flex-direction column
      gap 20px
      padding 15px
    }
  }

  &__body {
    width 100%
    display flex
    align-items center
    padding 0 10px
  }

  span {
    margin: 0;
    font-size: 1rem;
    text-align: left;
    color: var(--dark);
    font-weight 500

    +below(700px) {
      font-size 0.875rem
      text-align center
    }
  }

  &__confirmed {
    display flex
    justify-content flex-end

    +below(700px) {
      width 100%
      justify-content center
    }
  }
}
</style>
