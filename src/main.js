import Vue from 'vue'
import App from './App.vue'
import router from './router/router' //기존 index 라우터는 놔두고 새롭게 라우터를 생성해서 사용하자.
import store from './store'
import firebase from 'firebase'
import VueCookies from 'vue-cookies'
import firebaseConfig from '../config/firbase_config.json'

Vue.config.productionTip = false
Vue.use(VueCookies);


firebase.initializeApp(firebaseConfig);

router.beforeEach((to, from, next) => {
  var isAuth = VueCookies.get("idToken");
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isAuth == null || isAuth == undefined || isAuth === '') {
      return next({
        path: '/login'
      })
    } else {
      next();
    }
  } else {
    next();
  }
})

import 'xeicon'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

