const pet = {
    namespaced: true,
    state: {
        pet: {},
    },

    mutations: {
        setPet: (state, payload) => {
            state.pet = payload
        },
    },

    actions: {
        storePet(context, payload) {
            context.commit('setPet', payload);
        },
    },

    getters: {
        getPet(state) {
            return state.pet;
        },
    }

}

export default pet;