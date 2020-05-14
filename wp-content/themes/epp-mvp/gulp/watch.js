var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    paths = require('./paths.js')

gulp.task('reload', function() {
  return browserSync.reload()
})

gulp.task('browsersync', function() {
  browsersync.init({
    proxy: 'http://localhost/'
  })
})

gulp.task('watch', ['browsersync'], function() {
  gulp.watch(paths.styles.watch, ['styles'], function() {
    console.log('foo')
  })
  gulp.watch(paths.scripts.watch, function(){
    runSequence('scripts', 'reload')
  })
  gulp.watch(paths.php.watch, ['reload'])
})