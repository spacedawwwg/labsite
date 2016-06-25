"use strict";
var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('assets', function(callback) {
  runSequence(
    ['assets--fonts', 'assets--images', 'assets--media'],
    callback
  );
});

gulp.task('assets--watch', function() {
  runSequence(
    'clean--assets',
    'assets',
    reload
  );
});
