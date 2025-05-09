import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.ts";
import store from "./store/index.ts";
import ErrorComp from "./components/ErrorComp.vue";

const app = createApp(App);

app.component("ErrorComp", ErrorComp);
app.component("BaseButton", () => import("./components/BaseButton.vue"));
app.component("BaseLoader", () => import("./components/BaseLoader.vue"));
app.use(router);
app.use(store);
app.mount("#app");
