"use strict";
var gulp = require('gulp');

gulp.task('assets', gulp.series(
  'assets--fonts',
  'assets--images',
  'assets--media'
));
