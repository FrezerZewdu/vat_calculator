<template>
  <tr class="p-2">
    <td class="p-2">{{ account.id }}</td>
    <td class="px-2 py-1 text-sm font-medium">{{ account.name }}</td>
    <td class="px-2 py-1 text-sm">{{ account.email }}</td>
    <td class="px-2 py-1 text-sm text-center">
      <p>{{ account.role }}</p>
    </td>
    <td class="relative flex items-center justify-center py-1">
      <svg
        @mouseenter="showOptions = true"
        class="cursor-pointer p-1 hover:border rounded hover:shadow-innertransition-all duration-300"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0m0-6a2 2 0 1 0 4 0a2 2 0 0 0-4 0m0 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0"
        />
      </svg>
      <transition
        enter-from-class="h-0"
        enter-to-class="h-auto"
        enter-active-class="transition-all duration-300"
        leave-from-class="h-auto"
        leave-to-class="h-0"
        leave-active-class="transition-all duration-300"
      >
        <div
          v-show="showOptions"
          @mouseleave="showOptions = false"
          v-click-outside="closeShowOption"
          class="absolute top-1 right-5 px-2 pt-2 pb-4 flex flex-col divide-y bg-white rounded shadow-md"
        >
          <div
            class="flex items-center space-x-2 text-xs text-black/70 cursor-pointer hover:bg-slate-50"
          >
            <!-- delete account icon svg -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M16 9v10H8V9zm-1.5-6h-5l-1 1H5v2h14V4h-3.5zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2z"
              />
            </svg>
            <p>Delete User</p>
          </div>
        </div>
      </transition>
    </td>
  </tr>
</template>
<script lang="ts">
import { PropType, defineComponent } from "vue";
import { AccountType } from "../../model/Accounts";
export default defineComponent({
  props: {
    account: {
      required: true,
      type: Object as PropType<AccountType>,
    },
  },
  data() {
    return {
      showOptions: false,
    };
  },
  methods: {
    closeShowOption() {
      this.showOptions = false;
    },
  },
});
</script>
