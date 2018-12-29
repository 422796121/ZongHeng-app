<template>
	<div id="app">
		<!-- <loading v-if="isLoading"></loading> -->
		<router-view />
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
		components: {
			Loading,
			NovelFooter
		}
	}
</script>

<style>
	html,
	body {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	#app {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
	}
</style>
