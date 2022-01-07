import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import "./assets/global.css";
import toaster from "@meforma/vue-toaster";

createApp(App)
  .use(store)
  .use(router)
  .use(toaster, {
    position: "top",
  })
  .mount("#app");
