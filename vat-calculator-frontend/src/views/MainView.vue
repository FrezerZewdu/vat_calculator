<template>
  <div class="grid xl:grid-cols-6 lg:grid-cols-4 grid-cols-1">
    <NavBarVue :choosenMenu="selectedMenu" />
    <div
      class="xl:col-span-5 lg:col-span-3 col-span-1 h-screen overflow-y-auto"
    >
      <router-view @menuSelected="(value) => (selectedMenu = value)" />
    </div>
  </div>
</template>
<script>
import NavBarVue from "@/layout/NavBar.vue";
export default {
  components: {
    NavBarVue,
  },
  data() {
    return {
      selectedMenu: 1,
    };
  },
};
</script>
