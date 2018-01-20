import Vue from 'vue'
import App from './App.vue'
import jQuery from 'jquery'
import Popper from "popper.js"

global.jQuery = jQuery;
global.$ = jQuery;
let Bootstrap = require('bootstrap')
import 'bootstrap/dist/css/bootstrap.css'


import AppStart from './components/Start.vue'
import  AppQuestion from  './components/Question.vue'
import  AppMessage from  './components/Message.vue'
import  AppResult from  './components/Result.vue'

Vue.component('AppStartScreen', AppStart)
Vue.component('AppQuestionScreen', AppQuestion)
Vue.component('AppMessageScreen', AppMessage)
Vue.component('AppResultScreen', AppResult)

new Vue({
  el: '#app',
  render: h => h(App)
});
