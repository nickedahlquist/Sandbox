(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('market', {
        url: '/market',
        controller: 'FmMarketCtrl',
        controllerAs: 'fmMarket',
        templateUrl: 'views/fm-market-view.html',
        resolve: {
          $title: function () {
              return 'Marknaden';
          },
          allData: function (fmDataService) {
              return fmDataService;
          },
          newsData: function (fmNewsService) {
            return fmNewsService.getNews();
          }
        },
        sortOrder: 2
      });

  }]);

  // Register controller.
  angular.module('fm').controller('FmMarketCtrl', ['allData', 'newsData', FmMarketCtrl]);

  // Define controller-function.
  function FmMarketCtrl(allData, newsData) {

    /* jshint validthis: true */
    var vm = this;

    vm.funds = allData.funds;
    vm.news = allData.newsitems;
    vm.latestNews = _.sortBy(newsData.slice(0, 3), 'PublishDate');
 
  }

})();
