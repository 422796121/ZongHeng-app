<template>
	<div class="clickbar-view" v-show="menu" @click="hideBar">
		<div class="bar-header">
			<div class="header-wrapper">
				<span class="back" @click="backPage"><i class="icon-left back-icon"></i>返回</span>
				<span class="space"></span>
				<span class="shelf"><i class="icon-shelf shelf-icon"></i></span>
				<span class="comm"><i class="icon-comm comm-icon"></i></span>
			</div>
		</div>
		<div class="bar-menu" @click="toChapter(getId,'本书详情')">
			<i class="icon-menu"></i>
			<span>目录</span>
		</div>
		<div class="bar-bottom">
			<div class="bar-prev" @click="deleIndex"><i class="icon-prev"></i><span>上一页</span></div>
			<div class="bar-font"><i class="icon-font"></i><span>字体</span></div>
			<div class="bar-night"><i class="icon-night"></i><span>夜间</span></div>
			<div class="bar-bg"><i class="icon-bg"></i><span>背景</span></div>
			<div class="bar-bar" @click="addIndex"><i class="icon-next"></i><span>下一页</span></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ClickBar',
		props: ['menu', 'chapterlist', 'chapterindex', 'getId'],
		data() {
			return {}
		},
		methods: {
			hideBar() {
				this.$emit('update:menu', !this.menu)
			},
			backPage() {
				this.$router.go(-1)
			},
			addIndex() {
				if (this.chapterindex >= this.chapterlist.length) {
					this.$emit('update:chapterindex', this.chapterlist.length)
				} else {
					this.$emit('update:chapterindex', this.chapterindex + 1)
				}
			},
			deleIndex() {
				if (this.chapterindex <= 0) {
					this.$emit('update:chapterindex', 0)
				} else {
					this.$emit('update:chapterindex', this.chapterindex - 1)
				}
			},
			toChapter(chapterId, name) {
				this.$router.push({
					name: 'BookChapterView',
					params: {
						chapterid: chapterId,
						topTitle: name
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.clickbar-view {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 100%;
		z-index: 50;

		.bar-header {
			height: 44px;
			background: RGB(51, 51, 51);

			.header-wrapper {
				display: flex;
				color: #fff;
				line-height: 44px;
				text-align: center;

				.back {
					padding: 0 5px;
					font-size: 14px;

					&>.back-icon {
						font-size: 20px;
						vertical-align: text-bottom;
					}
				}

				.space {
					flex: 1;

				}

				.shelf {
					width: 54px;
					font-size: 14px;

					.shelf-icon {
						font-size: 20px;
						vertical-align: text-top;
					}
				}

				.comm {
					width: 54px;
					font-size: 14px;

					.comm-icon {
						font-size: 17px;
						vertical-align: text-bottom;
					}
				}
			}
		}

		.bar-menu {
			position: absolute;
			top: 50%;
			left: -20px;
			transform: translateY(-50%);
			height: 60px;
			width: 60px;
			background: RGB(51, 51, 51);
			color: #fff;
			border-radius: 4px;

			.icon-menu {
				padding: 7px 0;
				display: inline-block;
				float: right;
				text-align: center;
				width: 40px;
				font-size: 26px
			}

			&>span {
				width: 40px;
				float: right;
				font-size: 13px;
				text-align: center;
			}
		}

		.bar-bottom {
			display: flex;
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 44px;
			color: #fff;
			background: RGB(51, 51, 51);

			&>div {
				width: 20%;
				z-index: 300;

				&>span {
					display: inline-block;
					width: 100%;
					text-align: center;
					font-size: 13px;
				}

				&>i {
					padding: 5px 0;
					display: inline-block;
					width: 100%;
					text-align: center;
					font-size: 16px;
					vertical-align: bottom;
				}
			}
		}
	}
</style>
