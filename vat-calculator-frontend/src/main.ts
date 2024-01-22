import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import vClickOutside from "click-outside-vue3";
import VueDatePicker from "@vuepic/vue-datepicker";
import filter from "./utils/filters";
import "@vuepic/vue-datepicker/dist/main.css";
import "./assets/tailwind.css";

const app = createApp(App);
app
  .use(router)
  .use(vClickOutside)
  .use(createPinia())
  .component("VueDatePicker", VueDatePicker)
  .mount("#app");

app.config.globalProperties.$filters = filter;
