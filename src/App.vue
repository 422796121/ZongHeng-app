<template>
	<div id="app">
		<!-- <loading v-if="isLoading"></loading> -->
		<!-- <novel-header></novel-header> -->
		<router-view />
		<!-- <novel-footer></novel-footer> -->
	</div>
</template>

<script>
	// import NovelHeader from './components/NovelHeader'
	import Loading from './public/Loading'
	import NovelFooter from './components/NovelFooter'
	
	export default {
		name: 'App',
		data() {
			return {
				recommend: null,
				isLoading: true
			}
		},
// 		created() {
// 			this.axios.get('/test', {
// 					params: {
// 						key: '武侠',
// 						s: 1,
// 						e: 3
// 					}
// 				})
// 				.then(res => {
// 					res = res.data
// 					if (res.errno === 0) {
// 						this.recommend = res.data
// 						console.log(res)
// 						this.isLoading = false
// 						// this.$router.replace('/home')
// 					}
// 				})
// 		},
		components: {
			Loading,
			NovelFooter
		}
	}
</script>

<style>
	#app {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
</style>
