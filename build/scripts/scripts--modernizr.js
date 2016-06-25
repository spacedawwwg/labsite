"use strict";
var gulp = require('gulp');
var gutil = require('gulp-util');
var environments = require('gulp-environments');
var modernizr = require('gulp-modernizr');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var config = require('../config');
var handleError = require('../utils/handle-error');

gulp.task('scripts--modernizr', function() {
  return gulp.src([
      config.paths.scripts.src + '**/*.js',
      '!' + config.paths.scripts.src + 'vendor',
      '!' + config.paths.scripts.src + 'vendor/**',
      config.paths.styles.src + '**/*.scss',
      '!' + config.paths.styles.src + 'vendor',
      '!' + config.paths.styles.src + 'vendor/**',
    ])
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(modernizr({
      cache: true,
      options: [
        'setClasses',
        'addTest',
        'html5printshiv',
        'testProp',
        'fnBind',
        'prefixed',
        'prefixedCSS'
      ]
    }))
    .pipe(environments.development(sourcemaps.init()))
    .pipe(environments.production(uglify()))
    .pipe(environments.development(sourcemaps.write()))
    .pipe(gulp.dest(config.paths.scripts.dist));
});
