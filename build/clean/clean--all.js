"use strict";
var gulp = require('gulp');
var del = require('del');
var once = require('async-once');

var config = require('../config');

// delete all files and folders
gulp.task('clean--all', function(callback) {
  del([config.basePaths.dist]).then(() => callback());
});
