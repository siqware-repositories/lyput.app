import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import scan from './scan'
import product from './product'
Vue.use(Vuex);
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      scan,
      product,
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });
  return Store
}
