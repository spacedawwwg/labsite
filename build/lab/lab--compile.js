"use strict";
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var frontMatter = require('gulp-front-matter');
var extname = require('gulp-extname');
var inject = require('gulp-inject');
var prettify = require('gulp-prettify');
var hb = require('gulp-hb');
var hbLayouts = require('handlebars-layouts');
var hbHelpers = require('handlebars-helpers');
var del = require('del');

var config = require('../config');
var handleError = require('../utils/handle-error');

var pageList = config.basePaths.dist + config.files.lab.pageList;

gulp.task('lab--build', function(callback) {
  return gulp.src(config.files.lab.pages, { allowEmpty: true })
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
      .data(pageList)
      .partials(config.files.lab.views.partials)
      .partials(config.files.lab.views.layouts)
      .helpers(hbHelpers)
      .helpers(hbLayouts)
    )
    .pipe(inject(
      gulp.src(config.paths.lab.dist + '*.css', {
        read: false
      }), {
        ignorePath: config.basePaths.dist,
        empty: true,
        removeTags: true,
        name: 'head',
        transform: function(filepath) {
          arguments[0] = filepath + '?v=' + Math.random();
          return inject.transform.apply(inject.transform, arguments);
        }
      }
    ))
    .pipe(inject(
      gulp.src([
        config.paths.lab.dist + '*.js',
        '!' + config.files.lab.accessJs,
        '!' + config.files.lab.styledownJs
      ], {
        read: false
      }), {
        ignorePath: config.basePaths.dist,
        empty: true,
        removeTags: true,
        name: 'foot',
        transform: function(filepath) {
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

gulp.task('lab--compile', gulp.parallel('lab--build'), function(callback) {
  del(pageList, callback);
});
