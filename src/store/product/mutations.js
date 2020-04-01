import {LocalStorage} from "quasar";

export function SET_PRODUCT(state, payload) {
  LocalStorage.set('products', payload);
}
export function SET_PRODUCT_COUNT(state, payload) {
  state.product_count = payload
}
