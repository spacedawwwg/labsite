var events = require('../utils/events');
var live = require('../utils/live');
var classList = require('../utils/classlist');
var scroll = require('../utils/scroll');

var options = {
  inClass: 'in--navigation-primary'
};

var html = document.body.parentNode;

function isOpen() {
  return classList.hasClass(html, options.inClass);
}

function openMenu() {
  classList.addClass(html, options.inClass);
  scroll.disableScroll();
}

function closeMenu() {
  classList.removeClass(html, options.inClass);
  scroll.enableScroll();
}

function init(actionEl, closeEl) {

  // menu toggle on click
  if (actionEl) {
    live(actionEl, 'click', function(e) {
      var el = this;
      if (isOpen()) {
        closeMenu();
      } else {
        openMenu();
      }
      e.preventDefault();
      e.stopPropagation();
    });
  }

  // close menu on content click of closeEl
  if (closeEl) {
    live(closeEl, 'click', function(e) {
      if (isOpen()) {
        closeMenu();
        e.stopPropagation();
      }
    });
  }
}

module.exports = {
  options: options,
  isOpen: isOpen,
  openMenu: openMenu,
  closeMenu: closeMenu,
  init: init
};
