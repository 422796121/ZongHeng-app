<template>
	<div class="book-detail-home">
		<div class="book-header">
			<div class="header-wrapper">
				<span class="back" @click="backPage(where)"><i class="icon-left back-icon"></i>返回</span>
				<span class="title">{{topTitle}}</span>
				<span class="shelf"><i class="icon-shelf shelf-icon"></i>书架</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'BookHeader',
		props: ['topTitle', 'where', 'detailid'],
		methods: {
			backPage(where) {
				if (where === 'detail') {
					this.$router.push({
						path: '/'
					})
				} else if (where === 'chapter') {
					this.$router.push({
						path: '/book/detail',
						query: {
							detailId: this.detailid,
							topTitle: '本书详情'
						}
					})
				} else {
					this.$router.go(-1)
				}
			}
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
