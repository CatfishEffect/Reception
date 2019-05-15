import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import myHome from '@/components/home.vue'

// 子路由
import business from '@/components/page/business.vue'
import open from '@/components/page/open.vue'
import dialogue from '@/components/page/dialogue.vue'
import voicePrompts from '@/components/page/VoicePrompts.vue'
import registered from '@/components/page/Registered.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: myHome,
			children: [
				{
					path: '',
					component: business,
				},
				{
					path: '/open',
					component: open,
				},
				{
					path: '/dialogue',
					component: dialogue,
				},
				{
					path: '/voicePrompts',
					component: voicePrompts,
				},
				{
					path: '/registered',
					component: registered,
				},
			]
		}
	]
})
