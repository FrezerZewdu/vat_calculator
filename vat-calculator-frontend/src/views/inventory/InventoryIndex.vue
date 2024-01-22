<template>
  <LoadingPageVue :loading="loading">
    <h2 class="text-black/70 font-medium">Inventory</h2>
    <div class="mt-5 py-6 px-4 w-full flex justify-between bg-white rounded-lg">
      <SearchBarVue
        class="basis-1/3"
        :placeholderText="'Search Item'"
        :suggestions="suggestions"
        @textInput="fetchSuggestions"
        @wantedItem="search"
      />
      <button class="py-2 px-5 primary-button">New Item</button>
    </div>
    <div class="mt-5 w-full h-3/4 flex space-x-5">
      <div class="py-6 px-4 w-3/4 bg-white rounded-lg">
        <table class="w-full">
          <thead class="bg-slate-50 shadow-sm rounded-t-lg">
            <th class="text-sm font-medium text-black/70 p-2">ID</th>
            <th class="text-sm font-medium text-black/70 p-2">NAME</th>
            <th class="text-sm font-medium text-black/70 p-2">STOCK</th>
            <th class="text-sm font-medium text-black/70 p-2">VAT STOCK</th>
            <th class="text-sm font-medium text-black/70 p-2">PRICE</th>
            <th class="text-sm font-medium text-black/70 p-2">ACTIONS</th>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <div class="py-6 px-4 w-1/4 bg-white rounded-lg"></div>
    </div>
  </LoadingPageVue>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import SearchBarVue from "@/components/common/SearchBar.vue";
import LoadingPageVue from "../../layout/LoadingPage.vue";

export default defineComponent({
  components: {
    LoadingPageVue,
    SearchBarVue,
  },
  data() {
    return {
      loading: true,
      suggestions: [],
    };
  },
  methods: {
    fetchSuggestions(searchString: string) {
      console.log(searchString);
      // call api to fetch suggestions
    },
    search(searchString: string) {
      console.log(searchString);
      // call api to search and replace full inventory items with searched one
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1300);
    this.$emit("menuSelected", 2);
  },
});
</script>
