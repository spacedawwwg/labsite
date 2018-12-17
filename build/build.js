'use strict';
var gulp = require('gulp');
var environments = require('gulp-environments');
var gutil = require('gulp-util');

var config = require('./config');

gulp.task('buildTasks', gulp.series(
  'clean--all',
  'scripts',
  'styles',
  'markup',
  'assets',
  'styleguide',
  'lab',
  'robots'
));

gulp.task('build', gulp.series(
  function(callback) {
    environments.current(environments.development);
    callback();
  },
  'buildTasks'
));

gulp.task('production', gulp.series(
  function(callback) {
    environments.current(environments.production);
    callback();
  },
  'buildTasks'
));

gulp.task('watch', function() {
  gulp.watch(config.paths.styles.src + '**/*.scss', gulp.parallel('styles', 'assets'));
  gulp.watch(config.paths.scripts.src + '**/*.js', gulp.parallel('scripts'));
  gulp.watch([config.paths.lab.src + '**/*', config.paths.views.src + '**/*', config.paths.data.src + '**/*', config.paths.styleguide.src + '**/*'], gulp.parallel('build'));
});

gulp.task('server', function(callback) {
  var http = require('http');
  var serveStatic = require('serve-static');
  var finalhandler = require('finalhandler');
  var ngrok = require('ngrok');

  var serve = serveStatic(config.basePaths.dist, {
    index: ['index.html', 'index.htm']
  });

  var server = http.createServer(function(req, res) {
    var done = finalhandler(req, res);
    serve(req, res, done);
  });

  var serverPort = config.serverPort ? config.serverPort : Math.floor(Math.random() * 1000 + 3000);
  var localhost = 'http://localhost:' + serverPort;

  server.listen(serverPort, function() {
    gutil.log(gutil.colors.green('Local URL:'), 'http://localhost:' + serverPort);
    ngrok.connect(serverPort, function(error, url) {
      gutil.log(gutil.colors.green('External URL:'), url);
      callback();
    });
  });
});

gulp.task('serve', gulp.series('build', 'server', 'watch'));

gulp.task('default', gulp.parallel('build'));
