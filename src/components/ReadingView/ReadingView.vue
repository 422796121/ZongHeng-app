<template>
	<div class="reading">
		<div class="reading-view" ref="reading">
			<ul>
				<li>
					<reading-normal-view :bgindex.sync="bgindex" :pfont.sync="pfont" :hfont.sync="hfont" :bgcolor.sync="bgcolor"
					 :detialId.sync="detialId" :night.sync="night" :getId.sync="getId" :chapterindex.sync="chapterindex"
					 :chapterlist.sync="chapterlist"></reading-normal-view>
					<click-show @movescroll="movescroll" :first.sync="first" :menu.sync="menu" :tool.sync="tool"></click-show>
				</li>
			</ul>
		</div>
		<click-bar :bgindex.sync="bgindex" :pfont.sync="pfont" :hfont.sync="hfont" :bgcolor.sync="bgcolor" :night.sync="night"
		 :detialId.sync="detialId" :getId.sync="getId" :menu.sync="menu" :tool.sync="tool" :chapterindex.sync="chapterindex"
		 :chapterlist.sync="chapterlist"></click-bar>
	</div>
</template>

<script>
	import ReadingNormalView from './ReadingNormalView'
	import ClickShow from './ClickShow'
	import ClickBar from './ClickBar'
	import BScroll from 'better-scroll'

	const bgcolor = [{
		name: '羊皮纸',
		color: '#e8e2d2'
	}, {
		name: '淡雅白',
		color: '#f9f8f5'
	}, {
		name: '冰爽蓝',
		color: '#c3deed'
	}, {
		name: '浪漫粉',
		color: '#e0b6c4'
	}, {
		name: '护眼绿',
		color: '#a6bc9c'
	}]
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
				tool: false,
				chapterlist: JSON.parse(sessionStorage['book']),
				chapterindex: this.$route.query.index,
				getId: this.$route.query.getid,
				detialId: sessionStorage['detailid'],
				night: false, // 夜间模式,
				bgcolor: bgcolor,
				bgindex: -1,
				hfont: 20,
				pfont: 18
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
			},
			menu(val) {
				if (val === false) {
					this.tool = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.reading {
		position: relative;
		width: 100%;
		height: 100%;


		.reading-view {
			width: 100%;
			height: 100%;

			&>ul {
				margin: 0;
				padding: 0;
				list-style: none;
			}

			.reading-view {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
