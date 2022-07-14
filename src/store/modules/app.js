import axios from 'axios';

const app = {
  namespaced: true,
  state: () => ({
    app_name: process.env.VUE_APP_NAME,
    base_URL: process.env.VUE_APP_ROOT_API,
    drawerImage: true,
    mini_header: false,
    dark: false,
    drawer_header: null,
    gradients: [
      'rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)',
      'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)',
      'rgba(244, 67, 54, .8), rgba(244, 67, 54, .8)',
    ],
    drawer_drawer: {
      image: 0,
      gradient: 0,
      mini: false,
    },
    snackbar: {
      visible: false,
      content: "",
      color: "",
    },
    images: [
      require('@/assets/images/menu/menu_120 x 600.png')
    ],
    avatar: require('@/assets/images/avatar.png'),
    registro_id: '0',
    host_msp: 'https://coresalud.msp.gob.ec',
    url_rpis_pdf: '/coresalud/app.php/publico/rpis/afiliacion/pdf',
    url_rpis_consulta: '/coresalud/app.php/publico/rpis/afiliacion/consulta',
  }),

  mutations: {
    setBaseURL(state) {
      state.base_URL = state.base_URL;
    },
    setRegistroId(state, payload) {
      state.registro_id = payload;
    },
    setMiniHeader(state, payload) {
      state.mini_header = payload;
    },
    setDrawerHeader(state, payload) {
      state.drawer_header = payload;
    },
    setSnackbar(state, payload) {
      state.drawer_header = payload;
    },
    setCloseSnackbar(state, payload) {
      state.snackbar.visible = payload;
    },
  },

  //Esto es para hacer consulas a la BD
  actions: {
    storeGetEncrypt(context) {
      axios(context.state.base_URL + "/api/auth/get_encrypt/0")
        .then((response) => {
          context.commit('setRegistroId', response.data.value);
        })
        .catch((error) => {
          console.error({ error })
        })
        .finally(() => {
        });
    },
    storeBaseURL(context) {
      context.commit('base_URL');
    },
    storeRegistroId(context, object) {
      context.commit('setRegistroId', object);
    },
    storeSnackbar(context, object) {
      context.commit('setSnackbar', object);
    },
    storeCloseSnackbar(context, value) {
      context.commit('setCloseSnackbar', value);
    },
  },

  getters: {
    getRegistroId(state) {
      return state.registro_id;
    },
    getBaseURL(state) {
      return state.base_URL;
    },
    getDark(state, getters) {
      return (
        state.dark ||
        getters.getGradient.indexOf('255, 255, 255') === -1
      )
    },
    getGradient(state) {
      return state.gradients[state.drawer_drawer.gradient]
    },
    getImage: state => {
      return state.drawer_drawer.image === '' ? state.drawer_drawer.image : state.images[state.drawer_drawer.image]
    },
    getMiniHeader: state => {
      return state.mini_header;
    },
    getDrawerHeader: state => {
      return state.drawer_header;
    },
    getSnackbar: state => {
      return state.snackbar;
    },
    getHostMsp: state => {
      return state.host_msp;
    },
    getUrlRpisPdf: state => {
      return state.url_rpis_pdf;
    },
    getUrlRpisConsulta: state => {
      return state.url_rpis_consulta;
  },
  }


}

export default app;