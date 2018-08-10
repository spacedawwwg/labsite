"use strict";
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var styledown = require('@philippevay/gulp-styledown');
var fs = require('fs');

var config = require('../config');
var handleError = require('../utils/handle-error');

gulp.task('styleguide--compile', function () {
  return gulp.src(config.paths.styles.dist + config.files.styles.outputFile)
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(styledown({
      filename: config.files.styleguide.outputFile,
      head: '',
      body: 'main#styleguide.sg-main(sg-content)',
      indentSize: 2,
      template: fs.readFileSync(config.basePaths.dist + config.files.styleguide.outputFile, 'utf8')
    }))
    .pipe(gulp.dest(config.basePaths.dist));
});
