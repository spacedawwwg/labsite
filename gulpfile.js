var requireDir = require('require-dir');
var gulp = require('gulp');
var FwdRef = require('undertaker-forward-reference');
gulp.registry(FwdRef());

// recursively define gulp tasks
requireDir('build', {
  recurse: true
});
