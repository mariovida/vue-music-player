import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Songs from "../views/About.vue";
import Contact from "../views/Contact.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/songs",
    name: "Songs",
    component: Songs,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
];

const router = new VueRouter({
  routes: routes,
  mode: "hash",
});

export default router;
