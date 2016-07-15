"use strict";
var gulp = require('gulp');
var environments = require('gulp-environments');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var config = require('../config');
var handleError = require('../utils/handle-error');

gulp.task('scripts--compile', function() {
  return browserify(config.inputFiles.scripts.main, {
      debug: environments.development() ? true : false
    })
    .on('error', handleError)
    .bundle()
    .pipe(source(config.outputFiles.scripts.main))
    .pipe(buffer())
    .pipe(environments.production(uglify()))
    .pipe(gulp.dest(config.paths.scripts.dist))
});
