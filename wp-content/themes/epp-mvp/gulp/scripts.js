/*
 * Concat and uglify the scripts.
 * NOTE: Use preminified vendor scripts
 */

var gulp = require('gulp'),
  // uglify = require('gulp-uglify'),
  // babel = require('gulp-babel-minify'),// default
  babel = require('gulp-babel'),// for transpiling ES6
  minify = require('babel-minify'),// for transpiling ES6
  shell = require('gulp-shell')// for transpiling ES6
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  filesize = require('gulp-size'),
  paths = require('./paths.js')

gulp.task('scripts', function(){
  return gulp.src(paths.scripts.src)
    // .pipe(concat({path: 'scripts.min.js', cwd: ''}))// default
    .pipe(concat({path: 'scripts.js', cwd: ''}))// for transpiling ES6
    // .pipe(uglify().on('error', notify.onError({
    //   title: 'Uglify Error',
    //   message: "\n<%= error.message %>"
    // })))
    .pipe(babel().on('error', notify.onError({
      title: 'Babel minify Error',
      message: "\n<%= error.message %>"
    })))
    .pipe(filesize({showFiles: true}))
    .pipe(gulp.dest(paths.scripts.dest))
    // .pipe(shell(['npx babel assets/js/scripts.js --out-file assets/js/bundle.js']))// for transpiling ES6
    .pipe(shell(['minify assets/js/scripts.js --out-file assets/js/scripts.min.js']))// for transpiling ES6
})

gulp.task('scripts:vendor', function(){
   return gulp.src(paths.scripts.vendor)
    .pipe(concat({path: 'vendorScripts.js', cwd: ''}))
    .pipe(filesize({showFiles: true}))
    .pipe(gulp.dest(paths.scripts.dest))
})