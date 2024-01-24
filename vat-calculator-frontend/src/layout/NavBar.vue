<template>
  <div class="h-screen w-full py-5 bg-primary flex flex-col rounded-r-lg">
    <img class="w-16 h-16" src="/tirfe_white.png" />
    <hr class="mt-4 border border-white/50" />
    <div class="flex flex-col">
      <p
        :class="[choosenMenu != 1 ? 'bg-primary' : 'bg-primaryHover']"
        class="py-4 px-6 flex items-center text-white cursor-pointer"
        @click="routerPush('dashboard')"
      >
        <svg
          class="mr-3"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1m0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1m10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1M13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1"
          />
        </svg>
        Dashboard
      </p>
      <p
        :class="[choosenMenu != 2 ? 'bg-primary' : 'bg-primaryHover']"
        class="py-4 px-6 flex items-center text-white cursor-pointer"
        @click="routerPush('inventory')"
      >
        <svg
          class="mr-3"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M2 2v6.7h1V22h18V8.7h1V2zm13 12H9v-2h6zm5-7H4V4h16z"
          />
        </svg>
        Inventory
      </p>
      <p
        :class="[choosenMenu != 3 ? 'bg-primary' : 'bg-primaryHover']"
        class="py-4 px-6 flex items-center text-white cursor-pointer"
        @click="$router.push('sales')"
      >
        <svg
          class="mr-3"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15c0-1.09 1.01-1.85 2.7-1.85c1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61c0 2.31 1.91 3.46 4.7 4.13c2.5.6 3 1.48 3 2.41c0 .69-.49 1.79-2.7 1.79c-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55c0-2.84-2.43-3.81-4.7-4.4"
          />
        </svg>
        Sale
      </p>
      <p
        :class="[choosenMenu != 4 ? 'bg-primary' : 'bg-primaryHover']"
        class="py-4 px-6 flex items-center text-white cursor-pointer"
        @click="$router.push('transactions')"
      >
        <svg
          class="mr-3"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9.01 14H2v2h7.01v3L13 15l-3.99-4zm5.98-1v-3H22V8h-7.01V5L11 9z"
          />
        </svg>
        Transaction
      </p>
      <p
        :class="[choosenMenu != 5 ? 'bg-primary' : 'bg-primaryHover']"
        class="py-4 px-6 flex items-center text-white cursor-pointer"
        @click="$router.push('')"
      >
        <svg
          class="mr-3"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m3.61 6.34c1.07 0 1.93.86 1.93 1.93s-.86 1.93-1.93 1.93s-1.93-.86-1.93-1.93c-.01-1.07.86-1.93 1.93-1.93m-6-1.58c1.3 0 2.36 1.06 2.36 2.36s-1.06 2.36-2.36 2.36s-2.36-1.06-2.36-2.36c0-1.31 1.05-2.36 2.36-2.36m0 9.13v3.75c-2.4-.75-4.3-2.6-5.14-4.96c1.05-1.12 3.67-1.69 5.14-1.69c.53 0 1.2.08 1.9.22c-1.64.87-1.9 2.02-1.9 2.68M12 20c-.27 0-.53-.01-.79-.04v-4.07c0-1.42 2.94-2.13 4.4-2.13c1.07 0 2.92.39 3.84 1.15C18.28 17.88 15.39 20 12 20"
          />
        </svg>
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
