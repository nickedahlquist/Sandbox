(function () {
  'use strict';

  angular.module('fm').service('fmFundDataService', ['$http', '$q', 'fmConfig', 'fmUtilityFunctions', fmFundDataService]);

  function fmFundDataService($http, $q, fmConfig, fmUtilityFunctions) {

    var utils = fmUtilityFunctions;

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
        var url = fmConfig.webAPI.url + 'api/Fund?$count=true&$expand=FundInfo';
        return loadFundData(url);
      },
      getFundById: function (id) {
        var url = fmConfig.webAPI.url + 'api/Fund?$filter=Id%20eq%20' + id + '&$expand=FundInfo,CompanyHoldings';
        return loadFundData(url);
      },
      getFundByIsin: function (isin) {
        var url = fmConfig.webAPI.url + 'api/Fund?$filter=Isin%20eq%20%27' + isin + '%27&$expand=FundInfo,NavHistory($orderby=RateDate%20desc)';
        return loadFundData(url);
      },
      getNavHistory: function (isin, fromDateIn, toDateIn, sampleRateIn) {

        //Set default values
        var now = Date.now();
        var prevYear = new Date(Date.now());
        prevYear = prevYear.setFullYear(prevYear.getFullYear() - 1);

        var fromDate = (typeof fromDateIn !== 'undefined') ? fromDateIn : utils.formatDate(prevYear);
        var toDate = (typeof toDateIn !== 'undefined') ? toDateIn : utils.formatDate(now);
        var sampleRate = (typeof sampleRateIn !== 'undefined') ? sampleRateIn : '7';

        //Build query
        var url = fmConfig.webAPI.url + 'api/Nav/GetNavHistory/' + isin + '/' + sampleRate + '/' + fromDate + '/' + toDate;
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
//# sourceMappingURL=fm-fundData-service.js.map
