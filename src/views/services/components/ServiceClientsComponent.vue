<template>
  <section class="clients">
    <span>Клиенты и пользователи</span>
    <div class="clients__list">
      <div class="clients__list-component" v-for="(item, i) in data" :key="i">
        <a :href="item.link">
          <ImageComponent :head_img="item.img" :title="item.title" />
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import ImageComponent from "components/ImageComponent.vue";
export default {
  name: "ServiceClientsComponent",
  props: {
    data: Array,
  },
  data() {
    return {};
  },
  components: { ImageComponent },
};
</script>

<style lang="stylus">
.clients {
  display: flex;
  flex-direction: column;
  padding: 60px 100px;

  +below(1400px) {
    padding: 60px 80px;
  }

  +below(1100px) {
    padding: 60px 15px;
  }

  span {
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 35px;
    padding-bottom: 30px;
    color: var(--blue);

    +below(1100px) {
      font-size: 1.25rem;
      line-height: 25px;
    }
  }

  &__list {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    +above(1900px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }

    +below(1400px) {
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 25px;
    }

    +below(1100px) {
      grid-template-columns: 1fr 1fr ;
      grid-gap: 15px;
    }

    &-component {
      padding: 45px;
      background: var(--gray-1);
      border-radius: 10px;
      max-height: 150px
      +below(1400px) {
        padding: 35px;
      }

      +below(1100px) {
        padding: 25px;
      }
      img{
        width 100%
        height 100%
        object-fit contain
      }
    }
  }
}
</style>
