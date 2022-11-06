import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

var router=new VueRouter({
	routes:[
		{path:'/',redirect:'login'},
		{path:'/login',component:Login},
		{path:'/register',component:Register}
	]
})
export default router