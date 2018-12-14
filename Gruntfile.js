module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt) //加载所有的任务

  // 1. 初始化插件配置
  grunt.initConfig({
    //主要编码处
    concat: {
      options: { //可选项配置
        separator: ';'   //使用;连接合并
      },
      build: { //此名称任意
        src: ["src/js/*.js"],  //合并哪些js文件
        dest: "build/js/built.js" //输出的js文件
      }
    },

    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {  //不是必须的
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        files: {
          'dist/js/built-<%=pkg.name%>-<%=pkg.version%>.min.js': ['build/js/built.js']
        }
      }
    },

    babel: {
      options: {
        sourceMap: false,
        presets: ['babel-preset-es2015']
      },
      dist: {
        files: [{
          expand: true,     //如果设为true，就表示下面文件名的占位符（即*号）都要扩展成具体的文件名。
          cwd: 'src/',      //js目录下
          src: ['**/*.js'], //所有js文件
          dest: 'build/'    //输出到此目录下
        }]
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        esversion: 6,
        globals: {
          jQuery: true
        },
      },
      all: ['Gruntfile.js', 'src/js/*.js'] //指定检查的文件
    },

    less: {
      production: {
        options: {
          paths: ['src/less'],
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 version"]})
          ]
        },
        files: {
          'build/css/built.css': 'src/less/*.less'
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      build: {
        files: {
          'dist/css/dist.min.css': ['build/css/built.css']
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,  //移除注释
          collapseWhitespace: true   //去除多余空格
        },
        files: {
          'dist/index.min.html': ['src/index.html']
        }
      }
    },

    connect: {
      options: {
        port: 9000,
        hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
        livereload: 35729  //声明给 watch 监听的端口
      },

      server: {
        options: {
          open: true, //自动打开网页 http://
          base: [
            'src'  //主目录
          ]
        }
      }
    },

    watch: {
      livereload: {
        options: {
          livereload: '<%=connect.options.livereload%>'  //监听前面声明的端口  35729
        },

        files: [  //下面文件的改变就会实时刷新网页
          'src/*.html',
          'src/less/*.less',
          'src/js/*.js',
        ]
      }
    }

    /*watch: {
      scripts: {    //监视js文件
        files: ['src/js/!*.js'],  //监视的文件
        tasks: ['jshint', 'babel', 'concat', 'uglify'],       //一旦监视的文件发生改变，就会自动执行任务列表中的任务
        options: {
          spawn: false  //加快任务速度
        },
      },
      css: {
        files: 'src/less/!*.less',
        tasks: ['less', 'cssmin'],
        options: {
          spawn: false  //加快任务速度
        },
      },
      html: {
        files: 'src/index.html',
        tasks: ['htmlmin'],
        options: {
          spawn: false  //加快任务速度
        },
      },
    }*/
  })
  // 2. 加载插件任务
  // grunt.loadNpmTasks('grunt-contrib-concat')
  // grunt.loadNpmTasks('grunt-contrib-uglify')
  // grunt.loadNpmTasks('grunt-babel')
  // grunt.loadNpmTasks('grunt-contrib-jshint')
  // grunt.loadNpmTasks('grunt-contrib-less')
  // grunt.loadNpmTasks('grunt-contrib-cssmin')
  // grunt.loadNpmTasks('grunt-contrib-htmlmin')
  // grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.registerTask('serve', [
    'connect:server',
    'watch'
  ]);

  // 3. 注册构建任务
  // grunt.registerTask('default', ['jshint', 'babel', 'concat', 'uglify', 'less', 'cssmin', 'htmlmin', 'watch'])
  // grunt.registerTask('myWatch', ['default', 'watch'])
}