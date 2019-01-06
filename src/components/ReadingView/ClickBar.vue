<template>
	<div class="clickbar-view" v-show="menu" @click="hideBar">
		<transition name="top">
			<div class="bar-header" :class="night? 'benight' : ''" v-show="menu">
				<div class="header-wrapper">
					<span class="back" @click="backPage"><i class="icon-left back-icon"></i>返回</span>
					<span class="space"></span>
					<span class="shelf" @click="$router.push({path:'/account'})"><i class="icon-shelf shelf-icon"></i></span>
					<span class="comm"><i class="icon-comm comm-icon"></i></span>
				</div>
			</div>
		</transition>
		<transition name="middle">
			<div class="bar-menu" @click="toChapter(getId,chapterlist.length)" :class="night? 'benight' : ''" v-show="menu">
				<i class="icon-menu"></i>
				<span>目录</span>
			</div>
		</transition>

		<transition name="bottom">
			<div class="bar-bottom" :class="night? 'benight' : ''" v-show="menu">
				<div class="bar-prev" @click="deleIndex"><i class="icon-prev"></i><span>上一页</span></div>
				<div class="bar-font" @click="changeState($event,!font,bg)">
					<div class="wrapper" v-show="font">
						<div class="wrapper-font">
							<div class="dele" @click="deleFont">
								<span><i></i></span>
							</div>
							<div class="add" @click="addFont">
								<span><i></i></span>
							</div>
						</div>
						<div class="tri">
							<div>
								<div class="font-tri"></div>
							</div>
						</div>
					</div>
					<i class="icon-font"></i><span>字体</span>
				</div>
				<div class="bar-night" @click="changeNight" v-if="!night"><i class="icon-night"></i><span>夜间</span></div>
				<div class="bar-night" @click="changeNight" v-else><i class="icon-night"></i><span>白天</span></div>
				<div class="bar-bg" @click="changeState($event,font,!bg)">
					<div class="wrapper" v-show="bg">
						<div class="wrapper-bg">
							<div class="bg-color" v-for="(col,index) in bgcolor" :key="index" @click="changeBg(index)">
								<span :style="{backgroundColor: col.color}"></span>
								<div>{{col.name}}</div>
							</div>
						</div>
						<div class="tri">
							<div>
								<div class="bg-tri"></div>
							</div>
							<div class="clearfix"></div>
						</div>
					</div>
					<i class="icon-bg"></i><span>背景</span>
				</div>
				<div class="bar-bar" @click="addIndex"><i class="icon-next"></i><span>下一页</span></div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: 'ClickBar',
		props: ['menu', 'chapterlist', 'chapterindex', 'getId', 'detialId', 'night', 'tool', 'pfont', 'hfont', 'bgcolor',
			'bgindex'
		],
		data() {
			return {
				font: false,
				bg: false
			}
		},
		methods: {
			hideBar() {
				if (this.font !== true) {
					this.$emit('update:menu', !this.menu)
				}
			},
			backPage() {
				this.$router.push({
					path: '/book/detail',
					query: {
						detailId: this.detialId,
						topTitle: '本书详情'
					}
				})
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
					query: {
						chapterid: chapterId,
						topTitle: `目录(共${name}章)`,
						detialId: this.detialId
					}
				})
			},
			changeNight() {
				this.$emit('update:night', !this.night)
			},
			changeState(e, f, b) {
				this.font = f
				this.bg = b
				e.cancelBubble = true
			},
			addFont(e) {
				this.$emit('update:pfont', this.pfont + 1)
				this.$emit('update:hfont', this.hfont + 1)
				e.cancelBubble = true
			},
			deleFont(e) {
				if (this.pfont <= 0) {
					this.$emit('update:pfont', 0)
					this.$emit('update:hfont', 2)
				} else {
					this.$emit('update:pfont', this.pfont - 1)
					this.$emit('update:hfont', this.hfont - 1)
				}
				e.cancelBubble = true
			},
			changeBg(index) {
				this.$emit('update:bgindex', index)
			}
		},
		watch: {
			tool(val) {
				if (val === false) {
					this.font = false
					this.bg = false
				}
			},
			font(val) {
				if (val === true) {
					this.$emit('update:tool', true)
					this.bg = false
				}
			},
			bg(val) {
				if (val === true) {
					this.$emit('update:tool', true)
					this.font = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.clickbar-view {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		height: 100%;
		z-index: 50;

		.benight {
			background: #181914 !important;
		}

		.bar-header {
			height: 44px;
			background: RGB(51, 51, 51);

			&.top-enter,
			&.top-leave-to {
				opacity: 0;
				transform: translateY(-44px);
			}

			&.top-enter-active,
			&.top-leave-active {
				transition: .5s all linear;
			}

			&.top-enter-to,
			&.top-leave {
				opacity: 1;
				transform: translateY(0px);
			}

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

			&.middle-enter,
			&.middle-leave-to {
				opacity: 0;
			}

			&.middle-enter-active,
			&.middle-leave-active {
				transition: .5s all linear;
			}

			&.middle-enter-to,
			&.middle-leave {
				opacity: 1;
			}

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

			&.bottom-enter,
			&.bottom-leave-to {
				opacity: 0;
				transform: translateY(44px);
			}

			&.bottom-enter-active,
			&.bottom-leave-active {
				transition: .5s all linear;
			}

			&.bottom-enter-to,
			&.bottom-leave {
				opacity: 1;
				transform: translateY(0px);
			}

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

			.bar-font,
			.bar-bg {
				position: relative;

				.wrapper {
					position: absolute;
					top: -79px;
					height: 79px;
					z-index: 999;
				}
			}

			.bar-font {
				.wrapper {
					left: -50%;

					.wrapper-font {
						display: flex;
						height: 65px;
						width: 300px;
						background: #8e949d;
						border-radius: 4px;
						border: 1px solid #656b74;

						.dele,
						.add {
							position: relative;
							width: 50%;

							&>span {
								position: absolute;
								left: 50%;
								top: 50%;
								transform: translateY(-50%) translateX(-50%);
								margin: 0 auto;
								display: inline-block;
								width: 85%;
								height: 32px;
								border: 1px solid #656b74;
								background: #f6f6f6;
								border-radius: 4px;
							}
						}

						.add {
							&>span {
								background: url(../../assets/img/fontadd.png) center center no-repeat;
								background-size: 32px 32px;
								background-color: #fff;
							}
						}

						.dele {
							&>span {
								background: url(../../assets/img/fontdele.png) center center no-repeat;
								background-size: 32px 32px;
								background-color: #fff;
							}
						}
					}

					.tri {
						height: 13px;

						&>div {
							position: relative;
							width: 50%;
							height: 13px;

							.font-tri {
								position: absolute;
								left: 50%;
								bottom: 0;
								transform: translateX(-50%);
								height: 0;
								width: 0;
								border-left: 10px solid transparent;
								border-right: 10px solid transparent;
								border-top: 14px solid #8e949d;
							}
						}

					}
				}
			}

			.bar-bg {
				.wrapper {
					right: -50%;
					top: -93px;

					.wrapper-bg {
						display: flex;
						height: 79px;
						width: 300px;
						background: #8e949d;
						border-radius: 4px;
						border: 1px solid #656b74;

						.bg-color {
							flex: 1;

							&>span {
								margin-top: 12px;
								margin-bottom: 7px;
								margin-left: 50%;
								transform: translateX(-50%);
								display: inline-block;
								height: 38px;
								width: 38px;
								border: 1px solid #ffffff;
							}

							&>div {
								text-align: center;
								font-size: 13px;
							}
						}
					}

					.tri {
						height: 13px;

						&>div {
							position: relative;
							width: 50%;
							height: 13px;
							float: right;

							.bg-tri {
								position: absolute;
								left: 50%;
								bottom: 0;
								transform: translateX(-50%);
								height: 0;
								width: 0;
								border-left: 10px solid transparent;
								border-right: 10px solid transparent;
								border-top: 14px solid #8e949d;
							}
						}

					}
				}
			}
		}
	}
</style>
