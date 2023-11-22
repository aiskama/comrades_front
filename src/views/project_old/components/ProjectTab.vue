<template>
  <div class="project_adaptation">
    <div class="project_adaptation__tabs" v-if="parent_categories.length > 1">
      <button
        v-for="(tab, i) in parent_categories"
        :key="i"
        :class="{ 'project_adaptation__tabs-active': parent_activeTab === tab.id }"
        @click="parent_activeTab = tab.id"
        class="btn btn--white"
      >
        {{ tab.title }}
      </button>
    </div>
    <div class="project_adaptation__tabs">
      <button
        v-for="(tab, i) in categories"
        :key="i"
        :class="{ 'project_adaptation__tabs-active': activeTab === tab.id }"
        @click="activeTab = tab.id"
        class="btn btn--white"
      >
        {{ tab.title }}
      </button>
    </div>
    <Tab :data="project_images.map((i) => i.img)" />
  </div>
</template>

<script>
import Tab from "./Tab.vue";
// import IconComponent from "@/components/IconComponent.vue";

export default {
  name: "ProjectTabComponent",

  components: {
    // IconComponent,
    Tab,
  },
  data() {
    return {
      types: {},
      parent_types: {},
      tabs: [],
      tabs_parent: [],
      parent: {},

      activeTab: 0,
      parent_activeTab: 0,
    };
  },
  created() {
    this.parent_activeTab = this.parent_categories[0].id;
    this.activeTab = this.categories[0].id;
  },
  computed: {
    images() {
      return this.$store.state.project_page.projects_item.images;
    },
    parent_categories() {
      let array = [];
      this.images.forEach((img) => {
        array.push(img.category.parent);
      });
      return array.filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);
    },
    categories() {
      let array = [];
      this.images.forEach((img) => {
        array.push(img.category);
      });
      return array
        .filter((a) => a.parent.id === this.parent_activeTab)
        .filter((v, i, a) => a.findIndex((v2) => v2.id === v.id) === i);
    },
    project_images() {
      let array = [];
      this.images.forEach((img) => {
        array.push({
          category: img.category,
          img: img.img,
        });
      });
      return array.filter((a) => a.category.id === this.activeTab);
    },
  },
  mounted() {},
};
</script>

<style lang="stylus">
::-webkit-scrollbar {
  width: 5px;
  height 5px
  background-color: var(--white);
  transition: var(--tansition)
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: var(--blue);
}

.project_adaptation {
  display: flex;
  flex-direction: column;
  padding: 60px 100px;

  img {
    max-height: 400px;
  }

  +below(1400px) {
    padding: 30px 0 60px 80px;
  }

  +below(1100px) {
    padding: 30px 15px 60px 15px;
  }

  &__title {
    font-weight: 500;
    font-size: 1.875rem;
    line-height: 35px;
    color: var(--blue-o5);
    padding-bottom: 30px;

    +below(1100px) {
      font-size: 1.25rem;
    }
  }

  &__tabs {
    display: flex;
    gap: 30px;
    padding-bottom: 60px;
    justify-content: center;

    +below(1100px){
      flex-direction column
      gap 16px
    }

    &-active {
      color: var(--gray);
      background: var(--blue);
    }

    &-content {
      display: flex;
      gap: 40px;
      overflow-x: auto;
    }

    .btn {
      height: 40px;
    }
  }
}
</style>
