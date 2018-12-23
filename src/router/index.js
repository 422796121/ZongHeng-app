import Vue from 'vue'
import Router from 'vue-router'
import NovelHeader from '@/components/HomeView/NovelHeader'
import IndexView from '@/components/HomeView/IndexView'
import BookHeader from '@/components/BookView/BookHeader'

Vue.use(Router)

export default new Router({
	mode:'history',
	linkExactActiveClass:'active',
	routes: [{
		path: '/',
		name: 'NovelHeader',
		component: NovelHeader,
		alias: '/home'
	},
	{
		path:'/book',
		name:'BookHeader',
		component:BookHeader
	}]
})
