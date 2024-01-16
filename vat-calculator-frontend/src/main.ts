import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vClickOutside from "click-outside-vue3";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import "./assets/tailwind.css";

createApp(App)
  .use(router)
  .use(vClickOutside)
  .component("VueDatePicker", VueDatePicker)
  .mount("#app");
