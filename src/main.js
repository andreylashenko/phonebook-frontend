import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuelidate from "vuelidate";
import store from './store'
import router from './routes'
import VueResource from 'vue-resource'

Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(VueResource)

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
})
