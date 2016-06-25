"use strict";
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var styledown = require('gulp-styledown');
var fs = require('fs');
var inject = require('gulp-inject');

var config = require('../config');
var handleError = require('../utils/handle-error');

gulp.task('styledown--compile', function() {
  return gulp.src(config.paths.styles.dist + config.outputFiles.styles.main)
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(styledown({
      filename: config.labFiles.styledown.outputFile,
      head: 'div',
      body: 'div#styledown.lab-content(sg-content)',
      indentSize: 2,
      template: fs.readFileSync(config.labFiles.styledown.view, 'utf8')
    }))
    .pipe(gulp.dest(config.basePaths.dist));
});

gulp.task('styledown--inject', ['styledown--compile'], function() {
  return gulp.src(config.basePaths.dist + config.labFiles.styledown.outputFile)
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(inject(
      gulp.src([
        config.paths.lab.dist + '**/*.css',
        config.labFiles.styledownJs,
        '!' + config.labFiles.accessJs
      ], {
        read: false
      }), {
        ignorePath: config.basePaths.dist,
        empty: true,
        removeTags: true,
        name: 'styleguide',
        transform: function (filepath) {
          arguments[0] = filepath + '?v=' + Math.random();
          return inject.transform.apply(inject.transform, arguments);
        }
      }
    ))
    .pipe(gulp.dest(config.basePaths.dist));
});

gulp.task('lab--styledown', ['styledown--inject']);
