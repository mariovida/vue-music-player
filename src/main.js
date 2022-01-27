import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

import Buefy from "buefy";
import "buefy/dist/buefy.css";

Vue.config.productionTip = false;
Vue.use(Buefy);

const firebaseConfig = {
  apiKey: "AIzaSyCcXKbW-e-z-HV2AD76X1OFw7FcDRhjuIk",
  authDomain: "vue-671b9.firebaseapp.com",
  projectId: "vue-671b9",
  storageBucket: "vue-671b9.appspot.com",
  messagingSenderId: "174035827407",
  appId: "1:174035827407:web:daba0868d880825cebd5ba"
};

firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
Vue.config.productionTip = false;
