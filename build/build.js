"use strict";
var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var environments = require('gulp-environments');
var gutil = require('gulp-util');

var config = require('./config');

var build = function(callback) {
  runSequence(
    'clean--all',
    'scripts',
    'styles',
    'markup',
    'assets',
    'styleguides',
    'lab',
    callback
  );
}

gulp.task('build', function(callback) {
  environments.current(environments.development);
  build(callback);
});

gulp.task('production', function(callback) {
  environments.current(environments.production);
  build(callback);
});

gulp.task('watch', function() {
  //gulp.watch(['gulpfile.js', 'build/**/*.js'], ['build']);
  gulp.watch(config.paths.styles.src + '**/*.scss', ['styles', 'assets', reload]);
  gulp.watch(config.paths.scripts.src + '**/*.js', ['scripts', reload]);
  gulp.watch([
    config.paths.lab.src + '**/*',
    config.paths.views.src + '**/*',
    config.paths.data.src + '**/*',
    config.paths.styleguide.src + '**/*'
  ], ['build', reload]);
});

gulp.task('serve', ['build', 'watch'], function(callback) {
  var http = require('http');
  var serveStatic = require('serve-static');
  var finalhandler = require('finalhandler');
  var ngrok = require('ngrok');
  var open = require('open');

  var serve = serveStatic(config.basePaths.dist, {
    "index": ['index.html', 'index.htm']
  });

  var server = http.createServer(function(req, res) {
    var done = finalhandler(req, res);
    serve(req, res, done);
  })

  var serverPort = config.serverPort ? config.serverPort : Math.floor((Math.random() * 1000) + 3000);
  var localhost = 'http://localhost:' + serverPort;

  server.listen(serverPort, function() {
    gutil.log('Local URL: http://localhost:%s', serverPort);
    ngrok.connect(serverPort, function(error, url) {
      gutil.log('External URL:', url);
      open(localhost, 'google chrome');
      callback();
    });
  });

});

gulp.task('default', ['build']);
