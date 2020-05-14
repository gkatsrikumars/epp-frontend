var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob')
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browsersync = require('browser-sync').create(),
    paths = require('./paths.js'),
    reload = browsersync.reload;

gulp.task('styles', function () {
  return gulp.src(paths.styles.src)
    .pipe(sassGlob())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('assets/css/app.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('.'))
    .pipe(reload({stream: true}));
})