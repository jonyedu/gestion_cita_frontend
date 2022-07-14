<template>
  <v-app>
    <app-headers />
    <app-drawer />
    <app-view />
    <app-footer />
  </v-app>
</template>
<script>
import AppHeaders from "./components/headers/Headers.vue";
import AppDrawer from "./components/drawer/Drawer.vue";
import AppView from "./components/view/View.vue";
import AppFooter from "./components/footer/Footer.vue";
export default {
  name: "app-layout",
  components: {
    AppHeaders,
    AppDrawer,
    AppView,
    AppFooter,
  },
  // mounted() {
  //   console.log(window.Echo);
  //   window.Echo.channel("channel").listen("PruebaEvent", (e) => {
  //     console.log("sdfsdf");
  //     console.log(e);
  //   });
  // },
};
</script>
