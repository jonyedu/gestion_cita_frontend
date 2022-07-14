const modulo = '/pet';
const people = [
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
                component: () => import("@/views/modules/pet/listado/Listado.vue"),
                name: "pet_list",
                meta: {
                    requiresAuth: true,
                },
            },
            {
                path: `${modulo}/new`,
                component: () => import("@/views/modules/pet/nuevo/Nuevo.vue"),
                name: "pet_new",
                meta: {
                    requiresAuth: true,
                },
            },
        ]
    },

];

export default people;
