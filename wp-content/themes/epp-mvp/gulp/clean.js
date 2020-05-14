/*
 * Destorys the destination folder before re-populating it.
 * Clean will not run while Gulp is watching.
 */

var del = require('del')
var gulp = require('gulp')
var paths = require('./paths.js')

// gulp.task('clean', function(){
//   return del(paths.root, {force: true})
// })