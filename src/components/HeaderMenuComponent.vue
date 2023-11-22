<template>
  <div class="header-menu" :class="{ 'header-menu--open': isOpen }">
    <div class="header-menu__header">
      <IconComponent name="logo_static" class="header-menu__logo" />
      <div class="header-menu__header-buttons">
        <a :href="`tel:+${$store.state.phone}`" class="header__number">
          <IconComponent name="phone" />
          <span>{{ $store.state.phone | vMask("+# ### ### ## ##") }}</span>
        </a>
        <button type="button" title="Закрыть меню" class="btn btn--white" @click="$emit('close')">
          <CloseIcon />
        </button>
      </div>
    </div>
    <div class="header-menu__body">
      <div class="header-menu__body-col">
        <router-link :to="{ name: 'about' }" class="header-menu__body-title">Компания</router-link>
        <div class="header-menu__body-links header-menu__body-links--flex">
          <router-link :to="{ name: 'about' }" class="link">О нас</router-link>
          <router-link :to="{ name: 'contacts' }" class="link">Контакты</router-link>
          <router-link :to="{ name: 'blog' }" class="link">Блог</router-link>
        </div>
      </div>
      <div class="header-menu__body-col">
        <router-link :to="{ name: 'services' }" class="header-menu__body-title">Услуги</router-link>
        <div class="header-menu__body-links">
          <router-link
            :to="{ name: 'services', params: { id: item.id } }"
            v-for="(item, i) in services"
            :key="i"
            class="link"
          >
            {{ item.title }}
          </router-link>
        </div>
      </div>
      <div class="header-menu__body-col">
        <router-link :to="{ name: 'projects' }" class="header-menu__body-title">Проекты</router-link>
        <div class="header-menu__body-links">
          <router-link
            :to="{ name: 'project', params: { id: item.id } }"
            v-for="(item, i) in projects"
            :key="i"
            class="link"
          >
            {{ item.title }}
          </router-link>
        </div>
      </div>
      <!--      <div class="header-menu__body-col header-menu__decisions">-->
      <!--        <router-link :to="{ name: 'projects' }" class="header-menu__body-title"-->
      <!--          >Решения и продукты</router-link-->
      <!--        >-->
      <!--        <div class="header-menu__body-links">-->
      <!--          <router-link-->
      <!--            :to="{ name: 'project', params: { id: item.id } }"-->
      <!--            v-for="(item, i) in projects"-->
      <!--            :key="i"-->
      <!--            class="link"-->
      <!--          >-->
      <!--            {{ item.title }}-->
      <!--          </router-link>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <div class="header-menu__footer">
      <div class="header-menu__footer-col">
        <span class="link">ИНН: {{ $store.state.inn }}</span>
        <a :href="`mailto:${$store.state.email}`" class="link">{{ $store.state.email }}</a>
        <router-link :to="{ name: 'contacts' }" class="link">{{ $store.state.address }}</router-link>
      </div>
      <div class="header-menu__footer-col">
        <!--        &lt;!&ndash;        <router-link :to="{ name: 'contacts' }" class="link">{{ $store.state.address }}</router-link>&ndash;&gt;-->
        <!--        <a href="/static/files/policy.pdf" class="link link&#45;&#45;white" target="_blank">-->
        <!--          Политика конфиденциальности-->
        <!--        </a>-->
        <!--        <a href="/static/files/policy.pdf" class="link link&#45;&#45;white" target="_blank">-->
        <!--          Пользовательское соглашение-->
        <!--        </a>-->
        <span class="link link--white">(c) Comrades Devs 2019 - {{ year }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import IconComponent from "components/IconComponent.vue";
import CloseIcon from "components/CloseIcon.vue";
import dayjs from "dayjs";

export default {
  name: "HeaderMenuComponent",
  props: {
    isOpen: Boolean,
  },
  data: () => ({
    year: dayjs().format("YYYY"),
  }),
  watch: {
    "$route.path"() {
      this.$emit("close");
    },
  },
  computed: {
    projects() {
      return this.$store.state.projects.slice(0, 3);
    },
    services() {
      return this.$store.state.services;
    },
  },
  components: { CloseIcon, IconComponent },
};
</script>

<style lang="stylus">
.header-menu {
  position: absolute;
  transition: var(--transition);
  transform: translateY(-100%);
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  gap 60px
  padding: 20px 100px 60px;
  border-radius: 0 0 10px 10px;
  background: var(--blue);
  flex-direction: column;
  z-index: 10;
  +below(1400px) {
    padding: 20px 80px 60px;
  }
  +below(1100px) {
    gap 30px
    padding: 20px 15px 30px;
  }
  +below(460px) {
    gap 15px
  }

  &--open {
    transform: translateY(0);
  }

  & .link {
    font-weight: 400px;
    font-size: 1.25rem;
    line-height: 24px;
    color: var(--white);
    opacity: 0.5;
    +below(460px) {
      font-size 1rem
      line-height 19px
    }

    &--white {
      opacity: 1;
    }
  }

  &__logo {
    width: 60px;
    height: 60px;
    +below(460px) {
      width: 30px;
      height: 30px;
    }
  }

  &__decisions {
    width 100%
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &__header-buttons {
    display: flex;
    gap: 80px;
    +below(1100px) {
      gap: 30px;
    }
    +below(460px) {
      gap 15px
    }

    & .header__number {
      +below(1100px) {
        display: flex;
      }
    }

    & .btn {
      height: 40px;
      max-width: 40px;
    }
  }

  &__body {
    display flex
    gap 45px
    +below(1100px) {
      flex-direction column
      gap 32px
    }
    +below(460px) {
      flex-direction column
      gap 24px
    }
  }

  &__body-title {
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 28px;
    color: var(--white);
    +below(460px) {
      font-size 1rem
      line-height 19px
    }
  }

  &__body-col {
    display flex
    flex-direction column
    gap 32px
    +below(1100px) {
      gap 16px
    }
    //+below(460px) {
    //  gap 8px
    //}
  }

  &__body-links {
    //column-count 2
    break-inside: avoid-column;
    margin -8px -16px
    min-width 250px
    +below(1400px) {
      display flex
      flex-direction column
    }
    +below(460px) {
      margin -4px -8px
    }

    &--flex {
      display flex
      flex-direction column
    }

    a {
      display: inline-block;
      padding 8px 16px
      +below(460px) {
        padding 4px 8px
      }
    }
  }

  &__footer {
    display flex
    justify-content space-between
    gap 16px
    align-items flex-end
    +below(1100px) {
      flex-direction column
      align-items flex-start
    }
    +below(460px) {
      gap 8px
    }
  }

  &__footer-col {
    display flex
    flex-direction column
    gap 8px
    //+below(1100px) {
    //  gap 16px
    //}
    //+below(460px) {
    //  gap 8px
    //}
  }
}
</style>
