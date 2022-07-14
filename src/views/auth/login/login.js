import { postHttp } from "@/mixins/httpDefault";
import AppFooter from "@/views/app/application/components/footer/Footer.vue";
import { mapActions } from "vuex";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });
export default {
  name: 'login',
  data() {
    return {
      request_config: {
        loading: false,
        password_visible: false,
      },
      user: {
        email: "",
        password: "",
        remember_me: true,
      },
      form: {
        error: {},
      },

    };
  },
  watch: {
    "form.submit": {
      handler: function (object) {
        for (const property in object) {
          //Esto es para limpiar los errores
          if (!this.form.submit[property] == "") {
            this.form.error[property] = "";
          }
        }
      },
      deep: true,
    },

  },
  components: {
    AppFooter,
  },
  created() { },
  methods: {
    ...mapActions("app", ["storeCloseSnackbar"]),
    showForgotPassword() {
      this.$router.push({ name: "forgot_password" });
    },
    login() {
      this.request_config.loading = true;
      postHttp("/api/auth/login", this.user)
        .then((response) => {
          const token = response.data.access_token;
          const user = response.data.user;

          this.$store.dispatch("auth/storeToken", token);
          this.$store.dispatch("auth/storeUser", user);

          this.$store.dispatch('app/storeGetEncrypt');
          this.$router.push({ name: "dashboard" });
          this.$store.state.app.snackbar.content = "Inicio de sección correcto.";
          this.$store.state.app.snackbar.color = "green";
        })
        .catch((error) => {
          this.form.error = {};
          if (error.response) {
            if (error.response.status == 422) {
              const object = error.response.data.errors;
              for (const property in object) {
                this.form.error[property] = object[property]
              }
              this.$store.state.app.snackbar.content = error.message;
            } else {
              this.$store.state.app.snackbar.content = error.response.data.msj;
            }
            this.$store.state.app.snackbar.color = "red";
          } else {
            console.error(error.message)
          }
        })
        .finally(() => {
          this.$store.state.app.snackbar.visible = true;
          this.request_config.loading = false;
        });
    },
  },
};