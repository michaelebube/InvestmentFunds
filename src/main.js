import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import ErrorComp from "./components/ErrorComp.vue";

const app = createApp(App);

app.component("ErrorComp", ErrorComp);
app.use(router);
app.use(store);
app.mount("#app");
