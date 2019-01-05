<template>
	<div class="register-view">
		<account-header :state="state" :topTitle="title"></account-header>
		<div class="register-wrapper">
			<div class="register-top">
				<div class="line"></div>
				<span><em class="first active">1</em></span>
				<span><em class="second">2</em></span>
				<span><em class="third">3</em></span>
			</div>
			<div class="register-content">
				<span class="tip">手机号将作为登录账号</span>
				<div class="phone-box">
					<input type="text" placeholder="请输入手机号">
					<span class="clear"></span>
				</div>
				<div class="mail-box">
					<input type="text" placeholder="请输入短信验证码" />
					<div class="mail-btn">
						<span class="btn">获取验证码</span>
					</div>
				</div>
				<div class="error-msg">错误</div>
				<button class="next-btn">下一步</button>
			</div>
		</div>
	</div>
</template>

<script>
	import AccountHeader from './AccountHeader'
	export default {
		name: 'RegisterView',
		data() {
			return {
				state: 2,
				title: '用户注册'
			}
		},
		components: {
			AccountHeader
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.register-view {
		width: 100%;
		height: 100%;

		input::-webkit-input-placeholder {
			color: #aaaaaa;
			font-size: 15px;
			font-weight: 400;
		}

		input::-moz-placeholder {
			/* Mozilla Firefox 19+ */
			color: #aaaaaa;
			font-size: 15px;
			font-weight: 400;
		}

		input:-moz-placeholder {
			/* Mozilla Firefox 4 to 18 */
			color: #aaaaaa;
			font-size: 15px;
			font-weight: 400;
		}

		input:-ms-input-placeholder {
			/* Internet Explorer 10-11 */
			color: #aaaaaa;
			font-size: 15px;
			font-weight: 400;
		}

		.register-wrapper {
			margin: 0 auto;
			height: 360px;
			width: 75%;

			.register-top {
				position: relative;
				padding: 25px 0 15px;
				display: flex;
				width: 100%;
				height: 30px;

				.line {
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					bottom: 0;
					margin: 0 auto;
					width: 80%;
					height: 40px;
					border-bottom: 1px solid #cccccc;
					z-index: 10;
				}

				&>span {
					position: relative;
					flex: 1;

					&>em {
						position: absolute;
						top: 0;
						display: inline-block;
						height: 30px;
						line-height: 30px;
						width: 30px;
						text-align: center;
						font-size: 14px;
						color: #ffffe0;
						background: #cccccc;
						border-radius: 50%;
						z-index: 20;

						&.active {
							background: #df3d3d;
						}
					}

					.first {
						left: 0;
					}

					.second {
						left: 50%;
						transform: translateX(-50%);
					}

					.third {
						right: 0;
					}

				}
			}

			.register-content {
				.tip {
					font-size: 12px;
					color: #aaaaaa;
				}

				.phone-box {
					margin-top: 15px;
					display: flex;
					border-bottom: 1px solid #e6e6e6;

					&>input {
						flex: 1;
						height: 55px;
						border: 0;
						padding: 0;
					}

					.clear {
						flex: 0 0 25px;
						height: 55px;
						width: 25px;
						background: url(../../assets/img/close.png) center center no-repeat;
						background-size: 70%;
					}
				}

				.mail-box {
					display: flex;
					border-bottom: 1px solid #e6e6e6;

					&>input {
						flex: 1;
						height: 55px;
						border: 0;
						padding: 0;
					}

					.mail-btn {
						flex: 0 0 110px;
						width: 100%;
						height: 55px;
						line-height: 55px;

						.btn {
							display: inline-block;
							width: 100%;
							height: 20px;
							line-height: 20px;
							font-size: 15px;
							text-align: center;
							color: #df3d3d;
							border-left: 2px solid #e6e6e6;
						}
					}
				}

				.error-msg {
					width: 100%;
					height: 40px;
					line-height: 40px;
					font-size: 13px;
					color: #df3d3d;
				}

				.next-btn {
					padding: 1px 0;
					width: 100%;
					height: 38px;
					border: 0;
					background: #df3d3d;
					border-radius: 3px;
					color: #f2f2f2;
				}
			}

		}
	}
</style>
