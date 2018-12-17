"use strict";
var gulp = require('gulp');


gulp.task('styles', gulp.series(
  'styles--generate',
  'styles--compile',
  'styles--generate__clear'
));
