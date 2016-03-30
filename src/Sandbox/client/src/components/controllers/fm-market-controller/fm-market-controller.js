(function () {
  'use strict';

  // Setup routing.
  angular.module('fm').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
      .state('Marknaden', {
        url: '/Marknaden',
        controller: 'FmMarketCtrl',
        controllerAs: 'fmMarket',
        templateUrl: 'views/fm-market-view.html',
        resolve: {
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

    console.log(vm.latestNews);
    console.log(newsData);
 
    vm.title = 'Hej';
    vm.content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  }

})();
