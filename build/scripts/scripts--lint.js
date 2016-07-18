"use strict";
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var config = require('../config');
var handleError = require('../utils/handle-error');

gulp.task('scripts--lint', function() {
  return gulp.src(config.paths.scripts.src + '**/*.js')
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
