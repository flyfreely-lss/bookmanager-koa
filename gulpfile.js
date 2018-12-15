var gulp = require('gulp');
var babel = require('gulp-babel');
 
var paths = {
  config: {
    src: 'src/nodeuii/config/index.js',
    dest: 'dist/'
  }
};
  

function builddev() {
  
}
 
function buildprod() {

}

function buildconfig() {
  
}
 

// exports.scripts = scripts;
// exports.watch = watch;
 

var build = gulp.series(clean, gulp.parallel(styles, scripts));
 
gulp.task('build', build);

gulp.task('default', build);