import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import myHome from '@/components/home.vue'

// 子路由
// import business from '@/components/page/business.vue'
// import open from '@/components/page/open.vue'
// import dialogue from '@/components/page/dialogue.vue'
// import voicePrompts from '@/components/page/VoicePrompts.vue'
// import registered from '@/components/page/Registered.vue'
// import videoPlay from '@/components/page/VideoPlay.vue'

Vue.use(Router);

function loadView(view) {
	return () => import(/* webpackChunkName: "view-[request]" */ `@/components/page/${view}.vue`)
}


export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: myHome,
			children: [
				{
					path: '',
					component: loadView('business'),
				},
				{
					path: '/business',
					component: loadView('business'),
				},
				{
					path: '/open',
					name: 'open',
					component: loadView('open'),
				},
				{
					path: '/dialogue',
					component:  loadView('dialogue'),
				},
				{
					path: '/voicePrompts',
					component:  loadView('VoicePrompts'),
				},
				{
					path: '/registered',
					component: loadView('Registered'),
				},

			]
		},
		{
			path: '/videoPlay',
			component: loadView('VideoPlay'),
		},
	]
})
