"use strict";
var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);

gulp.task('lab', function(callback) {
  runSequence(
    'lab--copy',
    'lab--styles',
    'lab--compile',
    'lab--access',
    callback
  );
});
