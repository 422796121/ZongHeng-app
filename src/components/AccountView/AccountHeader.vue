<template>
	<div class="account-detail-home">
		<div class="account-header">
			<div class="header-wrapper">
				<span class="back" @click="backPage"><i class="icon-left back-icon"></i>返回</span>
				<span class="title">{{topTitle}}</span>
				<span class="login" v-if="state==1" @click="toElse(state)"><i class="shelf-icon icon-login"></i>注册</span>
				<span class="register" v-else-if="state==2" @click="toElse(state)"><i class="shelf-icon icon-register"></i>登陆</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'AccountHeader',
		props: ['topTitle', 'state'],
		methods: {
			backPage() {
				this.$router.push({
					path: '/'
				})
			},
			toElse(state) {
				if (state === 1) {
					this.$router.push({
						path: '/register'
					})
				} else if (state === 2) {
					this.$router.push({
						path: '/login'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.account-detail-home {
		width: 100%;

		.account-header {
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
					font-size: 18px;
					font-weight: bold;
				}

				.login,
				.register {
					padding-right: 10px;
					font-size: 14px;

					.shelf-icon {
						padding: 2px 3px 0;
						display: inline-block;
						width: 20px;
						height: 20px;
						font-size: 20px;
						vertical-align: text-top;
					}
					.icon-register{
						background: url(../../assets/img/register.png) center center no-repeat;
						background-size: 16px;
					}
					.icon-login{
						background: url(../../assets/img/login.png) center center no-repeat;
						background-size: 16px;
					}
				}
				
			}
		}

	}
</style>
