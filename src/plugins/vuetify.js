import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import '@mdi/font/css/materialdesignicons.css'
import 'typeface-roboto/index.css'

Vue.use(Vuetify);

const opts = {
    theme: {
        themes: {
            light: {
                primary: "#42A5F6",
                secondary: "#050B1F",
                accent: "#204165"
            },
            dark: {
                primary: "#50778D",
                secondary: "#0B1C3D",
                accent: "#204165"
            }
        }
    },
    icons: {
        iconfont: "mdi", // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
        maps: {
            component: 'mdi-mar',
            component: 'mdi-frontera',
            component: 'mdi-guayas',
            component: 'mdi-manabi',
            component: 'mdi-colombia',
            component: 'mdi-peru',
        },
    }
};

export default new Vuetify(opts);
