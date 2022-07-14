import axios from 'axios'
import store from '../store'

const API = store.state.app.base_URL;

export const apiClient = axios.create({
    baseURL: API,
})

/** 
 * @description post method for login
 * @param {String} url post type api url
 * @param {Object} body object to be consulted by means of the api
 * @return {Object}
 */
export const postHttp = async function (url, body) {
    return await apiClient.post(url, body);
}

/** 
 * @description post method for login
 * @param {String} url post type api url
 * @param {Object} body object to be consulted by means of the api
 * @return {Object}
 */
export const putHttp = async function (url, body) {
    return await apiClient.put(url, body);
}
