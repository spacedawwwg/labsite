"use strict";
var gulp = require('gulp');
var del = require('del');

var config = require('../config');

// delete all .js files
gulp.task('clean--scripts', function() {
  return del(config.paths.scripts + '**/*.js');
});
