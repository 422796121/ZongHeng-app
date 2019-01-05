import Vue from 'vue'
import Router from 'vue-router'
import NovelHeader from '@/components/HomeView/NovelHeader'
import IndexView from '@/components/HomeView/IndexView'
import ClassifyView from '@/components/HomeView/ClassifyView'
import RankView from '@/components/HomeView/RankView'
import BookHeader from '@/components/BookView/BookHeader'
import BookDetailView from '@/components/BookView/BookDetailView'
import BookChapterView from '@/components/BookView/BookChapterView'
import BookClassifyView from '@/components/BookView/BookClassifyView'
import SearchView from '@/components/SearchView/SearchView'
import GenderView from '@/components/SearchView/GenderView'
import ReadingView from '@/components/ReadingView/ReadingView'
import ShelfView from '@/components/AccountView/ShelfView'
import LoginView from '@/components/AccountView/LoginView'
import RegisterView from '@/components/AccountView/RegisterView'


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
			name: 'BookClassifyView',
			component: BookClassifyView
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
		},
		{
			path: '/book/gender',
			name: 'GenderView',
			component: GenderView
		},
		{
			path: '/account',
			name: 'ShelfView',
			component: ShelfView
		},
		{
			path: '/login',
			name: 'LoginView',
			component: LoginView
		},
		{
			path: '/register',
			name: 'RegisterView',
			component: RegisterView
		}
	]
})
