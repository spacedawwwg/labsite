"use strict";
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var flatten = require('gulp-flatten');

var config = require('../config');
var handleError = require('../utils/handle-error');

gulp.task('lab--copy', function() {
  return gulp.src(config.files.lab.assets)
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(flatten())
    .pipe(gulp.dest(config.paths.lab.dist));
});
