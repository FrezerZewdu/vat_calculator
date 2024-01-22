<template>
  <div class="h-screen w-full py-5 bg-primary flex flex-col rounded-r-lg">
    <img class="w-16 h-16" src="/tirfe_white.png" />
    <hr class="mt-4 border border-white/50" />
    <div class="flex flex-col">
      <p
        :class="[choosenMenu != 1 ? 'bg-primary' : 'bg-primaryHover']"
        class="py-4 px-6 text-white cursor-pointer"
        @click="routerPush('dashboard')"
      >
        Dashboard
      </p>
      <p
        :class="[choosenMenu != 2 ? 'bg-primary' : 'bg-primaryHover']"
        class="py-4 px-6 text-white cursor-pointer"
        @click="routerPush('inventory')"
      >
        Inventory
      </p>
      <p
        :class="[choosenMenu != 3 ? 'bg-primary' : 'bg-primaryHover']"
        class="py-4 px-6 text-white cursor-pointer"
        @click="$router.push('sales')"
      >
        Sale
      </p>
      <p
        :class="[choosenMenu != 4 ? 'bg-primary' : 'bg-primaryHover']"
        class="py-4 px-6 text-white cursor-pointer"
        @click="$router.push('transactions')"
      >
        Transaction
      </p>
      <p
        :class="[choosenMenu != 5 ? 'bg-primary' : 'bg-primaryHover']"
        class="py-4 px-6 text-white cursor-pointer"
        @click="$router.push('')"
      >
        Users
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import { routerPush } from "@/router";
export default {
  props: ["choosenMenu"],
  methods: {
    routerPush,
  },
};
</script>
