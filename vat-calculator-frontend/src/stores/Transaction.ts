import {
  CreateCreditRecordType,
  TransactionFilters,
  TransactionListType,
} from "@/model/Transaction";
import baseAPI from "@/services/axios";
import { createToaster } from "@meforma/vue-toaster";
import {
  FETCH_SUCCESS_STATUS,
  POST_SUCCESS_STATUS,
  SERVER_ERROR_STATUS,
  UNPROCESSABLE_CONTENT_STATUS,
} from "@/utils/constant";
import { defineStore } from "pinia";

const toaster = createToaster({ position: "top" });

export const useTransactionStore = defineStore("transaction", {
  state: () => ({
    transactions: [] as TransactionListType[],
    loadingTransactions: false,
    selectedTransaction: {} as TransactionListType,
    transactionSelected: false,
    openCreditView: false,
    openVoidTransaction: false,
  }),
  actions: {
    async fetchTransactions(filter: TransactionFilters) {
      try {
        this.loadingTransactions = true;
        await baseAPI
          .get("transaction", {
            params: {
              filter,
            },
          })
          .then((response) => {
            if (response.status == FETCH_SUCCESS_STATUS) {
              this.transactions = response.data.data;
            } else {
              // toast error message
              this.transactions = [];
            }
          })
          .finally(() => {
            this.loadingTransactions = false;
          });
      } catch (error: any) {
        this.loadingTransactions = false;
        // global toast here
        if (error.status === SERVER_ERROR_STATUS) {
          toaster.error("Something went wrong!");
        }
      }
    },
    async fetchSpecificTransaction(transactionId: number) {
      this.transactionSelected = false;
      try {
        await baseAPI
          .get(`transaction/${transactionId}`)
          .then((response) => {
            this.selectedTransaction = response.data.data;
          })
          .finally(() => {
            this.transactionSelected = true;
          });
      } catch (error: any) {
        this.transactionSelected = false;
        if (error.status === SERVER_ERROR_STATUS) {
          toaster.error("Something went wrong!");
        }
      }
    },
    async createCreditRecord(creditInfo: CreateCreditRecordType) {
      try {
        const creditFormData = new FormData();
        creditFormData.append("amountPayed", creditInfo.amountPayed.toString());
        creditFormData.append("file", creditInfo.file ? creditInfo?.file : "");
        console.log(creditFormData.get("file"));
        await baseAPI
          .post(
            `transaction/${creditInfo.transactionId}/credit`,
            creditFormData
          )
          .then(async (response) => {
            if (response.status === POST_SUCCESS_STATUS) {
              this.fetchTransactions({
                page: 1,
                perPage: 15,
                date: new Date().toISOString(),
                type: "all",
              });
              toaster.success("Credit Record Created");
            }
          })
          .finally(() => {
            this.openCreditView = false;
          });
      } catch (error: any) {
        if (error.status === SERVER_ERROR_STATUS) {
          toaster.error("Something went wrong!");
        } else if (error.status === UNPROCESSABLE_CONTENT_STATUS) {
          toaster.error("Credit Information Incomplete");
        }
      }
    },
    async voidTransaction(transactionId: number) {
      try {
        this.loadingTransactions = true;
        await baseAPI
          .put(`transaction/void/${transactionId}`)
          .then((response) => {
            if (response.data.data) {
              this.fetchTransactions({
                page: 1,
                perPage: 15,
                date: new Date().toISOString(),
                type: "All",
              });
              // toast successfull deletion
            }
          })
          .finally(() => {
            this.loadingTransactions = false;
          });
      } catch (error: any) {
        this.loadingTransactions = false;
        if (error.status === SERVER_ERROR_STATUS) {
          toaster.error("Something went wrong!");
        } else if (error.status === UNPROCESSABLE_CONTENT_STATUS) {
          toaster.error("Can not void Transaction");
        }
      }
    },
    // createCreditRecord() {}
  },
});
