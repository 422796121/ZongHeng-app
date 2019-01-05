<template>
	<div class="classify-view" ref="classify">
		<ul>
			<li>
				<novel-header></novel-header>
			</li>
			<li>
				<div class="classify-wrapper" v-for="(classify,index) in classifyMale" :key="index">
					<div class="title">
						<h2 @click="toClassifyDetail(classify.major)">{{classify.major}}</h2>
						<span>
							<i class="icon-menu-normal menu-icon"></i>
							<span @click="toClassifyDetail(classify.major,'')">查看全部</span>
						</span>
						<div class="clearfix"></div>
					</div>
					<div class="content">
						<div class="classify-item" v-for="(classifyMins,indexMins) in classify.mins" :key="indexMins + 'classify'" @click="toClassifyDetail(classify.major,classifyMins)">
							<span>{{classifyMins}}</span>
						</div>

						<div class="clearfix"></div>
					</div>
				</div>
			</li>
			<li>
				<novel-footer></novel-footer>
			</li>
		</ul>

	</div>
</template>

<script>
	import NovelHeader from './NovelHeader'
	import NovelFooter from '../NovelFooter'
	import BScroll from 'better-scroll'
	export default {
		name: 'ClassifyView',
		components: {
			NovelHeader,
			NovelFooter
		},
		data() {
			return {
				classifyScroll: null,
				classifyArr: [],
				classifyMale: []
			}
		},
		created() {
			this.$nextTick(() => {
				this.getClassifyData(this.classifyArr)
				this._initClassifyScroll()
			})
		},
		methods: {
			_initClassifyScroll() {
				if (!this.classifyScroll) {
					this.classifyScroll = new BScroll(this.$refs.classify, {
						click: true
					})
				} else {
					this.classifyScroll.refresh()
				}
			},
			getClassifyData(arr) {
				this.axios.get('/data/classify', {})
					.then(res => {
						res = res.data
						if (res.errno === 0) {
							arr.push(JSON.parse(res.data))
						}
						this.classifyMale = arr[0].male
					})
			},
			toClassifyDetail(major, mins) {
				this.$router.push({
					name: 'BookClassifyView',
					query: {
						major: major,
						mins: mins,
						type: 'classify'
					}
				})
			}

		}
	}
</script>

<style lang="scss" scoped="scoped">
	$borderColor: #dfdfdf;

	.classify-view {
		height: 100%;
		width: 100%;
		background: RGB(242, 242, 242);

		&>ul {
			margin: 0;
			padding: 0;
			list-style: none;
		}

		.classify-wrapper {
			width: 98%;
			margin: 0 auto;
			margin-top: 15px;
			overflow: hidden;
			background: #FFFFFF;

			.title {
				margin-top: 8px;
				padding: 3px 0;
				height: 30px;
				font-size: 14px;

				&>h2 {
					display: inline-block;
					margin-left: 8px;
					padding-left: 8px;
					height: 17px;
					line-height: 17px;
					border-left: 7px solid RGB(94, 94, 94);
					border-radius: 2px;
					font-weight: 600;
				}

				&>span {
					float: right;
					margin-right: 8px;

					&>span {
						display: inline-block;
						height: 17px;
						font-size: 14px;

					}

					.menu-icon {
						vertical-align: middle;
						font-size: 14px;
					}
				}
			}

			.content {
				width: 100%;
				font-size: 14px;
				color: #888;

				.classify-item {
					display: inline-block;
					float: left;
					width: 25%;
					height: 41px;
					line-height: 41px;
					border-bottom: 1px solid $borderColor;

					&>span {
						display: inline-block;
						line-height: 14px;
						border-right: 1px solid $borderColor;
						width: 100%;
						text-align: center;
					}
				}
			}

		}

	}

</style>
