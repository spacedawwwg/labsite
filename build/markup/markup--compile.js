"use strict";
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var frontMatter = require('gulp-front-matter');
var extname = require('gulp-extname');
var inject = require('gulp-inject');
var prettify = require('gulp-prettify');
var htmlmin = require('gulp-html-minifier');
var hb = require('gulp-hb');
var hbLayouts = require('handlebars-layouts');
var hbHelpers = require('handlebars-helpers');

var config = require('../config');
var handleError = require('../utils/handle-error');

gulp.task('markup--compile', function () {
   return gulp.src(config.inputFiles.pages)
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(frontMatter({
      property: 'data.pageData',
      remove: true
    }))
    .pipe(extname())
    .pipe(hb({
        bustCache: true,
        cwd: process.cwd()
      })
      .data(config.inputFiles.data)
      .partials(config.inputFiles.views)
      .helpers(config.inputFiles.helpers)
      .helpers(hbHelpers)
      .helpers(hbLayouts)
    )
    .pipe(inject(
      gulp.src([
        config.paths.styles.dist + '**/*.css',
        config.paths.scripts.dist + 'modernizr.js'
      ], {
        read: false
      }), {
        ignorePath: config.basePaths.dist,
        empty: true,
        removeTags: true,
        name: 'head',
        transform: function (filepath) {
          arguments[0] = filepath + '?v=' + Math.random();
          return inject.transform.apply(inject.transform, arguments);
        }
      }
    ))
    .pipe(inject(
      gulp.src([
        config.paths.scripts.dist + '**/*.js',
        '!' + config.paths.scripts.dist + 'modernizr.js'
      ], {
        read: false
      }), {
        ignorePath: config.basePaths.dist,
        removeTags: true,
        empty: true,
        name: 'foot',
        transform: function (filepath) {
          arguments[0] = filepath + '?v=' + Math.random();
          return inject.transform.apply(inject.transform, arguments);
        }
      }
    ))
    .pipe(prettify({
      indent_size: 2
    }))
    .pipe(gulp.dest(config.basePaths.dist));
});
