<template>
  <section class="clients">
    <span>Клиенты и пользователи</span>
    <ul class="clients__list">
      <li class="clients__list-item" v-for="(item, i) in data" :key="i">
        <a :href="item.link" :title="item.title">
          <ImageComponent :head_img="item.img" :title="item.title" width="300" height="100" />
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
import ImageComponent from "components/ImageComponent.vue";

export default {
  name: "AboutClientsComponent",
  props: {
    data: Array,
  },
  components: { ImageComponent },
};
</script>

<style lang="stylus">
.clients {
  display: flex;
  flex-direction: column;
  padding: 30px 100px 60px;

  +below(1400px) {
    padding: 30px 80px 60px;
  }

  +below(1100px) {
    padding: 15px 15px 30px;
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
    list-style none
    padding 0
    margin 0
    grid-template-columns: repeat(5, 1fr);

    +below(1600px) {
      grid-template-columns: repeat(4, 1fr);
    }
    +below(960px) {
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 25px;
    }

    +below(560px) {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 15px;
    }
  }

  &__list-item {
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

    img {
      width 100%
      height 100%
      object-fit contain
    }
  }
}
</style>
