import apiJosn from "../api/index.js"
import baseUrl from "../common/config.js"
import store from "../store/index.js"
console.log(apiJosn)

function request(key, data, methods) {
	if (methods == "GET") {
		let {
			url,
			oauth,
			dataType,
			oauthFlag
		} = apiJosn.get[`${key}`]
		return uni.request({
			url: `${baseUrl}${url}`,
			data: data,
			method: methods,
			header: setHeader(dataType, oauth)
		})
	} else {
		let {
			url,
			oauth,
			dataType,
			oauthFlag
		} = apiJosn.post[`${key}`]
		return uni.request({
			url: `${baseUrl}${url}`,
			data: data,
			method: methods,
			header: setHeader(dataType, oauth)
		})
	}
}
// 自定义调用接口
//  url = 接口地址 methods = 调用方法  data = 参数 oauth = 是否带token
export function selfRequest(url, methods, data, oauth) {
	return new Promise((success, errot) => {
		uni.request({
			url: `${url}`,
			data: data,
			method: methods,
			header: setHeader("json", oauth)
		}).then(res => {
			let [error, data] = res
			if (data.statusCode == "200") {
				success(data.data)
			} else {
				err(data)
			}
		})
	})
}
// 设置请求头
function setHeader(dataType, oauth) {
	let header = {}
	if (oauth == true) {
		header.epToken = store.state.user.token
	}
	if (dataType == "json") {
		header["content-type"] = "application/json"
	}
	if (dataType == "form") {
		header["content-type"] = "application/x-www-form-urlencoded"
	}
	return header
}
// post 请求封装
export function post(key, data) {
	return new Promise((success, err) => {
		request(key, data, "POST").then(res => {
			let [error, data] = res
			console.log(data)
			if (data.statusCode == "200") {
				success(data.data)
			} else {
				err(data)
			}


		})

	})
}
// get 请求封装
export function get(key, data) {
	return new Promise((success, err) => {
		request(key, data, "GET").then(res => {
			let [error, data] = res
			if (data.statusCode == "200") {
				success(data.data)
			} else {
				err(data)
			}
		})

	})
}
