<template>
	<div class="classify-detail-view" ref="classifyDetail">
		<ul>
			<li>
				<book-header :topTitle="title" :where="where"></book-header>
			</li>
			<li>
				<search-header :searchid.sync="searchid" v-show="type == 'search'"></search-header>
				<div class="classify-wrapper">
					<div class="title">
						<h2>{{smallTitle}}</h2>
					</div>
					<div class="content-wrapper" v-for="(book,index) in bookArr" :key="index" @click="goDetail(book._id,'本书详情')">
						<div class="cover">
							<img :src="decodeURIComponent(book.cover.split(`/agent/`)[1])" width="74" height="98">
						</div>
						<div class="content">
							<div class="name">
								<h3>{{book.title}}</h3>
							</div>
							<div class="author">
								<span><em class="text">作者：</em>{{book.author}}</span>
							</div>
							<div class="chapter">
								<span v-show="book.lastChapter != undefined"><em class="text">更新至：</em>{{book.lastChapter}}</span>
								<span v-show="book.lastChapter == undefined"><em class="text">标签：</em>{{book.majorCate}}</span>
							</div>
							<div class="desc">
								<p><em class="text">简介：</em>{{book.shortIntro}}</p>
							</div>
						</div>
					</div>
				</div>
				<div class="more-wrapper">
					<div class="more-btn" v-if="!flag" @click="more += 5">查看更多</div>
					<div class="more-btn" v-else>加载中...</div>
				</div>
			</li>
			<li>
				<novel-footer :searchid.sync="searchid"></novel-footer>
			</li>
		</ul>
	</div>
</template>

<script>
	import BookHeader from './BookHeader'
	import SearchHeader from '../SearchView/SearchHeader'
	import NovelFooter from '../NovelFooter'
	import BScroll from 'better-scroll'
	export default {
		name: 'BookClassify',
		components: {
			BookHeader,
			SearchHeader,
			NovelFooter
		},
		data() {
			return {
				detailScroll: null,
				title: this.$route.query.major,
				where: 'classify',
				classifydetail: [],
				bookArr: [],
				mins: this.$route.query.mins,
				more: 10,
				flag: false,
				type: this.$route.query.type,
				rankid: this.$route.query.rankid,
				searchid: this.$route.query.searchid,
				smallTitle: ''
			}
		},
		created() {
			this.$nextTick(() => {
				if (this.mins === undefined || this.mins === '') {
					this.smallTitle = this.title
				} else {
					this.smallTitle = this.mins
				}
				if (this.type === 'classify') {
					this.getClassifyDetailData(this.classifydetail, this.title, this.mins, 0, this.more)
				} else if (this.type === 'rank') {
					this.getRankDetailData(this.classifydetail, this.rankid, this.more)
				} else if (this.type === 'search') {
					this.getSearchDetailData(this.classifydetail, this.searchid, this.more)
					this.smallTitle = decodeURIComponent(this.searchid)
				}
				this._initHomeScroll()
			})
		},
		methods: {
			_initHomeScroll() {
				if (!this.detailScroll) {
					this.detailScroll = new BScroll(this.$refs.classifyDetail, {
						click: true
					})
				} else {
					this.detailScroll.refresh()
				}
			},
			getClassifyDetailData(arr, major, mins, start, limit) {
				arr.length = 0
				this.axios.get('/data/classifydetail', {
						params: {
							gender: 'male',
							type: 'hot',
							major: encodeURIComponent(major),
							mins: encodeURIComponent(mins),
							start: start,
							limit: limit
						}
					})
					.then(res => {
						res = res.data
						if (res.errno === 0) {
							arr.push(JSON.parse(res.data).books)
						}
						this.bookArr = arr[0]
						// console.log(this.bookArr)
						this.flag = false
					})
			},
			getRankDetailData(rankarr, rankid, count) {
				rankarr.length = 0
				this.axios.get('/data/rankdetail', {
						params: {
							rankid: rankid
						}
					})
					.then(res => {
						res = res.data
						if (res.errno === 0) {
							rankarr.push(JSON.parse(res.data).ranking.books)
							rankarr[0].length = count
							this.bookArr = rankarr[0]
							// console.log(rankarr)
							this.flag = false
						}
					})
			},
			getSearchDetailData(rankarr, searchid, count) {
				rankarr.length = 0
				this.axios.get('/data/search', {
						params: {
							searchid: searchid
						}
					})
					.then(res => {
						res = res.data
						if (res.errno === 0) {
							rankarr = JSON.parse(res.data).books
							rankarr.length = count
							this.bookArr = rankarr
							this.flag = false
						}
					})
			},
			goDetail(detailid, name) {
				sessionStorage.setItem('detailid', detailid)
				this.$router.push({
					path: '/book/detail',
					query: {
						detailId: detailid,
						topTitle: name
					}
				})
			}
		},
		watch: {
			more(value) {
				this.flag = true
				if (this.type === 'classify') {
					this.getClassifyDetailData(this.classifydetail, this.title, this.mins, 0, value)
				} else if (this.type === 'rank') {
					this.getRankDetailData(this.classifydetail, this.rankid, value)
				} else if (this.type === 'search') {
					this.getSearchDetailData(this.classifydetail, this.searchid, value)
				}
			},
			searchid(value) {
				if (this.type === 'classify') {
					this.getClassifyDetailData(this.classifydetail, this.title, this.mins, 0, this.more)
				} else if (this.type === 'rank') {
					this.getRankDetailData(this.classifydetail, this.rankid, this.more)
				} else if (this.type === 'search') {
					this.getSearchDetailData(this.classifydetail, value, this.more)
					this.smallTitle = decodeURIComponent(value)
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	$borderColor: #dfdfdf;

	.classify-detail-view {
		height: 100%;

		&>ul {
			margin: 0;
			padding: 0;
			list-style: none;
		}

		.classify-wrapper {
			width: 100%;
			margin: 0 auto;
			overflow: hidden;
			background: #FFFFFF;

			.title {
				width: 100%;
				padding: 3px 0;
				height: 25px;
				background: #f2f2f2;

				&>h2 {
					margin: 0;
					display: inline-block;
					margin-top: 4px;
					margin-left: 8px;
					padding-left: 8px;
					font-size: 14px;
					height: 16px;
					line-height: 16px;
					border-left: 7px solid RGB(94, 94, 94);
					border-radius: 2px;
					font-weight: 100;
				}
			}

			.content-wrapper {
				width: 96%;
				display: flex;
				margin: 0 auto;
				padding: 15px 0 10px;
				border-bottom: 1px solid $borderColor;

				.cover {
					flex: 0 0 74px;
					width: 74px;
				}

				.content {
					flex: 1;
					padding-left: 10px;
					height: 90px;
					position: relative;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

					.name {
						height: 22px;
						width: 100%;

						&>h3 {
							margin: 0;
							font-size: 16px;
							color: #000;
							font-weight: bold;
						}
					}

					.author,
					.chapter {
						height: 24px;
						line-height: 24px;

						&>span {
							font-size: 14px;
						}
					}

					.desc {
						height: 24px;

						&>p {
							margin: 0;
							padding-top: 2px;
							display: inline-block;
							width: 100%;
							line-height: 24px;
							font-size: 14px;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
							white-space: normal;
						}
					}

					.text {
						color: rgb(136, 136, 136);
					}
				}
			}

		}

		.more-wrapper {
			margin: 10px 0;
			width: 100%;
			height: 38px;

			.more-btn {
				margin: 0 auto;
				padding: 1px 0;
				width: 96%;
				height: 36px;
				line-height: 36px;
				background: #f2f2f2;
				border: 1px solid $borderColor;
				border-radius: 5px;
				color: #4c4c4c;
				font-size: 14px;
				text-align: center;
			}
		}

	}
</style>
