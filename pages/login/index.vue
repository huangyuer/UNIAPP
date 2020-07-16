<template>
	<view class="">
		<view class="min-ban">
			<image src="../../static/login-img/logo.png" class="logo-s" mode=""></image>
		</view>
		<view class="" style="text-align: center;">
			<text class="min-top">单证跟踪系统</text>
			<br>
			<text class="min-login">欢迎登录</text>
		</view>
		<view class="form-main">
			<view class="one-input">
				<text class="left-label">用户名</text>
				<input type="text" class="input-style" v-model="form.username" />
				<view class="main-tips" v-show="usernameshow">
					<text>{{textcontent}}</text>
				</view>
			</view>
			<view class="one-input password">
				<text class="left-label">登录密码</text>
				<input   class="input-style" :password="istype" v-model="form.password" />
				<view class="main-tips" v-show="passwordshow">
					<text>{{passwordcontent}}</text>
				</view>
				<view class="icon-s">

					<u-icon size="45" @click="iconbtn(1)" v-if="showindex==2" name="eye-off"></u-icon>
					<u-icon size="45" @click="iconbtn(2)" v-if="showindex==1" name="eye-fill"></u-icon>
				</view>
			</view>
			<!-- <view class="one-input password">
				<text class="left-label">验证码</text>
				<view class="main-tips" v-show="yzmshow">
					<text>{{yzmcontent}}</text>
				</view>
				<input type="text" class="input-style" v-model="form.yzm" />
					 <img class="yzm" :src="'http://192.168.118.129/epoa/jcaptcha?_' + timmer" alt="验证码" @click="loadYzm">

			</view> -->
		</view>
		<view class="" style="margin-top: 80rpx;">
			<u-button :custom-style="customStyle" @click="submit">登录</u-button>
		</view>
		<!-- <button type="primary" class="reserve-btn" open-type="getUserInfo" @getuserinfo="getuserinfo">我知道了</button> -->
		<view class="pop" v-if="modelFlag">
			<view class="pop-main">
				<i class="iconfont cancel" @click="cancel">&#xe614;</i>
				<view class="pop-title">需要您的授权</view>
				<view class="pop-text">
					<view>为了提供更好的服务</view>
					<view>请在稍后的提示框中点击允许</view>
				</view>

				<button type="primary" class="reserve-btn" open-type="getUserInfo" @getuserinfo="getuserinfo">我知道了</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		jCryptionKeyPair,
		encrypt
	} from "../../common/jcryption.js"
	import settings from "../../common/settings"
	export default {
		data() {
			return {
				timmer: new Date().getTime(),
				customStyle: {
					width: '590rpx',
					height: '84rpx',
					background: 'linear-gradient(90deg,rgba(255,90,108,1),rgba(206,39,49,1))',
					boxShadow: '0rpx 4rpx 24rpx 0rpx rgba(255,78,96,0.39)',
					borderRadius: '40rpx',
					margin: "0 auto",
					color: "rgba(255,255,255,1)"
				},
				form: {
					// username: "ecstest",
					// password: "ecs111",
					username: "",
					password: ""
				},
				showindex: 1,
				istype:true,
				usernameshow: false,
				passwordshow: false,
				yzmshow: false,
				textcontent: "",
				passwordcontent: "",
				yzmcontent: "",
				modelFlag: false
			}
		},
		onLoad() {

		},
		mounted() {
			uni.getStorage({
				key: 'user',
				success: (res) => {
					this.form.username = res.data.id
					this.form.password = res.data.password
				}
			})
		},
		methods: {
			cancel() {
				this.modelFlag = false
			},
			loginUser() {
				return this.$post("binduser", {
					code: this.$store.state.user.code,
					...this.form
				})
			},
			isouath(code) {
				return this.$post("wxlogin", {
					code
				})
			},
			getuserinfo() {

				this.$store.dispatch("getUserInfo", this).then(res => {

					this.modelFlag = false
					uni.showLoading({
						title: "加载中"
					})
					this.isouath(res.code).then(ress => {
						this.$store.dispatch("getUserToken", ress)
						uni.switchTab({
							url: '/pages/home/index'
						});
						uni.hideLoading()
						uni.showToast({
							title: '登陆成功',
							duration: 2000
						});
					}).catch((err) => {
						uni.showToast({
							title: '认证失败，请登录',
							duration: 2000
						});
					})
				})


			},

			submit() {
				if (this.form.username == "") {
					this.usernameshow = true
					this.textcontent = "用户名不能为空"
					return
				} else {
					this.usernameshow = false
				}
				if (this.form.password == "") {
					this.passwordshow = true
					this.passwordcontent = "密码不能为空"
					return
				} else {
					this.passwordshow = false
				}

				if (this.passwordshow || this.usernameshow) {
					return
				}
				uni.showLoading({
					title: "登陆中"
				})
				// 获取token
				this.$post("loginUser", {
					id: this.form.username,
					password: this.form.password
				}).then(res => {
					console.log(res)
					if (res.flag == "T") {
						uni.showToast({
							title: "登陆成功",
							duration: 2000
						})
						uni.setStorage({
							key: 'user',
							data: {
								id: this.form.username,
								password: this.form.password
							}
						});
						this.$store.dispatch("getUserToken", {
							token: res.data.refreshToken
						})
						uni.hideLoading()
						uni.switchTab({
							url: '../home/index'
						});
					} else {
						uni.hideLoading()
						uni.showToast({
							icon: 'fail',
							title: "登陆失败",
							duration: 2000
						})
					}

				})


			},
			iconbtn(index) {
				this.showindex = index
				if (index == 1) {
					this.istype = true
				} else {
					this.istype = false
				}
			},
			loadYzm() {
				this.timmer = new Date().getTime()
			},
		}
	}
</script>

<style scoped lang="scss">
	.pop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .3);
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.pop-main {
		width: 690upx;
		height: 800upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 14px;
		padding: 64upx 0upx 40upx 0upx;
	}

	/* 删除按钮 */
	.cancel {
		position: absolute;
		top: 20upx;
		right: 20upx;
		font-size: 20px;
	}

	.pop-title {
		padding-bottom: 40upx;
		width: 100%;
		border-bottom: 1px solid #BFBFBF;
		font-size: 16px;
		letter-spacing: 2px;
		text-align: center;
	}

	.pop-imgsize {
		width: 484upx;
		height: 406upx;
	}

	.pop-text {
		width: 75%;
		text-align: center;
		font-size: 15px;
		margin: 30upx 0upx;
		letter-spacing: 1px;
	}

	button {
		// background-color: #08BF00;
		color: #FFFFFF;
		text-align: center;
		height: 88upx;
		line-height: 88upx;
		font-size: 14px;
		border-radius: 50upx;
		width: 78%;
	}

	.min-ban {
		width: 150rpx;
		height: 150rpx;
		background-color: #EF4959;
		border-radius: 50%;
		margin: 0 auto;
		margin-top: 100rpx;
	}

	.logo-s {
		width: 100rpx;
		height: 100rpx;
		margin-left: 25rpx;
		margin-top: 25rpx;
	}

	.min-top {
		font-size: 56rpx;
		margin-top: 15rpx;
		color: #333333;
	}

	.min-login {
		margin-top: 15rpx;
		color: #999999;
		font-size: 28rpx;
	}

	.one-input {
		width: 590rpx;
		height: 84rpx;
		margin: 0 auto;
		border: 2px solid rgba(235, 235, 235, 1);
		border-radius: 40px;
		display: flex;
		position: relative;
	}

	.icon-s {
		position: absolute;
		right: 30rpx;
		bottom: 15rpx;
		color: #EBEBEB;
	}

	.input-style {
		display: inline-block;
		font-size: 28rpx;
		margin-left: 15rpx;
		width: 350rpx;
		height: 84rpx;
		color: #D1D1D1;
		cursor: pointer;
	}

	.left-label {
		display: inline-block;
		margin-left: 20rpx;
		width: 130rpx;
		height: 84rpx;
		font-size: 30rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;

		color: rgba(153, 153, 153, 1);
		line-height: 84rpx;
	}

	.form-main {
		margin-top: 120rpx;
	}

	.main-tips {
		position: absolute;
		color: #CE2731;
		font-size: 22rpx;
		right: 20rpx;
		bottom: -50rpx;
	}

	.password {
		margin-top: 60rpx;
	}

	.yzm {
		height: 100%;
		width: 122rpx;
		position: absolute;
		right: 30rpx;
		bottom: 0rpx;

	}
</style>
