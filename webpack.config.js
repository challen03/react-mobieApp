var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html
// var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包, 从打包成的style引用在js代码里抽成css文件
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src'); //获取src的绝对地址
var APP_FILE = path.resolve(APP_PATH, 'app'); // 根目录下app.jsx的绝对地址
var BUILD_PATH = path.resolve(ROOT_PATH, 'build'); // 发布的目录的绝对地址
var plugins = [];

// plugins.push(new ExtractTextPlugin({
// 	filename:'[name].css'
// })); 
// plugins.push(new webpack.LoaderOptionsPlugin({
//     options: {
//         postcss: require('autoprefixer')({ browsers: ['last 2 versions'] })//调用autoprefixer插件，例如 display: flex
//     }
// }));
plugins.push(new HtmlWebpackPlugin({
	template: __dirname + '/index.html'
}));
plugins.push(new OpenBrowserPlugin({
    url: 'http://localhost:3002'
}));
plugins.push(new webpack.HotModuleReplacementPlugin());
module.exports = {
    entry: {
        app: [APP_FILE]
    },
    output: {
        //参见wepbapck缓存：不要在开发环境下使用 [chunkhash]（根据内容生成的hash，具有识别内容更改特性，减少不必要请求），因为这会增加编译时间。
        //将开发和生产模式的配置分开,并在开发模式中使用 [name].js 的文件名， 在生产模式中使用 [name].[chunkhash].js 文件名。
        filename: '[name].js', // 编译后的文件名字
        chunkFilename: '[name].[hash:5].min.js', // require.ensure按需异步加载时用到，默认输出难懂的[id]
        path: BUILD_PATH, //编译到当前目录
        publicPath: '/' //编译好的文件，在服务器的路径,域名会自动添加到前面
    },
    
    module: {
	    rules: [
            // {
            //     test: /\.js$/,
            //     exclude: /^node_modules$/,
	        //     use: [
		    //         {
			//             loader: "babel-loader",
			//             options: {
			// 	            presets: ['es2015']
			//             }
		    //         }
	        //     ]
            // }, 
			// {
            //     test: /\.css$/,
            //     exclude: /^node_modules$/,
			//       use: ExtractTextPlugin.extract({
			// 	      fallback: "style-loader",
			// 	      use: [
			// 		      { loader: 'css-loader', options: { autoprefixer: true, importLoaders: 1, sourceMap: true } },
			// 		      { loader: 'postcss-loader', options: { 
			// 				  sourceMap: true,
			// 				  plugins: () => [autoprefixer({ browsers: ['iOS >= 7', 'Android >= 4.1'] })] 
			// 				} }
			// 	      	]
			//       })
            //     // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
            // }, {
			{
                test: /\.less/,
                exclude: /^node_modules$/,
			    //   use: ExtractTextPlugin.extract({
				//       fallback: "style-loader",
				//       use: [
				// 	      { loader: 'css-loader', options: { autoprefixer: true, importLoaders: 1 } },
				// 	      { loader: 'postcss-loader', options: {
				// 			  sourceMap: true,
				// 			  plugins: () => [autoprefixer({ browsers: ['iOS >= 7', 'Android >= 4.1'] })]
				// 			} },
				// 	      {
				// 		      loader: 'less-loader'
				// 	      }
				//       ]
			    //   })
				use: [
					{
						loader: 'style-loader'
					},
					{ 
						loader: 'css-loader', options: { autoprefixer: true, importLoaders: 1 }
					},
					{ loader: 'postcss-loader', options: {
						sourceMap: true,
						plugins: () => [autoprefixer({ browsers: ['iOS >= 7', 'Android >= 4.1'] })]
					} },
					{
						loader: 'less-loader'
					}
				]
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
            }, {
                test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
                exclude: /^node_modules$/,
			      use: [
			      	{
					      loader: "file-loader",
					      options: {
					      	name: '[name].[ext]'
					      }
				      }
			      	]
			      // loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.(png|jpg)$/,
                exclude: /^node_modules$/,
			      use: [
				      {
					      loader: "url-loader",
					      options: {
						      limit: 20000,
						      name: '[name].[ext]'
					      }
				      }
			      ]
                // loader: 'url?limit=20000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            }, {
                test: /\.jsx$/,
                exclude: /^node_modules$/,
			      use: [
				      {
					      loader: "babel-loader",
					      options: {
						      presets: [
							      "es2015",
							      "react"
						      ]
					      }
				      }
			      ]
                // loaders: ['jsx', 'babel?presets[]=es2015,presets[]=react']
            }
        ]
    },
    resolve:{
        extensions:['.js','.jsx']
    },
    plugins
}