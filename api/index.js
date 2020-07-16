import user from "./user.json"


let requestList = {
	timeout:10000,
	post:{
		...user["post"],
	},
	get:{
		...user["get"],
	}
}


export default requestList;