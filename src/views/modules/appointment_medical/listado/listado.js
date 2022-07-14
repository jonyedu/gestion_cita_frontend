import { postHttpAuth, deleteHttpAuth, postHttpAuthGetFile } from "@/mixins/http";
import { mapActions } from "vuex";
import _ from "lodash";
export default {
  name: "appointment_medical-list",
  data() {
    return {
      fab: false,
      table: {
        loading_table: false,
        pet_medical_appointments: [],
        headers: [
          { text: 'Pet', value: 'pet' },
          { text: 'Registration Date', value: 'registration_date' },
          { text: 'Registration Time', value: 'registration_time' },
          { text: 'Turn', value: 'turn' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
      },
      app: {
        show_dialog: false,
        total: 0,
        pet_id: 0,
        name: "",
        firstLoad: true,
        show_card: true,
        tooltips: [
          {
            color: 'success',
            mdi: 'mdi-plus-circle',
            texto: 'Crear Nuevo Registro',
            method: true,
            call_method: this.showNuevo,
            loading: false,
          },
          {
            color: 'error',
            mdi: 'mdi-delete',
            texto: 'Eliminar Varios Registro',
            method: true,
            call_method: this.destroyMassive,
            loading: false,
          },
          {
            color: 'primary',
            mdi: 'mdi-backup-restore',
            texto: 'Recargar Datos',
            method: true,
            call_method: this.onSearch,
            loading: false,
          },
        ],
      },
      form: {
        submit: {
          selected: [],
          options: {},
          search: '',
          select: null,
        },
        error: {},
        cmb: {
          estado: {
            items_estados: [
              { item_text: 'Todos', item_value: null },
              { item_text: 'Activo', item_value: true },
              { item_text: 'Inactivo', item_value: false },
            ],
          }
        },


      },
    }
  },
  mounted() { },
  watch: {
    "form.submit.options": {
      handler() {
        this.getPet(this);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions("app", ["storeCloseSnackbar"]),
    ...mapActions("appointment_medical", ["storeAppointmentMedical"]),

    /**
   * @description Metodo cambiar el componente nuevo
   */
    showNuevo() {
      this.storeAppointmentMedical({});
      this.$router.push({ name: "appointment_medical_new" });
    },

    /**
    * @description Metodo cambiar el componente nuevo
    */
    showEdit(appointment_medical) {
      this.storeAppointmentMedical(appointment_medical);
      this.$router.push({ name: "appointment_medical_new" });
    },

    /**
   * @description Metodo para validar la busqueda
   */
    onSearch(tooltip = {}) {
      if (typeof tooltip == 'object' && tooltip != null) return this.getPet(this, tooltip);
      if (this.form.submit.search.length >= 3) {
        this.getPet(this);
      } if (this.form.submit.search.length == 0) {
        this.getPet(this);
      }
    },

    /**
   * @description Metodo buscar en el servidor
   */
    getPet: _.debounce((vm, tooltip = {}) => {
      vm.table.loading_table = true;

      tooltip.loading = true;

      postHttpAuth("/api/appointment_medical/get_appointment_medical?page=" + vm.form.submit.options.page, vm.form.submit)
        .then((response) => {
          vm.table.pet_medical_appointments = response.data.pet_medical_appointments.data;
          vm.app.total = response.data.pet_medical_appointments.total
        })
        .catch((error) => {
          vm.$store.state.app.snackbar.content = error.message;
          vm.$store.state.app.snackbar.visible = true;
          vm.$store.state.app.snackbar.color = "red";
        })
        .finally(() => {
          vm.table.loading_table = false;
          tooltip.loading = false;
          vm.app.firstLoad = false;
        });
    }, 500),

    /**
   * @description Metodo abrir el modal cuando se desea eliminar un registro
   */
    showDestroy(item) {
      this.app.name = item.name;
      this.app.pet_id = item.pet_id
      this.app.show_dialog = true;
    },

    /**
   * @description Metodo cerrar el modal cuando se desea eliminar un registro
   */
    hideDestroy() {
      this.app.show_dialog = false;
      this.app.pet_id = 0;
      this.app.name = "";
    },

    /**
   * @description Metodo eliminar el registro en el servidor
   */
    destroy() {
      if (this.app.pet_id <= 0) return;
      deleteHttpAuth("/api/appointment_medical/appointment_medical/" + this.app.pet_id)
        .then((response) => {
          this.getPet(this);
          this.$store.state.app.snackbar.content = response.data.msj;
          this.$store.state.app.snackbar.color = "success";
        })
        .catch((error) => {
          this.$store.state.app.snackbar.content = error.response.data.message;
          this.$store.state.app.snackbar.color = "red";
        })
        .finally(() => {
          this.$store.state.app.snackbar.visible = true;
          this.hideDestroy();
        });
    },

    /**
   * @description Metodo eliminar el registro en el servidor masivamente
   */
    destroyMassive(tooltip = {}) {
      if (this.form.submit.selected.length <= 0) return;
      tooltip.loading = true;
      deleteHttpAuth("/api/appointment_medical/appointment_medical/destroy_massive", this.form.submit)
        .then((response) => {
          this.getPet(this);
          this.form.submit.selected = [];
          this.$store.state.app.snackbar.content = response.data.msj;
          this.$store.state.app.snackbar.color = "success";
        })
        .catch((error) => {
          this.$store.state.app.snackbar.content = error.response.data.message;
          this.$store.state.app.snackbar.color = "red";
        })
        .finally(() => {
          this.$store.state.app.snackbar.visible = true;
          tooltip.loading = false;
        });
    },
  },
}