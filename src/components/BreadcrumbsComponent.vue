<template>
  <nav class="breadcrumbs">
    <ul>
      <li>
        <router-link :to="{ name: 'home' }">
          <span>Главная</span>
        </router-link>
      </li>
      <template v-for="(link, i) in links.filter((l) => !!l) || []">
        <li class="breadcrumbs__img" :key="`${i}icon`">
          <IconComponent name="breadcrumbs__img" />
        </li>
        <li :key="`${i}link`">
          <router-link :to="link.route">
            <span>{{ link.title }}</span>
          </router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
import IconComponent from "@/components/IconComponent.vue";

export default {
  name: "BreadcrumbsComponent",
  props: {
    links: Array,
  },
  components: {
    IconComponent,
  },
};
</script>

<style lang="stylus">
.breadcrumbs {
  display: flex;

  &__img .icon {
    max-width: 18px

    path {
      fill: var(--gray-5);
    }
  }


  ul {
    li {
      font-size: 1rem;
      list-style: none;
      line-height 19px
      margin-right: 15px;

      span,
      a {
        cursor: pointer;
        color: var(--gray-5);
        text-decoration: none;
      }
    }

    display: flex;
    align-content: center;
    flex-wrap: wrap;
  }
}
</style>
