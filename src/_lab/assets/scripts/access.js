"use strict";
var Lab = Lab || {};
Lab.Access = (function() {

  var loginPage = '/login.html';
  var landingPage = '/index.html';
  var accessFile = '/_lab/access.json';
  var accessList = null;
  var page = window.location.pathname.replace(/^.*\/\/[^\/]+/, '')
  var form = null;
  var input = null;
  var errorContainer = null;
  var errorText = 'Sorry, that password does not match any of our records. Please try again.';

  function _readFile(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          if (success) {
            console.log(xhr.responseText);
            success(xhr.responseText);
          }
        } else {
          if (error) {
            error(xhr);
          }
        }
      }
    };
    xhr.open("GET", path, true);
    xhr.send();
  };

  function _storeLocal() {
    document.cookie = "lab_auth=1";
  };

  function _checkLocal() {
    var isLocal = false;
    if (window.location.host.indexOf('localhost') > -1 || window.location.href.indexOf('.local') > -1) {
      isLocal = true;
    }
    return isLocal;
  };

  function _redirect(page) {
    if (!page) {
      page = loginPage;
    }
    window.location.href = page;
  };

  function _inAccessList(password) {
    if (!accessList) {
      return false;
    }
    var i;
    for (i = 0; i < accessList.length; i++) {
      if (accessList[i] === password || (accessList[i] !== accessList[i] && password !== password)) {
        return true;
      }
    }
    return false;
  };

  function _referreredFromHere() {
    var ref = document.referrer;
    if ((ref === null) || (ref.length === 0)) {
      return false;
    }
    if (ref.indexOf('http://') === 0) {
      ref = ref.substring(7);
    }
    ref = ref.toLowerCase();
    var thisDomain = document.domain;
    if ((thisDomain === null) || (thisDomain.length === 0)) {
      return false;
    }
    if (thisDomain.indexOf('http://') === 0) {
      thisDomain = thisDomain.substring(7);
    }
    thisDomain = thisDomain.toLowerCase();
    return ref.indexOf(thisDomain) === 0;
  };

  function _checkPassword() {
    var password = input.value;

    _readFile(accessFile, function(contents) {
      console.log(contents);
      accessList = JSON.parse(contents);
      var correct = _inAccessList(password);
      if (correct) {
        var page = landingPage;
        if (_referreredFromHere()) {
          page = document.referrer;
        }
        _storeLocal();
        _redirect(page);
      } else {
        input.value = '';
        input.focus();
        setTimeout(function() {
          errorContainer.innerHTML = errorText;
        }, 100);
        return false;
      }
    }, function(xhr) {
      window.alert(xhr);
    });
  };

  function _getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  };

  function _checkAuth() {
    var isLocal = _checkLocal();
    var auth = _getCookie('lab_auth');
    if (auth || isLocal) {
      if (page === loginPage) {
        _redirect(landingPage);
      }
      return false;
    }
    if (page !== loginPage) {
      _redirect(loginPage);
    }
    window.onload = function() {
      form = document.getElementById('lab_passwordForm');
      input = form.lab_passwordInput;
      errorContainer = document.getElementById('lab_passwordError');
      if (form) {
        form.onsubmit = function() {
          _checkPassword();
          return false;
        };
        input.onkeyup = function() {
          errorContainer.innerHTML = '';
        };
      }
    };
  };

  _checkAuth();

})();
