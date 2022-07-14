export default {
  name: "app-layout",
  methods: {
    showHome() {
      this.$router.push({ name: 'dashboard' });
    }
  },
};