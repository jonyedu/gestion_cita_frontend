const auth = [
    {
        path: '/',
        name: 'dashboard',
        component: () => import("@/views/app/application/Main"),
        meta: {
            requiresAuth: true,
        },
        redirect: '/people/client',
        children: [
            {
                path: '/404',
                name: '',
                meta: {
                    requiresAuth: true,
                },
                component: () => import("@/views/app/404/404.vue"),
            },
            {
                path: '/403',
                name: '',
                meta: {
                    requiresAuth: true,
                },
                component: () => import("@/views/app/403/403.vue"),
            },
            {
                path: '/perfil',
                component: () => import("@/views/auth/perfil/Perfil.vue"),
                name: "perfil",
                meta: {
                    requiresAuth: true,
                },
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("@/views/auth/login/Login.vue"),
    },
    {
        path: '*',
        redirect: '/404',
    },

];

export default auth;
