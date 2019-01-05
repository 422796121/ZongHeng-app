<template>
	<div class="login-view">
		<account-header :state="state" :topTitle="title"></account-header>
		<div class="login-wrapper">
			<div class="login-top">
				<img src="../../assets/img/login_2.png" alt="logo">
			</div>
			<div class="login-content">
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
				<button class="next-btn">登陆</button>
				<div class="login-else">密码登陆</div>
			</div>
			<div class="login-bottom">
				<div class="bottom-text">
					<div class="text">
						<span>问题帮助</span>
						<span>旧版登陆</span>
					</div>
				</div>
				<div class="read">
					<span>登录注册表示同意<a href="#">用户协议</a>和<a href="#">法律声明</a></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import AccountHeader from './AccountHeader'
	export default {
		name: 'LoginView',
		data() {
			return {
				state: 1,
				title: '登陆'
			}
		},
		components: {
			AccountHeader
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.login-view {
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

		.login-wrapper {
			margin: 0 auto;
			height: 360px;
			width: 75%;

			.login-top {
				position: relative;
				margin: 0 auto;
				padding: 50px 0 40px;
				width: 60%;
				&>img{
					margin-left: 50%;
					transform: translateX(-50%);
					width: 50%;
				}
			}

			.login-content {
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
				.login-else{
					padding: 10px 0;
					text-align: right;
					font-size: 12px;
					color: #aab2bd;
				}
			}

			.login-bottom{
				margin: 12px 0;
				.bottom-text{
					width:100%;
					.text{
						margin: 0 auto;
						display: flex;
						width: 60%;
						&>span{
							flex: 1;
							text-align: center;
							color: #df3d3d;
							font-size: 16px;
						}
					}
				}
			
				.read{
					margin-top: 16px;
					&>span{
						display: inline-block;
						width: 100%;
						text-align: center;
						font-size: 12px;
						color: #aab2bd;
						&>a{
							padding: 0 2px;
							color: #aab2bd;
							text-decoration: underline;
						}
					}
				}
			
			}
		}
	}
</style>

