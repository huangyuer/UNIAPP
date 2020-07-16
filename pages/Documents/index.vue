<template>
	<div class='box'>
		<SearchRecords @determine='determine'></SearchRecords>
		<div class='main'>
			<div class='NoData' v-if='data.length<1'>
				<image src="../../static/NoData.png" mode="" class="image"></image>
				<p>暂无单证记录</p>
			</div>
			<u-time-line>
				<block v-for="(item,index) in data" :key='index'>
					<u-time-line-item v-if="item.createTime">
						<template v-slot:node>
							<view class="u-node" style="background: #1296db;">
								<u-icon name="checkmark" color="#fff" :size="24"></u-icon>
							</view>
						</template>
						<template v-slot:content>
							<view class="conbox">
								<view class="u-order-title">{{item.statusName}}</view>
								<view class="u-order-desc"></view>
								<view class="u-order-time">{{item.createTime}}</view>
							</view>
						</template>

					</u-time-line-item>
					<u-time-line-item v-else>
						<template v-slot:node>
							<view class="u-node" style="background: #bfbfbf">
								<u-icon name="checkmark" color="#fff" :size="24"></u-icon>
							</view>
						</template>
						<template v-slot:content>
							<view class="conbox">
								<view class="u-order-title">{{item.statusName}}</view>
								<view class="u-order-time"> </view>
							</view>
						</template>
					</u-time-line-item>
				</block>
			</u-time-line>
		</div>
	</div>
</template>

<script>
	import SearchRecords from '../../framework/components/SearchRecords/index.vue'

	export default {
		components: {
			SearchRecords
		},
		data() {
			return {
				keyword: '',
				data: []
			}
		},
		methods: {
			determine(keyword) {
				this.$post("billDirBscQueryNewStatus", {
					orderNo: keyword
				}).then(res => {
					this.data = res.data.map && res.data.map.data || []
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	// .box{
	// 	width: 100%;
	// 	box-sizing: border-box;
	// }
	.NoData {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		margin-top: 100rpx;

		.image {
			width: 306rpx;
			height: 200rpx;
		}

		p {
			margin-top: 30rpx;
			color: #666;
		}
	}

	.search {
		display: flex;
		flex-direction: column-reverse;
		padding: 10rpx 10rpx;
		padding-bottom: 20rpx;
		box-sizing: border-box;
		width: 100%;
		height: 350rpx;
		background: url(../../static/enterprise.jpg) 100% 100% no-repeat;
		color: #FFFFFF !important;

		div {
			width: 100%;
		}
	}

	.main {
		padding: 40rpx 60rpx;
		box-sizing: border-box;
	}

	.conbox {
		margin-bottom: 25rpx;
	}

	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}

	.u-order-title {
		height: 60rpx;
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}

	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}

	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
</style>
