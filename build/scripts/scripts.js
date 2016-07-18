"use strict";
var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);

gulp.task('scripts', function(callback) {
  runSequence(
    'scripts--lint',
    'scripts--modernizr',
    'scripts--compile',
    callback
  );
});
