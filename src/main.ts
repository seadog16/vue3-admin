import { createApp } from "vue";
import App from "@/App.vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "@/styles/global.styl";
import router from "./router/index";
import store from "./store/index";

const app = createApp(App);
app.use(ElementPlus, { size: "small" });
app.use(router);
app.use(store);
app.mount("#app");
export default app;
