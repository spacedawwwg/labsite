"use strict";
var gulp = require('gulp');
var del = require('del');
var once = require('async-once');

var config = require('../config');

// delete all .css files
gulp.task('clean--styles', once(function(callback) {
  del([config.paths.styles.dist + '**/*.css'], callback);
}));
