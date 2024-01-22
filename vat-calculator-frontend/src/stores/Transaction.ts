import { TransactionFilters, TransactionListType } from "@/model/Transaction";
import baseAPI from "@/services/axios";
import { defineStore } from "pinia";

export const useTransactionStore = defineStore("transaction", {
  state: () => ({
    transactions: [] as TransactionListType[],
    loadingTransactions: false,
    selectedTransaction: ({} as TransactionListType) || null,
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
            console.log(response);
            this.transactions = response.data.data;
          })
          .finally(() => {
            this.loadingTransactions = false;
          });
      } catch (error) {
        this.loadingTransactions = false;
        console.log(error);
        // global toast here
      }
    },
    async fetchSpecificTransaction(transactionId: number) {
      try {
        this.loadingTransactions = true;
        await baseAPI
          .get(`transaction/${transactionId}`)
          .then((response) => {
            this.selectedTransaction = response.data.data;
          })
          .finally(() => {
            this.loadingTransactions = false;
          });
      } catch (error) {
        this.loadingTransactions = false;
        console.log(error);
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
      } catch (error) {
        this.loadingTransactions = false;
        console.log(error);
      }
    },
    // createCreditRecord() {}
  },
});
