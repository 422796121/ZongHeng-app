<template>
	<div class="rank-view" ref="rank">
		<ul>
			<li>
				<novel-header></novel-header>
			</li>
			<li>
				<div class="rank-wrapper">
					<div class="title">
						<h2>热搜榜</h2>
						<span @click="toClassifyDetail(rankId[0],'热销榜')">
							<i class="icon-menu-normal menu-icon"></i>
							<span>查看榜单</span>
						</span>
						<div class="clearfix"></div>
					</div>
					<div class="content" v-for="(books,hotindexs) in hotArr[0]" :key="hotindexs+'-hot'" @click="goDetail(books._id)">
						<div class="text">
							<span class="num">{{hotindexs+1}}</span>
							<span class="name">{{books.title}}</span>
							<span class="author">{{books.author}}</span>
						</div>
					</div>
				</div>
				<div class="rank-wrapper">
					<div class="title">
						<h2>畅销榜</h2>
						<span @click="toClassifyDetail(rankId[1],'畅销榜')">
							<i class="icon-menu-normal menu-icon"></i>
							<span>查看榜单</span>
						</span>
						<div class="clearfix"></div>
					</div>
					<div class="content" v-for="(books,salesindexs) in saleArr[0]" :key="salesindexs+'-sale'" @click="goDetail(books._id)">
						<div class="text">
							<span class="num">{{salesindexs+1}}</span>
							<span class="name">{{books.title}}</span>
							<span class="author">{{books.author}}</span>
						</div>
					</div>
				</div>
				<div class="rank-wrapper">
					<div class="title">
						<h2>VIP榜</h2>
						<span @click="toClassifyDetail(rankId[2],'VIP榜')">
							<i class="icon-menu-normal menu-icon"></i>
							<span>查看榜单</span>
						</span>
						<div class="clearfix"></div>
					</div>
					<div class="content" v-for="(books,vipsindexs) in vipArr[0]" :key="vipsindexs+'-vip'" @click="goDetail(books._id)">
						<div class="text">
							<span class="num">{{vipsindexs+1}}</span>
							<span class="name">{{books.title}}</span>
							<span class="author">{{books.author}}</span>
						</div>
					</div>
				</div>
				<div class="rank-wrapper">
					<div class="title">
						<h2>新书榜</h2>
						<span @click="toClassifyDetail(rankId[3],'新书榜')">
							<i class="icon-menu-normal menu-icon"></i>
							<span>查看榜单</span>
						</span>
						<div class="clearfix"></div>
					</div>
					<div class="content" v-for="(books,newsindexs) in newArr[0]" :key="newsindexs+'-new'" @click="goDetail(books._id)">
						<div class="text">
							<span class="num">{{newsindexs+1}}</span>
							<span class="name">{{books.title}}</span>
							<span class="author">{{books.author}}</span>
						</div>
					</div>
				</div>
				<div class="rank-wrapper">
					<div class="title">
						<h2>收藏榜</h2>
						<span @click="toClassifyDetail(rankId[4],'收藏榜')">
							<i class="icon-menu-normal menu-icon"></i>
							<span>查看榜单</span>
						</span>
						<div class="clearfix"></div>
					</div>
					<div class="content" v-for="(books,collsindexs) in collArr[0]" :key="collsindexs+'-coll'" @click="goDetail(books._id)">
						<div class="text">
							<span class="num">{{collsindexs+1}}</span>
							<span class="name">{{books.title}}</span>
							<span class="author">{{books.author}}</span>
						</div>
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
	import NovelHeader from './NovelHeader'
	import NovelFooter from '../NovelFooter'
	import BScroll from 'better-scroll'
	export default {
		name: 'RankView',
		components: {
			NovelHeader,
			NovelFooter
		},
		data() {
			return {
				rankScroll: null,
				titleArr: [],
				rankId: [],
				rankArr: [],
				hotArr: [],
				saleArr: [],
				vipArr: [],
				newArr: [],
				collArr: [],
				count: 5
			}
		},
		created() {
			this.$nextTick(() => {
				this.getRankData(this.titleArr, this.rankId)
				this._initRankScroll()
			})
		},
		methods: {
			_initRankScroll() {
				if (!this.rankScroll) {
					this.rankScroll = new BScroll(this.$refs.rank, {
						click: true
					})
				} else {
					this.rankScroll.refresh()
				}
			},
			getRankData(arr, rankarr) {
				this.axios.get('/data/rank', {})
					.then(res => {
						res = res.data
						if (res.errno === 0) {
							arr.push(JSON.parse(res.data))
							this.titleArr = arr[0].epub
							for (let i in this.titleArr) {
								rankarr.push(this.titleArr[i]._id)
							}
							this.showRank(rankarr)
						}
					})
			},
			getRankDetailData(rankarr, rankid, count) {
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
						}
					})
			},
			showRank(arr) {
				this.getRankDetailData(this.hotArr, arr[0], this.count)
				this.getRankDetailData(this.saleArr, arr[1], this.count)
				this.getRankDetailData(this.vipArr, arr[2], this.count)
				this.getRankDetailData(this.newArr, arr[3], this.count)
				this.getRankDetailData(this.collArr, arr[4], this.count)
			},
			goDetail(detailid) {
				sessionStorage.setItem('detailid', detailid)
				this.$router.push({
					path: '/book/detail',
					query: {
						detailId: detailid,
						topTitle: '本书详情'
					}
				})
			},
			toClassifyDetail(rankid, type) {
				this.$router.push({
					name: 'BookClassifyView',
					query: {
						rankid: rankid,
						type: 'rank',
						major: type
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	$borderColor: #dfdfdf;
	.rank-view {
		height: 100%;
		width: 100%;
		background: RGB(242, 242, 242);

		&>ul {
			margin: 0;
			padding: 0;
			list-style: none;
		}

		.rank-wrapper {
			overflow: hidden;
			background: #FFFFFF;

			.title {
				padding: 3px 0;
				height: 32px;
				line-height: 32px;
				font-size: 14px;
				background: #f2f2f2;

				&>h2 {
					display: inline-block;
					margin-left: 8px;
					padding-left: 8px;
					height: 17px;
					line-height: 17px;
					border-left: 7px solid RGB(94, 94, 94);
					border-radius: 2px;
					font-weight: 600;
				}

				&>span {
					float: right;
					margin-right: 8px;

					&>span {
						display: inline-block;
						height: 17px;
						font-size: 14px;

					}

					.menu-icon {
						vertical-align: middle;
						font-size: 14px;
					}
				}
			}

			.content {
				width: 100%;
				height: 38px;
				line-height: 38px;
				font-size: 14px;
				color: #888;
				border-top: .5px solid #dfdfdf;

				&:nth-child(6) {
					border-bottom: .5px solid #dfdfdf;
				}


				&:nth-child(2) .text .num {
					background: #ff4644 !important;
				}

				&:nth-child(3) .text .num {
					background: #e28d29 !important;
				}

				&:nth-child(4) .text .num {
					background: #9fc575 !important;
				}


				.text {
					position: relative;
					margin: 0 auto;
					width: 96%;

					&>span {
						display: inline-block;
						text-align: center;
					}

					.name {
						color: #4c4c4c;
					}

					.num {
						height: 18px;
						line-height: 18px;
						width: 18px;
						color: #FFFFFF;
						background: #8f8f8f;
						border-radius: 50%;
						text-align: center;
						font-size: 12px;
					}

					.author {
						position: absolute;
						top: 0;
						right: 0;
					}
				}
			}

		}

	}

</style>
