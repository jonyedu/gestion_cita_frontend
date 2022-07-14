import { getHttpAuth, postHttpAuth, putHttpAuth, postHttpAuthFile } from "@/mixins/http";
import { mapActions } from "vuex";
export default {
  name: "pet-new",

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
        cmb: {
          people: {
            is_loading: false,
            items: new Array(),
            select: new Object(),
            search: null,
          },
          pet_type: {
            is_loading: false,
            items: new Array(),
            select: new Object(),
            search: null,
          },
        },
        tooltips: [
          {
            color: 'primary',
            mdi: 'mdi-table-arrow-left',
            texto: 'Volver hacia Atrás',
            method: true,
            call_method: this.showListado,
            loading: false,
          },
          {
            color: 'red',
            mdi: 'mdi-broom',
            texto: 'Limpiar Formulario',
            method: true,
            call_method: this.clearForm,
            loading: false,
          },
          {
            color: 'success',
            mdi: 'mdi-content-save',
            texto: 'Guardar Registro',
            method: true,
            call_method: this.validate,
            loading: false,
          },
        ],
      },
      form: {
        submit: {
          pet_id: null,
          people_id: null,
          pet_type_id: null,
          name: null,
          age: null,
        },
        error: {},
      },
    }
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
    "app.cmb.people.search"(val) {
      // return;
      // Si es null, se detiene el proceso
      if (val == null) return

      // Si tiene menos de 2 caracteres, se detiene el proceso
      if (val.length <= 2) return

      // Si existe una peticion en proceso, se detiene el proceso
      if (this.app.cmb.people.is_loading) return

      this.app.cmb.people.is_loading = true;
      // Realiza la peticion al servidor
      getHttpAuth('/api/people/search/' + val)
        .then((response) => {
          this.app.cmb.people.items = response.data.peoples;
        })
        .catch(err => {
        })
        .finally(() => (this.app.cmb.people.is_loading = false))
    },
    "app.cmb.pet_type.search"(val) {
      // return;
      // Si es null, se detiene el proceso
      if (val == null) return

      // Si tiene menos de 2 caracteres, se detiene el proceso
      if (val.length <= 2) return

      // Si existe una peticion en proceso, se detiene el proceso
      if (this.app.cmb.pet_type.is_loading) return

      this.app.cmb.pet_type.is_loading = true;
      // Realiza la peticion al servidor
      getHttpAuth('/api/pet_type/search/' + val)
        .then((response) => {
          this.app.cmb.pet_type.items = response.data.pets_types;
        })
        .catch(err => {
        })
        .finally(() => (this.app.cmb.pet_type.is_loading = false))
    },
  },

  mounted: function () {
    this.form.submit.pet_id = this.$store.getters['app/getRegistroId'];
    var pet = this.$store.getters['pet/getPet'];
    if (Object.keys(pet).length == 0) return;
    this.form.submit = pet;
    this.setCmb();
  },

  methods: {
    ...mapActions("app", ["storeCloseSnackbar"]),

    /**
    * @description Metodo setear los valores del cmb
    */
    setCmb() {
      if (this.form.submit.people_id != undefined) {
        this.app.cmb.people.items.push({ name: this.form.submit.people });
        this.app.cmb.people.select = { name: this.form.submit.people };
      }

      if (this.form.submit.pet_type_id != undefined) {
        this.app.cmb.pet_type.items.push({ descripcion: this.form.submit.pet_type });
        this.app.cmb.pet_type.select = { descripcion: this.form.submit.pet_type };
      }
    },


    /**
    * @description Metodo regresar al componente de lista
    */
    showListado() {
      this.$router.push({ name: "pet_list" });
    },

    /**
    * @description Metodo para validar si se guarda o modifica
    */
    validate(tooltip = {}) {
      tooltip.loading = true;
      if (this.form.submit.pet_id == this.$store.getters['app/getRegistroId']) {
        this.guardar(tooltip);
      } else {
        this.modificar(tooltip);
      }
    },

    /**
    * @description Metodo guardar el registro
    */
    guardar(tooltip) {
      postHttpAuth("/api/pet/pet", this.form.submit)
        .then((response) => {
          this.$store.state.app.snackbar.content = response.data.msj;
          this.$store.state.app.snackbar.color = "success";
          this.clearForm();
        })
        .catch(error => {
          this.form.error = {};
          if (error.response) {
            if (error.response.status == 422) {
              const object = error.response.data.errors;
              for (const property in object) {
                this.form.error[property] = object[property]
              }
              this.$store.state.app.snackbar.content = error.response.data.message;
            } else {
              this.$store.state.app.snackbar.content = error.response.data.msj;
            }
            this.$store.state.app.snackbar.color = "red";
            this.$store.state.app.snackbar.visible = true;
          } else {
            console.error(error.message)
          }
        })
        .finally(() => {
          this.$store.state.app.snackbar.visible = true;
          tooltip.loading = false;
        });
    },

    /**
    * @description Metodo modificar el registro
    */
    modificar(tooltip) {
      putHttpAuth("/api/pet/pet/" + this.form.submit.pet_id, this.form.submit)
        .then((response) => {
          this.$store.state.app.snackbar.content = response.data.msj;
          this.$store.state.app.snackbar.color = "success";
          this.clearForm();
        })
        .catch(error => {
          this.form.error = {};
          if (error.response) {
            if (error.response.status == 422) {
              const object = error.response.data.errors;
              for (const property in object) {
                this.form.error[property] = object[property]
              }
              this.$store.state.app.snackbar.content = error.response.data.message;
            } else {
              this.$store.state.app.snackbar.content = error.response.data.msj;
            }
            this.$store.state.app.snackbar.color = "red";
            this.$store.state.app.snackbar.visible = true;
          } else {
            console.error(error.message)
          }
        })
        .finally(() => {
          this.$store.state.app.snackbar.visible = true;
          tooltip.loading = false;
        });
    },

    /**
    * @description Metodo limpiar el formulario
    */
    clearForm() {
      this.form.error = {};
      this.$refs.card.reset();
      this.form.submit.file = null;
      this.form.submit.es_grupo = true;
      this.form.submit.es_activo = false;
      this.form.submit.pet_id = this.$store.getters['app/getRegistroId'];
      setTimeout(() => {
        this.form.submit.es_grupo = false;
        this.form.submit.es_activo = true;
      }, 50);

    },
  },
}