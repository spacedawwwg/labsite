/*

// example use
hasClass(element, 'foo');

*/
function hasClass(el, className) {
  return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
}

/*

// example use (single class)
addClass(element, 'foo');

// example use (multiple classes)
addClass(element, 'foo bar');

*/
function addClass(el, className) {
  var classNames = className.split(' ');
  var i;
  for(i = 0; i < classNames.length; i++) {
    if (el.classList) {
      el.classList.add(classNames[i]);
    } else if (!hasClass(el, classNames[i])) {
      el.className += ' ' + classNames[i];
    }
  }
}

/*

// example use (single class)
removeClass(element, 'foo');

// example use (multiple classes)
removeClass(element, 'foo bar');

*/
function removeClass(el, className) {
  var classNames = className.split(' ');
  var i;
  for(i = 0; i < classNames.length; i++) {
    if (el.classList) {
      el.classList.remove(classNames[i]);
    } else {
      el.className = el.className.replace(new RegExp('\\b' + classNames[i] + '\\b', 'g'), '');
    }
  }
}
/*

// example use
toggleClass(element, 'foo');

*/
function toggleClass(el, className) {
  if (hasClass(el, className)) {
    removeClass(el, className);
  } else {
    addClass(el, className);
  }
}

module.exports = {
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass
};
