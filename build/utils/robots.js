"use strict";
var gulp = require('gulp');
var robots = require('robots-generator').stream;
var plumber = require('gulp-plumber');

var config = require('../config');
var handleError = require('./handle-error');

gulp.task('robots', function() {
  gulp.src(config.basePaths.dist + 'index.html')
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(robots({
      useragent: '*',
      disallow: ['/']
    }))
    .pipe(gulp.dest(config.basePaths.dist));
});
