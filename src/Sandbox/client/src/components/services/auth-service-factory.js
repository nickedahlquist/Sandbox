(function () {
    'use strict';

    angular.module('fm').factory('fmAuthServiceFactory', ['$http', '$q', 'localStorageService', 'fmConfig', function ($http, $q, localStorageService, fmConfig) {

      var baseUri = fmConfig.webAPI.url;
      var tokenKey = 'authData';
      var status = {
        username: '',
        isAuthenticated: false,
      };

      // Factory method: LOGIN
      var _login = function (login) {

        var uri = baseUri + 'token',
            clientId = (login.useRefreshTokens === true) ? '&client_id=' + fmConfig.webAPI.clientId : '',
            body = 'grant_type=password' + '&username=' + login.username + '&password=' + login.password + clientId,
            headers = { headers: fmConfig.webAPI.headers };

        var deferred = $q.defer();

        function onSuccess(data) {

          if (login.useRefreshTokens === true) {
            localStorageService.set(tokenKey, { token: data.access_token, username: login.username, refreshToken: login.refresh_token, useRefreshTokens: true });
          }
          else {
            localStorageService.set(tokenKey, { token: data.access_token, username: login.username, refreshToken: '', useRefreshTokens: false });
          }
          
          status.username = login.username;
          status.isAuthenticated = true;
          deferred.resolve(data);
        }

        function onError(error, status) {
          _logout();
          deferred.resolve(error);
        }
        
        $http.post(uri, body, headers)
          .success(onSuccess)
          .error(onError);

        return deferred.promise;
      };

      // Factory method: REFRESH TOKEN
      var _refreshToken = function () {
        var deferred = $q.defer();
        var authData = localStorageService.get(tokenKey);
        
        function onSuccess(data) {
          localStorageService.set(tokenKey, { token: data.access_token, username: data.username, refreshToken: data.refresh_token, useRefreshTokens: true });
          deferred.resolve(response);
        }

        function onError(error, status) {
          _logout();
          deferred.reject(error);
        }

        if (authData && authData.useRefreshTokens === true) {
          var uri     = baseUri + 'token',
              body    = 'grant_type=refresh_token' + authData.refreshToken + '&client_id=' + fmConfig.webAPI.clientId,
              headers = { headers: fmConfig.webAPI.headers };

          $http.post(uri, body, headers)
            .success(onSuccess)
            .error(onError);
        }

        return deferred.promise;
      };

      // Factory method: LOGOUT
      var _logout = function () {
        localStorageService.remove(tokenKey);
        status.username = '';
        status.isAuthenticated = false;
      };

      // Factory method: GET STATUS
      var _getStatus = function () {
        return status;
      };

      // Factory method: GET AUTH DATA
      var _getAuthData = function () {
        return localStorageService.get(tokenKey);
      };

      return {
        login: _login,
        logout: _logout,
        getStatus: _getStatus,
        getAuthData: _getAuthData,
        refreshToken: _refreshToken,
        tokenKey: tokenKey
      };

    }]);

})();