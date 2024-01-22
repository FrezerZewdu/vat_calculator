<template>
  <div class="flex rounded-xl relative">
    <input
      type="text"
      class="border rounded-l-xl p-2"
      :placeholder="placeholderText"
      @change="$emit('textInput', searchString)"
      v-model="searchString"
    />
    <button
      @click="$emit('wantedItem', searchString)"
      class="px-4 py-2 rounded-r-xl bg-primary hover:bg-primaryHover text-white"
    >
      <!-- search icon svg -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"
        />
      </svg>
    </button>
    <div
      v-if="suggestions.length"
      class="absolute inset-x-0 top-5 bg-white flex flex-col space-y-1 divide-y text-sm text-black/70 py-2"
    >
      <p
        v-for="suggestion in suggestions"
        :key="suggestion.id"
        @click="$emit('wantedItem', suggestion.id)"
        class="px-4 truncate"
      >
        {{ suggestion.name }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    placeholderText: String,
    suggestions: Array,
  },
  data() {
    return {
      searchString: "",
    };
  },
};
</script>
