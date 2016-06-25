var gutil = require('gulp-util');
var environments = require('gulp-environments');

module.exports = function(err) {
  // print the error to the console
  if (err) {
    console.log(err);
  }
  // generate a sound to notify that there was an error
  if (environments.development()) {
    gutil.beep();
  }
  this.emit('end');
};
