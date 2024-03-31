import Vue from "vue";
import VueRouter from "vue-router";

// Import router components
import Home from "./components/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
    meta: {
      requiresAuth: true,
      displayName: "Brasserie Alteration - Accueil"
    },
  },
 
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
