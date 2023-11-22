<template>
  <section class="contacts_info">
    <div class="contacts_info__text">
      <div class="contacts_info__text-item" v-for="(item, i) in text" :key="i">
        <span class="contacts_info__text-item_title">{{ item.title }}</span>
        <a :href="item.link" target="_blank" class="contacts_info__text-item_subtitle">{{ item.subtitle }}</a>
      </div>
    </div>
    <div class="contacts_info__map">
      <client-only>
        <div class="map-component">
          <yandex-map :settings="settings" :coords="coords">
            <ymap-marker marker-id="0" :coords="coords" />
          </yandex-map>
        </div>
      </client-only>
    </div>
  </section>
</template>

<script>
import ClientOnly from "vue-client-only";
import { loadYmap, yandexMap, ymapMarker } from "vue-yandex-maps";

export default {
  name: "ContactsInfoComponent",
  data() {
    return {
      address: this.$store.state.address,
      isLoaded: false,
      coords: [42.991383, 47.492528],

      settings: {
        apiKey: "acf7a329-99c5-4322-968e-7d448d951ec7",
        lang: "ru_RU",
        coordorder: "latlong",
        version: "2.1",
      },
    };
  },
  computed: {
    text() {
      return [
        {
          title: "Наш адрес",
          subtitle: this.$store.state.address,
          link: `https://yandex.ru/maps/?pt=${this.coords[1] || 0},${this.coords[0] || 0}&z=18`,
        },
        {
          title: "Почта",
          subtitle: this.$store.state.email,
          link: `mailto:${this.$store.state.email}`,
        },
        {
          title: "Номер телефона",
          subtitle: this.$options.filters.vMask(this.$store.state.phone, "+# ### ### ## ##"),
          link: `tel:+${this.$store.state.phone}`,
        },
      ];
    },
  },
  mounted() {
    loadYmap({ ...this.settings }).then(() => {
      window.ymaps.ready(() => {
        window.ymaps.geocode(this.address).then((res) => {
          this.coords = res.geoObjects.get(0).geometry.getCoordinates();
        });
      });
    });
  },
  components: {
    ClientOnly,
    yandexMap,
    ymapMarker,
  },
};
</script>

<style lang="stylus">
.contacts_info {
  display: flex;
  padding: 60px 100px;
  gap 60px

  +below(1400px) {
    padding: 30px 0 60px 80px;
  }

  +below(1100px) {
    padding: 30px 15px 60px 15px;
    flex-direction column
  }

  &__text {
    display: flex;
    flex-direction: column;
    gap 30px

    &-item {
      display: flex;
      flex-direction: column;
      gap 8px

      &_title {
        font-weight 400px
        font-size 1.25rem
        line-height 24px
        color var(--gray-3)
      }

      &_subtitle {
        font-weight 400px
        font-size 1.25rem
        line-height 24px
        color var(--blue)
      }
    }
  }

  &__map {
    width: 100%;
    box-sizing: border-box;

    .map-component {
      width: 100%;
      box-sizing: border-box;

      +below(1400px) {
        height: 350px;
      }
      +below(1100px) {
        height: 200px;
      }

      .ymap-container {
        box-sizing: border-box;
        overflow hidden
        height: 490px;
        border-radius 10px

        +below(1400px) {
          height: 350px;
        }

        +below(1100px) {
          height 200px
        }

      }
    }
  }
}
</style>

<style lang="stylus">
.map-component {
  width: 100%;

  +below(1024px) {
    width: 100%;
    height: 200px;
  }

  .ymap-container {
    height: 100%;

    +below(1024px) {
      width: 100%;
      height: 200px;
    }
  }

  &__hint {
    background: #FFFFFF;
    padding: 6px 12px;
    font-size: 1rem;
    font-weight: bold;
    position: absolute;
    width: 200px;
    border-radius: 10px;
  }
}
</style>
