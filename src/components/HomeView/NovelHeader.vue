<template>
	<div class="view" ref="home">
		<div class="top">
			<div class="header">
				<div class="img-wrapper">
					<img src="../../assets/img/logo.png" width="150" height="28">
				</div>
				<div class="link-wrapper">
					<div class="link-header">
						<router-link to="/book/search" class="link-search"><i class="icon-search searchIcon"></i></router-link>
						<router-link to="/" class="link-new">客户端<em>new</em></router-link>
					</div>
				</div>
			</div>
			<div class="tab">
				<div class="tab-item">
					<router-link to="/">首页</router-link>
				</div>
				<div class="tab-item">
					<router-link to="/classify">分类</router-link>
				</div>
				<div class="tab-item">
					<router-link to="/rank">排行</router-link>
				</div>
				<div class="tab-item">
					<router-link to="/account">书架</router-link>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		name: 'NovelHeader',
		data() {
			return {}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.view {
		width: 100%;
		height: 100%;

		.top {
			width: 100%;

			.header {
				display: flex;
				width: 100%;

				.img-wrapper {
					flex: 0 0 150px;
					margin: 8px 10px;
					width: 150px;
					height: 28px;
				}

				.link-wrapper {
					flex: 1;
					position: relative;

					.link-header {
						position: absolute;
						top: 0;
						right: 10px;
						display: inline-block;
						height: 44px;

						&>a {
							line-height: 44px;
						}

						.link-search {
							.searchIcon {
								line-height: 25px;
								font-size: 16px;
								color: #b7b7b7;
								vertical-align: text-top;
							}
						}

						.link-new {
							margin-left: 5px;
							padding-left: 10px;
							border-left: 1px solid rgba(179, 179, 179, 0.5);
							position: relative;
							color: #000;
							font-size: 15px;

							&>em {
								position: absolute;
								right: -6px;
								top: -6px;
								line-height: 14px;
								font-size: 12px;
								font-weight: 200;
								color: RGB(255, 255, 225);
								background: RGB(255, 70, 68);
								border-radius: 4px;
							}
						}
					}
				}
			}

			.tab {
				display: flex;
				width: 100%;
				height: 40px;
				background: RGB(51, 51, 51);

				.tab-item {
					flex: 1;
					height: 40px;

					&>a {
						display: inline-block;
						width: 100%;
						height: 40px;
						line-height: 40px;
						text-align: center;
						color: RGB(161, 161, 161);
					}

					&>.active {
						color: RGB(237, 237, 237);
						background: RGB(69, 69, 69);
					}
				}
			}
		}

	}
</style>
