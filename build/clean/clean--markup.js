"use strict";
var gulp = require('gulp');
var del = require('del');
var once = require('async-once');

var config = require('../config');

// delete all .html files
gulp.task('clean--markup', once(function(callback) {
  del([config.basePaths.dist + '**/*.html'], callback);
}));
