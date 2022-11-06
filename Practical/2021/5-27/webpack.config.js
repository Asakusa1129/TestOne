var htmlWebpackPlugin=require("html-webpack-plugin")
module.exports={
	entry:"./entry.js",
	output:{
		path:__dirname+"/dist",
		filename:"bundle.js"
	},
	module:{
		rules:[
			{test:/\.css$/,use:["style-loader","css-loader"]},
			{test:/\.(jpg|png|gif|jpeg)$/,use:["file-loader"]}
		]
	},
	plugins:[
		new htmlWebpackPlugin({
			template:"index.html"
		})	
	]
}