import Vue from 'vue'
import Router from 'vue-router'
import NovelHeader from '@/components/HomeView/NovelHeader'
import IndexView from '@/components/HomeView/IndexView'
import ClassifyView from '@/components/HomeView/ClassifyView'
import RankView from '@/components/HomeView/RankView'
import BookHeader from '@/components/BookView/BookHeader'
import BookDetailView from '@/components/BookView/BookDetailView'
import BookChapterView from '@/components/BookView/BookChapterView'
import BookClassify from '@/components/BookView/BookClassify'
import SearchView from '@/components/SearchView/SearchView'
import ReadingView from '@/components/ReadingView/ReadingView'

Vue.use(Router)

export default new Router({
	mode: 'history',
	linkExactActiveClass: 'active',
	routes: [{
			path: '/',
			name: 'IndexView',
			component: IndexView,
			alias: '/home'
		},
		{
			path: '/rank',
			name: 'RankView',
			component: RankView
		},
		{
			path: '/classify',
			name: 'ClassifyView',
			component: ClassifyView
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
			path: '/book/classify',
			name: 'BookClassify',
			component: BookClassify
		},
		{
			path: '/reading',
			name: 'ReadingView',
			component: ReadingView
		},
		{
			path: '/book/search',
			name: 'SearchView',
			component: SearchView
		}
	]
})
