(function () {
    'use strict';

    angular.module('fm').factory('fmAuthInterceptorService', ['$q', '$injector', function ($q, $injector) {
      
      var _request = function (config) {
        var authService = $injector.get('fmAuthServiceFactory');
        var authData = authService.getAuthData();
        config.headers = config.headers || {};

        if (authData) {
          config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
      };

      var _responseError = function (rejection) {
        if (rejection.status === 401) {
          var authService = $injector.get('fmAuthServiceFactory');
          var authData = authService.getAuthData();

          if (authData && authData.useRefreshTokens === true) {
            authService.refreshToken().then(function (data) { window.alert('refreshed token'); });
          }
          else {
            authService.logout();
            $injector.get('$state').transitionTo('login');
          }
        }

        return $q.reject(rejection);
      };


      return {
        request: _request,
        responseError: _responseError
      };

    }]);

 
})();