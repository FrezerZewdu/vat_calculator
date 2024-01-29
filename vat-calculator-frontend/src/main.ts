import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import vClickOutside from "click-outside-vue3";
import VueDatePicker from "@vuepic/vue-datepicker";
import toaster from "@meforma/vue-toaster";
import filter from "./utils/filters";
import "@vuepic/vue-datepicker/dist/main.css";
import "./assets/tailwind.css";

const toasterOptions = {
  position: "top",
};

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app
  .use(router)
  .use(vClickOutside)
  .use(pinia)
  .use(toaster, toasterOptions)
  .component("VueDatePicker", VueDatePicker)
  .mount("#app");

app.config.globalProperties.$filters = filter;
