import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";
import "element-ui/lib/theme-chalk/base.css";
import "./assets/styles/element-variables.scss";
import locale from "element-ui/lib/locale/lang/en";
import "@/assets/styles/app.scss";
import "@/assets/styles/tailwind.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.use(ElementUI, {
  locale
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
