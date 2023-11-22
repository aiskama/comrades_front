<template>
  <footer class="footer">
    <section class="help">
      <ImageComponent src="/static/svg/footer_picture.svg" title="ComradesDevs" class="help__image" />
      <div class="help__container">
        <span class="help__title">Ваш спутник в мир высоких технологий</span>
        <span class="help__subtitle">
          С 2019 года помогли 44 клиентам создать сложные стартапы, интернет-проекты и онлайн-сервисы.
        </span>
        <div class="help__buttons">
          <button class="btn btn--blue" type="button" @click="showRequestModal">
            <span>Обсудить проект</span>
          </button>
          <a href="/static/files/ComradesDevs.pdf" target="_blank" class="btn btn--white">
            <IconComponent name="presentation" />
            <span>Скачать презентацию</span>
          </a>
        </div>
      </div>
    </section>
    <div class="description">
      <ul class="description__block" id="footer_1block">
        <li>
          <a href="#top">
            <IconComponent name="logo" alt="ComradesDevs" />
          </a>
        </li>
        <li>
          <a class="description__block-subtitle" :href="`tel:+${$store.state.phone}`">
            {{ $store.state.phone | vMask("+# ### ### ## ##") }}
          </a>
        </li>
        <li>
          <a class="description__block-subtitle" :href="`mailto:${$store.state.email}`">
            {{ $store.state.email }}
          </a>
        </li>
        <li>
          <router-link class="description__block-subtitle" :to="{ name: 'contacts' }">
            {{ $store.state.address }}
          </router-link>
        </li>
        <li>
          <span>ИНН: {{ $store.state.inn }}</span>
        </li>
      </ul>
      <ul class="description__block">
        <li>
          <router-link :to="{ name: 'about' }" class="description__block-title">Компания</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'about' }" class="description__block-subtitle">О нас</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'contacts' }" class="description__block-subtitle">Контакты</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'blog' }" class="description__block-subtitle">Блог</router-link>
        </li>
      </ul>
      <ul class="description__block">
        <li>
          <router-link :to="{ name: 'services' }">
            <span class="description__block-title">Услуги</span>
          </router-link>
        </li>
        <li v-for="(item, i) in services" :key="i">
          <router-link
            class="description__block-subtitle"
            :to="{ name: 'services', params: { id: item.id } }"
          >
            {{ item.title }}
          </router-link>
        </li>
      </ul>
      <ul class="description__block">
        <li>
          <router-link :to="{ name: 'projects' }">
            <span class="description__block-title">Проекты</span>
          </router-link>
        </li>
        <li v-for="(item, i) in projects" :key="i">
          <router-link class="description__block-subtitle" :to="{ name: 'project', params: { id: item.id } }">
            {{ item.title }}
          </router-link>
        </li>
      </ul>
    </div>
    <a
      href="https://agima.partners/?utm_source=together-with-agima&utm_medium=beydzh&utm_campaign=comrades"
      target="_blank"
      class="agima"
    >
      <IconComponent name="agima" />
    </a>
    <div class="documents">
      <a href="/static/files/policy.pdf" target="_blank"><span>Политика конфиденциальности</span></a>
      <a href="/static/files/policy.pdf" target="_blank"><span>Пользовательское соглашение</span></a>
      <span>(c) Comrades Devs 2019 - {{ year }}</span>
    </div>
  </footer>
</template>

<script>
import IconComponent from "../components/IconComponent.vue";
import ImageComponent from "components/ImageComponent.vue";
import RequestModalComponent from "components/modals/RequestModalComponent.vue";
import dayjs from "dayjs";

export default {
  name: "FooterComponent",
  components: { ImageComponent, IconComponent },
  data() {
    return {
      year: dayjs().format("YYYY"),
    };
  },
  methods: {
    showRequestModal() {
      this.$store.state._modals.push({
        component: RequestModalComponent,
      });
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
};
</script>

<style lang="stylus">
.footer {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: auto;

  a {
    text-decoration: none;
  }
}

.help {
  display: flex;
  width: 100%;
  background: var(--gray-1);
  padding: 60px 100px 60px 100px;
  +below(1400px) {
    padding: 60px 80px;
  }
  +below(1100px) {
    padding: 60px 15px 20px;
    flex-direction: column;
  }

  &__image {
    width: 255px;
    height: auto;
    +below(1100px) {
      display: none;
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    padding-left: 110px;

    +below(1100px) {
      padding-left: 0;
      padding-bottom: 40px;
    }
  }

  &__title {
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 35px;
    color: var(--blue);

    +below(1400px) {
      font-size: 1.625rem;
    }

    +below(1100px) {
      font-size: 1.25rem;
      line-height: 25px;
    }
  }

  &__subtitle {
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 24px;
    color: var(--gray-4);
    padding-top: 8px;

    +below(1400px) {
      font-size: 1.125rem;
    }

    +below(1100px) {
      font-size: 1rem;
      line-height: 20px;
    }
  }

  &__buttons {
    display: flex;
    padding-top: 30px;
    gap: 30px;

    +below(540px) {
      flex-direction: column;
      gap: 15px;
    }
  }
}

.description {
  display: flex;
  width: 100%;
  padding: 30px 100px;
  justify-content: space-between;

  +below(1100px) {
    flex-direction: column;
    padding: 30px 15px;
  }

  &__block {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-left: 50px;
    +below(1100px) {
      padding-left: 0;
      padding-top: 30px;
    }

    & .icon {
      opacity: .7;
      width: 70px;
      height: 70px;
    }

    &-title {
      font-weight: 500;
      font-size: 1.5rem;
      line-height: 28px;
      color: var(--blue);

      +below(1400px) {
        font-size: 1.375rem;
      }

      +below(1100px) {
        font-size: 1.25rem;
        padding-bottom: 16px;
      }
    }

    &-subtitle {
      font-weight: 400;
      font-size: 1.25rem;
      line-height: 24px;
      color: var(--blue-o5);

      +below(1400px) {
        font-size: 1rem;
      }
    }

    li {
      list-style none

      a {
        text-decoration: none;

        &:hover {
          color: var(--blue-1);
        }

        &:active {
          color: var(--blue);
        }
      }

      img {
        width: 80px;
        height: 80px;
      }
    }
  }
}

#footer_1block {
  padding-right: 100px;
  padding-left: 0;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 24px;
  color: var(--blue-o5);

  +below(1400px) {
    font-size: 1.125rem;
  }

  +below(1100px) {
    font-size: 1rem;
    padding: 0;
  }
}

.documents {
  display: flex;
  padding: 18px 100px;
  background: var(--gray-1);
  justify-content: space-between;
  align-items: center;

  +below(1100px) {
    flex-direction: column;
    padding: 0 15px 30px 15px;
    background: var(--white);
    align-items: flex-start;
  }

  a {
    text-decoration: none;
    font-weight: 400;
    color: var(--blue-o5);

    &:hover {
      color: var(--blue-1);
    }

    &:active {
      color: var(--blue);
    }
  }

  span {
    padding: 8px 0 8px 0;
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 24px;
    color: var(--blue);

    +below(1400px) {
      font-size: 1.125rem;
    }

    +below(1100px) {
      font-size: 1rem;
    }
  }
}

.agima {
  padding: 0 100px 30px
  width fit-content
  margin-left: auto

  +below(1100px) {
    padding: 0 15px 30px;
    margin: 0;
  }

  & .icon {
    width 150px
    opacity: .7;
  }
}
</style>
