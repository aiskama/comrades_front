import Vue from "vue";
import dayjs from "dayjs";
import { VueMaskFilter } from "v-mask";
import plural from "plural-ru";
import "dayjs/locale/ru";
//
// Vue.filter("formatDate", (date) => {
//   return moment(date).format("DD.MM.YYYY");
// });
//
Vue.filter("humanDate", (date) => {
  if (date) {
    return dayjs(date).locale("ru").format("DD MMMM YYYY");
  }
  return "";
});
//
Vue.filter("robotDate", (date) => {
  if (date) {
    return dayjs(date);
  }
  return "";
});

Vue.filter("plural", (count, ...words) => {
  return plural(count, ...words.map((w) => "%d " + w));
});

Vue.filter("plural_word", (count, ...words) => {
  return plural(count, ...words.map((w) => w));
});

Vue.filter("vMask", VueMaskFilter);

Vue.filter("image", (entity, api) => {
  if (entity && entity.img) {
    return api + entity.img.url;
  }
  return "/static/images/no-image.png";
});

Vue.filter("image_alt", (entity) => {
  if (entity && entity.img) {
    return entity.img.alt;
  }
  return "";
});
