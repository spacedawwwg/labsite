"use strict";
var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('styleguide', function(callback) {
  runSequence(
    'styleguide--scripts',
    'styleguide--styles',
    'styleguide--compile',
    'styleguide--inject',
    callback
  );
});
