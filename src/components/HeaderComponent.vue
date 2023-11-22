<template>
  <header class="header">
    <nav class="header__menu">
      <router-link :to="{ name: 'home' }" class="header__logo">
        <IconComponent name="logo_static" alt="Comrades Devs" />
      </router-link>
      <ul>
        <li>
          <router-link :to="{ name: 'about' }"><span>О нас</span></router-link>
        </li>
        <li>
          <router-link :to="{ name: 'services' }"><span>Услуги</span></router-link>
        </li>
        <li>
          <router-link :to="{ name: 'projects' }"><span>Проекты</span></router-link>
        </li>
        <li>
          <router-link :to="{ name: 'contacts' }"><span>Контакты</span></router-link>
        </li>
        <li>
          <router-link :to="{ name: 'blog' }"><span>Блог</span></router-link>
        </li>
      </ul>
    </nav>
    <span class="header__menu-title">{{ $route.meta.name }}</span>
    <div v-click-outside="closeMenu">
      <div class="header__right">
        <a :href="`tel:+${$store.state.phone}`" class="header__number">
          <IconComponent name="phone" />
          <span>{{ $store.state.phone | vMask("+# ### ### ## ##") }}</span>
        </a>
        <button type="button" class="header__menu-btn" title="Открыть меню" @click="isOpen">
          <IconComponent name="menu-2" />
        </button>
      </div>
      <HeaderMenuComponent :is-open="open" @close="closeMenu" />
    </div>
  </header>
</template>

<script>
import IconComponent from "components/IconComponent.vue";
import ClickOutside from "vue-click-outside";
import HeaderMenuComponent from "components/HeaderMenuComponent.vue";

export default {
  name: "HeaderComponent",
  data() {
    return {
      open: false,
    };
  },
  methods: {
    isOpen() {
      this.open = !this.open;
    },
    closeMenu() {
      this.open = false;
    },
  },
  components: { HeaderMenuComponent, IconComponent },

  directives: {
    ClickOutside,
  },
};
</script>

<style lang="stylus">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.04);
  width: 100%;
  padding: 20px 100px;

  +below(1400px) {
    padding: 20px 80px;
  }

  +below(1100px) {
    box-shadow: none;
    padding: 15px;
  }

  a {
    text-decoration: none;
  }

  &__logo {
    width: 60px;
    height: 60px;

    +below(480px) {
      width 45px
      height 45px
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__menu {
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 24px;
    color: var(--blue-o5);
    gap: 60px;

    +below(1100px) {
      display: flex;
      justify-content: space-between;
    }

    ul {
      list-style: none;
      margin: 0;
      padding-left: 0;
      display: flex;
      grid-gap: 45px;

      +below(1100px) {
        display: none;
      }

      li {
        a {
          text-decoration: none;
          font-weight: 500;
          line-height: 24px;
          color: var(--blue-o5);

          &:hover {
            color: var(--blue-1);
          }

          &:active {
            color: var(--blue);
          }
        }
      }
    }
  }

  &__menu-title {
    +above(1101px) {
      display: none;
    }

    +below(1100px) {
      display: flex;
      font-weight: 400;
      font-size: 1rem;
      line-height: 19px;
      color: var(--blue);
    }
  }

  &__right {
    display: flex;
    gap: 80px;
  }

  &__menu-btn {
    border: none;
    cursor: pointer;
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    transition: var(--transition);
    background: var(--gray-1);

    .icon {
      width: 24px;
      height: 24px;

      svg rect {
        transition var(--transition)
        //fill var(--blue)
      }
    }

    &:active {
      transform: scale(0.96);
    }

    &:hover {
      background: var(--blue);

      .icon svg rect {
        fill: var(--gray);
      }
    }
  }

  &__number {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--gray-1);
    text-decoration: none;
    border-radius: 10px;
    padding: 0 16px;
    font-size: 1.25rem;
    line-height: 24px;
    height: 40px;
    transition: var(--transition);
    color: var(--blue);

    +below(1100px) {
      display: none;
      font-size: 1rem;
    }

    .icon {
      width: 16px;
      height: 16px;
    }

    .icon svg path {
      transition: var(--transition);
      fill: var(--blue);
    }

    &:active {
      transform: scale(0.98);
    }

    &:hover {
      background: var(--blue);
      color: var(--gray);

      .icon svg path {
        fill: var(--gray);
      }
    }
  }
}
</style>
