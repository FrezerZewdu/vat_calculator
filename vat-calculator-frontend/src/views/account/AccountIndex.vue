<template>
  <LoadingPageVue :loading="loadingAccounts">
    <h2 class="text-black/70 font-medium">Accounts</h2>
    <div class="mt-5 py-6 px-4 w-full flex space-x-5">
      <!-- search -->
    </div>
    <div class="py-6 px-4 w-full bg-white rounded-xl">
      <table class="w-full">
        <thead class="bg-slate-500 shadow-sm rounded-t-lg">
          <th class="text-sm font-medium text-white/80 p-2">ID</th>
          <th class="text-sm font-medium text-white/80 p-2">Name</th>
          <th class="text-sm font-medium text-white/80 p-2">Email</th>
          <th class="text-sm font-medium text-white/80 p-2">Role</th>
          <th class="text-sm font-medium text-white/80 p-2"></th>
        </thead>
        <tbody>
          <AccountRowVue
            class="even:bg-slate-50"
            v-for="account in accounts"
            :key="account.id"
            :account="account"
          />
        </tbody>
      </table>
    </div>
  </LoadingPageVue>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapActions } from "pinia";
import { useAccountStore } from "../../stores/Accounts";
import LoadingPageVue from "../../layout/LoadingPage.vue";
import AccountRowVue from "./AccountRow.vue";
export default defineComponent({
  components: {
    LoadingPageVue,
    AccountRowVue,
  },
  computed: {
    ...mapState(useAccountStore, ["accounts", "loadingAccounts"]),
  },
  methods: {
    ...mapActions(useAccountStore, ["fetchAccounts", "updateAccount"]),
  },
  async mounted() {
    await this.fetchAccounts({
      page: 1,
      perPage: 10,
      search: "",
    });
    this.$emit("menuSelected", 5);
  },
});
</script>
