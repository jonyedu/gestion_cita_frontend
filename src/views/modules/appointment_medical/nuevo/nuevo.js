import { getHttpAuth, postHttpAuth, putHttpAuth, postHttpAuthFile } from "@/mixins/http";
import { mapActions } from "vuex";
export default {
  name: "appointment_medical-new",

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
          pet: {
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
          pet_medical_appointment_id: null,
          pet_id: null,
          registration_date: null,
          registration_time: null,
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
    "app.cmb.pet.search"(val) {
      // return;
      // Si es null, se detiene el proceso
      if (val == null) return

      // Si tiene menos de 2 caracteres, se detiene el proceso
      if (val.length <= 2) return

      // Si existe una peticion en proceso, se detiene el proceso
      if (this.app.cmb.pet.is_loading) return

      this.app.cmb.pet.is_loading = true;
      // Realiza la peticion al servidor
      getHttpAuth('/api/pet/search/' + val)
        .then((response) => {
          this.app.cmb.pet.items = response.data.pets;
        })
        .catch(err => {
        })
        .finally(() => (this.app.cmb.pet.is_loading = false))
    },
  },

  mounted: function () {
    this.form.submit.pet_medical_appointment_id = this.$store.getters['app/getRegistroId'];
    var pet = this.$store.getters['appointment_medical/getAppointmentMedical'];
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
      if (this.form.submit.pet != undefined) {
        this.app.cmb.pet.items.push({ name: this.form.submit.pet });
        this.app.cmb.pet.select = { name: this.form.submit.pet };
      }
    },


    /**
    * @description Metodo regresar al componente de lista
    */
    showListado() {
      this.$router.push({ name: "appointment_medical_list" });
    },

    /**
    * @description Metodo para validar si se guarda o modifica
    */
    validate(tooltip = {}) {
      tooltip.loading = true;
      if (this.form.submit.pet_medical_appointment_id == this.$store.getters['app/getRegistroId']) {
        this.guardar(tooltip);
      } else {
        this.modificar(tooltip);
      }
    },

    /**
    * @description Metodo guardar el registro
    */
    guardar(tooltip) {
      postHttpAuth("/api/appointment_medical/appointment_medical", this.form.submit)
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
      putHttpAuth("/api/appointment_medical/appointment_medical/" + this.form.submit.pet_medical_appointment_id, this.form.submit)
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
      this.form.submit.pet_medical_appointment_id = this.$store.getters['app/getRegistroId'];
      setTimeout(() => {
        this.form.submit.es_grupo = false;
        this.form.submit.es_activo = true;
      }, 50);

    },
  },
}