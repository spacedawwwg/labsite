"use strict";
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gsgc = require('gulp-sass-generate-contents');
var del = require('del');

var config = require('../config');
var handleError = require('../utils/handle-error');

gulp.task('styles--generate', function() {
  return gulp.src(config.files.styles.itcss)
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(gsgc(config.files.styles.generateFile, {}, { contentsTable: false }))
    .pipe(gulp.dest(config.paths.styles.src));
});


gulp.task('styles--generate__clear', function() {
  return del(config.files.styles.generateFile);
});
