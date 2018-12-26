<template>
	<div class="click-div" :class="first? '' : 'hiddebar'">
		<div class="left-click" @click="scrollMove('top')"><span class="guide">上一页</span></div>
		<div class="middle-click" @click="menuShow"><span class="guide">菜单</span></div>
		<div class="right-click" @click="scrollMove('bottom')"><span class="guide">下一页</span></div>
	</div>
</template>

<script>
	export default {
		name: 'ClickShow',
		props: ['first', 'menu'],
		data() {
			return {
				move: ''
			}
		},
		methods: {
			scrollMove(which) {
				if (this.first === true) {
					this.$emit('update:first', false)
					return
				}
				this.move = which
				this.$emit('movescroll', this.move)
				this.move = ''
			},
			menuShow() {
				if (this.first === true) {
					this.$emit('update:first', false)
					return
				}
				this.$emit('update:menu', !this.menu)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.click-div {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 100;

		&.hiddebar {
			opacity: 0;
			background: rgba(0, 0, 0, 0);
		}

		.left-click,
		.right-click {
			width: 20%;
			height: 100%;
		}

		.middle-click {
			width: 60%;
			height: 100%;
		}

		.guide {
			margin: 300px auto;
			display: inline-block;
			width: 100%;
			text-align: center;
			font-size: 20px;
			color: #FFFFFF;
		}
	}
</style>
