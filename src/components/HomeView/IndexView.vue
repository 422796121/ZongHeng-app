<template>
	<div class="home-content">
		<!-- 轮播图 -->
		<div class="home-slide">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<img src="../../assets/img/slide1.jpg">
					</div>
					<div class="swiper-slide">
						<img src="../../assets/img/slide2.jpg">
					</div>
					<div class="swiper-slide">
						<img src="../../assets/img/slide3.jpg">
					</div>
					<div class="swiper-slide">
						<img src="../../assets/img/slide4.jpg">
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>
		<!-- 轮播图 END -->
		<!-- 男女分区 -->
		<div class="home-sort">
			<div class="home-man">
				<a href=""><i class="manicon"></i><span>男生专区</span></a>
			</div>
			<div class="home-wom">
				<a href=""><i class="womanicon"></i><span>女生专区</span></a>
			</div>
		</div>
		<!-- 男女分区 END -->
		<!-- 编辑力荐 -->
		<div class="recom" v-for="(recombooks,recomindexs) in recomArr" :key="recomindexs">
			<div class="title">
				<h2>编辑力荐</h2>
			</div>
			<div class="recom-wrapper" v-for="(recombook,recomindex) in recombooks" :key="recomindex">
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
		<!-- 编辑力荐 END -->
		<div class="bg-div"></div>
		<!-- 男生必读 -->
		<div class="man-view" v-for="(manbooks,manindexs) in manArr" :key="manindexs + '-man'">
			<div class="title">
				<h2>男生必读</h2>
			</div>
			<div class="man-wrapper" v-for="(manbook,manindex) in manbooks" :key="manindex">
				<div class="cover">
					<img :src="decodeURIComponent(manbook.cover.split(`/agent/`)[1])" width="82" height="108">
				</div>
				<div class="content">
					<div class="name">
						<h3>{{manbook.title}}</h3>
					</div>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
		<!-- 男生必读 END -->
		<div class="bg-div"></div>
		<!-- 女生必读 -->
		<div class="woman-view" v-for="(womanbooks,womanindexs) in womanArr" :key="womanindexs + '-woman'">
			<div class="title">
				<h2>女生必读</h2>
			</div>
			<div class="woman-wrapper" v-for="(womanbook,womanindex) in womanbooks" :key="womanindex">
				<div class="cover">
					<img :src="decodeURIComponent(womanbook.cover.split(`/agent/`)[1])" width="82" height="108">
				</div>
				<div class="content">
					<div class="name">
						<h3>{{womanbook.title}}</h3>
					</div>
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
		<!-- 女生必读 END -->
		<div class="bg-div"></div>
		<!-- 都市 -->
		<div class="city-view" v-for="(citybooks,cityindexs) in cityArr" :key="cityindexs + '-city'">
			<div class="title">
				<h2>都市娱乐</h2>
			</div>
			<div class="city-wrapper" v-for="(citybook,cityindex) in citybooks" :key="cityindex">
				<div class="wrapper-first" v-show="cityindex==0?true:false">
					<div class="cover">
						<img :src="decodeURIComponent(citybook.cover.split(`/agent/`)[1])" width="68" height="90">
					</div>
					<div class="content">
						<div class="name">
							<h3>{{citybook.title}}</h3>
						</div>
						<div class="desc">
							<p>{{citybook.shortIntro}}</p>
						</div>
						<div class="tag">
							<span class="author"><i class="author-img"></i><em class="text">{{citybook.author}}</em></span>
							<span class="tag-sort">{{citybook.cat}}</span>
						</div>
					</div>
				</div>
				<div class="wrapper-else" v-show="cityindex==0?false:true">
					<div class="else-text">
						<span>[{{citybook.cat}}]{{citybook.title}}:{{citybook.shortIntro}}</span>
					</div>
					<i class="icon-uniE900"></i>
				</div>
			</div>
		</div>
		<!-- 都市 END -->
		<div class="bg-div"></div>
		<!-- 游戏 -->
		<div class="game-view" v-for="(gamebooks,gameindexs) in gameArr" :key="gameindexs + '-game'">
			<div class="title">
				<h2>游戏竞技</h2>
			</div>
			<div class="game-wrapper" v-for="(gamebook,gameindex) in gamebooks" :key="gameindex">
				<div class="wrapper-first" v-if="gameindex==0?true:false">
					<div class="cover">
						<img :src="decodeURIComponent(gamebook.cover.split(`/agent/`)[1])" width="68" height="90">
					</div>
					<div class="content">
						<div class="name">
							<h3>{{gamebook.title}}</h3>
						</div>
						<div class="desc">
							<p>{{gamebook.shortIntro}}</p>
						</div>
						<div class="tag">
							<span class="author"><i class="author-img"></i><em class="text">{{gamebook.author}}</em></span>
							<span class="tag-sort">{{gamebook.cat}}</span>
						</div>
					</div>
				</div>
				<div class="wrapper-else" else>
					<div class="else-text">
						<span>[{{gamebook.cat}}]{{gamebook.title}}:{{gamebook.shortIntro}}</span>
					</div>
					<i class="icon-uniE900"></i>
				</div>
			</div>
		</div>
		<!-- 游戏 END -->
	</div>

</template>

<script>
	import Swiper from 'swiper'
	export default {
		name: 'IndexView',
		data() {
			return {
				recomArr: [], // 编辑推荐
				manArr: [], // 男生
				womanArr: [], // 女生
				cityArr: [], // 都市
				gameArr: [] // 游戏
			}
		},
		created() {
			this.$nextTick(() => {
				this.getData(this.recomArr, 'recom', '玄幻', 0, 3)
				this.getData(this.manArr, 'man', '女神', 0, 6)
				this.getData(this.womanArr, 'woman', '男神', 0, 6)
				this.getData(this.cityArr, 'city', '都市', 2, 5)
				this.getData(this.gameArr, 'game', '游戏', 2, 5)
			})
		},
		mounted() {
			let myslide = new Swiper('.swiper-container', {
				spaceBetween: 30,
				centeredSlides: true,
				loop: true,
				autoplay: {
					delay: 2500,
					disableOnInteraction: false
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				}
			})
		},
		methods: {
			getData(arr, str, query, start, limit) {
				this.axios.get('/homedata', {
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
							this.$router.replace('/home')
						}
						// console.log(arr)
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-content {
		height: auto;

		// 轮播图
		.home-slide {
			display: flex;
			font-size: 0;

			.swiper-container {
				flex: 1;
				height: 100%;
			}

			.swiper-slide {
				text-align: center;
				font-size: 18px;
				background: #fff;
				display: -webkit-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex;
				-webkit-box-pack: center;
				-ms-flex-pack: center;
				-webkit-justify-content: center;
				justify-content: center;
				-webkit-box-align: center;
				-ms-flex-align: center;
				-webkit-align-items: center;
				align-items: center;

				&>img {
					width: 100%;
				}
			}
		}

		// 男女分区
		.home-sort {
			padding-bottom: 5px;
			display: flex;
			width: 100%;
			border-bottom: 0.5px solid rgba(136, 136, 136, 0.5);

			.home-man,
			.home-wom {
				padding: 8px 0;
				position: relative;
				flex: 1;
				display: inline-block;
				height: 40px;

				&>a {
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
					margin: auto;
					display: inline-block;
					width: 175px;
					height: 40px;
					line-height: 40px;
					font-size: 15px;
					text-align: center;
					color: #fff;
					border-radius: 5px;
				}
			}

			.home-man {
				&>a {
					background: RGB(127, 166, 220);
				}

				.manicon {
					margin: 0 2px 4px 2px;
					display: inline-block;
					width: 20px;
					height: 20px;
					background: url("../../assets/img/man.png") center center no-repeat;
					vertical-align: middle;
				}
			}

			.home-wom {
				&>a {
					background: RGB(208, 178, 211);
				}

				.womanicon {
					margin: 0 2px 4px 2px;
					display: inline-block;
					width: 20px;
					height: 20px;
					background: url("../../assets/img/woman.png") center center no-repeat;
					vertical-align: middle;
				}
			}
		}

		// 空背景
		.bg-div {
			height: 10px;
			width: 100%;
			background: RGB(245, 245, 245);
		}

		// 编辑推荐
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
					margin-left: 10px;
					font-size: 17px;
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
		}

		// 男女分类
		.man-view,
		.woman-view {
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
					font-size: 17px;
					font-weight: 600;
				}
			}

			.man-wrapper,
			.woman-wrapper {
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

		.city-view,.game-view {
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
					font-size: 17px;
					font-weight: 600;
				}
			}

			.city-wrapper,.game-wrapper{
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
				.wrapper-else{
					display: flex;
					width: 100%;
					.else-text{
						padding: 5px 0px;
						width: 80%;
						&>span{	
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
					& > i{
						position: relative;
						width: 20%;
						height: 50px;
						line-height: 50px;
						font-size: 16px;
						text-align: right;
						vertical-align: bottom;
						color: RGB(205,205,205);
					}
				}
			}
		}


	}
</style>
