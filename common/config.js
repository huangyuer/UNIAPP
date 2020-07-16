let baseUrl = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    baseUrl = 'http://192.168.130.121:9002/lgxpq-portal'
}else{
    // 生产环境
    baseUrl = 'https://*****.com/'
}

export default baseUrl