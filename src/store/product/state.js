import {LocalStorage} from "quasar";

export default function () {
  return {
    products: LocalStorage.getItem('products')||'',
    product_count: null,
  }
}
