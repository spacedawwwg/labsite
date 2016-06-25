"use strict";
var gulp = require('gulp');

var config = require('../config');

gulp.task('assets--fonts', function() {
  return gulp.src(config.paths.fonts.src + '**/*')
    .pipe(gulp.dest(config.paths.fonts.dist));
});
