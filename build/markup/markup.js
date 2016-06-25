"use strict";
var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('markup', function(callback) {
  runSequence(
    'markup--compile',
    callback
  );
});

gulp.task('markup--watch', function() {
  runSequence(
    'clean--markup',
    'markup',
    reload
  );
});
