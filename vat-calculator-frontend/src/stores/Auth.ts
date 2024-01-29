import { AccountType, LoginType } from "@/model/Accounts";
import baseAPI from "../services/axios";
import { defineStore } from "pinia";
import { createToaster } from "@meforma/vue-toaster";
import { routerPush } from "../router/index";
import {
  FETCH_SUCCESS_STATUS,
  SERVER_ERROR_STATUS,
  UNAUTHORIZED_ERROR_STATUS,
} from "@/utils/constant";

const toaster = createToaster({ position: "top" });

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    isLoggedIn: false,
    userProfile: {} as AccountType,
    loginLoading: false,
  }),
  getters: {
    isRole: (state) => {
      return (neededRole: string[]) =>
        neededRole.includes(state.userProfile.role);
    },
  },
  actions: {
    saveToken(token: string) {
      localStorage.setItem("access_token", token);
    },
    async login(credentials: LoginType) {
      try {
        this.loginLoading = true;
        await baseAPI
          .post("auth/signin", credentials)
          .then(async (response) => {
            if (response.status === FETCH_SUCCESS_STATUS) {
              this.saveToken(response.data.access_token);
              this.userProfile = response.data.data;
              this.isLoggedIn = true;
              await routerPush("inventory");
            } else {
              toaster.error("Incorrect email or password");
            }
          })
          .finally(() => {
            setTimeout(async () => {
              this.loginLoading = false;
            }, 700);
          });
      } catch (error: any) {
        this.loginLoading = false;
        if (error.status === SERVER_ERROR_STATUS) {
          toaster.error("Cant login right now");
        } else if (error.status === UNAUTHORIZED_ERROR_STATUS) {
          toaster.error("Incorrect email or password");
        }
      }
    },
  },
  persist: true,
});
