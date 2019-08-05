module.exports = {
  /**
   * 根目录标识
   * http://eslint.cn/docs/user-guide/configuring#using-configuration-files
   * http://eslint.cn/docs/user-guide/configuring#configuration-cascading-and-hierarchy
   * 【】标识当前配置文件为最底层的文件，无需往更上一级的文件目录中进行搜索
   * 【】默认eslint的配置文件搜索方式是，从目标文件夹进行搜索，遍历内部每一个文件夹，找到配置文件并层叠使用。再跳出本项目，往祖先文件夹进行遍历
   * 【】注意「~/.eslintrc」的意义，「~」是指linux上的家目录，「~/.eslintrc」是指家目录下的eslint配置文件，用于私人开发者，用于整个电脑全局约束的。这个配置通过本配置项root去设置，设置了root,eslint检测时将不会再往上搜索
   * 【】eslint的生效规则是就近使用，越近的配置项优先级越高，覆盖其他配置项。如一个项目中，可以在不同文件夹中都添加配置文件，这些规则将重叠组合生效
   */
  root: true,

  /**
   * 运行环境
   * http://eslint.cn/docs/user-guide/configuring#specifying-environments
   * 【】一个环境定义了一组预定义的全局变量
   * 【】获得了特定环境的全局定义，就不会认为是开发定义的，跳过对其的定义检测。否则会被认为改变量未定义
   * 【】常见的运行环境有以下这些，更多的可查看官网
   * browser - 浏览器环境中的全局变量。
   * node - Node.js 全局变量和 Node.js 作用域。
   * es6 - 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）。
   * amd - 将 require() 和 define() 定义为像 amd 一样的全局变量。
   * commonjs - CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)。
   * jquery - jQuery 全局变量。
   * mongo - MongoDB 全局变量。
   * worker - Web Workers 全局变量。
   * serviceworker - Service Worker 全局变量。
   */
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true,
    jquery: true
  },

  /**
  * 解析器配置项
  * http://eslint.cn/docs/user-guide/configuring#specifying-parser-options
  * 【】这里设置的配置项将会传递到解析器中，被解析器获取到，进行一定的处理。具体被利用到，要看解析器的源码有没有对其进行利用。这里仅仅做了参数定义，做了规定，告诉解析器的开发者可能有这些参数
  * 【】配置项目有：
  * "sourceType": "module",  // 指定JS代码来源的类型，script(script标签引入？) | module（es6的module模块），默认为script。为什么vue的会使用script呢？因为vue是通过babel-loader编译的，而babel编译后的代码就是script方式
  * "ecmaVersion": 6,     // 支持的ES语法版本，默认为 5。注意只是语法，不包括ES的全局变量。全局变量需要在env选项中进行定义
  * "ecmaFeatures": {     // Features是特征的意思，这里用于指定要使用其他那些语言对象
    "experimentalObjectRestSpread": true, //启用对对象的扩展
    "jsx": true,              //启用jsx语法
    "globalReturn":true,          //允许return在全局使用
    "impliedStrict":true          //启用严格校验模式
   }
  */
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: 'module'
  },

  /**
   * 全局变量
   * http://eslint.cn/docs/user-guide/configuring#specifying-globals
   * 【】定义额外的全局，开发者自定义的全局变量，让其跳过no-undef 规则
   * 【】key值就是额外添加的全局变量
   * 【】value值用于标识该变量能否被重写，类似于 const的作用。true为允许变量被重写
   * 【】注意：要启用 no-global-assign规则来禁止对只读的全局变量进行修改。
   */
  globals: {
    vue: true,
    requirejs: true,
    define: true,
    _: true,
    PPDWebUI: true,
    ppdeal: true,
    swal: true,
    toastr: true,
    cmp: true,
    template: true,
    controller: true,
    Switchery: true,
    common: true,
    maltose: true
  },

  /**
   * 插件
   * http://eslint.cn/docs/user-guide/configuring#configuring-plugins
   * 【】插件同样需要在node_module中下载
   * 【】注意插件名忽略了「eslint-plugin-」前缀，所以在package.json中，对应的项目名是「eslint-plugin-vue」
   * 【】插件的作用类似于解析器，用以扩展解析器的功能，用于检测非常规的js代码。也可能会新增一些特定的规则。
   * 【】如 eslint-plugin-vue，是为了帮助我们检测.vue文件中 <template> 和 <script> 中的js代码
   */
  plugins: [],

  /**
   * 规则继承
   * http://eslint.cn/docs/user-guide/configuring#extending-configuration-files
   *【】可继承的方式有以下几种
   *【】eslint内置推荐规则，就只有一个，即「eslint:recommended」
   *【】可共享的配置， 是一个 npm 包，它输出一个配置对象。即通过npm安装到node_module中
   *  可共享的配置可以省略包名的前缀 eslint-config-，即实际设置安装的包名是 eslint-config-airbnb-base
   *【】从插件中获取的规则，书写规则为 「plugin:插件包名/配置名」，其中插件报名也是可以忽略「eslint-plugin-」前缀。如'plugin:vue/essential'
   *【】从配置文件中继承，即继承另外的一个配置文件，如'./node_modules/coding-standard/eslintDefaults.js'
   */
  extends: [
    'plugin:vue/essential',
    '@vue/prettier',
    'plugin:vue/recommended',
    'plugin:vue/base'
  ],

  /**
   * 规则共享参数
   * http://eslint.cn/docs/user-guide/configuring#adding-shared-settings
   * 【】提供给具体规则项，每个参数值，每个规则项都会被注入该变量，但对应规则而言，有没有用，就看各个规则的设置了，就好比 parserOptions，解析器用不用它就不知道了。这里只是提供这个方法
   * 【】不用怀疑，经源码验证，这就是传递给每个规则项的，会当做参数传递过去，但用不用，就是具体规则的事情
   */
  settings: {
    /**
     *
     * 注意，「import/resolver」并不是eslint规则项，与rules中的「import/extensions」不同。它不是规则项
     * 这里只是一个参数名，叫「import/resolver」，会传递给每个规则项。
     * settings并没有具体的书写规则，「import/」只是import模块自己起的名字，原则上，它直接命名为「resolver」也可以，加上「import」只是为了更好地区分。不是强制设置的。
     * 因为「import」插件很多规则项都用的这个配置项，所以并没有通过rules设置，而是通过settings共享
     * 具体使用方法可参考https://github.com/benmosher/eslint-plugin-import
     */
    'import/resolver': {
      /**
       * 这里传入webpack并不是import插件能识别webpack，而且通过npm安装了「eslint-import-resolver-webpack」，
       * 「import」插件通过「eslint-import-resolver-」+「webpack」找到该插件并使用，就能解析webpack配置项。使用里面的参数。
       * 主要是使用以下这些参数，共享给import规则，让其正确识别import路径
       * extensions: ['.js', '.vue', '.json'],
       * alias: {
       * 'vue$': 'vue/dist/vue.esm.js',
       * '@': resolve('src'),
       * 'static': resolve('static')
       * }
       */
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },

  /**
   * 针对特定文件的配置
   * 【】可以通过overrides对特定文件进行特定的eslint检测
   * 【】特定文件的路径书写使用Glob格式，一个类似正则的路径规则，可以匹配不同的文件
   * 【】配置几乎与 ESLint 的其他配置相同。覆盖块可以包含常规配置中的除了 extends、overrides 和 root 之外的其他任何有效配置选项，
   */
  overrides: [
    {
      files: ['bin/*.js', 'lib/*.js'],
      excludedFiles: '*.test.js',
      rules: {
        quotes: [2, 'single']
      }
    }
  ],

  /**
   * 自定义规则
   * http://eslint.cn/docs/user-guide/configuring#configuring-rules
   * 【】基本使用方式
   * "off" 或者0 关闭规则
   * "warn" 或者1 将规则打开为警告（不影响退出代码）
   * "error" 或者2 将规则打开为错误（触发时退出代码为1）
   * 如：'no-restricted-syntax': 0, // 表示关闭该规则
   * 【】如果某项规则，有额外的选项，可以通过数组进行传递，而数组的第一位必须是错误级别。如0,1,2
   * 如 'semi': ['error', 'never'], never就是额外的配置项
   */
  rules: {
    /* 
        "off"或者0    //关闭规则关闭
        "warn"或者1    //在打开的规则作为警告（不影响退出代码）
        "error"或者2    //把规则作为一个错误（退出代码触发时为1） 
    */
    'no-alert': 0, //允许使用alert confirm prompt
    'no-array-constructor': 2, //禁止使用数组构造器
    'no-bitwise': 0, //允许使用按位运算符
    'no-caller': 1, //谨慎使用arguments.caller或arguments.callee
    'no-catch-shadow': 2, //禁止catch子句参数与外部作用域变量同名
    'no-class-assign': 2, //禁止给类赋值
    'no-cond-assign': 0, //允许在条件表达式中使用赋值语句
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', //允许使用console
    'no-const-assign': 2, //禁止修改const声明的变量
    'no-constant-condition': 1, //谨慎在条件中使用常量表达式 if(true) if(1)
    'no-continue': 0, //允许使用continue
    'no-control-regex': 0, //允许在正则表达式中使用控制字符
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', //禁止使用debugger
    'no-delete-var': 2, //不能对var声明的变量使用delete操作符
    'no-div-regex': 0, //谨慎使用看起来像除法的正则表达式/=foo/
    'no-dupe-keys': 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-dupe-args': 2, //函数参数不能重复
    'no-duplicate-case': 2, //switch中的case标签不能重复
    'no-else-return': 0, //如果if语句里面有return,后面不能跟else语句
    'no-empty': 0, //块语句中的内容可以为空
    'no-empty-character-class': 0, //正则表达式中的[]内容可以为空
    'no-empty-label': 0, //允许使用空label
    'no-eq-null': 0, //允许对null使用==或!=运算符
    'no-eval': 0, //允许使用eval
    'no-ex-assign': 2, //禁止给catch语句中的异常参数赋值
    'no-extend-native': 0, //允许扩展native对象
    'no-extra-bind': 0, //禁止不必要的函数绑定 .bind(this)
    'no-extra-boolean-cast': 2, //禁止不必要的bool转换
    'no-extra-parens': 0, //禁止非必要的括号
    'no-extra-semi': 0, //禁止多余的冒号
    'no-fallthrough': 0, //禁止switch穿透
    'no-floating-decimal': 2, //禁止省略浮点数中的0 .5 3.
    'no-func-assign': 2, //禁止重复的函数声明
    'no-implicit-coercion': 0, //允许隐式转换
    'no-implied-eval': 2, //禁止使用隐式eval
    'no-inline-comments': 0, //允许行内备注
    'no-inner-declarations': [2, 'functions'], //禁止在块语句中使用声明（变量或函数）
    'no-invalid-regexp': 2, //禁止无效的正则表达式
    'no-invalid-this': 0, //禁止无效的this，只能用在构造器，类，对象字面量
    'no-irregular-whitespace': 2, //不能有不规则的空格
    'no-iterator': 2, //禁止使用__iterator__ 属性
    'no-label-var': 2, //label名不能与var声明的变量名相同
    'no-labels': 2, //禁止标签声明
    'no-lone-blocks': 2, //禁止不必要的嵌套块
    'no-lonely-if': 0, //谨慎在else语句内只有if语句
    'no-loop-func': 1, //谨慎在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
    'no-mixed-requires': [0, false], //允许声明时混用声明类型
    'no-mixed-spaces-and-tabs': [1, false], //禁止混用tab和空格
    'linebreak-style': [0, 'windows'], //换行风格
    'no-multi-spaces': 1, //禁止用多余的空格
    'no-multi-str': 1, //字符串不能用\换行
    'no-multiple-empty-lines': [
      1,
      {
        max: 2
      }
    ], //空行最多不能超过2行
    'no-native-reassign': 1, //不能重写native对象
    'no-negated-in-lhs': 1, //in 操作符的左边不能有!
    'no-nested-ternary': 0, //允许使用嵌套的三目运算
    'no-new': 0, //禁止在使用new构造一个实例后不赋值
    'no-new-func': 1, //允许使用new Function
    'no-new-object': 1, //禁止使用new Object()
    'no-new-require': 1, //禁止使用new require
    'no-new-wrappers': 1, //禁止使用new创建包装实例，new String new Boolean new Number
    'no-obj-calls': 0, //不能调用内置的全局对象，比如Math() JSON()
    'no-octal': 0, //禁止使用八进制数字
    'no-octal-escape': 0, //禁止使用八进制转义序列
    'no-param-reassign': 0, //禁止给参数重新赋值
    'no-path-concat': 0, //node中不能使用__dirname或__filename做路径拼接
    'no-plusplus': 0, //禁止使用++，--
    'no-process-env': 0, //禁止使用process.env
    'no-process-exit': 0, //禁止使用process.exit()
    'no-proto': 0, //禁止使用__proto__属性
    'no-redeclare': 2, //禁止重复声明变量
    'no-regex-spaces': 1, //禁止在正则表达式字面量中使用多个空格 /foo bar/
    'no-restricted-modules': 0, //如果禁用了指定模块，使用就会报错
    'no-return-assign': 0, //return 语句中不能有赋值表达式
    'no-script-url': 0, //禁止使用javascript:void(0)
    'no-self-compare': 1, //不能比较自身
    'no-sequences': 0, //禁止使用逗号运算符
    'no-shadow': 2, //外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    'no-shadow-restricted-names': 2, //严格模式中规定的限制标识符不能作为声明时的变量名使用
    'no-spaced-func': 2, //函数调用时 函数名与()之间不能有空格
    'no-sparse-arrays': 2, //禁止稀疏数组， [1,,2]
    'no-sync': 0, //nodejs 禁止同步方法
    'no-ternary': 0, //禁止使用三目运算符
    'no-trailing-spaces': 1, //一行结束后面不要有空格
    'no-this-before-super': 0, //在调用super()之前不能使用this或super
    'no-throw-literal': 1, //禁止抛出字面量错误 throw "error";
    'no-undef': 1, //不能有未定义的变量
    'no-undef-init': 1, //变量初始化时不能直接给它赋值为undefined
    'no-undefined': 0, //不能使用undefined
    'no-unexpected-multiline': 1, //避免多行表达式
    'no-underscore-dangle': 0, //标识符不能以_开头或结尾
    'no-unneeded-ternary': 0, //禁止不必要的嵌套 var isYes = answer === 1 ? true : false;
    'no-unreachable': 2, //不能有无法执行的代码
    'no-unused-expressions': 0, //禁止无用的表达式 a && a.b
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'after-used'
      }
    ], //不能有声明后未被使用的变量或参数
    'no-use-before-define': 2, //未定义前不能使用
    'no-useless-call': 2, //禁止不必要的call和apply
    'no-useless-escape': 0, //不允许在字符串和正则表达式中使用无意义的换行符
    'no-void': 0, //禁用void操作符
    'no-var': 0, //禁用var，用let和const代替
    'no-warning-comments': [
      1,
      {
        terms: ['todo', 'fixme', 'xxx'],
        location: 'start'
      }
    ], //不能有警告备注
    'no-with': 1, //禁用with
    'array-bracket-spacing': [1, 'never'], //是否允许非空数组里面有多余的空格
    'arrow-parens': 0, //箭头函数用小括号括起来
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ], //=>的前/后括号
    'accessor-pairs': 2, //在对象中使用getter/setter
    'block-scoped-var': 0, //块语句中使用var
    'block-spacing': [2, 'always'],
    'brace-style': [
      2,
      '1tbs',
      {
        allowSingleLine: true
      }
    ], //大括号风格
    'callback-return': 0, //避免多次调用回调什么的
    camelcase: [
      0,
      {
        properties: 'always'
      }
    ], //强制驼峰法命名
    'comma-dangle': [2, 'never'], //对象字面量项尾不能有逗号
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ], //逗号前后的空格
    'comma-style': [2, 'last'], //逗号风格，换行时在行首还是行尾
    complexity: [0, 20], //循环复杂度
    'computed-property-spacing': [0, 'never'], //是否允许计算后的键名什么的
    'consistent-return': 0, //return 后面是否允许省略
    'consistent-this': [2, 'that'], //this别名
    'constructor-super': 2, //非派生类不能调用super，派生类必须调用super
    curly: [2, 'multi-line'], //必须使用 if(){} 中的{}
    'default-case': 1, //switch语句最后必须有default
    'dot-location': [2, 'property'], //对象访问符的位置，换行的时候在行首还是行尾
    'dot-notation': [
      0,
      {
        allowKeywords: true
      }
    ], //避免不必要的方括号
    'eol-last': 0, //文件以单一的换行符结束
    eqeqeq: [2, 'allow-null'], //必须使用全等
    'func-names': 0, //函数表达式必须有名字
    'func-style': [0, 'declaration'], //函数风格，规定只能使用函数声明/函数表达式
    'generator-star-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ], //生成器函数*的前后空格
    'guard-for-in': 0, //for in循环要用if语句过滤
    'handle-callback-err': [2, '^(err|error)$'], //nodejs 处理错误
    'id-length': 0, //变量名长度
    indent: [
      1,
      'tab',
      {
        SwitchCase: 1
      }
    ], //缩进风格
    'init-declarations': 0, //声明时必须赋初值
    'jsx-quotes': [2, 'prefer-single'],
    'key-spacing': [
      0,
      {
        beforeColon: false,
        afterColon: true
      }
    ], //对象字面量中冒号的前后空格
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'lines-around-comment': 0, //行前/行后备注
    'max-depth': [0, 4], //嵌套块深度
    'max-len': [0, 80, 4], //字符串最大长度
    'max-nested-callbacks': [0, 10], //回调嵌套深度
    'max-params': [0, 20], //函数最多只能有3个参数
    'max-statements': [0, 50], //函数内最多有几个声明
    'new-cap': [
      2,
      {
        newIsCap: true,
        capIsNew: false
      }
    ], //函数名首行大写必须使用new方式调用，首行小写必须用不带new方式调用
    'new-parens': 2, //new时必须加小括号
    'newline-after-var': 1, //变量声明后是否需要空一行
    'object-curly-spacing': [
      'error',
      'always',
      {
        arraysInObjects: false
      }
    ], //大括号内是否允许不必要的空格
    'array-bracket-spacing': [
      'error',
      'never',
      {
        arraysInArrays: true
      }
    ],
    'object-shorthand': 0, //强制对象字面量缩写语法
    'one-var': 0, //连续声明
    'operator-assignment': [0, 'always'], //赋值运算符 += -=什么的
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ], //换行时运算符在行尾还是行首
    'padded-blocks': [2, 'never'], //块语句内行首行尾是否要空行
    'prefer-const': 2, //首选const
    'prefer-spread': 0, //首选展开运算
    'prefer-reflect': 0, //首选Reflect的方法
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ], //引号类型 `` "" ''
    'quote-props': [0, 'always'], //对象字面量中的属性名是否强制双引号
    radix: 0, //parseInt必须指定第二个参数
    'id-match': 0, //命名检测
    'require-yield': 0, //生成器函数必须有yield
    semi: [0, 'always'], //语句强制分号结尾
    'semi-spacing': [
      1,
      {
        before: false,
        after: true
      }
    ], //分号前后空格
    'sort-vars': 0, //变量声明时排序
    'space-after-keywords': [2, 'always'], //关键字后面是否要空一格
    'space-before-blocks': [2, 'always'], //不以新行开始的块{前面要不要有空格
    'space-before-function-paren': [2, 'always'], //函数定义时括号前面要不要有空格
    'space-in-parens': [2, 'never'], //小括号里面要不要有空格
    'space-infix-ops': 2, //中缀操作符周围要不要有空格
    'space-return-throw-case': 0, //return throw case后面要不要加空格
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false
      }
    ], //一元运算符的前/后要不要加空格
    'spaced-comment': [
      2,
      'always',
      {
        markers: [
          'global',
          'globals',
          'eslint',
          'eslint-disable',
          '*package',
          '!',
          ','
        ]
      }
    ], //注释风格要不要有空格什么的
    strict: 0, //使用严格模式
    'template-curly-spacing': [2, 'never'],
    'use-isnan': 2, //禁止比较时使用NaN，只能用isNaN()
    'valid-jsdoc': 0, //jsdoc规则
    'valid-typeof': 2, //必须使用合法的typeof的值
    'vars-on-top': 1, //var必须放在作用域顶部
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'never'
      }
    ],
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/name-property-casing': ['error', 'PascalCase'],
    'wrap-iife': [2, 'inside'], //立即执行函数表达式的小括号风格
    'wrap-regex': 0, //正则表达式字面量用小括号包起来
    'yield-star-spacing': [2, 'both'],
    yoda: [2, 'never'] //禁止尤达条件
  }
}
