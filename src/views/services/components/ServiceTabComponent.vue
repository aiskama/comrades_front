<template>
  <section class="tab-component">
    <div class="tab-component__btns">
      <router-link
        :to="{ name: 'services' }"
        :class="{ 'tab-component__btns-active': activeTab === 0 }"
        @click="activeTab = 0"
        class="btn btn--white"
      >
        Все
      </router-link>
      <router-link
        v-for="tab in mainServices"
        :key="tab.id"
        :to="{ name: 'services', params: { id: tab.id } }"
        :class="{ 'tab-component__btns-active': activeTab === tab.id }"
        @click="activeTab = tab.id"
        class="btn btn--white"
      >
        {{ tab.title }}
      </router-link>
    </div>
    <template v-if="activeTab === 0">
      <div class="tab-component__services">
        <ServiceCardComponent v-for="(item, i) in services" :key="i" :data="item" />
      </div>
    </template>
    <template v-else>
      <template v-for="item in mainServices">
        <div class="tab-component__content" v-if="activeTab === item.id" :key="item.id">
          <Tab :services="item" />
        </div>
      </template>
    </template>
  </section>
</template>

<script>
import Tab from "./Tab.vue";
import MainServicesComponent from "../../home/components/MainServicesComponent.vue";
import ServiceCardComponent from "components/ServiceCardComponent.vue";
export default {
  name: "ServiceTabComponent",

  components: {
    ServiceCardComponent,
    MainServicesComponent,
    Tab,
  },

  computed: {
    services() {
      return this.$store.state.service_page.services.filter((item) => !item.is_main);
    },
    mainServices() {
      return this.$store.state.service_page.services.filter((item) => item.is_main);
    },
  },
  data() {
    return {
      activeTab: 0,
    };
  },
  methods: {
    changeTab(current) {
      let href = location.href.replace(/#.+/, "");
      history.replaceState(null, "", href + "#" + current);

      this.tabs.forEach((tab) => {
        tab.active = tab.head === current;
      });
    },
  },

  mounted() {
    if (this.$route.params.id) {
      this.activeTab = parseInt(this.$route.params.id);
    } else this.activeTab = 0;
  },
};
</script>

<style lang="stylus">
.tab-component {
  display: flex;
  flex-direction: column;

  &__btns {
    padding: 32px 100px 0;
    display: flex;
    gap: 20px;

    +below(1400px) {
      padding: 32px 80px 0;
      display: flex;
      flex-wrap: wrap;
    }

    +below(1100px) {
      padding: 16px 15px 0;
    }

    .btn {
      height: 40px;
    }

    &-active {
      color: var(--gray);
      background: var(--blue);
    }
  }

  &__services {
    padding: 60px 100px;
    background-color: var(--white);
    display grid
    grid-template-columns repeat(3, 1fr)
    grid-gap 30px

    +below(1400px) {
      padding: 60px 80px 32px 80px;
    }

    +below(1100px) {
      padding: 30px 15px 32px 15px;
    }

    +below(1024px) {
      grid-template-columns repeat(2, 1fr)
    }

    +below(728px) {
      grid-template-columns repeat(1, 1fr)
    }

    & .service-card {
      background var(--gray-1)
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    transition: var(--transition);

    //.slider__container {
    //  padding 32px 100px
    //}

    .slider__title {
      padding-bottom 32px
    }

    &-direction {
      padding: 60px 100px;
      background-color: var(--gray-1);

      +below(1400px) {
        padding: 60px 80px 0 80px;
      }

      +below(1100px) {
        padding: 30px 15px 0 15px;
      }

      &_title {
        font-weight: 500;
        font-size: 1.875rem;
        line-height: 35px;
        color: var(--blue-o5);

        +below(1100px) {
          font-size: 1.25rem;
        }
      }

      &_blocks {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding-top: 60px;
        gap: 60px;
        align-items: end;

        +below(1100px) {
          padding: 30px 15px 0 15px;
          grid-template-columns: 1fr;
        }

        button {
          max-width: 220px;
          +below(1100px) {
            max-width 100%
          }
        }
      }
    }

    & .our-destinations {
      background var(--white)
      padding-top: 30px

      & .our-destinations__title {
        color var(--blue-o5)
      }
    }

    &-projects {
      padding: 32px 100px;

      +below(1400px) {
        padding: 32px 80px 0;
      }

      +below(1100px) {
        padding: 16px 15px 30px;
      }

      h2 {
        font-weight: 500;
        font-size: 1.875rem;
        line-height: 35px;
        color: var(--blue-o5);

        +below(1100px) {
          font-size: 1.25rem;
        }
      }

      &_blocks {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding-top: 32px;
        grid-gap: 60px;

        +below(1800px) {
          grid-template-columns: 1fr 1fr;
        }

        +below(1400px) {
          grid-gap: 32px;
        }

        +below(1100px) {
          grid-template-columns: 1fr;
        }
      }
    }
  }
}
</style>
