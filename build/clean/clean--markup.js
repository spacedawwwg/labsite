"use strict";
var gulp = require('gulp');
var del = require('del');

var config = require('../config');

// delete all .html files
gulp.task('clean--markup', function() {
  return del(config.basePaths.dist + '**/*.html');
});
