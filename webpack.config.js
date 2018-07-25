const path = require('path')
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: "./src/index.js", // 指定入口文件，程序从这里开始编译,__dirname当前目录,
    output: {
        path: path.resolve(__dirname, './dist'), // 输出的路径
        filename: 'bundle.js', // 打包后文件
    },
    // 添加需要解析的文件格式
    resolve: {
        extensions: ['.jsx', '.js', '.json'],
        modules: [path.resolve(__dirname, 'node_modules')]
    },
    module: {
        rules: [{
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    limit: 5 * 1024,
                    //指定拷贝文件的输出目录
                    outputPath: 'images/'
                }
            }]
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader?modules",
            exclude: /node_modules/,
        }, {
            test: /\.scss$/,
            use: ExtractTextWebpackPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader"],
                publicPath: "./dist"
            }),
            include: path.join(__dirname, './src'),
            exclude: /node_modules/
        }, {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader', // 加载器
            exclude: /node_modules/,
            query: {
                presets: ["es2015", "react"],
                plugins: [
                    ["import", { libraryName: "antd", style: 'css' }] // antd按需加载
                ]
            },
        }, {//antd样式处理
            test: /\.css$/,
            exclude: /src/,
            use: [
                { loader: "style-loader", },
                {
                    loader: "css-loader",
                    options: {
                        importLoaders: 1
                    }
                }
            ]
        },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'learn-react',
            template: './index.html',
        }),
        new ExtractTextWebpackPlugin({
            filename: 'app.css',
            allChunks: true
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        // colors: true,  //终端中输出结果为彩色
        historyApiFallback: true,  //不跳转
        inline: true,  //实时刷新
        port: 8000,
    },
    devtool: 'source-map',
}; 