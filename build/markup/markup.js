"use strict";
var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);

gulp.task('markup', function(callback) {
  runSequence(
    'markup--compile',
    callback
  );
});
