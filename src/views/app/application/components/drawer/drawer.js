import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "app-drawer",

  data() {
    return {
      modulos: [
        {
          modulo_id: 1,
          descripcion: "Pets",
          icono: "mdi-dog",
          to: "",
          nombre_route: "",
          color: "blue",
          is_group: true,
          childrens: [
            {
              grupo_id: 1,
              modulo_id: 2,
              descripcion: "Consult Pets",
              icono: "",
              to: "/pet/list",
              nombre_route: "pet_list",
              color: "",
              is_sub_group: false,
              childrens: [],
            },
          ],
        },
        {
          modulo_id: 2,
          descripcion: "Appointments Medical",
          icono: "mdi-doctor",
          to: "",
          nombre_route: "",
          color: "green",
          is_group: true,
          childrens: [
            {
              grupo_id: 1,
              modulo_id: 2,
              descripcion: "Consult Appointments Medical",
              icono: "",
              to: "/appointment_medical/list",
              nombre_route: "appointment_medical_list",
              color: "",
              is_sub_group: false,
              childrens: [],
            },
          ],
        },
      ],
    };
  },

  computed: {
    ...mapState("app", [
      "drawerImage",
      "items",
    ]),

    ...mapGetters("app", [
      "getDark",
      "getGradient",
      "getImage",
      "getMiniHeader",
      "getDrawerHeader",
    ]),
    ...mapGetters("auth", [
      "getMenu",
    ]),
  },

  mounted() {
    this.validateMenu();
  },

  methods: {
    /**
    * @description esto es para el escenario cuando los usuarios ya estan logeado en el sistema y 
    * no tiene cargado los datos del menu y cargue los menus desde BD
    */
    validateMenu() {
      // if (!this.getMenu.length) return this.$store.dispatch('auth/storeGetMenu');
    },

    /**
    * @description regresa al menu principal
    */
    showMain() {
      this.$router.push({ name: 'dashboard' });
    },
  }
};