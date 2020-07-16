<template>
	<view class="card-class">
		<text class="display-block top">{{number}}</text>
		<text class="display-block bottom">{{content}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			number: {
				type: Number
			},
			content: {
				type: String
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.card-class {
		// width:;
		margin-top: 20rpx;
		width: 251rpx;
		height: 156rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 4rpx 20rpx 0px rgba(174, 185, 190, 0.7);
		border-radius: 10rpx;
		text-align: center;
		padding-top: 20rpx;
	}
	.top{
		// margin-top: 30rpx;
		font-size:46rpx;
		font-family:Source Han Sans CN;
		font-weight:500;
		color:rgba(206,39,49,1);
		
	}
	.bottom{
		margin-top: 20rpx;
		font-size:24rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(156,156,156,1);
	}
	.display-block {
		display: block;
		text-align: center;
	}
</style>
