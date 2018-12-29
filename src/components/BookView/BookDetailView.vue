<template>
	<div class="book-detail" ref="detail">
		<ul>
			<li>
				<book-header :topTitle="titleName" :where="where"></book-header>
			</li>
			<li>
				<div class="detail-wrapper" v-for="(detail,index) in detailArr" :key="index">
					<div class="detail-top">
						<div class="cover">
							<img :src="decodeURIComponent(detail.cover.split(`/agent/`)[1])" width="74" height="98">
						</div>
						<div class="content">
							<div class="title">
								<h2>{{detail.title}}</h2>
							</div>
							<div class="author">
								<span>作者：<em>{{detail.author}}</em></span>
							</div>
							<div class="sort">
								<span v-show="detail.minorCate != ''">分类：<em>{{detail.minorCate}}</em></span>
								<span v-show="detail.minorCate == ''">分类：<em>{{detail.minorCateV2}}</em></span>
							</div>
							<div class="word-count">
								<span>字数：<em>{{detail.wordCount}}</em></span>
							</div>
							<div class="lately-follower">
								<span>已有<em>{{detail.latelyFollower}}人次</em>读过此书</span>
							</div>
						</div>
						<div class="add-shelf"><i>+</i>书架</div>
					</div>
					<div class="detail-btn">
						<div>
							<span class="read-now" @click="toReading(order[0].title,order[0].link,chapterArr,0,getId,detialId)">立即阅读</span>
						</div>
						<div>
							<span class="clent">客户端看免费</span>
						</div>
					</div>
					<div class="detail-chapter">
						<i class="icon-update chapter-icon"></i>
						<span class="chapter">{{detail.lastChapter}}</span>
						<span class="updated">{{filterTime}}</span>
					</div>
				</div>
			</li>
			<li>
				<div class="intro-wrapper" v-for="(detail,index) in detailArr" :key="index + '-intro'">
					<div class="title">
						<h2>作品简介</h2>
					</div>
					<div class="content">
						<pre :class="show?'':'unshow'">{{detail.longIntro}}</pre>
						<em @click="show=!show" v-if="!show">【展开】</em>
						<em @click="show=!show" v-else>【收起】</em>
						<div class="clearfix"></div>
					</div>
					<div class="tag">
						标签:<span v-for="(tag,tagIndex) in detail.tags" :key="tagIndex + '-tag'">{{tag}}</span>
					</div>
				</div>

			</li>
			<li>
				<div class="chapter-wrapper">
					<div class="chap-title">
						<div class="title-wrapper">
							<div class="title">
								<h3>作品标题<em>(共{{chapterArr.length}}章)</em></h3>
								<span>
									<em v-if="!sort" @click="sort=!sort"><i class="icon-sort sort-icon"></i>反序</em>
									<em v-else @click="sort=!sort"><i class="icon-sort sort-icon"></i>正序</em>
								</span>
							</div>
						</div>
					</div>
					<div class="chapter" v-for="(chaps,chapsIndex) in order" :key="chapsIndex" @click="toReading(chaps.title,chaps.link,chapterArr,chapsIndex,getId,detialId)">
						<div class="chapter-content">
							<span class="text">{{chaps.title}}</span>
							<i class="icon-right right-icon"></i>
						</div>
					</div>
					<div class="chapter-btn" @click="toChapter(getId,topname,detialId)">
						进入作品目录 查看更多
					</div>
				</div>

			</li>
			<li>
				<novel-footer></novel-footer>
			</li>
		</ul>

	</div>
</template>

<script>
	import BookHeader from './BookHeader'
	import NovelFooter from '../NovelFooter'
	import BScroll from 'better-scroll'

	export default {
		name: 'BookDetailView',
		components: {
			BookHeader,
			NovelFooter
		},
		data() {
			return {
				detailScroll: null,
				detailArr: [], // 详细
				listArr: [], // 简介
				sourceArr: [], // 书源
				chapterApiArr: [], // 章节API
				chapterArr: [], // 章节
				time: '', // 更新时间
				detialId: sessionStorage['detailid'], // 书ID
				show: false, // 展开
				sort: null, // 排序
				getId: '', // 书源ID
				order: [], // 顺序
				titleName: '本书详情', // 标题
				topname: this.$route.query.topname,
				where: 'detail'
			}
		},
		created() {
			// this.detialId = this.$route.query.detailId
			this.$nextTick(() => {
				this.getDetailData(this.detailArr, this.detialId)
				this.getListData(this.listArr, 'list', this.detailName, 0, 1)
				this.getSourceData(this.sourceArr, this.detialId)
				this._initHomeScroll()
			})
		},
		methods: {
			getDetailData(arr, detail) {
				this.axios.get('/data/detail', {
						params: {
							detail: detail
						}
					})
					.then(res => {
						res = res.data
						if (res.errno === 0) {
							arr.push(JSON.parse(res.data))
						}
						for (let i in arr) {
							this.time = arr[i].updated
						}
					})
			},
			getListData(arr, str, query, start, limit) {
				this.axios.get('/data/home', {
						params: {
							query: encodeURIComponent(query),
							start: start,
							limit: limit
						}
					})
					.then(res => {
						res = res.data
						if (res.errno === 0) {
							arr.push(JSON.parse(res.data).books)
							// this.$router.replace('/book/detail')
						}
					})
			},
			getSourceData(arr, bookId) {
				this.axios.get('/data/source', {
						params: {
							bookid: bookId
						}
					})
					.then(res => {
						res = res.data
						if (res.errno === 0) {
							arr.push(JSON.parse(res.data))
							this.getId = arr[0]['0']._id
							sessionStorage.setItem('chapterid', this.getId)
						}
					})
			},
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
							sessionStorage.setItem('book', JSON.stringify(this.chapterArr))
						}
					})
			},
			sortChapter(value, which) {
				this.order.length = 0
				if (which === false) {
					for (let i = 0; i < 5; i++) {
						this.order[i] = value[i]
					}
				} else {
					let j = 0
					for (let i = value.length - 1; i >= value.length - 5; i--) {
						this.order[j] = value[i]
						j++
					}
				}
			},
			toChapter(chapterId, name, detialId) {
				this.$router.push({
					name: 'BookChapterView',
					query: {
						chapterid: chapterId,
						topTitle: name,
						detialid: detialId
					}
				})
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
			_initHomeScroll() {
				if (!this.detailScroll) {
					this.detailScroll = new BScroll(this.$refs.detail, {
						click: true
					})
				} else {
					this.detailScroll.refresh()
				}
			}
		},
		computed: {
			filterTime() {
				let time = new Date(this.time).getTime()
				let dec = parseInt((new Date().getTime() - time) / 1000) // 当前时间与消息时间相差多少秒
				let result = ''
				if (dec === 0) {
					result = '刚刚'
				} else if (dec > 0 && dec < 60 * 60) {
					result = `${parseInt(dec / 60)}分钟前`
				} else if (dec >= 60 * 60 && dec < 60 * 60 * 24) {
					result = `${parseInt(dec / 3600)}小时前`
				} else if (dec >= 60 * 60 * 24 && dec < 60 * 60 * 24 * 30) {
					result = `${parseInt(dec / (60 * 60 * 24))}天前`
				} else if (dec >= 60 * 60 * 24 * 30 && dec < 60 * 60 * 24 * 30 * 12) {
					result = `${parseInt(dec / (60 * 60 * 24 * 30))}月前`
				} else {
					result = `${parseInt(dec / (60 * 60 * 24 * 30 * 12))}年前`
				}
				return result
			}
		},
		watch: {
			getId(value) {
				this.getChapterData(this.chapterApiArr, value)
			},
			chapterArr(value) {
				// console.log(value.length)
				this.sort = false
				this.topname = `目录(共${value.length}章)`
			},
			sort(value) {
				this.sortChapter(this.chapterArr, value)
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.book-detail {
		width: 100%;
		height: 100%;

		&>ul {
			margin: 0;
			padding: 0;
			list-style: none;
		}

		.detail-wrapper {
			background: RGB(242, 242, 242);

			.detail-top {
				display: flex;
				padding: 5px 7px 3px;

				.cover {
					padding: 10px;
					flex: 0 0 74px;
					width: 74px;
				}

				.content {
					flex: 1;
					padding: 10px 0 10px;
					height: 90px;
					position: relative;
					font-size: 14px;
					overflow: hidden;


					span {
						color: #888;

						&>em {
							color: #000;
						}
					}

					.title {
						width: 100%;
						padding: 3px 0;
						font-size: 15px;
						font-weight: bold;
						
						&>h2{
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
					}

					.author,
					.sort,
					.word-count,
					.lately-follower {
						padding: 3px 0;
					}
				}

				.add-shelf {
					margin-top: 37px;
					flex: 0 0 56px;
					width: 56px;
					height: 25px;
					line-height: 25px;
					text-align: center;
					font-size: 14px;
					color: RGB(255, 70, 67);
					border: 1px solid RGB(255, 70, 67);
					border-radius: 6px;

					&>i {
						padding-right: 3px;
					}
				}
			}

			.detail-btn {
				height: 37px;
				display: flex;

				&>div {
					width: 50%;
					line-height: 37px;
					text-align: center;

					&>span {
						display: inline-block;
						height: 37px;
						line-height: 37px;
						border: 1px solid RGB(179, 56, 54);
					}

					.read-now {
						width: 80%;
						background: RGB(179, 56, 54);
						color: #fff;
					}

					.clent {
						width: 95%;
						color: RGB(179, 56, 54);
					}
				}
			}

			.detail-chapter {
				display: flex;
				margin: 5px 0;
				height: 35px;
				line-height: 35px;

				.chapter-icon {
					padding: 2px 8px 0 17px;
					display: inline-block;
					flex: 0 0 30px;
					width: 30px;
					font-size: 34px;
					vertical-align: middle;
					color: red;
				}

				.chapter {
					flex: 1;
					display: inline-block;
					font-size: 14px;
					color: RGB(76, 76, 76);
				}

				.updated {
					display: inline-block;
					flex: 0 0 60px;
					width: 60px;
					font-size: 13px;
					text-align: center;
					color: #888;
				}
			}
		}

		.intro-wrapper {
			width: 95%;
			margin: 0 auto;
			overflow: hidden;

			.title {
				margin-top: 15px;
				padding: 3px 0;
				border-left: 7px solid RGB(94, 94, 94);
				border-radius: 2px;

				&>h2 {
					display: inline-block;
					margin-left: 5px;
					font-size: 14px;
					font-weight: 600;
				}
			}

			.content {
				width: 100%;
				font-size: 14px;
				color: #888;

				&>pre {
					padding-top: 10px;
					display: inline-block;
					// height: 150px;
					line-height: 16px;
					width: 100%;
					white-space: pre-wrap;
					word-wrap: break-word;

					&.unshow {
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 4;
						overflow: hidden;
					}
				}

				&>em {
					float: right;
					color: RGB(179, 56, 54);
				}
			}

			.tag {
				padding: 8px 0;
				font-size: 15px;
				line-height: 15px;

				&>span {
					margin-left: 5px;
					padding: 0 5px;
					font-size: 14px;
					border: .5px solid RGB(223, 223, 223);
					background: RGB(242, 242, 242);
					color: #888;
				}
			}
		}

		.chapter-wrapper {
			margin-top: 10px;

			.chap-title {
				width: 100%;
				height: 38px;
				background: RGB(242, 242, 242);

				.title-wrapper {
					// position: relative;
					width: 95%;
					height: 100%;
					margin: 0 auto;

					.title {
						position: relative;
						top: 50%;
						left: 0;
						transform: translateY(-50%);
						display: flex;
						padding: 3px 0;
						border-left: 7px solid RGB(94, 94, 94);
						border-radius: 2px;
						width: 100%;

						&>h3 {
							margin-left: 5px;
							font-size: 14px;
							font-weight: 600;
							vertical-align: bottom;

							&>em {
								color: RGB(136, 136, 136);
							}
						}

						&>span {
							position: absolute;
							top: 50%;
							right: 10px;
							display: inline-block;
							transform: translateY(-50%);
							font-size: 14px;
							height: 24px;
							width: 44px;

							&>em {
								display: inline-block;
								height: 24px;
								line-height: 24px;
								font-weight: 600;
								color: RGB(154, 154, 154);
							}

							.sort-icon {
								font-size: 15px;
								vertical-align: middle;
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
						color: #b7b7b7;
					}
				}

				&:nth-child(6) {
					border: 0;
				}
			}

			.chapter-btn {
				margin: 5px auto 10px;
				width: 95%;
				height: 36px;
				line-height: 36px;
				border: 1px solid RGB(223, 223, 223);
				text-align: center;
				font-size: 13px;
				color: RGB(76, 76, 76);
				background: RGB(242, 242, 242);
			}
		}
	}
</style>
