import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'swiper/dist/css/swiper.css'
import './assets/sass/_icon.scss'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
