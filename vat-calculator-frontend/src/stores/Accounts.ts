import { AccountFilterType, AccountType } from "@/model/Accounts";
import baseAPI from "../services/axios";
import { defineStore } from "pinia";
import { createToaster } from "@meforma/vue-toaster";
import {
  FETCH_SUCCESS_STATUS,
  PUT_SUCCESS_STATUS,
  SERVER_ERROR_STATUS,
} from "@/utils/constant";

const toaster = createToaster({ position: "top" });

export const useAccountStore = defineStore("accountStore", {
  state: () => ({
    accounts: [] as AccountType[],
    loadingAccounts: false,
  }),
  actions: {
    async fetchAccounts(filter: AccountFilterType) {
      try {
        this.loadingAccounts = true;
        await baseAPI
          .get("account", {
            params: filter,
          })
          .then((response) => {
            if (response.status === FETCH_SUCCESS_STATUS) {
              this.accounts = response.data.data;
            } else {
              this.accounts = [];
            }
          })
          .finally(() => {
            this.loadingAccounts = false;
          });
      } catch (error: any) {
        if (error.status === SERVER_ERROR_STATUS) {
          toaster.error("Something is wrong! Could't fetch accounts");
        }
      }
    },
    async updateAccount(accountsInfo: AccountType) {
      try {
        this.loadingAccounts = true;
        await baseAPI
          .put("account", accountsInfo)
          .then(async (response) => {
            if (response.status === PUT_SUCCESS_STATUS) {
              await this.fetchAccounts({
                page: 1,
                perPage: 10,
                search: "",
              });
            }
          })
          .finally(() => {
            this.loadingAccounts = false;
            toaster.success("Account Updated Successfully");
          });
      } catch (error: any) {
        if (error.status === SERVER_ERROR_STATUS) {
          toaster.error("Something is wrong! Could't Update account");
        }
      }
    },
    async deleteAccount(accountId: number) {
      try {
        this.loadingAccounts = true;
        await baseAPI
          .delete(`account/${accountId}`)
          .then(async (response) => {
            if (response.status === PUT_SUCCESS_STATUS) {
              await this.fetchAccounts({
                page: 1,
                perPage: 10,
                search: "",
              });
            }
          })
          .finally(() => {
            this.loadingAccounts = false;
            toaster.success("Account Deleted Successfully");
          });
      } catch (error: any) {
        if (error.status === SERVER_ERROR_STATUS) {
          toaster.error("Something is wrong! Could't Update account");
        }
      }
    },
  },
});
