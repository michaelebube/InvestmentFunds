import { createRouter, createWebHistory } from "vue-router";
import FundList from "../pages/FundList.vue";
import type { RouteRecordRaw } from "vue-router";

import FundDetail from "../pages/FundDetails.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: FundList,
  },
  {
    path: "/fund/:id",
    name: "FundDetail",
    component: FundDetail,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, _1) {
    if (to.path !== from.path) {
      return { top: 0 };
    }
    return false;
  },
});

export default router;
