import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style/app.sass'
// Vue.config.productionTip = false

// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
