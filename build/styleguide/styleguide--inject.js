var gulp = require('gulp');
var plumber = require('gulp-plumber');
var inject = require('gulp-inject');
var prettify = require('gulp-prettify');

var config = require('../config');
var handleError = require('../utils/handle-error');

gulp.task('styleguide--inject', function() {
  return gulp.src(config.basePaths.dist + config.files.styleguide.outputFile)
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(inject(
      gulp.src([
        config.paths.styleguide.dist + '**/*.css',
        config.paths.styleguide.dist + '**/*.js',
      ], {
        read: false
      }), {
        ignorePath: config.basePaths.dist,
        empty: true,
        removeTags: true,
        name: 'styleguide',
        transform: function (filepath) {
          arguments[0] = filepath + '?v=' + Math.random();
          return inject.transform.apply(inject.transform, arguments);
        }
      }
    ))
    .pipe(prettify({
      indent_size: 2
    }))
    .pipe(gulp.dest(config.basePaths.dist));
});
