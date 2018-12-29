<template>
	<div class="search-header-view">
		<div class="search-wrapper">
			<div class="search-div">
				<input type="text" class="search" placeholder="请输入关键字" ref="searchVal" />
				<i class="icon-search search-icon" @click="toClassifyDetail"></i>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SearchHeader',
		props: ['searchFlag', 'history'],
		data() {
			return {
				nowType: ''
			}
		},
		methods: {
			toClassifyDetail() {
				let key = this.$refs.searchVal.value
				this.nowType = this.$route.query.type
				this.$emit('update:history', key)
				if (this.nowType !== 'search') {
					this.$router.push({
						name: 'BookClassify',
						query: {
							searchid: encodeURIComponent(key),
							type: 'search',
							major: '搜索结果'
						}
					})
				} else {
					this.$emit('update:searchid', encodeURIComponent(key))
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.search-header-view {
		height: 100%;
		width: 100%;
		// background: RGB(242, 242, 242);

		input::-webkit-input-placeholder {
			color: #c8c9d5;
			font-size: 14px;
			font-weight: 400;
		}

		input::-moz-placeholder {
			/* Mozilla Firefox 19+ */
			color: #c8c9d5;
			font-size: 14px;
			font-weight: 400;
		}

		input:-moz-placeholder {
			/* Mozilla Firefox 4 to 18 */
			color: #c8c9d5;
			font-size: 14px;
			font-weight: 400;
		}

		input:-ms-input-placeholder {
			/* Internet Explorer 10-11 */
			color: #c8c9d5;
			font-size: 14px;
			font-weight: 400;
		}

		.search-wrapper {
			width: 100%;
			background: RGB(242, 242, 242);
			border-bottom: 1px solid #e1e1e1;

			.search-div {
				display: flex;
				margin: 0 auto;
				padding: 27px 0;
				width: 94%;

				.search {
					padding: 0;
					padding-left: 10px;
					flex: 1;
					height: 30px;
					border: 1px solid #e1e1e1;
				}

				.search-icon {
					display: inline-block;
					flex: 0 0 30px;
					height: 30px;
					line-height: 30px;
					width: 30px;
					border: 1px solid #e1e1e1;
					border-left: 0;
					background: #ff4643;
					text-align: center;
					color: #FFFFFF;
				}
			}
		}

	}
</style>
