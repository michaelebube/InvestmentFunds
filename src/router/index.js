import { createRouter, createWebHistory } from "vue-router";
import FundList from "../pages/FundList.vue";
import FundDetail from "../pages/FundDetails.vue";

const routes = [
  { path: "/", component: FundList },
  { path: "/fund/:id", name: "FundDetail", component: FundDetail },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.path !== from.path) {
      return { top: 0 };
    } else {
      return false;
    }
  },
});

export default router;
