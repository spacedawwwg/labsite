/*

// example use (single class)
pageLoaded(unction(e){ console.log('page ready'); });

*/
function pageReady(callback) {
  document.addEventListener('DOMContentLoaded', function(event) {
    callback(event);
  });
}

/*

// example use (single class)
pageLoaded(unction(e){ console.log('page loaded'); });

*/
function pageLoaded(callback) {
  window.addEventListener('load', function(event) {
    callback(event);
  });
}

/*

// example use (resize start only)
viewportResize(function(e){ console.log('resize start'); }, null);

// example use (resize end only)
viewportResize(null, function(e){ console.log('resize end'); });

// example use (resize start and end)
viewportResize(function(e){ console.log('resize start'); }, function(e){ console.log('resize end'); });

// example use (custom debounce)
viewportResize(function(e){ console.log('resize start'); }, function(e){ console.log('resize end'); }, 400);

*/
function viewportResize(callbackStart, callbackEnd, timeout) {
  var timeoutDuration = timeout || 200;
  var resizeTimeout = null;
  window.addEventListener('resize', function(event) {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    if (callbackStart) {
      callbackStart(event);
    }
    resizeTimeout = setTimeout(function() {
      callbackEnd(event);
    }, timeoutDuration);
  });
}

/*

// example use (single class)
pageLoaded(unction(e){ console.log('popstate triggered'); });

*/
function popstate(callback) {
  if (!callback) {
    return;
  }
  window.addEventListener('popstate', function(event) {
    callback(event);
  });
}

module.exports = {
  pageReady: pageReady,
  pageLoaded: pageLoaded,
  viewportResize: viewportResize,
  popstate: popstate
};
