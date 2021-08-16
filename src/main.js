import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
//import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import axios from "axios";
import VueSimpleAlert from "vue-simple-alert";
import VueAxios from "vue-axios";
import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);
Vue.use(VueSimpleAlert);
Vue.use(VueAxios, axios);
//axios.defaults.baseURL = 'https://seguros-app.herokuapp.com/api/';
axios.defaults.baseURL = "http://localhost:5000/api/";
//axios.defaults.baseURL = 'https://seguros-app.herokuapp.com/api/';
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
