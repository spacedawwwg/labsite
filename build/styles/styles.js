"use strict";
var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);

gulp.task('styles', function(callback) {
  runSequence(
    'styles--generate',
    'styles--compile',
    'styles--generate__clear',
    callback
  );
});
