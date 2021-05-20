import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index.js";
import Home from "@/views/Home.vue";
import Lobby from "@/views/Lobby.vue";
import Verify from "@/views/Verify.vue";
import Room from "@/views/Room.vue";

function isAuthenticated() {
  return store.state.user != null;
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => Home,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next("/lobby");
      } else {
        next();
      }
    },
  },
  {
    path: "/lobby",
    name: "Lobby",
    component: () => Lobby,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/verify",
    name: "Verify",
    component: () => Verify,
    beforeEnter(to, from, next) {
      if (isAuthenticated()) {
        next("/lobby");
      } else {
        next();
      }
    },
  },
  {
    path: "/room/:roomId",
    name: "Room",
    component: () => Room,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
