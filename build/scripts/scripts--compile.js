"use strict";
var gulp = require('gulp');
var environments = require('gulp-environments');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var uglify = require('gulp-uglify');

var config = require('../config');
var handleError = require('../utils/handle-error');

gulp.task('scripts--compile', function() {
  return browserify(config.files.scripts.inputFile, {
      debug: environments.development() ? true : false
    })
    .on('error', handleError)
    .bundle()
    .pipe(source(config.files.scripts.outputFile))
    .pipe(buffer())
    .pipe(environments.production(uglify()))
    .pipe(gulp.dest(config.paths.scripts.dist))
});
