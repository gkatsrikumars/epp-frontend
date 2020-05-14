var gulp = require('gulp')
var shell = require('gulp-shell')

gulp.task('package', shell.task([
  'rm -f ./mars-generic.zip',
  'rm -Rf ./mars-generic',
  'mkdir ./mars-generic',
  'rsync -a --exclude=node_modules --exclude=.git --exclude=mars-generic --exclude=gulp --exclude=styles --exclude=scripts . ./mars-generic',
  'zip -r mars-generic.zip ./mars-generic',
  'rm -Rf ./mars-generic'
]))
