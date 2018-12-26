<template>
	<div class="chapter-view" ref="chapt">
		<ul>
			<li>
				<book-header :topTitle="titleName" :detailid="detailid" :where="where"></book-header>
			</li>
			<li>
				<div class="chapter-top">
					<div class="chapter-top-select">
						<select class="top-select" @change="selectChangePage($event,sort)" ref="selectTop">
							<option v-for="(selects,selectIndex) in selectArr" :key="selectIndex" :value="selectIndex">{{selects}}</option>
						</select>
					</div>
					<div class="btn-sort">
						<span>
							<em v-if="!sort" @click="sort=!sort"><i class="icon-sort sort-icon"></i>反序</em>
							<em v-else @click="sort=!sort"><i class="icon-sort sort-icon"></i>正序</em>
						</span>
					</div>
				</div>

			</li>
			<li>
				<div class="chapter" v-for="(chaps,chapsIndex) in order" :key="chapsIndex" @click="toReading(chaps.title,chaps.link,chapterArr,chapsIndex,getId)">
					<div class="chapter-content">
						<span class="text">
							<em v-if="!sort">{{(chapsIndex+1)+(page-1)*20}}.</em>
							<em v-else>{{chapterArr.length-(chapsIndex+1)-(page-1)*20 + 1}}.</em>
							{{chaps.title}}</span>
						<i class="icon-right right-icon"></i>
					</div>
				</div>
			</li>
			<li>
				<div class="chapter-bottom">
					<div class="btn-left" @click="page==1? page=1 : page--">上一页</div>
					<div class="chapter-bottom-select">
						<select class="bottom-select" @change="selectChangePage($event,sort)" ref="selectBottom">
							<option v-for="(selects,selectIndex) in selectArr" :key="selectIndex +'-bottom'" :value="selectIndex">{{selects}}</option>
						</select>
					</div>
					<div class="btn-right" @click="page++">下一页</div>
				</div>

			</li>
		</ul>

	</div>
</template>

<script>
	import BookHeader from './BookHeader'
	import BScroll from 'better-scroll'
	export default {
		name: 'BookChapterView',
		components: {
			BookHeader
		},
		data() {
			return {
				sort: null, // 排序
				chapterArr: [], // 章节
				getId: this.$route.params.chapterid, // 书源ID
				order: [], // 顺序
				titleName: this.$route.params.topTitle, // 标题
				page: 1, // 页数,
				selectArr: [], // select数组
				selectCount: [], // select个数
				detailid: this.$route.params.detialid,
				where: 'chapter'
			}
		},
		created() {
			this.$nextTick(() => {
				this.getChapterData(this.chapterArr, this.getId)
				this._initHomeScroll()
			})
		},
		methods: {
			getChapterData(arr, sourceId) {
				this.axios.get('/data/chapter', {
						params: {
							sourceid: sourceId
						}
					})
					.then(res => {
						res = res.data
						if (res.errno === 0) {
							arr.push(JSON.parse(res.data))
							this.chapterArr = arr[0].chapters
						}
					})
			},
			sortChapter(value, which, page) {
				this.order.length = 0
				let j = 0
				if (which === false) {
					for (let i = 0 + 20 * (page - 1); i < 20 * page; i++) {
						if (i >= value.length) {
							break
						}
						this.order[j] = value[i]
						j++
					}
				} else {
					for (let i = (value.length - 1) - 20 * (page - 1); i >= value.length - 20 * page; i--) {
						if (i < 0) {
							break
						}
						this.order[j] = value[i]
						j++
					}
				}
			},
			menuChapter(value, which) {
				let j = 0
				let start = 0
				let end = 0
				this.selectCount = Math.ceil(value / 20)
				if (which === false) {
					for (let i = 0; i < this.selectCount; i++) {
						start = 1 + 20 * i
						end = 20 * (i + 1) < value ? 20 * (i + 1) : value
						this.selectArr[j] = `${start}-${end}章`
						j++
					}
				} else {
					for (let i = this.selectCount - 1; i >= 0; i--) {
						start = value - 20 * (j + 1)
						end = value - 20 * j < value ? value - 20 * j : value
						if (start <= 0) {
							start = 1
						}
						this.selectArr[i] = `${start}-${end}章`
						j++
					}
				}
			},
			selectChangePage(index, which) {
				index = parseInt(index.target.value)
				if (which === false) {
					this.page = index + 1
				} else {
					this.page = this.selectCount - index
				}
			},
			toReading(id, url, chapterlist, index, getid) {
				this.$router.push({
					name: 'ReadingView',
					params: {
						title: id,
						link: url,
						chapterlist: chapterlist,
						index: index,
						getid: getid
					}
				})
			},
			_initHomeScroll() {
				if (!this.homeScroll) {
					this.homeScroll = new BScroll(this.$refs.chapt, {
						click: true
					})
				} else {
					this.homeScroll.refresh()
				}
			}
		},
		watch: {
			chapterArr(value) {
				this.sort = false
			},
			sort(value) {
				this.sortChapter(this.chapterArr, value, this.page)
				this.menuChapter(this.chapterArr.length, this.sort)
				if (value === false) {
					this.$refs.selectTop.value = `${this.page - 1}`
					this.$refs.selectBottom.value = `${this.page - 1}`
				} else {
					this.$refs.selectTop.value = `${this.selectCount - this.page}`
					this.$refs.selectBottom.value = `${this.selectCount - this.page}`
				}
			},
			page(value) {
				this.sortChapter(this.chapterArr, this.sort, value)
				if (this.sort === false) {
					this.$refs.selectTop.value = `${value - 1}`
					this.$refs.selectBottom.value = `${value - 1}`
				} else {
					this.$refs.selectTop.value = `${this.selectCount - value}`
					this.$refs.selectBottom.value = `${this.selectCount - value}`
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chapter-view {
		width: 100%;
		height: 100%;

		.chapter-top {
			margin: 10px;
			height: 34px;
			width: 95%;
			display: flex;

			.chapter-top-select {
				flex: 1;

				.top-select {
					width: 98%;
					height: 100%;
					background: RGB(255, 242, 216);
					color: RGB(212, 143, 74);
					border: 0.5px solid RGB(212, 143, 74);
				}
			}

			.btn-sort {
				flex: 0 0 72px;
				width: 72px;
				line-height: 34px;
				text-align: center;
				background: RGB(247, 247, 247);
				border: 1px solid RGB(206, 206, 206);
				border-radius: 4px;

				&>span {
					display: inline-block;
					width: 72px;
					height: 34px;
					font-size: 14px;

					&>em {
						display: inline-block;
						width: 72px;
						height: 34px;

						.sort-icon {
							padding: 0 3px;
						}
					}
				}
			}
		}

		.chapter {
			width: 100%;
			border-bottom: 1px solid RGB(223, 223, 223);

			.chapter-content {
				position: relative;
				margin: 0 auto;
				width: 95%;

				.text {
					padding-left: 5px;
					height: 38px;
					line-height: 38px;
					font-size: 14px;
					color: RGB(76, 76, 76);
				}

				.right-icon {
					position: absolute;
					top: 11px;
					right: 0;
					color: RGB(154, 154, 154);
				}
			}

			&:nth-child(20) {
				border: 0;
			}
		}

		.chapter-bottom {
			display: flex;
			margin: 0 auto;
			padding: 10px 0 20px;
			width: 95%;
			height: 34px;

			.btn-left,
			.btn-right {
				flex: 0 0 82px;
				line-height: 34px;
				text-align: center;
				background: RGB(247, 247, 247);
				border: 1px solid RGB(206, 206, 206);
				border-radius: 4px;
			}

			.chapter-bottom-select {
				flex: 1;

				.bottom-select {
					margin-left: 50%;
					transform: translateX(-50%);
					display: inline-block;
					height: 100%;
					width: 96%;
					background: RGB(255, 242, 216);
					color: RGB(212, 143, 74);
					border: 0.5px solid RGB(212, 143, 74);
				}
			}
		}

	}
</style>
