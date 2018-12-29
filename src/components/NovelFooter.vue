<template>
	<div class="footer">
		<div class="footer-wrapper">
			<div class="user-div">
				<span>
					<a href="" class="login">登陆</a>|
					<a href="" class="register">注册</a>
					<a href="" class="suggest">投诉建议</a>
					<div class="clearfix"></div>
				</span>
			</div>
			<div class="search-div">
				<input type="text" class="search" placeholder="请输入关键字" ref="bottomSearch">
				<span class="icon-search search-icon" @click="toClassifyDetail"></span>
				<div class="clearfix"></div>
			</div>
			<div class="client">
				<a href="">极速版</a>|
				<a href="">触屏版</a>|
				<a href="">电脑版</a>|
				<a href="">客户端</a>
			</div>
			<div class="copyright">
				<span>©版权归OrangeMiracle所有</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'NovelFooter',
		props: ['searchFlag', 'history'],
		data() {
			return {
				nowType: ''
			}
		},
		methods: {
			toClassifyDetail() {
				let key = this.$refs.bottomSearch.value
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
	.footer {
		width: 100%;
		height: 140px;
		background: RGB(245, 245, 245);

		.footer-wrapper {
			margin-left: 50%;
			transform: translateX(-50%);
			width: 90%;

			.user-div {
				padding: 20px 0 5px;
				width: 100%;

				&>span {
					display: inline-block;
					width: 100%;
					line-height: 16px;
					color: RGB(76, 76, 76);
					font-size: 14px;

					.login,
					.register,
					.suggest {
						padding: 3px 5px;
						color: RGB(76, 76, 76);
						font-size: 15px;
					}

					.register {
						margin-left: -3px;
					}

					.suggest {
						padding-top: 0px;
						float: right;
						font-size: 15px;
					}
				}
			}

			.search-div {
				margin-left: 50%;
				transform: translateX(-50%);
				width: 100%;

				.search {
					padding: 0 3px;
					width: 90%;
					border: 1px solid rgba(76, 76, 76, 0.4);
					height: 25px;
					float: left;
				}

				.search-icon {
					float: left;
					padding: 1px 5px 2px 4px;
					border-top-right-radius: 2px;
					border-bottom-right-radius: 2px;
					line-height: 25px;
					font-size: 16px;
					color: #aeaeae;
					background: RGB(216, 214, 215);
				}
			}

			.client {
				margin-top: 10px;
				margin-left: 50%;
				transform: translateX(-50%);
				width: 100%;
				font-size: 14px;
				color: RGB(76, 76, 76);

				&>a {
					padding: 3px 5px;
					color: RGB(76, 76, 76);
					font-size: 15px;
				}
			}

			.copyright {
				margin-top: 10px;
				margin-left: 50%;
				transform: translateX(-50%);
				width: 100%;

				&>span {
					font-size: 12px;
					color: rgb(136, 136, 136);
				}
			}
		}

	}
</style>
