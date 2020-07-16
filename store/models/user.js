const user = {
	state: {
		user: "",
		code:"",
		token:""
		
	},
	mutations: {
		SETUSERINFO(state, val) {
			state.user = val
		},
		SETCODE(state, val) {
			state.code = val
		},
		SETTOKEN(state,val){
			state.token = val
		}
	},
	actions: {
		getUserInfo(content, option) {
			return new Promise((success,error)=>{
				var that = option
				uni.getUserInfo({
					provider: 'weixin',
					success: function(result) {
						console.log(result)
						uni.login({
							success: function(res) {
								content.commit("SETCODE",res.code)
								success(res)
							}
						})
					},
					fail:function(err){
						error(err)
					}
				});
			})
			
		},
		getUserToken(content,option){
			console.log("0000")
			let {token,user} = option
			content.commit("SETTOKEN",token)
			content.commit("SETUSERINFO",user)
		}
	}
}

export default user
