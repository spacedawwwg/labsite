"use strict";
var gulp = require('gulp');
var inject = require('gulp-inject');
var plumber = require('gulp-plumber');

var config = require('../config');
var handleError = require('../utils/handle-error');

gulp.task('lab--access', function() {
  return gulp.src(config.basePaths.dist + '**/*.html')
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(inject(
      gulp.src(config.labFiles.accessJs, {
        read: false
      }), {
        removeTags: true,
        relative: true,
        name: 'access'
      }
    ))
    .pipe(gulp.dest(config.basePaths.dist));
});
