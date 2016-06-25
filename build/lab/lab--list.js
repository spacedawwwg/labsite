"use strict";
var gulp = require('gulp');
var filelist = require('gulp-filelist');
var rename = require('gulp-rename');

var config = require('../config');

gulp.task('lab--list', function() {
  return gulp.src(config.basePaths.dist + '*.html')
    .pipe(rename({
      dirname: ''
    }))
    .pipe(filelist(config.labFiles.filelist, {
      flatten: true
    }))
    .pipe(gulp.dest(config.basePaths.dist));
});
