<template>
	<view class="active">
		<!-- shouye3333 -->
		<view class="">

			<u-swiper :list="list" :height="380" border-radius='0'></u-swiper>
		</view>
		<view class="title-left">
			<view class="left-icon">

			</view>
			<view class="right-word">
				业务汇总
			</view>
		</view>

		<view class="main-number-list">
			<cards v-for="(item,index) in numberList" :key="index" :number="item.number" :content="item.content">
			</cards>
		</view>
	</view>
</template>

<script>
	import cards from "./card.vue"
	export default {
		components: {
			cards
		},
		data() {
			return {
				numberList: [
					{
						number: 3000,
						content: "进境径予放行"
					}, {
						number: 10099,
						content: "出境径予放行"
					}, {
						number: 12666,
						content: "进出区提发货凭证"
					}, {
						number: 555,
						content: "卡口验放凭证"
					}, {
						number: 143,
						content: "进出境货物汇总统计"
					},
					{
						number: 300,
						content: "进出库确认"
					}
				],
				list: [{
					image: "/static/enterprise.jpg"
				}, {
					image: "/static/enterprise.jpg"
				}, {
					image: "/static/enterprise.jpg"
				}]
			}
		},
		onLaunch() {

		},
		onLoad() {
			// this.wxIndexBusi().then(res => {
			// 	 console.log('777',res.numberList)
			// 	 this.numberList = res.numberList
			// })
		},
		mounted() {

		},
		methods: {
			// wxIndexBusi(){
			// 	   return this.$post("wxIndexBusi", {

			// 	   })
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.main-number-list {
		padding: 0 50rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;

	}

	.home-top {
		height: 380rpx;
		width: 100%;
	}

	.title-left {
		display: flex;
		margin-top: 40rpx;
		margin-left: 30rpx;
	}

	.right-word {
		height: 40rpx;
		line-height: 40rpx;
		margin-left: 20rpx;
		font-size: 32rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: rgba(18, 18, 18, 1);
	}

	.left-icon {
		width: 8rpx;
		height: 40rpx;
		border-top-left-radius: 8rpx;
		border-top-right-radius: 8rpx;
		border-bottom-left-radius: 8rpx;
		border-bottom-right-radius: 8rpx;
		background-color: #1296db;
	}
	
</style>
