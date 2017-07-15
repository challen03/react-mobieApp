# react-mobieApp

## this is react-mobie-app, which uses react, redux, immutableJs and so on. It wil lead you to the brand new react world.

> webpack.config.js的publicPath和webpack-dev-server的publicPath含义不同，但是一般采取相同值，后者的PublicPath
  路径仅仅只是为了提供浏览器访问打包资源的功能，webpack中的loader和插件仍然是取ouput.publicPath，可以通过localhost:3002/webpack-dev-sever来查看打包后资源地址

[详见](http://www.cnblogs.com/libin-1/p/6592114.html?winzoom=1)

### 建议
1. ouput.publicPath 和 webpack-dev-server 的publicPath 均配置为'/'，vue-cli 就是这种配置
2. template 放在根目录，html-webpack-plugin 不用修改参数的路径（直接使用即可），filename 采用默认值。

## webpack刷新页面两种方式(http://blog.csdn.net/liangklfang/article/details/54944012)
1. iframe刷新：访问http://localhost:8080/webpack-dev-server/index.html
2. inline刷新：--inline(需要cli和devserver同时需要)  或者　　config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");


## webpack-dev-server配置修改的三种方式
1. cli修改
2. 在webpack.config.js输出对象中的devServer属性中写配置
3. 使用纯node的api实现,在server.js里面修改


## webpack热重载的注意问题(http://www.cnblogs.com/wonyun/p/7077296.html)
1. 对于开发环境，ExtractTextPlugin(style-loader支持)和html-webpack-plugin插件不支持热重载，所以官网在开发环境下不建议使用该插件
2. 在cli中使用带--hot选项的webpack-dev-server命令时，不要在webpack的配置文件在配置HMR插件,这时候webpack-dev-server就会自动添加webpack/hot/dev-server入口文件到你的配置中去。而在node api模式下则需要配置该插件，node api模式需要修改三处配置文件：ａ.添加入口点：webpack/hot/dev-server b.添加一个new webpack.HotModuleReplacementPlugin()到webpack配置中　c.添加hot: true到webpack-dev-server配置中，从而在服务端启动hmr
3. 请注意webpack配置没有传递到WebpackDevServer API，因此在webpak DevServer配置中没有使用webpack配置中的devServer选项。