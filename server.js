var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
config.entry.app.unshift("webpack-dev-server/client?http://localhost:3002/", "webpack/hot/dev-server");
var path = require('path');
//启动服务
var server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
	// 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 express 提供 mock 数据。
    proxy: {
	    "/api/*": {
		    target: "http://localhost:3000",
		    secure: false
	    }
    },
    stats: {
        colors: true
    },
    hot: true,
    inline: true
});

//将其他路由，全部返回index.html
// server.app.get('*', function (req, res) {
//     res.sendFile(__dirname, '/build/');
// });

server.listen(3002, function () {
    console.log('open localhost:3002');
});
