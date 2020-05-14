let gulp = require('gulp'),
  babel = require('gulp-babel'),
  babelify = require('babelify'),
  notify = require('gulp-notify'),
  sass = require('gulp-sass'),
  browserify = require('browserify'),
  buffer = require('vinyl-buffer'),
  minify = require('babel-minify'), // for transpiling ES6
  shell = require('gulp-shell'), // for transpiling ES6
  //minify = require('gulp-minify'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  source = require('vinyl-source-stream'),
  concat = require('gulp-concat'),
  plumber = require('gulp-plumber'),
  gutil = require('gulp-util'),
  watch = require('gulp-watch'),
  cssmin = require('gulp-cssmin');

// Create 'sass' task
gulp.task('sass', function(){
  return gulp.src('assets/scss/app.scss')
    .pipe(plumber({ errorHandler: function(err) {
      notify.onError({
        title: "Gulp error in " + err.plugin,
        message:  err.toString()
      })(err);
      gutil.beep();
    }}))
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(concat('app.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('assets/css'))
    .pipe(notify({ message: 'Styles bundle complete!', onLast: true }));
});

// Create 'script' task
let config = {
  js: {
    src: ([
      // './assets/scripts/vendor/*.js',
      './assets/scripts/global.js',
      './assets/scripts/partials/*.js',
      // './assets/scripts/app.js'
    ]),
    outputDir: 'assets/js/', // Directory to save bundle to
    mapDir: './maps/', // Subdirectory to save maps to
    outputFile: 'scripts.js' // Name to use for bundle
  },
};

/*
gulp.task('script', () => {
  return browserify({entries: config.js.src, debug: true})
    .transform(babelify, { presets: ['es2015'] })
    .bundle()
    .pipe(source(config.js.src))
    .pipe(buffer())
    .pipe(rename(config.js.outputFile))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(minify())
    .pipe(sourcemaps.write(config.js.mapDir))
    .pipe(gulp.dest(config.js.outputDir))
    .pipe(notify({ message: 'Script bundle complete!', onLast: true }));
}); */

gulp.task('script', function(){
  return gulp.src(config.js.src)
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
    //.pipe(filesize({showFiles: true}))
    .pipe(gulp.dest(config.js.outputDir))
    // .pipe(shell(['npx babel assets/js/scripts.js --out-file assets/js/bundle.js']))// for transpiling ES6
    .pipe(shell(['minify assets/js/scripts.js --out-file assets/js/scripts.min.js']))// for transpiling ES6
})

// Create 'watch' task
gulp.task('default', function(){
  gulp.watch('assets/scss/**/*.scss', gulp.series('sass'));
  gulp.watch(['assets/scripts/**/*.js'], gulp.series('script'));
  // Other watchers
});