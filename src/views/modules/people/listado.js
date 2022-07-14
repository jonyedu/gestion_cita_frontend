import { getHttpAuth } from "@/mixins/http";
import { mapActions } from "vuex";
import _ from "lodash";
export default {
  name: "listado",
  data() {
    return {
      table: {
        loading_table: false,
        modulos: [],
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Identification', value: 'identification_card' },
          { text: 'phone', value: 'phone' },
          { text: 'direction', value: 'direction' },
        ],
      },
      app: {

        total_modulo: 0,
        firstLoad: true,
        tooltips: [
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
        },
        error: {},


      },
    }
  },
  mounted() { },
  watch: {
    "form.submit.options": {
      handler() {
        this.getPeople(this);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions("app", ["storeCloseSnackbar"]),

    /**
    * @description Metodo detectar el cambio de los input
    * @param {vm} object
    * @param {tooltip} object
    */
    onSearch(tooltip = {}) {
      if (typeof tooltip == 'object' && tooltip != null) return this.getPeople(this, tooltip);
      if (this.form.submit.search.length >= 3) {
        this.getPeople(this);
      } if (this.form.submit.search.length == 0) {
        this.getPeople(this);
      }
    },

    /**
    * @description Metodo buscar la persona
    * @param {vm} object
    * @param {tooltip} object
    */
    getPeople: _.debounce((vm, tooltip = {}) => {
      vm.table.loading_table = true;
      tooltip.loading = true;

      getHttpAuth("/api/people/get_for_type_people/2")
        .then((response) => {
          vm.table.modulos = response.data.peoples.data;
          vm.app.total_modulo = response.data.peoples.total
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

  },
}