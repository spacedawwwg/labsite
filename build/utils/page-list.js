"use strict";
var gulp = require('gulp');
var gutil = require('gulp-util');
var through = require('through2');
var path = require('path');
var File = require('vinyl');
var fs = require('fs');
var grayMatter = require('gray-matter');

var config = require('../config');
var handleError = require('../utils/handle-error');

module.exports = function(outputFile) {

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

    var originalPath = file.path;
    var relativePath = path.relative(config.paths.views.pages, originalPath);
    var outputPath = relativePath.replace('.hbs', '.html');

    var contents = fs.readFileSync(path.relative(process.cwd(), originalPath), 'utf8');
    var pageData = grayMatter(contents);

    pageData.url = outputPath;

    if (pageData.data.styleguide === true) {
      fileList.unshift(data);
    } else {
      fileList.push(data);
    }

    this.push(file);
    cb();
  }, function(cb) {
    var fileListFile = new File({
      path: outputFile,
      contents: new Buffer(JSON.stringify(fileList, null, '  '))
    });

    this.push(fileListFile);
    cb();
  });
};
