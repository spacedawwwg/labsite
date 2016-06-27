"use strict";
var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('styles', function(callback) {
  runSequence(
    'styles--generate',
    'styles--compile',
    'styles--clear-generated',
    callback
  );
});

gulp.task('styles--watch', function() {
  runSequence(
    'clean--styles',
    'styles',
    reload
  );
});
