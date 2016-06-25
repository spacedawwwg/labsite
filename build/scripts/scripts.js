"use strict";
var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('scripts', function(callback) {
  runSequence(
    'scripts--lint',
    'scripts--modernizr',
    'scripts--compile',
    callback
  );
});

gulp.task('scripts--watch', function() {
  runSequence(
    'clean--scripts',
    'scripts',
    reload
  );
});
