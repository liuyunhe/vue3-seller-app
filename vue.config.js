// eslint-disable-next-line @typescript-eslint/no-var-requires
const merge = require('webpack-merge')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsImportPluginFactory = require('ts-import-plugin')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pxtoviewport = require('postcss-px-to-viewport')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const autoprefixer = require('autoprefixer')
module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    host: 'localhost',
    port: 8080,
    https: false,
    open: true,
    hotOnly: true,
    proxy: {
      '/syx': {
        target: 'https://cs-yxc.qrmkt.cn', //跨域接口的地址
        changeOrigin: true
      },
      '/hbact': {
        target: 'https://cs-yxc.qrmkt.cn', //跨域接口的地址
        changeOrigin: true
      },
      '/hbSeller': {
        target: 'https://cs-yxc.qrmkt.cn', //跨域接口的地址
        changeOrigin: true
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  parallel: false,
  css: {
    loaderOptions: {
      //配置less主题
      less: {
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'text-color': '#111',
            'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "./src/theme/var.less";`
          }
        }
      },
      //配置路vw vm适配
      postcss: {
        plugins: [
          autoprefixer(),
          pxtoviewport({
            viewportWidth: 375
          })
        ]
      }
    }
  },
  //配置路径别名
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@assets': resolve('src/assets')
      }
    }
  },

  chainWebpack: (config) => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap((options) => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: (name) => `${name}/style/less`
                // style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        })
        return options
      })
  }
}
