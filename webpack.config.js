var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var UglifyJsPlugin = require("uglifyjs-webpack-plugin")

var processEnvConstants = {}
for (var key in process.env) {
  processEnvConstants[key] = JSON.stringify(process.env[key])
}
var extractCSS = new ExtractTextPlugin(`blog.vendor.[contenthash].css`)

module.exports = {
  entry: {
    main: process.env.VENDOR && `./vendor.js` || './app.js',
  },
  output: {
    path: path.resolve('./dist'),
    publicPath: process.env.OSS && process.env.OSS_URL || '/',
    filename: process.env.VENDOR && `blog.vendor.[chunkhash].js` || `blog.app.[chunkhash].js`,
  },
  resolve: {
    modules: [
      path.resolve('./css'),
      path.resolve('./js'),
      // path.resolve('./image'),
      // path.resolve('./vue'),
      'node_modules',
      // 'js',
    ],
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['vue-app', {
                "targets": {
                  "browsers": ["ie >= 9"]
                }
              }]
            ],
            babelrc: false,
          }
        }
      }, {
        test: /\.css$/,
        use: extractCSS.extract(["css-loader"]),
      }, {
        test: /\.(png|jpg|gif|jpeg)$/,
        loader: 'file-loader',
        options: {
          name: 'image/[name].[ext]'
        }
      }, {
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: 'font/[name].[ext]'
        }
      }, {
        test: /\.less$/,
        use: extractCSS.extract(["css-loader", "less-loader"]),
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // extractCSS: true,
          loaders: {
            less: extractCSS.extract(["css-loader", "less-loader"]),
            // sass: extractCSS.extract(["css-loader", "sass-loader"]),
          }
          // other vue-loader options go here
        }
      },
      // { 
      //   test: /\.scss$/, 
      //   use: extractCSS.extract(["css-loader","sass-loader"]),
      // }, 
    ],
  },
  performance: {
    hints: false
  },
  plugins: [
    extractCSS,
    new webpack.DefinePlugin({
      'process.env': processEnvConstants,
    }),
    // new UglifyJsPlugin({
    //   sourceMap: false,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ],
}

if (process.env.VENDOR) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new HtmlWebpackPlugin({
      title: process.env.TITLE || '项楠的博客',
      filename: `../index.template.html`, // relative to output.path
      template: `./vendor.template.html`,
    }),
    //// more plugins
  ])
} else {
  console.log('build app.js')
  module.exports.plugins = (module.exports.plugins || []).concat([
    new HtmlWebpackPlugin({
      filename: `../index.html`, // relative to output.path
      template: `./index.template.html`,
    }),
    //// more plugins
  ])
}

if (process.env.OSS) {
  require('babel-polyfill')
  var OSSPlugin = require('webpack-oss-plugin')
  module.exports.plugins = (module.exports.plugins || []).concat([
    new OSSPlugin({
      // exclude: /.*\.(html|svg|woff|woff2|ttf|eot)$/,
      exclude: /.*\.(html)$/,
      ossOptions: {
        accessKeyId: process.env.OSS_ACCESS_KEY,
        accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
        region: process.env.OSS_REGION,
        bucket: process.env.OSS_BUCKET,
      },
      ossUploadOptions: {},
    }),
    //// more plugins
  ])
}


