const appointment_medical = {
    namespaced: true,
    state: {
        appointment_medical: {},
    },

    mutations: {
        setAppointmentMedical: (state, payload) => {
            state.appointment_medical = payload
        },
    },

    actions: {
        storeAppointmentMedical(context, payload) {
            context.commit('setAppointmentMedical', payload);
        },
    },

    getters: {
        getAppointmentMedical(state) {
            return state.appointment_medical;
        },
    }

}

export default appointment_medical;