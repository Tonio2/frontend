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

router.beforeEach(async (to, from) => {
	let storedUser = localStorage.getItem('user')
	let user = {}
	if (!storedUser)
	{
		if (to.name !== 'login')
			return {name: 'login'}
	}
	else
	{
		user = JSON.parse(storedUser)
		if (!user.profile_completed && to.name !== 'profile_update')
			return {name:'profile_update'}
	}
})
export default router;