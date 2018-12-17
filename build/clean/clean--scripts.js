"use strict";
var gulp = require('gulp');
var del = require('del');
var once = require('async-once');

var config = require('../config');

// delete all .js files
gulp.task('clean--scripts', once(function(callback) {
  del([config.paths.scripts + '**/*.js'], callback);
}));
