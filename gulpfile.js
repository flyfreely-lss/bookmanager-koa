var gulp = require('gulp');
var babel = require('gulp-babel');
var rollup = require('gulp-rollup');  //利用rollup的tree-shaking进行流清洗
var replace = require('rollup-plugin-replace'); //配合rollup进行流清洗


var paths = {
  config: {
    ignore: 'src/nodeuii/config/*.js',
    src: 'src/nodeuii/config/index.js',
    dest: 'dist/'
  },
  node: {
    src: 'src/nodeuii/**/*.js',
    dest: 'dist/'
  }
};

/**
 * 构建开发环境
 */
function builddev() {
  return gulp.src(paths.node.src)
    .pipe(babel({
      babelrc: false,
      plugins: ['transform-es2015-modules-commonjs']  //只引入模块transform plugin
    }))
    .pipe(gulp.dest(paths.node.dest))
}

/**
 * 构建生产环境
 */
function buildprod() {
  return gulp.src(paths.node.src)
    .pipe(babel({
      babelrc: false,
      ignore: ['./src/nodeuii/config/*.js'],  //忽略config配置文件的构建
      plugins: ['transform-es2015-modules-commonjs']  //只引入模块transform plugin
    }))
    .pipe(gulp.dest(paths.node.dest))
}

/**
 * 配置文件进行流清洗
 */
function buildconfig() {
  return gulp.src(paths.node.src)
    .pipe(rollup({
      input: paths.config.src,
      output: { format: "cjs" },
      plugins: [replace({
        "process.env.NODE_ENV": JSON.stringify('production') //将config/index.js文件里“process.env.NODE_ENV”替换为“production",相当于if(false){},这样的代码将会被自动清洗掉
      })]
    }))
    .pipe(gulp.dest(paths.node.dest))
}


// exports.scripts = scripts;
// exports.watch = watch;


let build = gulp.series(builddev);
if (process.env.NODE_ENV == 'production') {
  build = gulp.series(buildprod, buildconfig);
}
if (process.env.NODE_ENV == 'lint') {
  build = gulp.series(buildlint);
}
// gulp.task('build', build);

gulp.task('default', build);