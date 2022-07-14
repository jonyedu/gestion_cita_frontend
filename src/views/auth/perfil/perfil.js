import { putHttpAuth } from "@/mixins/http";
import { mapActions } from "vuex";
export default {
  name: "perfil",

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

  data() {
    return {
      app: {
        password_visible: false,
        confirm_password_visible: false,
        file: null,
        tooltips: [
          {
            color: 'primary',
            mdi: 'mdi-home',
            texto: 'Volver al Dashboard',
            method: true,
            call_method: this.showMain,
            loading: false,
          },
          {
            color: 'success',
            mdi: 'mdi-content-save',
            texto: 'Guardar Registro',
            method: true,
            call_method: this.modificar,
            loading: false,
          },
        ],
      },
      form: {
        submit: {
          usuario_id: 0,
          name: "",
          email: "",
          user_name: "",
          profile_photo_path: null,
          profile_photo_path_temp: null,
          password: "",
          confirm_password: "",
          roles: new Array(),
        },
        error: {},
      },
    }
  },
  mounted: function () {
    this.form.submit.usuario_id = this.$store.getters['app/getRegistroId'];
    var user = this.$store.getters['auth/getUser'];
    if (Object.keys(user).length == 0) return;
    var file = this.$store.getters['auth/getUser'].profile_photo_path;
    this.app.file = file;
    this.form.submit.usuario_id = user.usuario_id;
    this.form.submit.name = user.name;
    this.form.submit.user_name = user.user_name;
    this.form.submit.email = user.email;
    this.form.submit.roles = user.roles;
    this.form.submit.profile_photo_path = this.$global.convertBasa64ToFile(file, user.name);
  },

  methods: {
    ...mapActions("app", ["storeCloseSnackbar"]),
    showMain(){
      this.$router.push({ name: "dashboard" });
    },
    validate() {
      var file_type = this.form.submit.profile_photo_path.type;
      if (file_type === "image/jpeg" && file_type === "image/png" && file_type === "image/jpg") {
        this.$store.state.app.snackbar.content = "Archivo no compatible.";
        this.$store.state.app.snackbar.color = "warning";
        this.$store.state.app.snackbar.visible = true;
        return false;
      }
      return true;
    },
    modificar(tooltip = {}) {
      if(!this.validate()) return;
      tooltip.loading = true;
      this.form.submit.profile_photo_path_temp = this.app.file;
      putHttpAuth("/api/seguridad/usuario/" + this.form.submit.usuario_id, this.form.submit)
        .then((response) => {
          // this.$store.state.app.snackbar.content = response.data.msj;
          // this.$store.state.app.snackbar.color = "success";
          console.log({response})

        })
        .catch((error) => {
          console.log({error})
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
          tooltip.loading = false;
        });
    },
  },
}