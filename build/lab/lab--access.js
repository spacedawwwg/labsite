"use strict";
var gulp = require('gulp');
var gutil = require('gulp-util');
var inject = require('gulp-inject');
var plumber = require('gulp-plumber');
var stream = require('stream');
var runSequence = require('run-sequence').use(gulp);

var config = require('../config');
var handleError = require('../utils/handle-error');

function stringSrc(filename, contents) {
  var src = stream.Readable({
    objectMode: true
  });
  src._read = function() {
    this.push(new gutil.File({
      cwd: '',
      base: '',
      path: filename,
      contents: new Buffer(contents)
    }))
    this.push(null)
  };
  return src;
}

gulp.task('lab--access__inject', function() {
  return gulp.src(config.basePaths.dist + '**/*.html')
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(inject(
      gulp.src(config.files.lab.accessJs, {
        read: false
      }), {
        removeTags: true,
        relative: true,
        name: 'access'
      }
    ))
    .pipe(gulp.dest(config.basePaths.dist));
});

gulp.task('lab--access__passwords', function() {
  return stringSrc('access.json', config.jsAccess.passwords)
    .pipe(gulp.dest(config.paths.lab.dist));
});

gulp.task('lab--access', function(callback) {
  var status = config.jsAccess.enabled ? gutil.colors.green('ON') : gutil.colors.red('OFF');

  gutil.log('Javascript Password Access:', status);

  if (config.jsAccess.enabled) {
    runSequence(
      'lab--access__passwords',
      'lab--access__inject',
      callback
    );
  } else {
    callback();
  }

});
