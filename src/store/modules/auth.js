import { getHttpAuth } from "@/mixins/http";

const auth = {
    namespaced: true,
    state: {
        StrToken: null,
        user: {},
    },

    mutations: {
        setToken: (state, payload) => {
            state.StrToken = payload
        },
        setUser: (state, payload) => {
            state.user = payload
        },
    },

    //Esto es para hacer consulas a la BD
    actions: {
        storeToken(context, payload) {
            context.commit('setToken', payload);
        },
        storeUser(context, payload) {
            context.commit('setUser', payload);
        },
    },

    getters: {
        getToken(state) {
            return state.StrToken;
        },
        getUser(state) {
            return state.user;
        },
    }

}

export default auth;