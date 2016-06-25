"use strict";
var gulp = require('gulp');

var config = require('../config');

gulp.task('assets--media', function() {
  return gulp.src(config.paths.media.src + '**/*')
    .pipe(gulp.dest(config.paths.media.dist));
});
