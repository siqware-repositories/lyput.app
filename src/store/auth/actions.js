import $http from '../../boot/http_request'
export async function authLogin ({commit},data) {
    try {
        const res = await $http.post('/user-login', data);
        if (!res.data.message) {
            commit('USER_LOGIN', res.data);
        }
        return res.data
    } catch (e) {
        return false
    }
}
export async function updateUserData ({commit},data) {
    commit('UPDATE_USER_LOGIN', data);
}