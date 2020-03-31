import $http from '../../boot/http_request'

export async function checkStock({commit}, data) {
  try {
    const res = await $http.post('/check-stock', data);
    commit('SET_STOCK', res.data);
  } catch (e) {
    return false
  }
}
