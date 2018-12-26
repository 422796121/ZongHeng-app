<template>
	<div class="reading">
		<div class="reading-view" ref="reading">
			<ul>
				<li>
					<reading-normal-view :getId.sync="getId" :chapterindex.sync="chapterindex" :chapterlist.sync="chapterlist"></reading-normal-view>
					<click-show @movescroll="movescroll" :first.sync="first" :menu.sync="menu"></click-show>
				</li>
			</ul>
		</div>
		<click-bar :getId.sync="getId" :menu.sync="menu" :chapterindex.sync="chapterindex" :chapterlist.sync="chapterlist"></click-bar>
	</div>

</template>

<script>
	import ReadingNormalView from './ReadingNormalView'
	import ClickShow from './ClickShow'
	import ClickBar from './ClickBar'
	import BScroll from 'better-scroll'
	export default {
		name: 'ReadingView',
		components: {
			ReadingNormalView,
			ClickShow,
			ClickBar
		},
		created() {
			this.$nextTick(() => {
				this._initReadingScroll()
				if (this.first === true) {
					this.readingScroll.disable()
				}
			})
		},
		data() {
			return {
				move: 0,
				first: true,
				menu: false,
				chapterlist: this.$route.params.chapterlist,
				chapterindex: this.$route.params.index,
				getId: this.$route.params.getid
			}
		},
		methods: {
			_initReadingScroll() {
				if (!this.readingScroll) {
					this.readingScroll = new BScroll(this.$refs.reading, {
						click: true
					})
				} else {
					this.readingScroll.refresh()
				}
			},
			movescroll(value) {
				if (value === 'top') {
					this.move--
				} else if (value === 'bottom') {
					this.move++
				}
			}
// 			chapterindex(value){
// 				this.index = value
// 			},
// 			chapterlist(value){
// 				console.log(value)
// 				this.list = value
// 			}
		},
		watch: {
			move(value, oldvalue) {
				if (value > oldvalue) {
					this.readingScroll.scrollBy(0, -500, 300)
				} else {
					this.readingScroll.scrollBy(0, 500, 300)
				}
			},
			first(value) {
				if (this.first === false) {
					this.readingScroll.enable()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.reading {
		position: relative;
		width: 100%;
		height: 100%;

		.reading-view {
			width: 100%;
			height: 100%;
		}
	}
</style>
