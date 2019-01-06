<template>
	<div class="shelf-view" ref="shelf">
		<ul>
			<li>
				<novel-header></novel-header>
			</li>
			<li>
				<div class="top-unlogin">
					<span class="unlogin-state">未登录</span>
					<span class="login-btn" @click="toLogin">登陆</span>
				</div>
				<div class="history-tab"><span>最近阅读</span></div>
				<div class="shelf-wrapper-none" v-show="shelfArr.length == 0">
					<div class="shelf-unlogin">
						还木有任何书籍( ˙﹏˙ )
					</div>
				</div>
				<div class="shelf-wrapper" v-show="shelfArr.length != 0">
					<div class="shelf-header">
						<span>共收藏<em>{{shelfArr.length}}</em>本</span>
						<span class="btn" v-show="!dele" @click="dele = !dele">编辑</span>
						<span class="btn" v-show="dele" @click="saveShelf">完成</span>
					</div>
					<div class="shelf-item" v-for="(book,index) in shelfArr" :key="index" @click="goDetail(book.detailid, book.index)">
						<div class="item-wrapper">
							<div class="cover">
								<img :src="decodeURIComponent(book.cover)" width="85" height="115">
							</div>
							<div class="content">
								<div class="name">
									<h3>{{book.name}}</h3>
								</div>
								<div class="author">
									<span>作者: <em>{{book.title}}</em></span>
								</div>
								<div class="chapter">
									<span>阅读到: <em>{{book.title}}</em></span>
								</div>
								<div class="new-chapter">
									<span>最新章节: <em>{{book.lastChapter}}</em></span>
								</div>
							</div>
							<div class="dele-btn" v-show="dele" @click="deleBook($event,index)">
								<span>删除</span>
							</div>
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
	import NovelHeader from '../HomeView/NovelHeader'
	import NovelFooter from '../NovelFooter'
	import BScroll from 'better-scroll'
	export default {
		name: 'ShelfView',
		components: {
			NovelHeader,
			NovelFooter
		},
		data() {
			return {
				shelfScroll: null,
				shelfArr: [],
				bookArr: [],
				jump: true,
				dele: false
			}
		},
		created() {
			this.$nextTick(() => {
				this.getArr()
				this._initShelfScroll()
			})
		},
		methods: {
			_initShelfScroll() {
				if (!this.shelfScroll) {
					this.shelfScroll = new BScroll(this.$refs.shelf, {
						click: true
					})
				} else {
					this.shelfScroll.refresh()
				}
			},
			goDetail(detailid, history) {
				console.log(detailid)
				sessionStorage.setItem('detailid', detailid)
				this.$router.push({
					path: '/book/detail',
					query: {
						detailId: detailid,
						topTitle: '本书详情',
						readChapter: history
					}
				})
			},
			toLogin() {
				this.$router.push({
					path: '/login'
				})
			},
			getArr() {
				this.shelfArr = sessionStorage['shelf']
				this.bookArr = sessionStorage['list']
				if (this.shelfArr !== undefined) {
					this.shelfArr = this.shelfArr.split('++')
					let j = 0
					for (let i in this.shelfArr) {
						if (this.shelfArr[i] !== '') {
							this.shelfArr[j] = JSON.parse(this.shelfArr[i])
							j++
						}
					}
					this.shelfArr.length = j
					this.bookArr = this.bookArr.split('++')
					j = 0
					for (let i in this.bookArr) {
						if (this.bookArr[i] !== '') {
							this.bookArr[j] = JSON.parse(this.bookArr[i])
							j++
						}
					}
					this.bookArr.length = j
				} else {
					this.shelfArr = []
				}
			},
			deleBook(e,index) {
				this.shelfArr.splice(index, 1)
				this.bookArr.splice(index, 1)
				e.cancelBubble = true
			},
			saveShelf(){
				sessionStorage.setItem('shelf', this.changeArr(this.shelfArr))
				sessionStorage.setItem('list', this.changeArr(this.bookArr))
				this.dele = !this.dele
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
			jump() {
				console.log('2')
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.footer {
		background: #fafafa !important;
		border-top: 1px solid #dfdfdf;
	}

	.shelf-view {
		width: 100%;
		height: 100%;
		background: #fafafa;

		.top-unlogin {
			display: flex;
			margin: 0 auto;
			padding: 8px 0;
			height: 35px;
			width: 96%;

			.unlogin-state {
				flex: 1;
				padding-left: 5px;
				font-size: 14px;
				line-height: 30px;
				color: #4c4c4c;
			}

			.login-btn {
				flex: 0 0 55px;
				height: 30px;
				line-height: 30px;
				text-align: center;
				font-size: 14px;
				border-radius: 5px;
				color: #fff;
				background: #ff4644;
			}
		}

		.history-tab {
			width: 100%;
			height: 35px;
			font-size: 14px;
			color: #ff4644;
			text-align: center;
			background: #f2f2f2;
			border-top: 1px solid #dfdfdf;

			&>span {
				display: inline-block;
				border-bottom: 3px solid #ff4644;
				height: 33px;
				line-height: 33px;
				width: 100%;
			}
		}

		.shelf-wrapper-none {
			.shelf-unlogin {
				height: 200px;
				line-height: 200px;
				text-align: center;
				font-size: 14px;
				background: #fafafa;
			}
		}

		.shelf-wrapper {
			width: 100%;

			.shelf-header {
				margin: 0 auto;
				position: relative;
				width: 96%;

				&>span {
					display: inline-block;
					height: 40px;
					line-height: 40px;
					font-size: 15px;
					color: #b3b3b3;

					&>em {
						padding: 0 1px;
						color: #000;
					}

					&.btn {
						padding-right: 5px;
						position: absolute;
						top: 0;
						right: 0;
						color: #ff4644;
						font-size: 16px;
					}
				}
			}

			.shelf-item {
				width: 100%;
				border-top: 1px solid #dfdfdf;

				.item-wrapper {
					position: relative;
					margin: 0 auto;
					padding: 10px 0;
					display: flex;
					width: 96%;

					.cover {
						flex: 0 0 85px;
						width: 85px;
					}

					.content {
						.name {
							margin: 0 auto;
							padding: 5px 0;
							width: 90%;

							&>h3 {
								font-size: 15px;
								color: #000;
								font-weight: bold;
							}
						}

						.author,
						.chapter,
						.new-chapter {
							margin: 0 auto;
							padding: 5px 0;
							width: 90%;

							&>span {
								display: inline-block;
								width: 100%;
								padding-top: 2px;
								display: inline-block;
								width: 100%;
								line-height: 14px;
								font-size: 13px;
								color: rgb(136, 136, 136);
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;

								&>em {
									color: #000000;
								}
							}
						}
					}

					.dele-btn {
						padding: 15px 0;
						padding-right: 3px;
						position: absolute;
						top: 0;
						right: 0;
						flex: 0 0 60px;
						width: 40px;
						z-index: 200;

						&>span {
							display: inline-block;
							padding: 5px;
							width: 100%;
							text-align: center;
							font-size: 14px;
							background: #f2f2f2;
							border-radius: 2px;
						}
					}

				}
			}
		}
	}
</style>
