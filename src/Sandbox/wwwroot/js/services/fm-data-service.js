(function () {
    'use strict';

    angular.module('fm').service('$fmDataService', ['$http', '$q', function ($http, $q) {
      var deferred = $q.defer();

      $http({
        method: 'GET',
        url: 'js/data/data.json'
      }).then(onSuccess, onError);

      function onSuccess(res) {
        var newsitems = res.data.newsitems;
        deferred.resolve(newsitems);
      }

      function onError(res) {
        deferred.reject(res);
      }

      this.getData = function () {
        return deferred.promise;
      };

    }]);


})();
//# sourceMappingURL=fm-data-service.js.map
