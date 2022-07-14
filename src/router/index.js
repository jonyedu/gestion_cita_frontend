import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import auth from './modules/auth';
import people from './modules/people';
import appointment_medical from './modules/appointment_medical';
import pet from './modules/pet';


Vue.use(VueRouter);

const routes = [
    ...auth,
    ...people,
    ...pet,
    ...appointment_medical,
];

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'is-active',
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters['auth/getToken']) {
            next({ name: 'login' })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router;
