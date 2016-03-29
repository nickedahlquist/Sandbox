(function () {
  'use strict';

  angular.module('fm').service('fmNewsService', ['$http', '$q', 'fmConfig', fmNewsService]);

  function fmNewsService($http, $q, fmConfig) {

    return {
      getNews: function(id) {

        var baseUrl = fmConfig.webAPI.url,
            route = _.isFinite(parseInt(id)) && parseInt(id) > 0 ? 'api/news/' + id : 'api/news',
            deferred = $q.defer();

        $http.get(baseUrl + route).then(onSuccess, onError);

        function onSuccess(res) {
          var newsitems = res.data;
          deferred.resolve(newsitems);
        }

        function onError(res) {
          deferred.reject(res);
        }

        return deferred.promise;

      }
    };
  }

})();