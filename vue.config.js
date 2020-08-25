'use strict'
const path = require('path')
const compressionPlugin = require('compression-webpack-plugin')
const name = 'onz7电商建站平台'
const userData = require('./mock_data/user.json')
const { token, userInfo, menu } = userData

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    before(app) {
      app.post('/api/login', function(req, res) {
        res.json({
          code: 0,
          data: { token }
        })
      })

      app.get('/api/userInfo', function(req, res) {
        res.json({
          code: 0,
          data: userInfo
        })
      })

      app.post('/api/menu/getMenu', function(req, res) {
        res.json({
          code: 0,
          data: { menus: menu }
        })
      })
    }
  },
  configureWebpack: {
    name: name,
    plugins: [
      new compressionPlugin({
        test: /\.js$|\.html$|\.css/,
        threshold: 50 * 1024,
        deleteOriginalAssets: false
      })
    ],
    performance: {
      // hints: 'warning',
      // //入口起点的最大体积 整数类型（以字节为单位）
      // maxEntrypointSize: 500000,
      // //生成文件的最大体积 整数类型（以字节为单位 300k）
      // maxAssetSize: 300000,
      // //只给出 js 文件的性能提示
      // assetFilter: function(assetFilename) {
      //   return assetFilename.endsWith('.js')
      // }
    },
    resolve: {
      alias: {
        '@': resolve('src'),
        common: resolve('src/common'),
        components: resolve('src/components'),
        api: resolve('src/api'),
        views: resolve('src/views')
      }
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {}
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false
  }
}
