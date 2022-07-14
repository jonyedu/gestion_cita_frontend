import { getHttpAuth } from "@/mixins/http";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "app-headers",
  data() {
    return {
    };
  },
  mounted() { },
  computed: {
    ...mapState("app", ["title"]),
    ...mapGetters("app", ["getMiniHeader", "getDrawerHeader"]),
    title: function () {
      let title = this.$route.name.replace(/_/g, ' - ');
      return this.$global.toCapitalFirstAllWords(title);
      return
    }
  },

  methods: {
    ...mapMutations("app", ["setMiniHeader", "setDrawerHeader"]),
    ...mapActions("app", ["storeCloseSnackbar"]),
    logout() {
      this.loading = true;
      getHttpAuth("/api/auth/logout")
        .then((response) => {
        })
        .catch((error) => {
        })
        .finally(() => {          
          this.$store.dispatch("auth/storeToken", null);
          this.$store.dispatch("auth/storeUser", {});
          this.$store.dispatch("auth/storeRole", []);

          this.loading = false;
          
          this.$router.push({name: 'login'})
        });
    },
    showPerfil() {
      this.$router.push({ name: "perfil" });
    }
  },
};