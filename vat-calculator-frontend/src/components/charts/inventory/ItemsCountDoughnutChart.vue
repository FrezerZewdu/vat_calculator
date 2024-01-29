<template>
  <DoughnutChart
    :chartData="{
      labels: ['Non VAT items count', 'VAT items count'],
      datasets: [
        {
          data: [`${normalItemsCount}`, `${vatItemsCount}`],
          backgroundColor: ['#0057b7', '#FFD700'],
        },
      ],
    }"
    :options="{
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Total Amount of Items',
        },
      },
    }"
  ></DoughnutChart>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  props: {
    normalItemsCount: Number,
    vatItemsCount: Number,
  },
  components: {
    DoughnutChart,
  },
});
</script>
