import {
  FilteredReportType,
  TodayReportType,
  lineChartDataType,
} from "@/model/Reports";
import baseAPI from "../services/axios";
import { defineStore } from "pinia";
import { FETCH_SUCCESS_STATUS } from "@/utils/constant";

export const useReportStore = defineStore("reportStore", {
  state: () => ({
    dailyReport: {} as TodayReportType,
    transactions: [] as number[],
    purchases: [] as number[],
    dateLabels: [] as string[],
  }),
  getters: {
    lineChartData(state) {
      return (
        transactions: lineChartDataType[],
        purchases: lineChartDataType[],
        dateLabels: string[]
      ) => {
        const chartData = {
          data: {
            labels: dateLabels,
            datasets: [
              {
                label: "Transactions",
                data: transactions.map((transaction) => {
                  return transaction.total;
                }),
                borderColor: "#228B22",
              },
              {
                label: "Purchases",
                data: purchases.map((purchase) => {
                  return purchase.total;
                }),
                borderColor: "#EE4B2B",
              },
            ],
          },
        };
        console.log(chartData);
        return chartData;
      };
    },
  },
  actions: {
    async fetchDailyReport() {
      try {
        await baseAPI.get("report/daily").then((response) => {
          if (response.status === FETCH_SUCCESS_STATUS) {
            this.dailyReport = response.data;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchFilteredReport(startDate: string, endDate: string) {
      try {
        await baseAPI
          .get("report/filtered", {
            params: {
              startDate,
              endDate,
            },
          })
          .then((response) => {
            if (response.status === FETCH_SUCCESS_STATUS) {
              this.setChartInfo(
                {
                  transactions: response.data.transactions,
                  purchases: response.data.purchases,
                },
                startDate,
                endDate
              );
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    setChartInfo(
      filteredResults: FilteredReportType,
      startDate: string,
      endDate: string
    ) {
      const endDateObj = new Date(endDate);
      const currentDateObj = new Date(startDate);
      const dateLabels = [];
      while (currentDateObj < endDateObj) {
        const day = currentDateObj.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        });
        dateLabels.push(day);
        currentDateObj.setDate(currentDateObj.getDate() + 1);
      }
      this.transactions = dateLabels.map((date) => {
        const transaction = filteredResults.transactions.find(
          (t) => t.day === date
        );
        return transaction ? transaction.total : 0;
      });

      this.purchases = dateLabels.map((date) => {
        const purchase = filteredResults.purchases.find((p) => p.day === date);
        return purchase ? purchase.total : 0;
      });

      this.dateLabels = dateLabels;
    },
  },
});
