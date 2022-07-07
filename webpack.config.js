const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:"./src/index.js",
    context: process.cwd(), //上下文目录
    output:{
        path:path.resolve(__dirname, "dist"),
        filename:"monitor.js"
    },
       // 配置模块规则
    module: {
        rules: [
            {
                test: /\.tsx?$/,    // .ts或者tsx后缀的文件，就是typescript文件
                use: "ts-loader",   // 就是上面安装的ts-loader
                exclude: "/node-modules/" // 排除node-modules目录
            }
        ]
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
    ],
    resolve: {
        extensions: [".ts",'.js'], // 配置ts文件可以作为模块加载
    }
}