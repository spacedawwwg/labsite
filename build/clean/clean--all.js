"use strict";
var gulp = require('gulp');
var del = require('del');

var config = require('../config');

// delete all files and folders
gulp.task('clean--all', function() {
  return del(config.basePaths.dist);
});
