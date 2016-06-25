"use strict";
var gulp = require('gulp');
var del = require('del');

var config = require('../config');

// delete all .css files
gulp.task('clean--styles', function() {
  return del(config.paths.styles.dist + '**/*.css');
});
