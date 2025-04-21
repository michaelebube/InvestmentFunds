import { createRouter, createWebHistory } from "vue-router";
import FundList from "../pages/FundList.vue";
import FundDetail from "../pages/FundDetails.vue";

const routes = [
  { path: "/", component: FundList },
  { path: "/fund/:id", name: "FundDetail", component: FundDetail },
  { path: "/:pathMatch(.*)*", redirect: "/" }, // Redirect to FundList for any unmatched routes
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
