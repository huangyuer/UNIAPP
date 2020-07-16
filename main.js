import Vue from 'vue'
import App from './App'
import store from './store'
import{ post,get }from "./base/request.js"
import uView from "uview-ui";
Vue.use(uView);
console.log(post)
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,store
})
app.$mount()
