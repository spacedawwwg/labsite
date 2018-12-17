"use strict";
var gulp = require('gulp');


gulp.task('styleguide', gulp.series(
  'styleguide--scripts',
  'styleguide--styles',
  'styleguide--compile',
  'styleguide--inject'
));
