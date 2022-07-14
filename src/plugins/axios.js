import axios from 'axios';
import store from '../store'
import router from '../router';

const API = store!=undefined?store.state.app.base_URL:process.env.VUE_APP_ROOT_API;

/**
* @description axios instance for requests with auth token
*/
export const apiClientAuth = axios.create({
    baseURL: API,

    /**
    * @description validate the status axios
    * `validateStatus` defines whether to resolve or reject the promise for a given
    * HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
    * or `undefined`), the promise will be resolved; otherwise, the promise will be
    * rejected.
    */
    validateStatus: function (status) {
        if (status == 401) {
            store.dispatch("auth/storeToken", null);
            store.dispatch("auth/storeUser", null);
            router.push({ name: 'login' })
        }
        return status >= 200 && status < 300; // default
    },

    /**
    * @description validate the token and settea the configuration the headers
    *    `transformRequest` allows changes to the request data before it is sent to the server
    *    This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
    *    The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
    *    FormData or Stream
    *    You may modify the headers object.
    */
    transformRequest: [function (data, headers) {
        //valida que exista un token
        if (store.getters["auth/getToken"] == null) return router.push({ name: 'login' });

        headers['X-Requested-With'] = 'XMLHttpRequest';
        headers['Content-Type'] = 'application/json';
        headers['Authorization'] = 'Bearer ' + store.getters["auth/getToken"];
        return data;
    }, ...axios.defaults.transformRequest],
})

/**
* @description axios instance for requests with auth token, responseType blob
*/
export const apiClientAuthGetFile = axios.create({
    baseURL: API,

    /**
    * @description validate the token and settea the configuration the headers
    */
    transformRequest: [function (data, headers) {
        //valida que exista un token
        if (store.getters["auth/getToken"] == null) return router.push({ name: 'login' });

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json;charset=UTF-8';
        headers['Authorization'] = 'Bearer ' + store.getters["auth/getToken"];
        return data;
    }, ...axios.defaults.transformRequest],

    /**
    * @description validate the status axios
    */
    validateStatus: function (status) {
        if (status == 401) {
            store.dispatch("auth/storeToken", null);
            store.dispatch("auth/storeUser", null);
            router.push({ name: 'login' })
        }
        return status >= 200 && status < 300; // default
    },
    responseType: 'blob',
})

/**
* @description axios instance for requests with authentication token, send file
*/
export const apiClientAuthFile = axios.create({
    baseURL: API,

    /**
    * @description validate the token and settea the configuration the headers
    */
    transformRequest: [function (data, headers) {
        //valida que exista un token
        if (store.getters["auth/getToken"] == null) return router.push({ name: 'login' });

        headers['Accept'] = 'application/json, text/plain, */*';
        headers['Content-Type'] = 'multipart/form-data';
        headers['Authorization'] = 'Bearer ' + store.getters["auth/getToken"];
        return data;
    }, ...axios.defaults.transformRequest],

    /**
    * @description validate the token and settea the configuration the headers
    */
    validateStatus: function (status) {
        if (status == 401) {
            store.dispatch("auth/storeToken", null);
            store.dispatch("auth/storeUser", null);
            router.push({ name: 'login' })
        }
        return status >= 200 && status < 300; // default
    },
})
