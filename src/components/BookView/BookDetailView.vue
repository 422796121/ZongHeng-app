<template>
	<div class="book-detail">
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
						<span>分类：<em>{{detail.minorCate}}</em></span>
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
					<span class="read-now">立即阅读</span>
				</div>
				<div>
					<span class="clent">客户端看免费</span>
				</div>
			</div>
			<div class="detail-chapter">
				<i class="icon-updated chapter-icon"></i>
				<span class="chapter">{{detail.lastChapter}}</span>
				<span class="updated">{{filterTime}}</span>
			</div>
		</div>
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
		<div class="chapter-wrapper">
			<div class="title">
				<h3>作品标题</h3>
				<span><i></i><em v-if="!sort" @click="sort=!sort">反序</em><em v-else @click="sort=!sort">正序</em></span>
			</div>
			<div class="chapter">
				<span class="text"></span>
				<i class="icon-right"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BookDetailView',
		data() {
			return {
				detailArr: [], // 详细
				listArr: [], // 简介
				sourceArr: [], // 书源
				chapterArr: [], // 章节
				time: '',
				detialId: this.$route.query.detailId,
				detailName: this.$route.query.detailName,
				show: false,
				sort: false
			}
		},
		created() {
			// this.detialId = this.$route.query.detailId
			this.$nextTick(() => {
				this.getDetailData(this.detailArr, this.detialId)
				this.getListData(this.listArr, 'list', this.detailName, 0, 1)
				this.getSourceData(this.sourceArr, this.detialId)
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
				var instance = this.axios.create({
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					}
				})
				// instance.post(`url`, params).then(res => res.data);
				instance.get('/data/source', {
						parans: {
							bookId
						}
					})
					.then(res => {
						res = res.data
						if (res.errno === 0) {
							arr.push(JSON.parse(res.data))
							for (let i in arr) {
								console.log(res)
							}
						}
					})
			},
			getChapterData(arr, sourceId) {
				this.axios.get('/data/chapter', {
						parans: {
							sourceId
						}
					})
					.then(res => {
						res = res.data
						if (res.errno === 0) {
							arr.push(JSON.parse(res.data))
						}
					})
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
		}
	}
</script>

<style lang="scss" scoped>
	.book-detail {
		width: 100%;
		height: auto;

		.detail-wrapper {
			background: RGB(242, 242, 242);

			.detail-top {
				display: flex;
				padding: 15px 7px 3px;

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

					span {
						color: #888;

						&>em {
							color: #000;
						}
					}

					.title {
						padding: 3px 0;
						font-size: 15px;
						font-weight: bold;
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
				}

				.chapter {
					flex: 1;
					display: inline-block;
					font-size: 14px;
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
					line-height: 15px;
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
	}
</style>
