import {
  createRouter,
  RouteLocationNormalized,
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

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    meta: {
      requiresAuth: false,
      roles: ["supAdmin", "norAdmin", "sales", "finance"],
    },
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
        meta: {
          requiresAuth: true,
          roles: ["supAdmin", "norAdmin"],
        },
      },
      {
        path: "inventory",
        name: "inventory",
        component: () => import("../views/inventory/InventoryIndex.vue"),
        meta: {
          requiresAuth: true,
          roles: ["supAdmin", "norAdmin", "finance"],
        },
      },
      {
        path: "sales",
        name: "sales",
        component: () => import("../views/sale/SaleIndex.vue"),
        meta: {
          requiresAuth: true,
          roles: ["supAdmin", "norAdmin", "sales"],
        },
      },
      {
        path: "transactions",
        name: "transactions",
        component: () => import("../views/transaction/TransactionIndex.vue"),
        meta: {
          requiresAuth: true,
          roles: ["supAdmin", "norAdmin", "finance"],
        },
      },
      {
        path: "accounts",
        name: "accounts",
        component: () => import("../views/account/AccountIndex.vue"),
        meta: {
          requiresAuth: true,
          roles: ["supAdmin", "norAdmin"],
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to: RouteLocationNormalized) => {
  const authStore = useAuthStore();

  if (!authStore.isLoggedIn && to.name !== "login") {
    return { name: "login" };
  }

  if (to.meta.requiresAuth && !authStore.isRole(to.meta.roles)) {
    return { name: "login" };
  }
});

export function routerPush(name: AppRouteName, params?: RouteParams) {
  return params == undefined
    ? router.push({ name })
    : router.push({ name, params });
}

export default router;
