(function () {
    'use strict';

    angular.module('fm').service('fmDataService', ['$http', '$q', 'fmConfig', function ($http, $q, fmConfig) {
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: fmConfig.IIS.url
      }).then(onSuccess, onError);

      function onSuccess(res) {
        var newsitems = res.data;
        deferred.resolve(newsitems);
      }

      function onError(res) {
        deferred.reject(res);
      }

      return deferred.promise;
      
    }]);


})();
//# sourceMappingURL=fm-data-service.js.map
