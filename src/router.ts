import { createWebHistory, createRouter } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: () => import("./components/Login.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("./components/Profile.vue"),
  },
  // {
  //   path: "/dashboard",
  //   name: "dashboard",
  //   component: () => import("./components/Dashboard.vue"),
  // }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;