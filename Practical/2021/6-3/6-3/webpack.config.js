var htmlWebpackPlugin=require("html-webpack-plugin");
var vueLoaderPlugin=require("vue-loader/lib/plugin");

module.exports={
	mode:"development",
	entry:"./src/main.js",
	output:{
		path:__dirname+"/dist",
		filename:"bundle.js"
	},
	module:{
		rules:[
			{test:/\.css$/,use:["style-loader","css-loader"]},
			{test:/\.vue$/,use:"vue-loader"}
		]
	},
	plugins:[
		new htmlWebpackPlugin({
			template:"index.html"
		}),
		new vueLoaderPlugin()
	]
}