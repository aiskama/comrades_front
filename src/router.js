import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default function createRouter() {
  const routes = [
    {
      path: "/",
      name: "home",
      component: () => import("./views/home/index.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/about/index.vue"),
    },
    {
      path: "/service/:id?",
      name: "service-item",
      component: () => import("./views/services/open.vue"),
    },
    {
      path: "/services/:id?",
      name: "services",
      component: () => import("./views/services/index.vue"),
      meta: { name: "Услуги" },
    },
    {
      path: "/projects",
      name: "projects",
      component: () => import("./views/projects/index.vue"),
      meta: { name: "Проекты" },
    },
    {
      path: "/projects/:id",
      name: "project",
      component: () => import("./views/project/index.vue"),
    },
    {
      path: "/contacts",
      name: "contacts",
      component: () => import("./views/contacts/index.vue"),
    },
    {
      path: "/blog",
      name: "blog",
      component: () => import("./views/blog/list.vue"),
    },
    {
      path: "/blog/:id",
      name: "blog_item",
      component: () => import("./views/blog/item.vue"),
    },
    {
      path: "*",
      name: "notfound",
      component: () => import("./views/PageNotFound.vue"),
    },
  ];
  return new Router({
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }
      if (to.hash) {
        return {
          selector: to.hash,
          behavior: "smooth",
        };
      }
      return { x: 0, y: 0 };
    },
    fallback: true,
    routes,
  });
}
