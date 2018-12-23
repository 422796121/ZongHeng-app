<template>
	<div class="book-header">
		<ul>
			<li>
				<div class="header-wrapper">
					<span class="back" @click="backPage"><i class="icon-left back-icon"></i>返回</span>
					<span class="title">本书详情</span>
					<span class="shelf"><i class="icon-shelf shelf-icon"></i>书架</span>
				</div>
			</li>
			<li>
				<book-detail-view></book-detail-view>
			</li>
		</ul>
	</div>
</template>

<script>
	import BookDetailView from './BookDetailView'
	export default {
		name: 'BookHeader',
		methods: {
			backPage() {
				this.$router.go(-1)
			}
		},
		components: {
			BookDetailView
		}
	}
</script>

<style lang="scss" scoped>
	.book-header {
		width: 100%;
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
</style>
