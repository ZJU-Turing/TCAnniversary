import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "@/assets/css/base.css";
import lc from "@/assets/js/leancloud";

lc.init();

const app = createApp(App);

app.use(router);

app.mount("#app");
