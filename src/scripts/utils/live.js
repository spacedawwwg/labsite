/*

// example use (document context)
live('.link', 'click', function(e){ console.log('click'); });

// example use (selector context)
live('.link', 'click', function(e){ console.log('click'); }, '.wrapper');

*/
module.exports = function(selector, event, callback, context) {
  context = context || document;
  context.addEventListener(event, function(e) {
    var qs = context.querySelectorAll(selector);
    if (qs) {
      var el = e.target;
      var index;
      while (el && ((index = Array.prototype.indexOf.call(qs, el)) === -1)) {
        el = el.parentElement;
      }
      if (index > -1) {
        callback.call(el, e);
      }
    }
  });
};
