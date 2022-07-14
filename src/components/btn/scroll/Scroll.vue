<template>
  <v-btn
    v-scroll="onScroll"
    v-show="fab"
    fab
    dark
    fixed
    bottom
    right
    color="red darken-2"
    @click="toTop"
  >
    <v-icon>mdi-arrow-up-drop-circle-outline</v-icon>
  </v-btn>
</template>
<script>
export default {
  name: "app-scroll",
  data() {
    return {
      fab: false,
    };
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>