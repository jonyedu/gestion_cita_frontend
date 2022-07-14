import { postHttpAuth, deleteHttpAuth, postHttpAuthGetFile } from "@/mixins/http";
import { mapActions } from "vuex";
import _ from "lodash";
export default {
  name: "pet-list",
  data() {
    return {
      fab: false,
      table: {
        loading_table: false,
        pets: [],
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'People', value: 'people' },
          { text: 'petType', value: 'pet_type' },
          { text: 'Age', value: 'age' },
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
    ...mapActions("pet", ["storePet"]),

    /**
   * @description Metodo cambiar el componente nuevo
   */
    showNuevo() {
      this.storePet({});
      this.$router.push({ name: "pet_new" });
    },

    /**
    * @description Metodo cambiar el componente nuevo
    */
    showEdit(pet) {
      this.storePet(pet);
      this.$router.push({ name: "pet_new" });
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

      postHttpAuth("/api/pet/get_pet?page=" + vm.form.submit.options.page, vm.form.submit)
        .then((response) => {
          vm.table.pets = response.data.pets.data;
          vm.app.total = response.data.pets.total
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
      deleteHttpAuth("/api/pet/pet/" + this.app.pet_id)
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
      deleteHttpAuth("/api/pet/pet/destroy_massive", this.form.submit)
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