<template>
  <section class="projects-tabs">
    <div class="projects-tabs__btns-wrapper">
      <span class="projects-tabs__filter-title">Категория</span>
      <div class="projects-tabs__btns">
        <button
          v-for="(tab, i) in parent_categories"
          :key="i"
          :class="{ 'projects-tabs__btns--active': activeTabs.category === tab.id }"
          @click="setActiveTab(tab.id, 'category')"
          class="btn btn--white"
        >
          {{ tab.title }}
        </button>
      </div>
      <span class="projects-tabs__filter-title">Тип</span>
      <div class="projects-tabs__btns">
        <button
          v-for="(tab, i) in tags"
          :key="'tag' + i"
          :class="{ 'projects-tabs__btns--active': activeTabs.tag === tab.id }"
          @click="setActiveTab(tab.id, 'tag')"
          class="btn btn--white projects-tabs__btns"
        >
          {{ tab.title }}
        </button>
      </div>
    </div>
    <h1 class="projects-tabs__title">{{ title }}</h1>
    <div class="projects-tabs__content">
      <ProjectsTabContentComponent :data="projects" />
    </div>
    <div class="projects-tabs__empty" v-if="!projects.length">Пока ничего нет</div>
  </section>
</template>

<script>
import ProjectsTabContentComponent from "./ProjectsTabContentComponent.vue";

export default {
  name: "ProjectTabComponent",
  components: {
    ProjectsTabContentComponent,
  },
  data: () => ({
    activeTabs: {
      category: null,
      tag: null,
    },
  }),
  computed: {
    tags() {
      return this.$store.state.projects_page.tags;
    },
    parent_categories() {
      return this.$store.state.projects_page.parent_categories;
    },
    allProjects() {
      return this.$store.state.projects_page.projects;
    },
    projects() {
      let categories = this.parent_categories;
      if (this.activeTabs.category || this.activeTabs.tag) {
        categories = categories.filter((p) => p.id === this.activeTabs.category);
        if (this.activeTabs.tag) {
          return categories.length
            ? categories
                .flatMap((c) => c.projects)
                .filter((p) => p.tags.map((t) => t.id).includes(this.activeTabs.tag))
            : this.allProjects.filter((p) => p.tags.map((t) => t.id).includes(this.activeTabs.tag));
        }
      } else {
        let cats = [
          {
            projects: [],
          },
        ];
        categories.forEach((c) => {
          c.projects.forEach((p) => {
            if (!cats[0].projects.filter((pi) => pi.id === p.id).length) {
              cats[0].projects.push(p);
            }
            // Закидывать в массив проекты и симулировать категорию с проектами, но отфильтрованными
          });
        });
        categories = cats;
      }
      return categories.flatMap((item) => item.projects);
    },
    title() {
      if (this.activeTabs.category) {
        let category = this.parent_categories.find((p) => p.id === this.activeTabs.category);
        if (category) {
          return category.title;
        }
      }
      return "Все проекты";
    },
  },
  methods: {
    setActiveTab(i, field) {
      if (this.activeTabs[field] === i) {
        this.activeTabs[field] = null;
        return;
      }
      this.activeTabs[field] = i;
    },
  },
};
</script>

<style lang="stylus">
.projects-tabs {
  display: flex;
  flex-direction: column;
  padding: 32px 100px;

  +below(1400px) {
    padding: 30px 80px 60px 80px;
  }

  +below(1100px) {
    padding: 30px 15px 60px 15px;
  }

  &__title {
    font-weight: 400;
    font-size: 1.875rem;
    line-height: 35px;
    color: var(--blue-o5);
    margin: 0;
    padding-top: 60px;
    +below(1100px) {
      padding-top 30px
      font-size: 1.25rem;
    }
  }

  &__filter-title {
    font-weight: 400;
    font-size: 1.875rem;
    line-height: 35px;
    color: var(--blue-o5);
    margin: 0;
    +below(1100px) {
      font-size: 1.25rem;
    }
  }

  &__btns {
    display: flex;
    gap: 30px;
    justify-content: flex-start;
    flex-wrap wrap

    +below(1100px) {
      gap: 16px;
    }

    &-wrapper {
      display flex
      flex-direction column
      gap 24px

      +below(1100px) {
        gap: 10px;
      }
    }

    &--active {
      color: var(--gray);
      background: var(--blue);
    }

    .btn {
      height: 40px;
    }
  }

  &__empty {
    margin-top 30px
  }
}
</style>
