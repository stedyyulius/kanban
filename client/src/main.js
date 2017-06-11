// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import * as firebase from 'firebase'
import router from './router'

Vue.config.productionTip = false
const config = {
    apiKey: "AIzaSyD48ls-vIUtbpmocDuiVotlQRPFk1u41ec",
    authDomain: "kanban-3a5fc.firebaseapp.com",
    databaseURL: "https://kanban-3a5fc.firebaseio.com",
    projectId: "kanban-3a5fc",
    storageBucket: "kanban-3a5fc.appspot.com",
    messagingSenderId: "464171963752"
  };

const firebaseApp = firebase.initializeApp(config);
Vue.prototype.$db = firebaseApp.database()


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
