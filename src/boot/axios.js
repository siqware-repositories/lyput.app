import Vue from 'vue'
import axios from 'axios'
import {LocalStorage} from "quasar";
Vue.prototype.$axios = axios.create({
    baseURL: 'https://lyput.siqware.com/api'
});
let token = LocalStorage.getItem("userInfo");
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`;
}
