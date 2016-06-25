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

// Site
var config = require('../config');
var handleError = require('../utils/handle-error');

// Compile CSS from Sass files
gulp.task('styles--generate', function() {
  return gulp.src(config.inputFiles.styles.itcss)
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(gsgc(config.inputFiles.styles.main, {}, {disableContents: true }))
    .pipe(gulp.dest(config.paths.styles.src));
});

// Compile CSS from Sass files
gulp.task('styles--compile', ['styles--generate'], function() {
  return gulp.src(config.inputFiles.styles.main)
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
    .pipe(autoprefixer(config.styles.autoprefixer))
    .pipe(pxtorem(config.styles.pxtorem))
    .pipe(environments.development(sourcemaps.write()))
    .pipe(rename(config.outputFiles.styles.main))
    .pipe(gulp.dest(config.paths.styles.dist));
});

gulp.task('styles--clear', function() {
  return del(config.inputFiles.styles.main);
});
