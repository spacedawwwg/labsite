"use strict";
var gulp = require('gulp');
var fs = require('fs');

var config = require('../config');

gulp.task('styleguide--scripts', function() {
  return gulp.src(config.inputFiles.styleguide.js)
    .pipe(gulp.dest(config.paths.styleguide.dist));
});
