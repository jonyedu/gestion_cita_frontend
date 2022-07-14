import { apiClientAuth, apiClientAuthGetFile, apiClientAuthFile } from '@/plugins/axios'

/** 
* @description get method for api queries
* @param {String} url get type api url
* @param {Object} params object to be consulted by means of the api
* @return {Object}
*/
export const getHttpAuth = async function (url, params = null) {
    return await apiClientAuth.get(url, { params });
}


/** 
 * @description post method for sending data with authentication token
 * @param {String} url post type api url
 * @param {Object} body object to be consulted by means of the api
 * @return {Object}
 */
export const postHttpAuth = async function (url, body) {
    return await apiClientAuth.post(url, body);
}

/** 
* @description put method for sending data with authentication token
* @param {String} url post type api url
* @param {Object} body object to be consulted by means of the api
* @return {Object}
*/
export const putHttpAuth = async function (url, body) {
    return await apiClientAuth.put(url, body);
}

/** 
* @description http deletion method
* @param {String} url post type api url
* @param {Object} body object to be consulted by means of the api
* @return {Object}
*/
export const deleteHttpAuth = async function (url, data) {
    return await apiClientAuth.delete(url, { data });
}

/** 
 * @description get method for file download api queries with parameter responseType blob
 * @param {String} url get type api url
 * @param {Object} params object to be consulted by means of the api
 * @return {Object}
 */
export const postHttpAuthGetFile = async function (url, body) {
    return await apiClientAuthGetFile.post(url, body);
}

/** 
 * @description set method for file api queries with parameter 
 * @param {String} url get type api url
 * @param {Object} params object to be consulted by means of the api
 * @return {Object}
 */
export const postHttpAuthFile = async function (url, body) {
    return await apiClientAuthFile.post(url, body);
}

/** 
 * @description set method for file api queries with parameter 
 * @param {String} url get type api url
 * @param {Object} params object to be consulted by means of the api
 * @return {Object}
 */
export const putHttpAuthFile = async function (url, body) {
    return await apiClientAuthFile.post(url, body);
}