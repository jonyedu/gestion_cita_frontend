import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

const plugins = [
    /**
     * @description Creates a new instance of the plugin with the given options
     * @param {String} key The key to store the persisted state under. Defaults to vuex.
     * @param {String} value The value to store the persisted state under. Defaults to vuex.
     */
    createPersistedState({
        storage: {
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key),
        },
    }),
];

export default plugins;