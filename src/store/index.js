import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default function createStore(state) {
  return new Vuex.Store({
    state() {
      return (
        state || {
          _modals: [],
          phone: "79640162700",
          email: "mail@comrades.dev",
          address: "Махачкала, ул. Мирзабекова, д. 18",
          inn: "0573017607",
          home_page: {
            services: [],
            principle_works: [],
            projects: [],
            competences: [],
            reviews: [],
            companyinfo: [],
          },
          about_page: {
            companyinfo: [],
            principle_works: [],
            clients: [],
          },
          projects_page: {
            projects: [],
            parent_categories: [],
          },
          blog_page: {
            data: [],
            paginatorInfo: {
              total: 0,
            },
          },
          blog_item_page: null,
          smis: null,
          service_page: {
            principle_works: [],
            competences: [],
            clients: [],
            services: [],
            services_item: [],
            projects: [],
          },
          services_item_page: {
            projects: [],
            service_item: {},
          },
          projects: [],
          services: {},
          project_page: {},
          clients: [],
        }
      );
    },
  });
}
