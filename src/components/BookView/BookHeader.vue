<template>
	<div class="book-detail-home" ref="detail">
		<ul>
			<li>
				<div class="book-header" ref="detail">

					<div class="header-wrapper">
						<span class="back" @click="backPage"><i class="icon-left back-icon"></i>返回</span>
						<span class="title">本书详情</span>
						<span class="shelf"><i class="icon-shelf shelf-icon"></i>书架</span>
					</div>
				</div>
			</li>
			<li>
				<book-detail-view></book-detail-view>
			</li>
			<li>
				<novel-footer></novel-footer>
			</li>
		</ul>
	</div>
</template>

<script>
	import BookDetailView from './BookDetailView'
	import BScroll from 'better-scroll'
	import NovelFooter from '../NovelFooter'
	export default {
		name: 'BookHeader',
		created() {
			this.$nextTick(() => {
				this._initHomeScroll()
			})
		},
		methods: {
			backPage() {
				this.$router.go(-1)
			},
			_initHomeScroll() {
				if (!this.homeScroll) {
					this.homeScroll = new BScroll(this.$refs.detail, {
						click: true
					})
				} else {
					this.homeScroll.refresh()
				}
			}
		},
		components: {
			BookDetailView,
			NovelFooter
		}
	}
</script>

<style lang="scss" scoped>
	.book-detail-home {
		width: 100%;
		height: 100%;

		.book-header {
			height: 44px;
			background: RGB(51, 51, 51);

			.header-wrapper {
				display: flex;
				color: #fff;
				line-height: 44px;

				.back {
					padding: 0 5px;
					font-size: 14px;

					&>.back-icon {
						font-size: 20px;
						vertical-align: text-bottom;
					}
				}

				.title {
					flex: 1;
					text-align: center;
					font-size: 15px;
					font-weight: bold;
				}

				.shelf {
					padding-right: 10px;
					font-size: 14px;

					.shelf-icon {
						font-size: 20px;
						vertical-align: text-top;
					}
				}
			}
		}

	}
</style>
