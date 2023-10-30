import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "/tailwind/tailwind.css";
import router from "./router";
import store from "./store";
import Notifications from "@kyvg/vue3-notification";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App)
  .use(router)
  .use(store)
  .use(Notifications)
  .use(Toast, { toastClassName: "custom", bodyClassName: ["custom"] });

// common components
import tab_menu from "./components/tabs.vue";
app.component("tab-menu", tab_menu);

app.mount("#app");
