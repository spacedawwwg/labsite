"use strict";
var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);

gulp.task('assets', function(callback) {
  runSequence(
    ['assets--fonts', 'assets--images', 'assets--media'],
    callback
  );
});
