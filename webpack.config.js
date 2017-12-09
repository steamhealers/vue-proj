const path = require('path')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [{
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }]
          },
          {
            test: /\.css$/,
            // 把css当做模块来处理
            // 执行从右到左
            // autoprefixer-loader  自动给样式属性加前缀
            // css-loader 把css作为模块来处理
            // style-loader 把样式插入到页面的head中
            use: ['style-loader', 'css-loader', 'autoprefixer-loader']  // 执行顺序从右到左
          },
          {
            test: /\.less$/,
            // 处理less
            use: ['style-loader', 'css-loader', 'autoprefixer-loader', 'less-loader']
          },
          {    
            test: /\.scss$/,
            // 处理sass
            use: ['style-loader', 'css-loader', 'autoprefixer-loader', 'sass-loader']
          },
          {
            // 处理图片和字体
            // 当文件小于limit （limit单位是字节）会把文件转换成base64编码的字符串
            // 当文件大于limit 会使用file-loader来处理
    
            // url-loader 和 file-loader会处理任何类型的文件
            // url-loader 可以把文件转成base64编码的字符串
            test: /\.(png|jpg|gif|woff|woff2|eot|ttf|otf|svg)$/,
            // use: ['url-loader']
            use: [{
              loader: 'url-loader',
              options: {
                limit: 10240
              }
            }]
          },
          {
            test: /\.vue$/,
            use: ['vue-loader']
          }
        ]
      },
    plugins: [

        new cleanWebpackPlugin(['dist']),
        new htmlWebpackPlugin({
            title: 'Output Management',
            template: 'index.html',
            filename: 'index.html'
        })

    ]
}