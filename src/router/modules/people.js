const modulo = '/people';
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
                path: `${modulo}/client`,
                component: () => import("@/views/modules/people/listado.vue"),
                name: "people",
                meta: {
                    requiresAuth: true,
                },
            },
        ]
    },

];

export default people;
