import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouteParams,
} from "vue-router";
import LoginView from "../views/LoginView.vue";
import MainView from "../views/MainView.vue";

export type AppRouteName = "login" | "dashboard" | "inventory";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/main",
    name: "main",
    component: MainView,
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../views/dashboard/DashboardIndex.vue"),
      },
      {
        path: "inventory",
        name: "inventory",
        component: () => import("../views/inventory/InventoryIndex.vue"),
      },
      {
        path: "sales",
        name: "sales",
        component: () => import("../views/sale/SaleIndex.vue"),
      },
      {
        path: "transactions",
        name: "transactions",
        component: () => import("../views/transaction/TransactionIndex.vue"),
      },
      {
        path: "accounts",
        name: "accounts",
        component: () => import("../views/account/AccountIndex.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export function routerPush(name: AppRouteName, params?: RouteParams) {
  return params == undefined
    ? router.push({ name })
    : router.push({ name, params });
}

export default router;
