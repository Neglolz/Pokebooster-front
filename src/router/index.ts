import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
// import auth from "@/router/middleware/auth";
import { log } from "@/router/middleware/log";
import store from "@/store/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/pokedex",
    name: "Pokedex",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Pokedex.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/shop",
    name: "Shop",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Shop.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/inventory",
    name: "Inventory",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Inventory.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/cards",
    name: "Cards",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Cards.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/ladder",
    name: "Ladder",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Ladder.vue"),
  },
  {
    // /404
    path: "/:catchAll(.*)",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !store.state.isLoggedIn) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: "/",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
