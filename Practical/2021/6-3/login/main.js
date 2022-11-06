import Vue from 'vue'
import app from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

new Vue({
	el:"#app",
	render:c=>(app),
	router
})