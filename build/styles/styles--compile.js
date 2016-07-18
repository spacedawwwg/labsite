"use strict";
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var gsgc = require('gulp-sass-generate-contents');
var pxtorem = require('gulp-pxtorem');
var autoprefixer = require('gulp-autoprefixer');
var environments = require('gulp-environments');
var rename = require('gulp-rename');
var del = require('del');

var config = require('../config');
var handleError = require('../utils/handle-error');

gulp.task('styles--generate', function() {
  return gulp.src(config.files.styles.itcss)
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(gsgc(config.files.styles.generateFile, {}, { disableContents: true }))
    .pipe(gulp.dest(config.paths.styles.src));
});

gulp.task('styles--compile', function() {
  return gulp.src(config.files.styles.generateFile)
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(environments.development(sourcemaps.init()))
    .pipe(sass({
      sourceMap: environments.development() ? true : false,
      sourceMapEmbed: environments.development() ? true : false,
      outputStyle: environments.development() ? 'nested' : 'compressed',
      sourceMapContents: false,
      sourceComments: false,
      source_map_contents: false,
      source_comments: false
    }))
    .pipe(autoprefixer(config.styleOptions.autoprefixer))
    .pipe(pxtorem(config.styleOptions.pxtorem))
    .pipe(environments.development(sourcemaps.write()))
    .pipe(rename(config.files.styles.outputFile))
    .pipe(gulp.dest(config.paths.styles.dist));
});

gulp.task('styles--clear-generated', function() {
  return del(config.files.styles.generateFile);
});
