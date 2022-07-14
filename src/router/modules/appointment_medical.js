const modulo = '/appointment_medical';
const appointment_medical = [
    {
        path: '/',
        component: () => import("@/views/app/application/Main"),
        meta: {
            requiresAuth: true,
        },
        redirect: '/home',
        children: [
            {
                path: `${modulo}/list`,
                component: () => import("@/views/modules/appointment_medical/listado/Listado.vue"),
                name: "appointment_medical_list",
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: `${modulo}/new`,
                component: () => import("@/views/modules/appointment_medical/nuevo/Nuevo.vue"),
                name: "appointment_medical_new",
                meta: {
                    requiresAuth: true,
                },
            },
        ]
    },

];

export default appointment_medical;
