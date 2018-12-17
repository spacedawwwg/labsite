"use strict";
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var pxtorem = require('gulp-pxtorem');
var autoprefixer = require('gulp-autoprefixer');
var environments = require('gulp-environments');

var config = require('../config');
var handleError = require('../utils/handle-error');

gulp.task('lab--styles', function() {
  return gulp.src(config.files.lab.styles.inputFile)
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(environments.development(sourcemaps.init()))
    .pipe(sass({
      sourceMap: environments.development() ? true : false,
      sourceMapEmbed: environments.development() ? true : false,
      outputStyle: environments.development() ? 'nested' : 'compressed'
    }))
    .pipe(autoprefixer(config.styleOptions.autoprefixer))
    .pipe(pxtorem(config.styleOptions.pxtorem))
    .pipe(environments.development(sourcemaps.write()))
    .pipe(gulp.dest(config.paths.lab.dist));
});
