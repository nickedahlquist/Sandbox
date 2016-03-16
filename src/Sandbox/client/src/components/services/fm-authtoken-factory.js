(function () {
    'use strict';

    angular.module('fm').factory('FmAuthtokenFactory', ['$window', function ($window) {
      var storage = $window.localStorage;
      var cachedToken;
      var tokenKey = 'userToken';

      return {
        setToken: function (token) {
          cachedToken = token;
          storage.setItem(tokenKey, token);
        },
        getToken: function () {
          if (!cachedToken) {
            cachedToken = storage.getItem(tokenKey);
          }

          return cachedToken;
        },
        removeToken: function () {
          cachedToken = undefined;
          storage.removeItem(tokenKey);
        },
        isAuthenticated: function () {
          return !!this.getToken();
        }        
      };


    }]);


})();