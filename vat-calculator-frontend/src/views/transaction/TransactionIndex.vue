<template>
  <LoadingPageVue :loading="loading">
    <h2 class="text-black/70 font-medium">Transactions</h2>
    <div class="mt-5 py-6 px-4 w-full flex space-x-5 bg-white rounded-lg">
      <div class="flex space-x-2 items-center">
        <label class="text-black/70 text-base">Date:</label>
        <VueDatePicker v-model="filter.filterDate" />
      </div>
      <select v-model="filter.transactionType" class="p-2 rounded border">
        <option value="all">All</option>
        <option value="creditOnly">Credit Only</option>
        <option value="vatOnly">VAT Only</option>
        <option value="normalOnly">No VAT only</option>
      </select>
    </div>
    <div class="mt-5 w-full flex space-x-5">
      <div class="py-6 px-4 w-2/3 bg-white rounded-lg">
        <table class="w-full">
          <thead class="bg-slate-50 shadow-sm rounded-t-lg">
            <th class="text-sm font-medium text-black/70 p-2">ID</th>
            <th class="text-sm font-medium text-black/70 p-2">DATE</th>
            <th class="text-sm font-medium text-black/70 p-2">ITEMS COUNT</th>
            <th class="text-sm font-medium text-black/70 p-2">TOTAL AMOUNT</th>
            <th class="text-sm font-medium text-black/70 p-2">CREDIT AMOUNT</th>
            <th class="text-sm font-medium text-black/70 p-2">IS VAT</th>
            <th class="text-sm font-medium text-black/70 p-2"></th>
          </thead>
          <tbody>
            <tr
              v-for="(transaction, index) in transactions"
              :key="transaction.id"
            >
              <td class="p-2 text-sm">{{ transaction.id }}</td>
              <td class="p-2 text-sm">
                {{ $filters.readableDate(transaction.createdAt) }}
              </td>
              <td class="p-2 text-sm">{{ transaction.soldItems.length }}</td>
              <td class="p-2 text-sm">{{ transaction.totalAmount }}</td>
              <td class="p-1 text-sm text-center">
                <p
                  class="font-medium py-1 px-3 rounded-md"
                  :class="[
                    transaction.remainingAmount
                      ? 'bg-red-100 text-red-500'
                      : 'bg-gray-100 text-gray-600 ',
                  ]"
                >
                  {{
                    transaction.remainingAmount != null
                      ? transaction.remainingAmount
                      : "None"
                  }}
                </p>
              </td>
              <td class="p-2 text-sm">
                <p
                  class="font-semibold"
                  :class="[
                    transaction.isVat ? 'text-blue-500' : 'text-yellow-600',
                  ]"
                >
                  {{ transaction.isVat ? "VAT" : "NO VAT" }}
                </p>
              </td>
              <td class="py-1 flex items-center justify-center">
                <button
                  @click="selectTransaction(index)"
                  class="py-1 px-3 text-sm font-medium text-black/70"
                >
                  VIEW
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="py-6 px-4 w-1/3 bg-white rounded-lg">
        <h4>Transaction Details</h4>
      </div>
    </div>
  </LoadingPageVue>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { useTransactionStore } from "../../stores/Transaction";

import LoadingPageVue from "../../layout/LoadingPage.vue";

export default defineComponent({
  components: {
    LoadingPageVue,
  },
  data() {
    return {
      loading: true,
      filter: {
        filterDate: null,
        transactionType: "all",
      },
    };
  },
  computed: {
    ...mapState(useTransactionStore, ["transactions", "selectedTransaction"]),
  },
  methods: {
    ...mapActions(useTransactionStore, [
      "fetchTransactions",
      "fetchSpecificTransaction",
    ]),
    selectTransaction(index: number) {
      // fetch the detail transaction by ID
      // need loading animation for the transaction detail view
      // useTransactionStore.
    },
  },
  async mounted() {
    await this.fetchTransactions({
      page: 1,
      perPage: 15,
      date: new Date().toISOString(),
      type: "all",
    });
    setTimeout(() => {
      this.loading = false;
    }, 1300);
    this.$emit("menuSelected", 4);
  },
});
</script>
