<template>
  <LoadingPageVue :loading="loading">
    <h2 class="text-black/70 font-medium">Accounts</h2>
    <div class="mt-5 py-6 px-4 w-full flex space-x-5">
      <!-- search -->
    </div>
    <div class="py-6 px-4 w-full bg-white rounded-xl">
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
      </table>
    </div>
  </LoadingPageVue>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import LoadingPageVue from "../../layout/LoadingPage.vue";
export default defineComponent({
  components: {
    LoadingPageVue,
  },
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1300);
    this.$emit("menuSelected", 5);
  },
});
</script>
