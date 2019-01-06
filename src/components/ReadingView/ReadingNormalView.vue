<template>
	<div class="reading-normal-view" :class="night? 'benight' : ''" ref="readingview">
		<div class="reading-normal-wrapper">
			<h2 class="title" ref="titlefont">{{contentArr.title}}</h2>
			<div class="normal-content">
				<p class="content" ref="contentfont" v-for="(text,index) in content" :key="index">{{text}}</p>
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
		props: ['night', 'chapterindex', 'pfont', 'hfont', 'bgcolor', 'bgindex'],
		data() {
			return {
				contentArr: [], // 小说内容对象
				content: [], // 小说内容
				changeChapterId: '',
				sendShelf: sessionStorage['shelf'],
				where: this.$route.query.where,
				chapterlist: JSON.parse(sessionStorage['book']),
				// chapterindex: this.$route.query.index,
				getId: this.$route.query.getid,
				detialId: sessionStorage['detailid']
			}
		},
		created() {
			if (this.where === 'shelf') {
				this.chapterlist = JSON.parse(this.$route.query.chapterlist)
				this.detialId = this.$route.query.detialId
			}
			this.getContentData(this.contentArr, this.chapterlist[this.chapterindex].link)
			this.addChapterShelf(this.sendShelf, this.chapterlist[this.chapterindex].title, this.chapterlist[this.chapterindex].link,
				this.chapterindex)
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
							console.log(arr[0])
							this.content = this.contentArr.cpContent.split('\n')
						}
					})
			},
			nextChapter(newChapterList) {
				this.contentArr = newChapterList
			},
			toReading(id, url, chapterlist, index, getid, detialId) {
				this.$router.push({
					name: 'ReadingView',
					query: {
						title: id,
						link: url,
						// chapterlist: JSON.stringify(chapterlist),
						index: index,
						getid: getid,
						detialId: detialId
					}
				})
			},
			toChapter(chapterId, name) {
				this.$router.push({
					name: 'BookChapterView',
					query: {
						chapterid: chapterId,
						topTitle: name
					}
				})
			},
			addIndex() {
				if (this.chapterindex >= this.chapterlist.length) {
					this.chapterindex = this.chapterlist.length
				} else {
					this.chapterindex = this.chapterindex + 1
				}
			},
			deleIndex() {
				if (this.chapterindex <= 0) {
					this.chapterindex = 0
				} else {
					this.chapterindex = this.chapterindex - 1
				}
			},
			addChapterShelf(arr, title, url, index) {
				if (arr !== undefined) {
					arr = arr.split('++')
					let j = 0
					for (let i in arr) {
						if (arr[i] !== '') {
							arr[j] = JSON.parse(arr[i])
							j++
						}
					}
					arr.length = j
					let repeat = arr.find(a => a.detailid === this.detialId)
					if (repeat) {
						repeat['title'] = title
						repeat['link'] = url
						repeat['index'] = index
					}
					sessionStorage.setItem('shelf', this.changeArr(arr))
				}
			},
			changeArr(arr) {
				let str = ''
				for (let i in arr) {
					if (i === 0) {
						str = JSON.stringify(arr[i])
					} else {
						str += `++${JSON.stringify(arr[i])}`
					}
				}
				return str
			}
		},
		watch: {
			chapterindex(value) {
				this.contentArr = []
				this.content = []
				this.toReading(this.chapterlist[this.chapterindex].title, this.chapterlist[this.chapterindex].link, this.chapterlist,
					this.chapterindex, this.getId, this.detialId)
				this.getContentData(this.contentArr, this.chapterlist[value].link)
				this.addChapterShelf(this.sendShelf, this.chapterlist[this.chapterindex].title, this.chapterlist[this.chapterindex]
					.link, value)
			},
			pfont(val) {
				for (let i in this.content) {
					this.$refs.contentfont[i].style.fontSize = `${val}px`
				}
			},
			hfont(val) {
				this.$refs.titlefont.style.fontSize = `${val}px`
			},
			bgindex(val) {
				this.$refs.readingview.style.background = this.bgcolor[val].color
			}
		}
	}
</script>
<style lang="scss" scoped="scoped">
	.reading-normal-view {
		width: 100%;
		background: RGB(231, 225, 209);

		&.benight {
			background: #000;
			color: #555555;
		}

		.reading-normal-wrapper {
			margin: 0 auto;
			width: 94%;

			.title {
				height: 60px;
				line-height: 30px;
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
