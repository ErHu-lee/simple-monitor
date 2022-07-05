const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:"./src/index.js",
    context: process.cwd(), //上下文目录
    output:{
        path:path.resolve(__dirname, "dist"),
        filename:"monitor.js"
    },
    mode:"development",
    devServer:{
        static: path.resolve(__dirname,"dist") // 静态文件目录
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html",
            inject:'head'
        })
    ]
}