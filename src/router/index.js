import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import myHome from '@/components/home.vue'

// 子路由
import business from '@/components/page/business.vue'


Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'myHome',
			component: myHome,
			children: [
				{
					path: '',
					component: business,
				}
			]
		}
	]
})
