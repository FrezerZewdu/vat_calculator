<template>
  <ModalBackgroundVue>
    <div class="w-1/2 h-3/4 p-10 bg-white rounded-xl">
      <div class="flex justify-end">
        <!-- close icon svg -->
        <svg
          @click="$emit('closeModal')"
          class="cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
          />
        </svg>
      </div>
      <div class="flex mt-5 border-t">
        <div class="w-1/2">
          <h3>{{ item.name }}</h3>
        </div>
        <div class="w-1/2 flex justify-between">
          <!-- doughnut charts go here -->
        </div>
      </div>
    </div>
  </ModalBackgroundVue>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { ItemDetailType } from "@/model/Item";

import ModalBackgroundVue from "@/layout/ModalBackground.vue";
export default defineComponent({
  components: {
    ModalBackgroundVue,
  },
  data() {
    return {
      item: {} as ItemDetailType,
    };
  },
  async mounted() {
    // this.item = await api
  },
});
</script>
