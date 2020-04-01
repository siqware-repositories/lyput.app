import {LocalStorage} from "quasar";

export default function () {
  return {
    products: LocalStorage.getItem('products') || [{'id':0,'name':'No result'}],
    product_count: null,
  }
}
