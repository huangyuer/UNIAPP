const getters = {
	getName(state){
		return state.app.name
	},
	getToken(state){
		return state.user.token
	},
	getUser(state){
		return state.user.user
	}
}


export default getters