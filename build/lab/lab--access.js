"use strict";
var gulp = require('gulp');
var gutil = require('gulp-util');
var inject = require('gulp-inject');
var plumber = require('gulp-plumber');

var jsonfile = require('jsonfile');

var config = require('../config');
var handleError = require('../utils/handle-error');

gulp.task('lab--access__inject', function(callback) {
  if (config.jsAccess.enabled) {
    return gulp.src(config.basePaths.dist + '**/*.html', { allowEmpty: true })
      .pipe(plumber({
        errorHandler: handleError
      }))
      .pipe(inject(
        gulp.src(config.files.lab.accessJs, {
          allowEmpty: true,
          read: false
        }), {
          removeTags: true,
          relative: true,
          name: 'access'
        }
      ))
      .pipe(gulp.dest(config.basePaths.dist));
  } else {
    callback();
  }
});

gulp.task('lab--access__passwords', function(callback) {
  if (config.jsAccess.enabled) {
    jsonfile.writeFile(config.paths.lab.dist + 'access.json', config.jsAccess.passwords, err => {
      if (err) {
        return console.error(err);
      }
      callback();
    })
  }
});

gulp.task('lab--access__log', function(callback) {
  var status = config.jsAccess.enabled ? gutil.colors.green('ON') : gutil.colors.red('OFF');
  gutil.log('Smoke & Mirrors Password Access:', status);
  callback();
})

gulp.task('lab--access', gulp.series(
  'lab--access__log',
  'lab--access__passwords',
  'lab--access__inject'
));
