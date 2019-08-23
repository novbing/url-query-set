"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Author novbing@foxmail.com
 */
(function () {
  'use strict';

  function getGlobalRoot() {
    var G = {};

    if (typeof window !== 'undefined') {
      G = window;
    } else if (typeof global !== 'undefined') {
      G = global;
    }

    return G;
  }

  function querySet(link, queryMap) {
    var G = getGlobalRoot();
    var tempLink;
    var hasProtol = /^\w+:\/\//.test(link);

    function splitSearchString(searchString) {
      var searchParams = {};

      if (typeof searchString === 'string' && searchString !== '') {
        searchString.replace(/^\?/, '').split('&').forEach(function (v) {
          var sp = v.split('=');

          if (sp[0]) {
            searchParams[sp[0]] = sp[1] || '';
          }
        });
      }

      return searchParams;
    }

    function setSearchQuery(searchParams, queryMap) {
      var params = searchParams || {};

      for (var key in queryMap) {
        params[key] = queryMap[key];
      }

      return params;
    }

    function joinSearchParams(searchParams) {
      var params = searchParams || {};
      var entries = [];

      for (var key in params) {
        entries.push([key, params[key]]);
      }

      return entries.map(function (v, i, a) {
        return v[0] + '=' + encodeURIComponent(v[1]);
      }).join('&');
    }

    function splitAndJoinParams(searchString, queryMap) {
      var temp = splitSearchString(searchString);
      temp = setSearchQuery(temp, queryMap);
      temp = joinSearchParams(temp);
      return temp !== '' ? '?' + temp : temp;
    }

    if (typeof G.URL === 'function' && hasProtol) {
      tempLink = new G.URL(link);

      if (tempLink.searchParams) {
        for (var key in queryMap) {
          tempLink.searchParams.set(key, queryMap[key]);
        }

        return tempLink.href;
      }
    }

    if (_typeof(G.document) === 'object' && hasProtol) {
      tempLink = document.createElement('a');
      tempLink.href = link;
      tempLink.search = splitAndJoinParams(tempLink.search, queryMap);

      if (tempLink.href.indexOf('?') !== -1 && (tempLink.search === '' || tempLink.search === '?')) {
        return tempLink.href.replace('?', '');
      } else {
        return tempLink.href;
      }
    } else {
      tempLink = link.split(/^([^?#]*)(\?[^?#]*)?(#[^?#]*)?(.*)$/gi);
      tempLink[2] = splitAndJoinParams(tempLink[2], queryMap);
      return tempLink.join('');
    }
  }

  var G = getGlobalRoot();

  if (typeof module !== 'undefined') {
    module.exports = querySet;
  } else {
    G.querySet = querySet;
  }
})();