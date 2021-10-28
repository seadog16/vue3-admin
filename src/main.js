import { createApp } from "vue";
import App from "@/App.vue";
import ElementPlus from "element-plus";
import "element-plus/packages/theme-chalk/src/index.scss";
import "@/styles/global.styl";
import router from "./router";
import store from './store';
import ByTable from "@/components/ByTable/index.vue";
import ByTableSearch from "@/components/ByTableSearch/index.vue";

const app = createApp(App);

app
    .use(ElementPlus)
    .use(router)
    .use(store)
    .component("ByTable", ByTable)
    .component("ByTableSearch", ByTableSearch)
    .mount("#app");
export default app;
