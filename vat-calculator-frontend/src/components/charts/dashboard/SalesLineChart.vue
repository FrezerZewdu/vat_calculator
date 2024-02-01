<template>
  <canvas id="lineChartVue" width="400" height="150"></canvas>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Chart, registerables } from "chart.js";
import filter from "../../../utils/filters";

Chart.register(...registerables);

export default defineComponent({
  props: {
    transactions: {
      type: Array as PropType<number[]>,
      required: true,
    },
    purchases: {
      type: Array as PropType<number[]>,
      required: true,
    },
    dateLabels: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    dateLabels(value) {
      console.log(value);
      const ctx = document.getElementById("lineChartVue");
      this.initalizeChartData(ctx);
    },
  },
  methods: {
    initalizeChartData(ctx: any) {
      if (this.chart) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        this.chart.destroy();
      }

      const chartConfiguration = {
        type: "line",
        data: {
          labels: this.dateLabels,
          datasets: [
            {
              label: "Sales",
              data: this.transactions,
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: filter.transparentize("rgb(75, 192, 192)", 0.5),
              tension: 0.4,
            },
            {
              label: "Purchases",
              data: this.purchases,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: filter.transparentize("rgb(255, 99, 132)", 0.5),
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: "Dates",
              },
            },
            y: {
              title: {
                display: true,
                text: "ETB",
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Sales and Purchases",
            },
          },
        },
      };

      this.chart = new Chart(ctx, chartConfiguration);
    },
  },
  mounted() {
    const ctx = document.getElementById("lineChartVue");
    this.initalizeChartData(ctx);
  },
});
</script>
