<template>
	<div class="gender-view" ref="gender">
		<ul>
			<li>
				<book-header :topTitle="title"></book-header>
			</li>
			<li>
				<div class="recom" v-for="(recombooks,recomindexs) in recomArr" :key="recomindexs">
					<div class="title">
						<h2>编辑力荐</h2>
					</div>
					<div class="recom-wrapper" v-for="(recombook,recomindex) in recombooks" :key="recomindex" @click="goDetail(recombook._id,topname)">
						<div class="cover">
							<img :src="decodeURIComponent(recombook.cover.split(`/agent/`)[1])" width="68" height="90">
						</div>
						<div class="content">
							<div class="name">
								<h3>{{recombook.title}}</h3>
							</div>
							<div class="desc">
								<p>{{recombook.shortIntro}}</p>
							</div>
							<div class="tag">
								<span class="author"><i class="author-img"></i><em class="text">{{recombook.author}}</em></span>
								<span class="tag-sort">{{recombook.cat}}</span>
							</div>
						</div>
					</div>
				</div>

				<div class="bg-div"></div>

				<div class="hot-view" v-for="(hotbooks,hotindexs) in hotArr" :key="hotindexs + '-hot'">
					<div class="title">
						<h2>热门作品</h2>
					</div>
					<div class="hot-wrapper" v-for="(hotbook,hotindex) in hotbooks" :key="hotindex" @click="goDetail(hotbook._id,topname)">
						<div class="cover">
							<img :src="decodeURIComponent(hotbook.cover.split(`/agent/`)[1])" width="82" height="108">
						</div>
						<div class="content">
							<div class="name">
								<h3>{{hotbook.title}}</h3>
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
				</div>

				<div class="bg-div"></div>

				<div class="typefirst-view" v-for="(typeFirstbooks,typeFirstindexs) in typeFirstArr" :key="typeFirstindexs + '-typeFirst'">
					<div class="title">
						<h2>{{typeTitle[0]}}</h2>
					</div>
					<div class="typefirst-wrapper" v-for="(typeFirstbook,typeFirstindex) in typeFirstbooks" :key="typeFirstindex"
					@click="goDetail(typeFirstbook._id,topname)">
						<div class="wrapper-first" v-show="typeFirstindex==0?true:false">
							<div class="cover">
								<img :src="decodeURIComponent(typeFirstbook.cover.split(`/agent/`)[1])" width="68" height="90">
							</div>
							<div class="content">
								<div class="name">
									<h3>{{typeFirstbook.title}}</h3>
								</div>
								<div class="desc">
									<p>{{typeFirstbook.shortIntro}}</p>
								</div>
								<div class="tag">
									<span class="author"><i class="author-img"></i><em class="text">{{typeFirstbook.author}}</em></span>
									<span class="tag-sort">{{typeFirstbook.cat}}</span>
								</div>
							</div>
						</div>
						<div class="wrapper-else" v-show="typeFirstindex==0?false:true">
							<div class="else-text">
								<span>[{{typeFirstbook.cat}}]{{typeFirstbook.title}}:{{typeFirstbook.shortIntro}}</span>
							</div>
							<i class="icon-right"></i>
						</div>
					</div>
				</div>

				<div class="bg-div"></div>

				<div class="typesecond-view" v-for="(typeSecondbooks,typeSecondindexs) in typeSecondArr" :key="typeSecondindexs + '-typeSecond'">
					<div class="title">
						<h2>{{typeTitle[1]}}</h2>
					</div>
					<div class="typesecond-wrapper" v-for="(typeSecondbook,typeSecondindex) in typeSecondbooks" :key="typeSecondindex"
					@click="goDetail(typeSecondbook._id,topname)">
						<div class="wrapper-first" v-show="typeSecondindex==0?true:false">
							<div class="cover">
								<img :src="decodeURIComponent(typeSecondbook.cover.split(`/agent/`)[1])" width="68" height="90">
							</div>
							<div class="content">
								<div class="name">
									<h3>{{typeSecondbook.title}}</h3>
								</div>
								<div class="desc">
									<p>{{typeSecondbook.shortIntro}}</p>
								</div>
								<div class="tag">
									<span class="author"><i class="author-img"></i><em class="text">{{typeSecondbook.author}}</em></span>
									<span class="tag-sort">{{typeSecondbook.cat}}</span>
								</div>
							</div>
						</div>
						<div class="wrapper-else" v-show="typeSecondbook==0?false:true">
							<div class="else-text">
								<span>[{{typeSecondbook.cat}}]{{typeSecondbook.title}}:{{typeSecondbook.shortIntro}}</span>
							</div>
							<i class="icon-right"></i>
						</div>
					</div>
				</div>

				<div class="bg-div"></div>

				<div class="typethird-view" v-for="(typeThirdbooks,typeThirdindexs) in typeThirdArr" :key="typeThirdindexs + '-typeThird'">
					<div class="title">
						<h2>{{typeTitle[2]}}</h2>
					</div>
					<div class="typethird-wrapper" v-for="(typeThirdbook,typeThirdindex) in typeThirdbooks" :key="typeThirdindex"
					@click="goDetail(typeThirdbook._id,topname)">
						<div class="wrapper-first" v-show="typeThirdindex==0?true:false">
							<div class="cover">
								<img :src="decodeURIComponent(typeThirdbook.cover.split(`/agent/`)[1])" width="68" height="90">
							</div>
							<div class="content">
								<div class="name">
									<h3>{{typeThirdbook.title}}</h3>
								</div>
								<div class="desc">
									<p>{{typeThirdbook.shortIntro}}</p>
								</div>
								<div class="tag">
									<span class="author"><i class="author-img"></i><em class="text">{{typeThirdbook.author}}</em></span>
									<span class="tag-sort">{{typeThirdbook.cat}}</span>
								</div>
							</div>
						</div>
						<div class="wrapper-else" v-show="typeThirdindex==0?false:true">
							<div class="else-text">
								<span>[{{typeThirdbook.cat}}]{{typeThirdbook.title}}:{{typeThirdbook.shortIntro}}</span>
							</div>
							<i class="icon-right"></i>
						</div>
					</div>
				</div>

				<div class="bg-div"></div>

				<div class="new-view" v-for="(newbooks,newindexs) in newArr" :key="newindexs + '-new'">
					<div class="title">
						<h2>新书精选</h2>
					</div>
					<div class="new-wrapper" v-for="(newbook,newindex) in newbooks" :key="newindex" @click="goDetail(newbook._id,topname)">
						<div class="cover">
							<img :src="decodeURIComponent(newbook.cover.split(`/agent/`)[1])" width="82" height="108">
						</div>
						<div class="content">
							<div class="name">
								<h3>{{newbook.title}}</h3>
							</div>
						</div>
					</div>
					<div class="clearfix"></div>
				</div>
			</li>
			<li>
				<novel-footer></novel-footer>
			</li>
		</ul>
	</div>
</template>

<script>
	import BookHeader from '../BookView/BookHeader'
	import NovelFooter from '../NovelFooter'
	import BScroll from 'better-scroll'
	export default {
		name: 'GenderView',
		components: {
			BookHeader,
			NovelFooter
		},
		data() {
			return {
				title: '',
				genderScroll: null,
				recomArr: [], // 编辑推荐
				hotArr: [], // 热门
				typeFirstArr: [],
				typeSecondArr: [],
				typeThirdArr: [],
				newArr: [], // 新书,
				typeTitle: [],
				topname: '本书详情'
			}
		},
		created() {
			this.$nextTick(() => {
				let sex = this.$route.query.gender
				if (sex === 'male') {
					this.typeTitle[0] = '都市生活'
					this.typeTitle[1] = '推理侦探'
					this.typeTitle[2] = '电子竞技'
					this.getGenderData(this.recomArr, '游戏', 0, 3)
					this.getGenderData(this.hotArr, '异界大陆', 0, 6)
					this.getGenderData(this.typeFirstArr, this.typeTitle[0], 0, 5)
					this.getGenderData(this.typeSecondArr, this.typeTitle[1], 0, 5)
					this.getGenderData(this.typeThirdArr, this.typeTitle[2], 0, 5)
					this.getGenderData(this.newArr, '异界大陆 ', 0, 6)
					this.title = '男生专区'
				} else if (this.$route.query.gender === 'female') {
					this.typeTitle[0] = '豪门'
					this.typeTitle[1] = '爱情'
					this.typeTitle[2] = '穿越'
					this.getGenderData(this.recomArr, '言情', 0, 3)
					this.getGenderData(this.hotArr, '宫斗', 0, 6)
					this.getGenderData(this.typeFirstArr, this.typeTitle[0], 0, 5)
					this.getGenderData(this.typeSecondArr, this.typeTitle[1], 0, 5)
					this.getGenderData(this.typeThirdArr, this.typeTitle[2], 0, 5)
					this.getGenderData(this.newArr, '男神', 0, 6)
					this.title = '女生专区'
				}
			})
		},
		mounted() {
			this.$nextTick(() => {
				this._initGenderScroll()
			})
		},
		methods: {
			_initGenderScroll() {
				if (!this.genderScroll) {
					this.genderScroll = new BScroll(this.$refs.gender, {
						click: true
					})
				} else {
					this.genderScroll.refresh()
				}
			},
			getGenderData(arr, query, start, limit) {
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
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.gender-view {
		height: 100%;

		&>ul {
			margin: 0;
			padding: 0;
			list-style: none;
		}

		.bg-div {
			height: 10px;
			width: 100%;
			background: RGB(245, 245, 245);
		}

		.recom {
			margin-left: 50%;
			width: 90%;
			transform: translateX(-50%);

			.title {
				margin-top: 15px;
				padding: 3px 5px;
				border-left: 6px solid RGB(233, 94, 86);
				border-radius: 2px;

				&>h2 {
					display: inline-block;
					margin-left: 3px;
					font-size: 16px;
					font-weight: 600;
				}
			}

			.recom-wrapper {
				display: flex;
				padding: 15px 0 10px;

				.cover {
					flex: 0 0 68px;
					width: 68px;
				}

				.content {
					flex: 1;
					padding-left: 15px;
					height: 90px;
					position: relative;

					.name {
						padding: 5px 0;

						&>h3 {
							font-size: 14px;
							color: #000;
							font-weight: bold;
						}
					}

					.desc {
						&>p {
							height: 42px;
							padding-top: 2px;
							display: inline-block;
							width: 100%;
							line-height: 14px;
							font-size: 13px;
							color: rgb(136, 136, 136);
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 3;
							overflow: hidden;
						}
					}

					.tag {
						position: absolute;
						left: 0;
						bottom: 0;
						width: 100%;
						clear: both;
						font-size: 13px;
						font-weight: bold;
						color: rgb(136, 136, 136);

						&>.author {
							margin-left: 10px;
							display: inline-block;
							height: 16px;
							vertical-align: top;

							&>.author-img {
								display: inline-block;
								width: 48px;
								height: 16px;
								background: url(../../assets/img/author.png) center center no-repeat;
								background-size: 100%;
								vertical-align: text-top;
								transform: translateX(-5px);
							}

							&>.text {
								display: inline-block;
								transform: translateX(-8px);
							}
						}

						&>.tag-sort {
							padding: 1px 2px;
							float: right;
							display: inline-block;
							height: 16px;
							line-height: 16px;
							color: #fff;
							background: RGB(161, 208, 210);
							border-radius: 3px;
							vertical-align: bottom;
						}
					}

				}
			}

		}

		.hot-view,
		.new-view {
			width: 90%;
			margin-left: 50%;
			transform: translateX(-50%);

			.title {
				margin-top: 15px;
				padding: 3px 5px;
				border-left: 6px solid RGB(233, 94, 86);
				border-radius: 2px;

				&>h2 {
					display: inline-block;
					margin-left: 10px;
					font-size: 16px;
					font-weight: 600;
				}
			}

			.hot-wrapper,
			.new-wrapper {
				flex: 1;
				width: 33%;
				padding: 15px 0 10px;
				float: left;

				.cover {
					width: 100%;

					&>img {
						margin-left: 50%;
						transform: translateX(-50%);
					}
				}

				.content {
					height: 100%;
					position: relative;

					.name {
						margin-left: 50%;
						transform: translateX(-50%);
						padding: 5px 0;
						width: 82px;

						&>h3 {
							font-size: 13px;
							color: #000;
						}
					}
				}
			}

		}

		.typefirst-view,
		.typesecond-view,
		.typethird-view {
			margin-left: 50%;
			width: 90%;
			transform: translateX(-50%);

			.title {
				margin-top: 15px;
				padding: 3px 5px;
				border-left: 6px solid RGB(233, 94, 86);
				border-radius: 2px;

				&>h2 {
					display: inline-block;
					margin-left: 10px;
					font-size: 16px;
					font-weight: 600;
				}
			}

			.typefirst-wrapper,
			.typesecond-wrapper,
			.typethird-wrapper {
				.wrapper-first {
					display: flex;
					padding: 15px 0 10px;
					padding-bottom: 20px;
					width: 100%;
					border-bottom: 0.5px solid rgba(136, 136, 136, 0.5);

					.cover {
						flex: 0 0 68px;
						width: 68px;
					}

					.content {
						flex: 1;
						padding-left: 15px;
						height: 90px;
						position: relative;

						.name {
							padding: 5px 0;

							&>h3 {
								font-size: 14px;
								color: #000;
								font-weight: bold;
							}
						}

						.desc {
							&>p {
								height: 42px;
								padding-top: 2px;
								display: inline-block;
								width: 255px;
								line-height: 14px;
								font-size: 13px;
								color: rgb(136, 136, 136);
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 3;
								overflow: hidden;
							}
						}

						.tag {
							position: absolute;
							bottom: 0;
							width: 255px;
							clear: both;
							font-size: 13px;
							font-weight: bold;
							color: rgb(136, 136, 136);

							&>.author {
								display: inline-block;
								height: 16px;
								vertical-align: top;

								&>.author-img {
									display: inline-block;
									width: 48px;
									height: 16px;
									background: url(../../assets/img/author.png) center center no-repeat;
									background-size: 100%;
									vertical-align: text-top;
									transform: translateX(-5px);
								}

								&>.text {
									display: inline-block;
									transform: translateX(-8px);
								}
							}

							&>.tag-sort {
								padding: 1px 2px;
								float: right;
								display: inline-block;
								height: 16px;
								line-height: 16px;
								color: #fff;
								background: RGB(161, 208, 210);
								border-radius: 3px;
								vertical-align: bottom;
							}
						}

					}

				}

				.wrapper-else {
					display: flex;
					width: 100%;

					.else-text {
						padding: 5px 0px;
						width: 80%;

						&>span {
							display: inline-block;
							width: 100%;
							height: 40px;
							line-height: 40px;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							font-size: 16px;
						}
					}

					&>i {
						position: relative;
						width: 20%;
						height: 50px;
						line-height: 50px;
						font-size: 16px;
						text-align: right;
						vertical-align: bottom;
						color: RGB(205, 205, 205);
					}
				}
			}
		}




	}
</style>
