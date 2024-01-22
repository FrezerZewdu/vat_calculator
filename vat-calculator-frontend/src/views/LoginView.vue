<template>
  <div
    class="h-screen w-full flex justify-center items-center bg-gradient-to-br from-sky-50 to-sky-100"
  >
    <div class="p-10 bg-white rounded-xl xl:w-1/4 lg:w-2/3 w-11/12">
      <img class="xl:w-20 w-16" src="/tirfe_blue.png" />
      <p class="mt-6 text-black/70 text-center text-sm">
        Welcome back. Login with your email and password.
      </p>
      <form @submit.prevent="login" class="mt-6 flex flex-col space-y-3">
        <input
          type="text"
          class="py-1 pl-1 border rounded"
          v-model="credentials.email"
        />
        <input
          type="password"
          class="py-1 pl-1 border rounded"
          v-model="credentials.password"
        />
        <button
          type="submit"
          class="py-2 px-5 self-end primary-button flex items-center"
        >
          <!-- loading animation -->
          <svg
            v-if="loading"
            class="mr-2"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
              opacity=".5"
            />
            <path
              fill="currentColor"
              d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
            >
              <animateTransform
                attributeName="transform"
                dur="1s"
                from="0 12 12"
                repeatCount="indefinite"
                to="360 12 12"
                type="rotate"
              />
            </path>
          </svg>
          Login
        </button>
      </form>
      <p class="mt-4 text-red-500 text-center">{{ errMessage }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { routerPush } from "../router/index";
export default {
  data() {
    return {
      credentials: {
        email: "",
        password: "",
      },
      loading: false,
      errMessage: "",
    };
  },
  methods: {
    async login() {
      // login logic
      await routerPush("inventory");
    },
  },
};
</script>
