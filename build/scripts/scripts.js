"use strict";
var gulp = require('gulp');


gulp.task('scripts', gulp.series(
  'scripts--lint',
  'scripts--modernizr',
  'scripts--compile'
));
