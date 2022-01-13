//每次调用 接口请求
// 会先调用这个函数
// 在这个函数中可以拿到我们给Ajax提供配置的对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url);

})