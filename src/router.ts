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
  {
    path: "/profile_update",
    name: "profile_update",
    component: () => import("./components/ProfileUpdate.vue"),
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