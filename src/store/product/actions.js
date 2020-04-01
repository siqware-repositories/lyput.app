import $http from '../../boot/http_request'

export async function indexProduct({commit}) {
  try {
    const res = await $http.post('/product-api');
    commit('SET_PRODUCT', res.data);
  } catch (e) {
    return false
  }
}
export async function productCount({commit}) {
  try {
    const res = await $http.post('/product-count-api');
    commit('SET_PRODUCT_COUNT', res.data);
  } catch (e) {
    return false
  }
}
