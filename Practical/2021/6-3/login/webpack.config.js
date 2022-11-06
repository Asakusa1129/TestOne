var htmlWebpackPlugin=require("html-webpack-plugin");
var vuewLoaderPlugin=require("vue-loader/lib/plugin");
module.exports={
	mode:"development",
	entry:"./mian.js",
	output:{
		path:__dirname+"/dist",
		filename:"bundle.js",
	},
	resolve:{

	},
	module:{
		rules:[
			{test:/\.vue$/,use:"vue-loader"},
			{test:/\.css$/,use:["style-loader","css-loader"]},
			{test:/\.scss$/,use:["style-loader","css-loader","sass-loader"]}
		]
	},
	plugins:[
		new htmlWebpackPlugin({
			template:"index.html"
		})
		new vueLoaderPlugin()
	]
}