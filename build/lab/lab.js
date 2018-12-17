"use strict";
var gulp = require('gulp');

gulp.task('lab', gulp.series(
  'lab--copy',
  'lab--styles',
  'lab--compile',
  'lab--access'
));
