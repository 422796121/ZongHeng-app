<template>
	<div class="reading-normal-view">
		<div class="reading-normal-wrapper">
			<h2 class="title">{{contentArr.title}}</h2>
			<div class="normal-content">
				<p class="content" v-for="(text,index) in content" :key="index">{{text}}</p>
			</div>
			<div class="normal-btn">
				<div class="prev">
					<span @click="deleIndex"><i></i>上一章</span>
				</div>
				<div class="menu">
					<span @click="toChapter(getId,'本书详情')"><i></i>目录</span>
				</div>
				<div class="next">
					<span @click="addIndex"><i></i>下一章</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ReadingView',
		props: ['chapterlist', 'chapterindex', 'getId'],
		data() {
			return {
				contentArr: [], // 小说内容对象
				content: [], // 小说内容
				changeChapterId: ''
			}
		},
		created() {
			this.getContentData(this.contentArr, this.chapterlist[this.chapterindex].link)
		},
		methods: {
			getContentData(arr, chapterId) {
				this.axios.get('/data/reading', {
						params: {
							chapterid: chapterId
						}
					})
					.then(res => {
						res = res.data
						if (res.errno === 0) {
							arr.push(JSON.parse(res.data))
							this.contentArr = arr[0].chapter
							this.content = this.contentArr.cpContent.split('\n')
						}
					})
			},
			nextChapter(newChapterList) {
				this.contentArr = newChapterList
			},
			toReading(id) {
				this.$router.push({
					name: 'ReadingView',
					params: {
						title: id
					}
				})
			},
			toChapter(chapterId, name) {
				this.$router.push({
					name: 'BookChapterView',
					params: {
						chapterid: chapterId,
						topTitle: name
					}
				})
			},
			addIndex() {
				if (this.chapterindex >= this.chapterlist.length) {
					this.$emit('update:chapterindex', this.chapterlist.length)
				} else {
					this.$emit('update:chapterindex', this.chapterindex + 1)
				}
			},
			deleIndex() {
				if (this.chapterindex <= 0) {
					this.$emit('update:chapterindex', 0)
				} else {
					this.$emit('update:chapterindex', this.chapterindex - 1)
				}
			}
		},
		watch: {
			chapterindex(value) {
				this.contentArr = []
				this.content = []
				this.toReading(this.chapterlist[this.chapterindex].title)
				this.getContentData(this.contentArr, this.chapterlist[this.chapterindex].link)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.reading-normal-view {
		width: 100%;
		background: RGB(231, 225, 209);

		.reading-normal-wrapper {
			margin: 0 auto;
			width: 94%;

			.title {
				height: 60px;
				line-height: 60px;
				text-align: center;
				font-size: 20px;
				font-weight: bold;
			}

			.normal-content {
				.content {
					display: inline-block;
					line-height: 36px;
					font-size: 18px;
					white-space: normal;
				}

			}
		}

		.normal-btn {
			margin: 0 auto;
			padding-bottom: 20px;
			display: flex;
			height: 35px;
			line-height: 35px;
			width: 94%;
			font-size: 15px;
			text-align: center;

			.prev,
			.menu {
				margin: 0 auto;
				width: 25%;
				float: right;
				z-index: 200;

				&>span {
					display: inline-block;
					height: 33px;
					width: 94%;
					background: RGB(249, 249, 249);
					border: 1px solid RGB(198, 198, 198);
					border-radius: 3px;
					color: RGB(46, 52, 63);
				}
			}

			.next {
				margin: 0 auto;
				width: 50%;
				z-index: 200;

				&>span {
					display: inline-block;
					height: 33px;
					width: 94%;
					background: RGB(127, 184, 45);
					border: 1px solid RGB(108, 164, 28);
					border-radius: 3px;
					color: RGB(255, 255, 221);
				}
			}
		}

	}
</style>
