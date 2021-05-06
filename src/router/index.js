import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store/index.js";

function isAuthenticated() {
  return store.state.user != null;
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => Home,
  },
  {
    path: "/Lobby",
    name: "Lobby",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Lobby.vue"),
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next();
      } else {
        next("/verify");
      }
    },
  },
  {
    path: "/verify",
    name: "Verify",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Verify.vue"),
      beforeEnter(to, from, next) {
        if (isAuthenticated()) {
          next('/lobby')
        } else {
          next()
        }
      }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
