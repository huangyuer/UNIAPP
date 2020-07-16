<template>
	<view class="ani-my">
		<!-- <u-navbar back-text="返回" title="剑未配妥，出门已是江湖"></u-navbar> -->
		<view class="my-top">
			<view class="my-title-user">
				<view class="po-my">
					<view class="user-logo">
						<div class='logo-top'>
							<open-data type="userAvatarUrl"></open-data>
						</div>
						<open-data type="userNickName"></open-data>
						<!-- <image class="logo-top" src="../../static/login-img/home-top.png" mode=""></image> -->
						<!-- <text style="display: block;text-align: center;color: #000000;font-size: 30rpx;">word</text> -->
						<!-- <text style="display: block;text-align: center;font-size: 26rpx;color: #666666;margin-top: 10rpx;">15803891465</text> -->
					</view>
				</view>

			</view>
		</view>
		<view class="cell-my">
			<!-- <u-cell-group> -->
				<!-- <u-cell-item  title="我的审批" value="100条">
						<u-icon slot="icon" size="35" color="#EC4844" name="account-fill"></u-icon>
					</u-cell-item> -->
				<!-- <u-cell-item icon="integral-fill" title="会员等级" value="1"></u-cell-item> -->
			<!-- </u-cell-group> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		}
	}
</script>
<style lang="scss">
	.cell-my {
		.u-cell_title {
			margin-left: 20rpx;
		}
	}
</style>
<style lang="scss" scoped>
	.cell-my {
		margin-top: 100rpx;
	}

	.my-top {
		position: relative;
		height: 350rpx;
		// background: linear-gradient(-63deg, rgba(255, 122, 110, 1), rgba(206, 39, 49, 1));
		
		background: url(../../static/enterprise.jpg) 100% 100% no-repeat;
	}

	.my-title-user {
		position: absolute;
		width: 670rpx;
		height: 202rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 1px 6px 29px 0px rgba(0, 0, 0, 0.16);
		border-radius: 10px;
		top: 250rpx;
		left: 42rpx;
		z-index: 500;
	}

	.po-my {
		position: absolute;
		left: 256rpx;
		top: -80rpx;
	}

	.user-logo {
		text-align: center;
	}

	.logo-top {
		width: 156rpx;
		height: 156rpx;
		border-radius: 50%;
		overflow: hidden;
		border: 1px solid #C0C4CC;
	}
</style>
