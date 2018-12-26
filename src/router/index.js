import Vue from 'vue'
import Router from 'vue-router'
import NovelHeader from '@/components/HomeView/NovelHeader'
import IndexView from '@/components/HomeView/IndexView'
import BookHeader from '@/components/BookView/BookHeader'
import BookDetailView from '@/components/BookView/BookDetailView'
import BookChapterView from '@/components/BookView/BookChapterView'
import ReadingView from '@/components/ReadingView/ReadingView'

Vue.use(Router)

export default new Router({
	mode: 'history',
	linkExactActiveClass: 'active',
	routes: [{
			path: '/',
			name: 'NovelHeader',
			component: NovelHeader,
			alias: '/home'
		},
		{
			path: '/book/detail',
			name: 'BookDetailView',
			component: BookDetailView
		},
		{
			path: '/book/chapter',
			name: 'BookChapterView',
			component: BookChapterView
		},
		{
			path: '/reading/:title',
			name: 'ReadingView',
			component: ReadingView
		}
	]
})
