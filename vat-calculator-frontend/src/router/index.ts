import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  RouteParams,
} from "vue-router";
import LoginView from "../views/LoginView.vue";
import MainView from "../views/MainView.vue";
import { useAuthStore } from "@/stores/Auth";

export type AppRouteName =
  | "login"
  | "dashboard"
  | "inventory"
  | "sales"
  | "transactions"
  | "accounts";

const authStore = useAuthStore();

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
        beforeEnter: (to, from, next) => {
          if (authStore.isRole(["supAdmin", "norAdmin"])) {
            next();
          } else {
            next({ name: "login" });
          }
        },
      },
      {
        path: "inventory",
        name: "inventory",
        component: () => import("../views/inventory/InventoryIndex.vue"),
        beforeEnter: (to, from, next) => {
          if (authStore.isRole(["supAdmin", "norAdmin", "finance"])) {
            next();
          } else {
            next({ name: "login" });
          }
        },
      },
      {
        path: "sales",
        name: "sales",
        component: () => import("../views/sale/SaleIndex.vue"),
        beforeEnter: (to, from, next) => {
          if (authStore.isRole(["supAdmin", "norAdmin", "sales"])) {
            next();
          } else {
            next({ name: "login" });
          }
        },
      },
      {
        path: "transactions",
        name: "transactions",
        component: () => import("../views/transaction/TransactionIndex.vue"),
        beforeEnter: (to, from, next) => {
          if (authStore.isRole(["supAdmin", "norAdmin", "finance"])) {
            next();
          } else {
            next({ name: "login" });
          }
        },
      },
      {
        path: "accounts",
        name: "accounts",
        component: () => import("../views/account/AccountIndex.vue"),
        beforeEnter: (to, from, next) => {
          if (authStore.isRole(["supAdmin", "norAdmin"])) {
            next();
          } else {
            next({ name: "login" });
          }
        },
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
