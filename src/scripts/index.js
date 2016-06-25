//utils
var events = require('./utils/events');
var live = require('./utils/live');
var classList = require('./utils/classlist');
// modules
var menu = require('./modules/menu');

// init
var pageSelector = '.page';
var html = document.body.parentNode;

events.pageLoaded(function(e) {

  // add site loaded class
  classList.addClass(html, 'site--loaded');

});

events.pageReady(function() {

  // add site ready class
  classList.addClass(html, 'site--ready');

  // basic menu toggle example (using selector and variable)
  menu.init('.menu-action', pageSelector);

});
