"use strict";
var gulp = require('gulp');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var through = require('through2');
var path = require('path');
var File = require('vinyl');
var fs = require('fs');

var config = require('../config');

function pageList(out, options) {

  options = options || {};

  var files = [];
  var fileList = [];

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('pageList', 'Streams not supported'));
      return;
    }

    files.push(file);

    var data = {};

    var filePath = path.relative(config.basePaths.dist, file.path);

    data.url = filePath;
    data.title = filePath;

    // Use HTML title if it exists
    var contents = fs.readFileSync(path.relative(process.cwd(), file.path), 'utf8');
    if (contents) {
      var title = contents.match(/<title[^>]*>([^<]+)<\/title>/);
      if (title) {
        data.title = title[1];
      }
    }

    fileList.push(data);

    this.push(file);
    cb();
  }, function(cb) {
    var fileListFile = new File({
      path: out,
      contents: new Buffer(JSON.stringify(fileList, null, '  '))
    });

    this.push(fileListFile);
    cb();
  });
};

gulp.task('lab--list', function() {
  return gulp.src(config.basePaths.dist + '*.html')
    .pipe(rename({
      dirname: ''
    }))
    .pipe(pageList(config.labFiles.pageList, {
      flatten: true
    }))
    .pipe(gulp.dest(config.basePaths.dist));
});
