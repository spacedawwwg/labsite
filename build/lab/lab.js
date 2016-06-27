"use strict";
var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('lab', function(callback) {
  runSequence(
    //'lab--list',
    'lab--copy',
    'lab--styles',
    'lab--compile',
    'lab--access',
    callback
  );
});

gulp.task('lab--watch', function() {
  runSequence(
    'clean--lab',
    'lab',
    reload
  );
});
