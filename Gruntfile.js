module.exports = function(grunt){
  // 1. 初始化插件配置
  grunt.initConfig({
    //主要编码处
    concat: {
      options: { //可选项配置
        separator: ';'   //使用;连接合并
      },
      build: { //此名称任意
        src:  ["src/js/*.js"],  //合并哪些js文件
        dest: "build/js/built.js" //输出的js文件
      }
    },

    pkg : grunt.file.readJSON('package.json'),
    uglify : {
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
          expand:true,     //如果设为true，就表示下面文件名的占位符（即*号）都要扩展成具体的文件名。
          cwd:'src/',      //js目录下
          src:['**/*.js'], //所有js文件
          dest:'build/'    //输出到此目录下
        }]
      }
    }
  });
  // 2. 加载插件任务
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-babel');

  // 3. 注册构建任务
  grunt.registerTask('default', ['babel', 'concat', 'uglify']);
};