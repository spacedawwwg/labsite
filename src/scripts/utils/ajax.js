/*

// example request
ajaxGet('http://foo.bar/?p1=1&p2=Hello+World', function(data){ console.log(data); });

*/
function ajaxGet(url, success, error, progress) {
  var xhr = new window.XMLHttpRequest();
  if (progress) {
    xhr.addEventListener('progress', progress, false);
  }
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState > 3 && xhr.status === 200) {
      success(xhr.responseText);
      if (progress) {
        xhr.removeEventListener('progress', progress, false);
      }
    }
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send();
  return xhr;
}

/*

// example request
ajaxPost('http://foo.bar/', 'p1=1&p2=Hello+World', function(data){ console.log(data); });

// example request with data object
ajaxPost('http://foo.bar/', { p1: 1, p2: 'Hello World' }, function(data){ console.log(data); });

*/
function ajaxPost(url, data, success) {
  var params = typeof data === 'string' ? data : Object.keys(data).map(
    function(k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }
  ).join('&');

  var xhr = new window.XMLHttpRequest();
  xhr.open('POST', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState > 3 && xhr.status === 200) {
      success(xhr.responseText);
    }
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Content-length', params.length);
  xhr.send(params);
  return xhr;
}

module.exports = {
  post: ajaxPost,
  get: ajaxGet
};
