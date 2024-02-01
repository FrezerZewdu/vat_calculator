<template>
  <LoadingPageVue :loading="loading">
    <h2 class="text-black/70 font-medium">Dashboard</h2>
    <div class="mt-5 w-full h-4/5 flex space-x-5">
      <div class="w-3/4 flex flex-col space-y-5">
        <div class="py-6 px-4 bg-white rounded-lg">
          <p>Todays Stats</p>
          <div class="flex space-x-6">
            <div class="p-4 w-full border shadow rounded-lg">
              <p class="text-primary text-opacity-60">Total Sales</p>
              <p>
                {{
                  $filters.formatPriceCurrency(dailyReport.totalSales, "ETB")
                }}
              </p>
            </div>
            <div class="p-4 w-full border shadow rounded-lg">
              <p class="text-primary text-opacity-60">Total Purchases</p>
              <p>
                {{
                  $filters.formatPriceCurrency(dailyReport.totalPurchase, "ETB")
                }}
              </p>
            </div>
            <div class="p-4 w-full border shadow rounded-lg">
              <p class="text-primary text-opacity-60">Total Profit</p>
              <p>
                {{ $filters.formatPriceCurrency(dailyReport.profit, "ETB") }}
              </p>
            </div>
          </div>
        </div>
        <div class="py-6 px-4 bg-white rounded-lg">
          <div class="flex items-center justify-between">
            <h3>Sales Data</h3>
            <VueDatePicker
              class="w-1/3"
              placeholder="Select Date"
              v-model="date"
              range
              min-range="7"
              auto-apply
              :format="format"
              @update:model-value="fetchWithFilter"
            />
          </div>
          <SalesLineChart
            v-if="openLineChart"
            class="mt-4"
            :transactions="transactions"
            :purchases="purchases"
            :dateLabels="dateLabels"
          />
        </div>
      </div>
      <div class="w-1/4 flex flex-col space-y-5">
        <div class="py-6 px-4 bg-white rounded-lg">
          <h3 class="mb-4">Popular selling item</h3>
          <div
            v-for="item in dailyReport.popularItems"
            :key="item.itemId"
            class="flex flex-col even:bg-slate-50"
          >
            <div class="pt-1 pb-2 flex justify-between">
              <p class="text-xs font-medium">{{ item.name }}</p>
              <p class="text-sm">{{ item.total }}</p>
            </div>
          </div>
        </div>
        <div class="py-6 px-4 bg-white rounded-lg">
          <h3 class="mb-4">List of Outstanding Credit</h3>
          <div
            v-for="credit in dailyReport.outstandingCreditList"
            :key="credit.createdAt"
            class="flex flex-col even:bg-slate-50"
          >
            <div class="pt-1 pb-2 flex justify-between">
              <p class="text-xs">{{ $filters.shortDate(credit.createdAt) }}</p>
              <p class="text-xs font-medium">
                {{
                  $filters.formatPriceCurrency(credit.remainingAmount, "ETB")
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LoadingPageVue>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { useReportStore } from "../../stores/Reports";
import LoadingPageVue from "@/layout/LoadingPage.vue";
import SalesLineChart from "../../components/charts/dashboard/SalesLineChart.vue";

export default defineComponent({
  components: {
    LoadingPageVue,
    SalesLineChart,
  },
  setup() {
    const format = (date: Date[]) => {
      var formatedDate = [] as string[];
      date.forEach((d) => {
        formatedDate.push(
          d.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        );
      });
      return formatedDate;
    };
    return {
      format,
    };
  },
  data() {
    return {
      loading: true,
      date: [new Date(new Date().getDate() - 7), new Date()],
      openLineChart: false,
    };
  },
  computed: {
    ...mapState(useReportStore, [
      "dailyReport",
      "transactions",
      "purchases",
      "dateLabels",
    ]),
  },
  methods: {
    ...mapActions(useReportStore, ["fetchDailyReport", "fetchFilteredReport"]),
    async fetchWithFilter() {
      this.loading = true;
      await this.fetchFilteredReport(
        this.date[0].toISOString(),
        this.date[1].toISOString()
      );
      this.loading = false;
    },
  },
  async mounted() {
    const todayDate = new Date();
    const startDate = new Date();
    startDate.setDate(todayDate.getDate() - 7);
    this.date = [startDate, todayDate];
    this.$emit("menuSelected", 1);
    await this.fetchDailyReport();
    await this.fetchFilteredReport(
      startDate.toISOString(),
      todayDate.toISOString()
    );
    setTimeout(() => {
      this.openLineChart = true;
      this.loading = false;
    }, 500);
  },
});
</script>
