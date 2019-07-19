const path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  // 基本目录
  // vue-cli版本 3.3以上，替代原来的 baseUrl。
  publicPath: '',

  // 当运行 vue-cli-service build时生成的生产环境构建文件的目录。
  outputDir: 'dist',

  // 放置生成的静态资源 (js、css、img、fonts)的输出目录 (相对于 outputDir的)。
  assetsDir: 'assets',

  // 指定生成的 index.html的输出路径 (相对于 outputDir)。也可以是绝对路径。
  indexPath: 'index.html',

  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash以便更好的控制缓存。
  filenameHashing: true,

  // 是否在开发环境下通过 eslint-loader在每次保存时 lint代码（在生产构建时禁用 eslint-loader）。
  lintOnSave: process.env.NODE_ENV !== 'production',

  // 是否使用包含运行时编译器的 Vue构建版本。
  runtimeCompiler: false,

  // Babel显式转译列表。
  // 默认情况下 babel-loader会忽略所有 node_modules中的文件。
  transpileDependencies: [],

  // 是否为 Babel或 TypeScript使用 thread-loader。默认系统 CPU内核多于一个时自动启用。
  parallel: require('os').cpus().length > 1,

  // 如果你不需要生产环境的 source map，可以将其设置为 false以加速生产环境构建。
  productionSourceMap: true,

  // 设置生成的 HTML中 <link rel="stylesheet"> 和 <script>标签的 crossorigin属性（注：仅影响构建时注入的标签）。
  crossorigin: '',

  // 在生成的 HTML中的 <link rel="stylesheet">和 <script>标签上启用 Subresource Integrity (SRI)。
  integrity: false,

  /*
  构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
  个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
  的字符串，
  注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
  */
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/subpage/main.js'
  },

  /*
  Webpack配置
  如果这个值是一个对象，则会通过 webpack-merge合并到最终的配置中
  如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。
  该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
  */
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      // 开发环境配置
      config.devtool = 'cheap-source-map'
    } else {
      // 生产环境配置
    }
  },

  // 对内部的 webpack配置（比如修改、增加Loader选项）(链式操作)
  chainWebpack: config => {
    if (process.env.NODE_ENV !== 'production') {
      // 本地开发配置
    } else {
      // 生产开发配置
    }

    // svg rule loader
    const svgRule = config.module.rule('svg') // 找到 svg-loader
    svgRule.uses.clear() // 清除已有的 loader, 如果不这样做会添加在此 loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除 node_modules目录
    svgRule // 添加 svg新的 loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加 svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)

    // alias配置
    config.resolve.alias
      .set('src', resolve('src'))
      .set('api', resolve('src/api'))
      .set('components', resolve('src/components'))
      .set('utils', resolve('src/utils'))
      .set('views', resolve('src/views'))
      .set('vue$', 'vue/dist/vue.esm.js')
    // plugins配置
    config
    // .plugin('webpack-bundle-analyzer')
    // .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },

  /*
  css选项。
  具体可参见 https://cli.vuejs.org/zh/guide/css.html。
  */
  css: {
    // 默认情况下，只有 *.module.[ext]结尾的文件才会被视作 CSS Modules模块。
    // 设置为 true后你就可以去掉文件名中的 .module并将所有的 *.(css|scss|sass|less|styl(us)?)文件视为 CSS Modules模块。
    modules: false,

    // 是否将组件中的 CSS提取至一个独立的 CSS文件中 (而不是动态注入到 JavaScript中的 inline代码)。
    // 生产环境下是 true，开发环境下是 false。
    extract: false,

    // 是否为 CSS开启 source map。
    // 设置为 true之后可能会影响构建的性能。
    sourceMap: false,

    // 向 CSS相关的 loader传递选项（支持 css-loader postcss-loader sass-loader less-loader stylus-loader）。
    loaderOptions: {
      css: {
        localIdentName: '[name]-[hash]',
        camelCase: 'only'
      },
      sass: {
        // @为 src别名，下列引用目录下需存在对应文件
        // data: `
        //   @import "@/styles/index.scss";
        //   @import "@/styles/element-ui.scss";
        //   @import "@/styles/mixin.scss";
        //   @import "@/styles/sidebar.scss";
        //   @import "@/styles/transition.scss";
        //   @import "@/styles/variables.scss";
        // `
      },
      less: {},
      stylus: {}
    }
  },

  /*
  decServer选项。
  devServer支持所有的 webpack-dev-server选项。
  具体可参见 https://webpack.docschina.org/configuration/dev-server/。
  */
  devServer: {
    compress: true,
    clientLogLevel: 'warning',
    // historyApiFallback: true,
    hotOnly: false,
    https: false,
    host: '0.0.0.0',
    port: 1024,
    // 打开默认浏览器。
    open: true,
    // 用于代理后端API服务器。
    proxy: {
      '/api': {
        target: '"localhost:3000"', // target host
        ws: true, // proxy websockets
        changOrigin: true, // needed for virtual hosted sites
        pathRewrite: {
          '^/api': '' // rewrite path
        }
      }
      // '/foo': {
      //   target: ''
      // }
    },
    watchOptions: {
      poll: false
    },
    // 用于配置自定义处理程序。
    before: app => {}
  },

  /*
  向pwa插件传递选项。
  可参见pwa插件: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa。
  */
  pwa: {},

  // 传递任何第三方插件选项
  pluginOptions: {
    i18n: {
      locale: 'zh-CN',
      fallbackLocale: 'en',
      localeDir: 'locale',
      enableInSFC: true
    }
  }
}