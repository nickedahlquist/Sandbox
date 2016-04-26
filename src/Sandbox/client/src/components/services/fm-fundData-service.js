(function () {
  'use strict';

  angular.module('fm').service('fmFundDataService', ['$http', '$q', 'fmConfig', fmFundDataService]);

  function fmFundDataService($http, $q, fmConfig) {

    function loadFundData(urlIn) {
      var url = urlIn,
          deferred = $q.defer();

      $http.get(url).then(onSuccess, onError);

      function onSuccess(res) {
        var fundItems = res.data;
        deferred.resolve(fundItems);
      }

      function onError(res) {
        deferred.reject(res);
      }

      return deferred.promise;
    }

    return {
      getFunds: function () {
        var url = fmConfig.webAPI.url + 'api/Fund?$expand=FundInfo';
        return loadFundData(url);
      },
      getFundById: function (id) {
        var url = fmConfig.webAPI.url + 'api/Fund?$filter=Id%20eq%20' + id + '&$expand=FundInfo';
        return loadFundData(url);
      },
      getNextLinks: function (nextLinks) {
        var url = nextLinks;
        return loadFundData(url);
      },
      getResultsPage: function (pageNumber) {
        var url = fmConfig.webAPI.url + 'api/Fund?$expand=FundInfo&$skip=' + (pageNumber * 10);
        return loadFundData(url);
      }
    };
  }

})();